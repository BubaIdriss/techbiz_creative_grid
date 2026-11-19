 /* ═══════════════════════════════════════════════════════════════
         AGENT CHAT
         Talks to the FastAPI backend with a POST request whose JSON body is:
             { "text": "<what the visitor typed>", "thread_id": "<unique id per visitor>" }
         Kept in its own script block so a problem in the code above can't stop the chat from loading.
    ═══════════════════════════════════════════════════════════════ */

(function () {
            'use strict';

            /* ───────────── 1. CONFIG — edit these two values ───────────── */

            // Full URL of your FastAPI chat endpoint (change to your deployed URL).
            // NOTE: keep the trailing slash — the FastAPI route is "/chat-agent/".
            const CHAT_API_URL = 'http://127.0.0.1:8000/chat-agent/';

            // Greeting the agent shows when a visitor opens a brand-new conversation.
            const WELCOME_MESSAGE = "Hi! 👋 I'm the TechBiz assistant. Ask me about our services, pricing or how a project works.";

            // Give up waiting for the agent after this many milliseconds.
            const REQUEST_TIMEOUT_MS = 60000;

            // Storage keys (kept in one place so they're easy to find/rename).
            const THREAD_KEY = 'techbiz_thread_id';
            const HISTORY_KEY = 'techbiz_chat_history';
            const SEEN_KEY = 'techbiz_chat_seen';
            const MAX_SAVED_MESSAGES = 50; // cap what we remember in the browser

            /* ───────────── 2. SAFE STORAGE HELPERS ─────────────
               localStorage can throw (private mode, blocked cookies), so every
               read/write is wrapped in try/catch and the chat still works without it. */
            const store = {
                get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
                set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
                del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
            };

            /* ───────────── 3. UNIQUE thread_id PER VISITOR ─────────────
               Each browser gets a random UUID the first time the chat is used.
               It is saved in localStorage AND mirrored into a cookie, so the same visitor
               keeps the same conversation after refreshing or coming back later.
               The backend uses it to look up that visitor's conversation memory. */

            function generateId() {
                // crypto.randomUUID is supported by all modern browsers (needs HTTPS or localhost)
                if (window.crypto && crypto.randomUUID) return 'web-' + crypto.randomUUID();
                // Fallback for very old browsers: random bytes -> hex string
                const bytes = new Uint8Array(16);
                (window.crypto || window.msCrypto).getRandomValues(bytes);
                return 'web-' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
            }

            function readCookie(name) {
                const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
                return m ? decodeURIComponent(m[1]) : null;
            }

            function writeCookie(name, value) {
                // 1 year, available on the whole site, not sent on cross-site requests
                document.cookie = name + '=' + encodeURIComponent(value) +
                    '; max-age=31536000; path=/; SameSite=Lax' +
                    (location.protocol === 'https:' ? '; Secure' : '');
            }

            function getThreadId() {
                // Look in localStorage first, then the cookie, otherwise create a new one
                let id = store.get(THREAD_KEY) || readCookie(THREAD_KEY);
                if (!id) id = generateId();
                // (Re)save in both places so they stay in sync
                store.set(THREAD_KEY, id);
                writeCookie(THREAD_KEY, id);
                return id;
            }

            let threadId = getThreadId();

            /* ───────────── 4. DOM REFERENCES ───────────── */
            const launcher = document.getElementById('chat-launcher');
            const panel = document.getElementById('chat-panel');
            const messagesEl = document.getElementById('chat-messages');
            const typingEl = document.getElementById('chat-typing');
            const form = document.getElementById('chat-form');
            const input = document.getElementById('chat-input');
            const sendBtn = document.getElementById('chat-send');
            const closeBtn = document.getElementById('chat-close');
            const resetBtn = document.getElementById('chat-reset');
            const suggestions = document.getElementById('chat-suggestions');

            // Safety net: if the widget markup is missing, do nothing instead of throwing errors.
            if (!launcher || !panel || !form) return;

            let isSending = false; // true while we wait for the agent (blocks double-sends)
            let chatLocked = false; // true while the visitor is blocked by a rate limit

            /* ───────────── RATE-LIMIT LOCK ─────────────
               When the backend answers HTTP 429 we tell the visitor and disable the input,
               so they can't keep hammering the server.
               ms > 0  : unlock automatically after that many milliseconds (per-minute limit)
               ms = 0  : stay locked until the page is reloaded (daily limit) */
            function lockChat(placeholderText, ms) {
                chatLocked = true;
                input.disabled = true;
                sendBtn.disabled = true;
                input.placeholder = placeholderText;
                if (ms > 0) {
                    setTimeout(() => {
                        chatLocked = false;
                        input.disabled = false;
                        sendBtn.disabled = false;
                        input.placeholder = 'Type your message…';
                        input.focus();
                    }, ms);
                }
            }

            // Turn a 429 response into a visible message + the right kind of lock.
            function handleRateLimit(err) {
                if (err.code === 'daily_limit') {
                    addMessage('error', err.serverMessage ||
                        "You've reached today's message limit. Please come back tomorrow, or reach us on WhatsApp: +234 808 635 0481.", false);
                    lockChat('Daily limit reached — please come back tomorrow', 0);
                } else {
                    addMessage('error', err.serverMessage ||
                        "You're sending messages too quickly. Please wait a moment and try again.", false);
                    lockChat('Please wait a moment…', 30000); // 30 seconds
                }
            }

            /* ───────────── 5. RENDERING MESSAGES ───────────── */

            // Add a bubble to the chat. role = 'user' | 'bot' | 'error'.
            // textContent (NOT innerHTML) is used so nothing a visitor or the LLM
            // returns can ever inject HTML/JS into the page.
            function addMessage(role, text, save = true) {
                const div = document.createElement('div');
                div.className = 'chat-msg ' + role;
                div.textContent = text;
                messagesEl.insertBefore(div, typingEl); // keep the typing dots at the bottom
                scrollToBottom();
                if (save && role !== 'error') saveHistory(role, text);
                return div;
            }

            function scrollToBottom() {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            }

            function setTyping(on) {
                typingEl.classList.toggle('show', on);
                scrollToBottom();
            }

            /* ───────────── 6. CHAT HISTORY (so a refresh doesn't wipe the screen) ─────────────
               Only the visible transcript is stored in the browser. The agent's real memory
               lives on your server, keyed by thread_id. */
            function loadHistory() {
                try { return JSON.parse(store.get(HISTORY_KEY)) || []; } catch (e) { return []; }
            }

            function saveHistory(role, text) {
                const list = loadHistory();
                list.push({ role, text });
                store.set(HISTORY_KEY, JSON.stringify(list.slice(-MAX_SAVED_MESSAGES)));
            }

            function restoreConversation() {
                const list = loadHistory();
                if (list.length === 0) {
                    addMessage('bot', WELCOME_MESSAGE, false); // greeting is not saved as history
                    return;
                }
                list.forEach(m => addMessage(m.role, m.text, false));
                suggestions.style.display = 'none'; // returning visitor: no need for chips
            }

            /* ───────────── 7. TALKING TO THE FASTAPI BACKEND ───────────── */

            // Pull the agent's reply out of whatever JSON shape the API returns.
            // Adjust here if your FastAPI response uses a different field name.
            function extractReply(data) {
                if (typeof data === 'string') return data;
                return data.response || data.reply || data.answer || data.message || data.text || data.output || '';
            }

            async function askAgent(userText) {
                // AbortController lets us cancel the request if the server hangs
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

                try {
                    const res = await fetch(CHAT_API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        // These are the two fields your FastAPI ChatRequest model accepts.
                        // The names must match the model in techbiz_agent/schema.py exactly.
                        body: JSON.stringify({ text: userText, thread_id: threadId }),
                        signal: controller.signal
                    });

                    if (!res.ok) {
                        const err = new Error('Server responded with status ' + res.status);
                        err.status = res.status;
                        // For rate limits the backend sends { code, message } — keep them for the UI
                        if (res.status === 429) {
                            try {
                                const info = await res.json();
                                err.code = info.code;
                                err.serverMessage = info.message;
                            } catch (e) { /* body wasn't JSON — fall back to default texts */ }
                        }
                        throw err;
                    }

                    const contentType = res.headers.get('content-type') || '';
                    const data = contentType.includes('application/json') ? await res.json() : await res.text();
                    const reply = extractReply(data);
                    if (!reply) throw new Error('Empty reply from server');
                    return reply;
                } finally {
                    clearTimeout(timer); // always clean up the timeout
                }
            }

            async function sendMessage(text) {
                text = text.trim();
                if (!text || isSending || chatLocked) return;

                isSending = true;
                sendBtn.disabled = true;
                suggestions.style.display = 'none'; // hide quick-start chips after the first message

                addMessage('user', text);
                input.value = '';
                autoGrow();
                setTyping(true);

                try {
                    const reply = await askAgent(text);
                    setTyping(false);
                    addMessage('bot', reply);
                } catch (err) {
                    setTyping(false);
                    console.error('Chat error:', err);
                    if (err.status === 429) {
                        handleRateLimit(err); // "limit reached" notice + lock
                    } else {
                        const msg = err.name === 'AbortError'
                            ? 'The assistant took too long to respond. Please try again.'
                            : "Sorry, I couldn't reach the assistant right now. Please try again, or message us on WhatsApp.";
                        addMessage('error', msg);
                    }
                } finally {
                    isSending = false;
                    if (!chatLocked) { // a rate-limit lock keeps the input disabled
                        sendBtn.disabled = false;
                        input.focus();
                    }
                }
            }

            /* ───────────── 8. OPEN / CLOSE / RESET ───────────── */
            function openChat() {
                panel.classList.add('open');
                launcher.classList.add('open', 'seen');
                launcher.setAttribute('aria-expanded', 'true');
                panel.setAttribute('aria-hidden', 'false');
                store.set(SEEN_KEY, '1'); // stop the "invite" dot from pulsing next visit
                scrollToBottom();
                setTimeout(() => input.focus(), 350); // wait for the open animation
            }

            function closeChat() {
                panel.classList.remove('open');
                launcher.classList.remove('open');
                launcher.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            }

            // "New conversation": new thread_id + wipe local transcript.
            // The backend sees a brand-new thread_id, so the agent starts with no memory.
            function resetConversation() {
                if (isSending) return;
                threadId = generateId();
                store.set(THREAD_KEY, threadId);
                writeCookie(THREAD_KEY, threadId);
                store.del(HISTORY_KEY);
                messagesEl.querySelectorAll('.chat-msg').forEach(el => el.remove());
                suggestions.style.display = '';
                addMessage('bot', WELCOME_MESSAGE, false);
            }

            /* ───────────── 9. TEXTAREA AUTO-GROW ───────────── */
            function autoGrow() {
                input.style.height = 'auto';
                input.style.height = Math.min(input.scrollHeight, 110) + 'px';
            }

            /* ───────────── 10. EVENT WIRING ───────────── */
            launcher.addEventListener('click', () => panel.classList.contains('open') ? closeChat() : openChat());
            closeBtn.addEventListener('click', closeChat);
            resetBtn.addEventListener('click', resetConversation);

            form.addEventListener('submit', e => { e.preventDefault(); sendMessage(input.value); });

            // Enter sends, Shift+Enter inserts a new line
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                    e.preventDefault();
                    sendMessage(input.value);
                }
            });
            input.addEventListener('input', autoGrow);

            // Quick-start chips send their own label as the message
            suggestions.querySelectorAll('.chat-chip').forEach(chip =>
                chip.addEventListener('click', () => sendMessage(chip.textContent)));

            // Escape closes the chat (unless the service modal is open on top)
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && panel.classList.contains('open')
                    && !document.getElementById('svc-backdrop').classList.contains('open')) closeChat();
            });

            /* ───────────── 11. START ───────────── */
            if (store.get(SEEN_KEY)) launcher.classList.add('seen'); // returning visitor: no pulsing dot
            restoreConversation();
        })();