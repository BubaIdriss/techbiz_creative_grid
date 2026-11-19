// ───────────────────────────────────────────────────────────────────────────────
// SERVICES MODAL 
// ───────────────────────────────────────────────────────────────────────────────

const SVC = [
            {
                num: 'Service 01', title: 'Website Design & Development',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="18" height="14" rx="2"/><path d="M7 21h8M11 17v4"/></svg>`,
                tagline: `Your website is your #1 salesperson — it works 24/7, never sleeps, and reaches customers anywhere in the world. We design and build websites that are not just beautiful, but strategically crafted to turn first-time visitors into paying clients.`,
                features: [
                    { t: 'Custom UI/UX Design', d: 'Every page crafted from scratch to reflect your brand identity and guide visitors effortlessly toward action.' },
                    { t: 'Mobile-First & Responsive', d: 'Looks and works flawlessly on every screen — smartphone, tablet, or widescreen desktop.' },
                    { t: 'SEO Optimization', d: 'Built-in search engine best practices so Google finds, indexes, and ranks your site for the right keywords.' },
                    { t: 'Lightning-Fast Performance', d: 'Performance-tuned code and optimized assets that load in under 2 seconds — users never wait.' },
                    { t: 'Lead-Capture Forms & CTAs', d: 'Strategically placed forms and calls-to-action designed to turn visitors into enquiries and bookings.' },
                    { t: 'CMS Integration', d: 'Update your own content easily via WordPress, Webflow, or a custom admin panel — no developer needed.' },
                ],
                usecases: ['Small Businesses', 'Startups', 'Consultants & Freelancers', 'Online Stores', 'NGOs & Organizations', 'Personal Brands'],
                price: 'Custom quote per project', cta: 'Get a Website Quote'
            },
            {
                num: 'Service 02', title: 'Task & Business Automation',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4h4v4H4zM14 4h4v4h-4zM4 14h4v4H4zM14 14h4v4h-4z"/><path d="M8 6h6M6 8v6M16 8v6M8 16h6"/></svg>`,
                tagline: `Why pay people to do repetitive, manual tasks when software can do it faster, cheaper, and without mistakes? We analyse your entire workflow, identify every bottleneck and time-waster, then build intelligent systems that run your business while you focus on what actually matters.`,
                features: [
                    { t: 'Workflow Discovery & Mapping', d: 'We study your current process end-to-end, identifying every manual step that can be eliminated or accelerated.' },
                    { t: 'Custom Bots & Scripts', d: 'Python, Node.js, or no-code bots that handle data entry, emails, report generation, and much more automatically.' },
                    { t: 'API & App Integration', d: 'Connect your tools — CRM, email, Google Sheets, WhatsApp, Slack, and dozens of other platforms.' },
                    { t: 'Scheduled & Triggered Tasks', d: 'Automations that run on a timer or fire when a specific event happens — invoices sent, data synced, reports delivered.' },
                    { t: 'Zapier / Make Pipelines', d: 'No-code automation flows connecting your favourite apps, built and deployed within days — not weeks.' },
                    { t: 'Monitoring & Alerts', d: 'Automated notifications when something breaks or behaves unexpectedly — small issues caught before they become disasters.' },
                ],
                usecases: ['E-commerce Businesses', 'HR & Recruitment Firms', 'Finance & Invoicing', 'Sales Teams', 'Real Estate Agencies', 'Logistics Companies'],
                price: 'Custom quote per workflow', cta: 'Automate My Business'
            },
            {
                num: 'Service 03', title: 'Web App Development',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
                tagline: `A website shows what you do. A web app does it. We build fully functional, cloud-hosted web applications that your users, customers, or team members can log into and interact with — from any browser, anywhere in the world, at any time.`,
                features: [
                    { t: 'User Authentication & Roles', d: 'Secure login systems with granular roles, permissions, and multi-level user management built from the ground up.' },
                    { t: 'Scalable Database Architecture', d: 'Data structures designed to handle growth from your first 10 users all the way to tens of thousands.' },
                    { t: 'Admin Dashboards & Controls', d: 'Powerful control panels so you can manage your entire application — users, content, settings — without touching code.' },
                    { t: 'Real-Time Features', d: 'Live notifications, in-app messaging, and live data updates using WebSockets for a truly dynamic experience.' },
                    { t: 'Payment Gateway Integration', d: 'Accept payments online via Stripe, Paystack, Flutterwave, or any preferred payment provider — seamlessly.' },
                    { t: 'Cloud Deployment & DevOps', d: 'Hosted on AWS, Render, Heroku, or DigitalOcean with CI/CD pipelines, SSL, backups, and 99% uptime guarantees.' },
                ],
                usecases: ['SaaS Startups', 'Internal Company Tools', 'Customer & Client Portals', 'Booking & Reservation Platforms', 'School Management Systems', 'Marketplace Platforms'],
                price: 'Custom quote per scope', cta: 'Build My Web App'
            },
            {
                num: 'Service 04', title: 'AI & Smart Integration',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="3"/><path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.2 4.2l2.1 2.1M15.7 15.7l2.1 2.1M4.2 17.8l2.1-2.1M15.7 6.3l2.1-2.1"/></svg>`,
                tagline: `Artificial intelligence is no longer only for big tech companies — it's your competitive advantage waiting to be unlocked. We integrate state-of-the-art AI directly into your website, app, or workflow, giving your business capabilities that feel like magic to customers and staff alike.`,
                features: [
                    { t: 'AI Chatbot Integration', d: 'Custom chatbots powered by GPT or Claude that understand your business, answer questions, and qualify leads 24/7.' },
                    { t: 'Smart Recommendations', d: 'Show users the most relevant products, content, or services based on their behaviour and preferences.' },
                    { t: 'OpenAI / Claude API Setup', d: 'We connect your app to leading AI models and fine-tune the prompts and logic specifically for your use case.' },
                ],
                usecases: ['Customer Support Teams', 'E-learning Platforms', 'Legal & Finance Firms', 'Healthcare Providers', 'Content & Media Companies', 'E-commerce Stores'],
                price: 'Custom quote per integration', cta: 'Add AI to My Business'
            },
            {
                num: 'Service 05', title: 'IT Consulting & Strategy',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h6m-6 0v18m6-18H17a2 2 0 012 2v4m-8-6v18m8-14v12a2 2 0 01-2 2H9"/></svg>`,
                tagline: `Technology should serve your business — not confuse or drain it. Our IT consulting service helps you make sharp, confident technology decisions: what to buy, what to build, what to avoid, and how to structure your entire digital infrastructure for the next 3–5 years.`,
                features: [
                    { t: 'Technology Audit', d: 'We review every tool, system, and software you currently use — identifying what\'s costing too much or holding you back.' },
                    { t: 'Digital Roadmap Creation', d: 'A clear, prioritised 6–12 month plan for what to build, integrate, or upgrade — aligned to your business goals.' },
                    { t: 'Vendor & Tool Selection', d: 'Completely independent advice on which software platforms or cloud services are the right fit for your specific needs.' },
                    { t: 'Team Training & Onboarding', d: 'We train your staff to use your systems effectively — reducing friction, errors, and wasted time across the board.' },
                    { t: 'Ongoing Advisory Retainer', d: 'Monthly strategy sessions where we stay on top of your technology as your business grows and evolves.' },
                ],
                usecases: ['Growing SMEs', 'Non-Technical Founders', 'Schools & Universities', 'Government Agencies', 'NGOs', 'Businesses in Digital Transition'],
                price: 'Hourly or monthly retainer', cta: 'Book a Consultation'
            },
            {
                num: 'Service 06', title: 'Maintenance & Support',
                icon: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
                tagline: `Launching is just the beginning. Like any business asset, your digital products need regular care, updates, and monitoring to keep running at their best. Our maintenance plans give you complete peace of mind — we handle the technical upkeep so you can focus on growing your business.`,
                features: [
                    { t: 'Software & Plugin Updates', d: 'CMS core, frameworks, plugins, and third-party dependencies kept current, secure, and compatible.' },
                    { t: '24/7 Uptime Monitoring', d: 'Automated monitoring systems alert us the moment your site or app experiences downtime — usually before you notice.' },
                    { t: 'Bug Fixes & Emergency Patches', d: 'Fast turnaround on issues — critical bugs resolved within hours, standard fixes within 24–48 hours guaranteed.' },
                    { t: 'Performance Audits', d: 'Monthly speed and efficiency reviews to ensure your site stays fast, optimized, and competitive in search rankings.' },
                    { t: 'Content & Copy Updates', d: 'Need to update a price, add a team member, or change a page? Submit a request and we handle it promptly.' },
                    { t: 'Monthly Health Reports', d: 'Clear, plain-English summaries of your site\'s health, traffic trends, security status, and what was fixed or improved.' },
                ],
                usecases: ['Businesses Without a Tech Team', 'Busy Founders & Executives', 'E-commerce Sites', 'News & Blog Platforms', 'Web Apps in Production', 'Any Client We\'ve Built For'],
                price: 'Monthly retainer plans', cta: 'Get a Support Plan'
            }
        ];

        // ── MODAL ──
        const backdrop = document.getElementById('svc-backdrop');
        const bdBlur = document.getElementById('bd-blur');
        const closeBtn = document.getElementById('m-close');

        function openModal(i) {
            const s = SVC[i];
            document.getElementById('m-num').textContent = s.num;
            document.getElementById('m-title').textContent = s.title;
            document.getElementById('m-icon').innerHTML = s.icon;
            document.getElementById('m-tagline').textContent = s.tagline;
            document.getElementById('m-price').textContent = s.price;
            document.getElementById('m-cta').childNodes[0].textContent = s.cta + ' ';

            document.getElementById('m-features').innerHTML = s.features.map(f => `
    <div class="mf">
      <div class="mf-check"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 6l3 3 5-5"/></svg></div>
      <div class="mf-text"><strong>${f.t}</strong><span>${f.d}</span></div>
    </div>`).join('');

            document.getElementById('m-usecases').innerHTML = s.usecases.map(u => `<span class="uc-tag">${u}</span>`).join('');

            document.getElementById('svc-modal').scrollTop = 0;
            backdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            backdrop.classList.remove('open');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.service-card').forEach(c => c.addEventListener('click', () => openModal(+c.dataset.service)));
        closeBtn.addEventListener('click', closeModal);
        bdBlur.addEventListener('click', closeModal);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

        // close CTA inside modal also closes modal
        document.getElementById('m-cta').addEventListener('click', closeModal);

        // ── CURSOR ──
        const cur = document.getElementById('cursor');
        const rng = document.getElementById('cursor-ring');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cur.style.left = mx + 'px'; cur.style.top = my + 'px';
        });
        (function loop() { rx += (mx - rx) * .12; ry += (my - ry) * .12; rng.style.left = rx + 'px'; rng.style.top = ry + 'px'; requestAnimationFrame(loop); })();
        document.querySelectorAll('a,button,.service-card,.step,.tech-tag,.mf').forEach(el => {
            el.addEventListener('mouseenter', () => { cur.style.width = '20px'; cur.style.height = '20px'; rng.style.width = '60px'; rng.style.height = '60px'; });
            el.addEventListener('mouseleave', () => { cur.style.width = '12px'; cur.style.height = '12px'; rng.style.width = '40px'; rng.style.height = '40px'; });
        });

        // ── NAV ──
        window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 40));

        // ── REVEAL ──
        const ro = new IntersectionObserver(entries => {
            entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); ro.unobserve(e.target); } });
        }, { threshold: .1 });
        document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

        // ── PARTICLES ──
        ['#c8ff00', '#00e5ff', '#ff4d1c'].forEach(c => {
            for (let i = 0; i < 5; i++) {
                const p = document.createElement('div'); p.className = 'particle';
                const s = Math.random() * 4 + 2;
                p.style.cssText = `width:${s}px;height:${s}px;background:${c};left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;--dur:${Math.random() * 8 + 6}s;--delay:-${Math.random() * 8}s;--op:${Math.random() * 0.1 + 0.02}`;
                document.body.appendChild(p);
            }
        });

        // ── COUNTERS ──
        function animCount(el, target, suffix) {
            let s = 0; const d = 1800;
            const go = ts => { if (!s) s = ts; const p = Math.min((ts - s) / d, 1); const e = 1 - Math.pow(1 - p, 3); el.innerHTML = Math.floor(e * target) + '<span>' + suffix + '</span>'; if (p < 1) requestAnimationFrame(go); };
            requestAnimationFrame(go);
        }
        const sEls = [...document.querySelectorAll('.stat-num')];
        const sData = [{ v: 50, s: '+' }, { v: 98, s: '%' }, { v: 5, s: 'yr' }, { v: 24, s: 'h' }];
        let counted = false;
        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !counted) { counted = true; sEls.forEach((el, i) => animCount(el, sData[i].v, sData[i].s)); }
        }, { threshold: .5 }).observe(document.querySelector('.hero-stats'));