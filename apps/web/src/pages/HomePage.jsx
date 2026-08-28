import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star, GitFork, Mail, Code2, Sparkles, RefreshCw, Search, Lock, Globe, Filter, Tag } from 'lucide-react';

const GH_USER = 'sotified-ai';
const GH_LABEL = "Farrukh's Github";

const marqueeWords = ['React', 'TypeScript', 'Design Systems', 'Tailwind', 'Node', 'Motion', 'Prototyping', 'AI Tooling', 'Interfaces'];

// Comprehensive curated metadata for all sotified-ai repositories
const CURATED_REPOS = [
    {
        id: 'surah-muzammil-aligrapy',
        name: 'surah-muzammil-aligrapy',
        description: 'Interactive Surah Al-Muzzammil circular calligraphy canvas & Quranic typography visualizer. Built with React, TypeScript, and modern canvas rendering.',
        language: 'TypeScript',
        tags: ['TypeScript', 'React', 'Calligraphy', 'Islamic Art', 'Canvas'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/surah-muzammil-aligrapy`,
        pushed_at: '2026-08-28T10:06:08Z'
    },
    {
        id: 'vibeguru',
        name: 'vibeguru',
        description: 'Full-stack monorepo web application built with React, Vite, Tailwind CSS, and PocketBase backend. Features dynamic UI design, interactive tools, and expressive layout tokens.',
        language: 'JavaScript',
        tags: ['React', 'Vite', 'PocketBase', 'Monorepo', 'Tailwind'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 1,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/vibeguru`,
        pushed_at: '2026-08-02T12:00:00Z'
    },
    {
        id: 'Py-Timelogs',
        name: 'Py-Timelogs',
        description: 'Automated developer time-tracking & activity logging CLI system. Records project work sessions, task durations, and outputs formatted timelog summaries.',
        language: 'Python',
        tags: ['Python', 'CLI', 'Time-Tracking', 'Automation'],
        category: 'Python & Scripts',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/Py-Timelogs`,
        pushed_at: '2026-07-30T12:00:00Z'
    },
    {
        id: 'dailyazkar',
        name: 'dailyazkar',
        description: 'Daily Azkar & Islamic reflection web platform featuring multi-language support, morning/evening supplications, daily blogs, SEO middleware, and an AI assistant.',
        language: 'TypeScript',
        tags: ['TypeScript', 'React', 'Tailwind', 'AI Assistant', 'Express'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/dailyazkar`,
        pushed_at: '2026-07-27T12:00:00Z'
    },
    {
        id: 'ai_discovery_intelligence',
        name: 'ai_discovery_intelligence',
        description: 'AI Discovery & Intelligence engine for market research, automated web insights extraction, and AI workflow recommendations.',
        language: 'TypeScript',
        tags: ['TypeScript', 'AI', 'Intelligence', 'LLM', 'Automation'],
        category: 'AI & Automation',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/ai_discovery_intelligence`,
        pushed_at: '2026-08-03T17:00:00Z'
    },
    {
        id: 'dashboard-timesheet',
        name: 'dashboard-timesheet',
        description: 'Next.js timesheet analytics dashboard for tracking team work hours, project shift logs, contractor budgets, and real-time report generation.',
        language: 'TypeScript',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Dashboard', 'Analytics'],
        category: 'Web Applications',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/dashboard-timesheet`,
        pushed_at: '2026-08-02T12:00:00Z'
    },
    {
        id: 'AI-Extension',
        name: 'AI-Extension',
        description: 'Chrome browser extension to export, clean, and archive ChatGPT conversation history into structured Markdown files with sidebar navigation.',
        language: 'JavaScript',
        tags: ['JavaScript', 'Chrome Extension', 'ChatGPT', 'Markdown', 'DOM Scraping'],
        category: 'Chrome Extensions',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/AI-Extension`,
        pushed_at: '2026-07-26T12:00:00Z'
    },
    {
        id: 'hr-screening',
        name: 'hr-screening',
        description: 'AI-powered candidate screening & evaluation portal. Automated resume parsing, candidate scoring, and structured interview assessment workflow.',
        language: 'TypeScript',
        tags: ['TypeScript', 'AI', 'HR Tech', 'React', 'Node.js'],
        category: 'AI & Automation',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/hr-screening`,
        pushed_at: '2026-07-20T12:00:00Z'
    },
    {
        id: 'warm-wares-works',
        name: 'warm-wares-works',
        description: 'Internal workspace tooling & automation framework for managing warm-up pipelines, outreach workflows, and operational tasks.',
        language: 'TypeScript',
        tags: ['TypeScript', 'Automation', 'Internal Tools', 'Workflows'],
        category: 'AI & Automation',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/warm-wares-works`,
        pushed_at: '2026-07-13T12:00:00Z'
    },
    {
        id: 'the_ledger',
        name: 'the_ledger',
        description: 'Point-of-Sale (POS) & financial inventory management system with stock tracking, invoice generation, multi-tier user roles, and reporting.',
        language: 'TypeScript',
        tags: ['TypeScript', 'POS', 'Inventory', 'Finance', 'SaaS'],
        category: 'E-Commerce & POS',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/the_ledger`,
        pushed_at: '2026-07-01T12:00:00Z'
    },
    {
        id: 'ai-agent-workflows',
        name: 'ai-agent-workflows',
        description: 'Multi-agent AI orchestration scripts, task planning routines, and workflow execution blueprints powered by LLMs.',
        language: 'Python',
        tags: ['Python', 'AI Agents', 'Orchestration', 'LLM', 'Automation'],
        category: 'AI & Automation',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/ai-agent-workflows`,
        pushed_at: '2026-07-01T12:00:00Z'
    },
    {
        id: 'shopify-godo',
        name: 'shopify-godo',
        description: 'Custom Shopify e-commerce integration, storefront design customization, and UK legal compliance policy templates.',
        language: 'HTML',
        tags: ['HTML', 'Shopify', 'Liquid', 'E-Commerce', 'Compliance'],
        category: 'E-Commerce & POS',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/shopify-godo`,
        pushed_at: '2026-06-28T12:00:00Z'
    },
    {
        id: 'warm-wares-works-f76fa9d5',
        name: 'warm-wares-works-f76fa9d5',
        description: 'Microservice variant of warm-wares workspace engine for automated outreach scheduling and domain warm-up tracking.',
        language: 'TypeScript',
        tags: ['TypeScript', 'Microservice', 'Automation'],
        category: 'AI & Automation',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/warm-wares-works-f76fa9d5`,
        pushed_at: '2026-06-26T12:00:00Z'
    },
    {
        id: 'Estimate-Calculator',
        name: 'Estimate-Calculator',
        description: 'Interactive project cost estimation calculator built with Vue. Allows clients to configure project parameters and generate instant quotes.',
        language: 'Vue',
        tags: ['Vue', 'JavaScript', 'Calculator', 'Estimations'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/Estimate-Calculator`,
        pushed_at: '2026-06-25T12:00:00Z'
    },
    {
        id: 'web-page-scrapper',
        name: 'web-page-scrapper',
        description: 'High-performance Python web page scraper & data extraction utility for automated web harvesting and structured CSV output.',
        language: 'Python',
        tags: ['Python', 'Scraper', 'BeautifulSoup', 'Automation'],
        category: 'Python & Scripts',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/web-page-scrapper`,
        pushed_at: '2026-06-07T12:00:00Z'
    },
    {
        id: 'vm-wholesale',
        name: 'vm-wholesale',
        description: 'Custom WordPress B2B wholesale platform featuring bulk ordering, gated wholesale pricing, and supplier catalog management.',
        language: 'PHP',
        tags: ['PHP', 'WordPress', 'WooCommerce', 'B2B Wholesale'],
        category: 'E-Commerce & POS',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/vm-wholesale`,
        pushed_at: '2026-05-30T12:00:00Z'
    },
    {
        id: 'aspirexpress',
        name: 'aspirexpress',
        description: 'Express.js backend API architecture with TypeScript, JWT authentication, modular route controllers, and PostgreSQL integration.',
        language: 'TypeScript',
        tags: ['TypeScript', 'Express.js', 'Node.js', 'REST API'],
        category: 'Web Applications',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/aspirexpress`,
        pushed_at: '2026-05-03T12:00:00Z'
    },
    {
        id: 'sotified-ai',
        name: 'sotified-ai',
        description: 'Official organization profile repository & public documentation showcase for Sotified AI engineering team.',
        language: 'Markdown',
        tags: ['Organization', 'Documentation', 'GitHub Profile'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/sotified-ai`,
        pushed_at: '2026-03-24T12:00:00Z'
    },
    {
        id: 'invoice_app',
        name: 'invoice_app',
        description: 'Web-based invoice generator & billing manager. Create, download, and track professional client invoices in PDF format.',
        language: 'JavaScript',
        tags: ['JavaScript', 'PDF Generation', 'Billing', 'Invoicing'],
        category: 'E-Commerce & POS',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/invoice_app`,
        pushed_at: '2026-03-17T12:00:00Z'
    },
    {
        id: 'akp',
        name: 'akp (Ajj Kia Pakaien)',
        description: 'Ajj Kia Pakaien — Interactive meal recommendation & recipe discovery app designed to answer daily cooking queries.',
        language: 'JavaScript',
        tags: ['JavaScript', 'Recipe App', 'React', 'Web App'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/akp`,
        pushed_at: '2026-03-08T12:00:00Z'
    },
    {
        id: 'aspx',
        name: 'aspx',
        description: 'Enterprise ASP.NET Web Forms integration module for legacy database synchronization and server-side handlers.',
        language: 'C#',
        tags: ['C#', 'ASP.NET', 'Enterprise', 'Backend'],
        category: 'Web Applications',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/aspx`,
        pushed_at: '2026-02-10T12:00:00Z'
    },
    {
        id: 'JiraTrackers',
        name: 'JiraTrackers',
        description: 'Custom HTML/JS dashboard widgets for tracking Jira issue statuses, sprint velocity, and team workflow bottlenecks.',
        language: 'HTML',
        tags: ['HTML', 'Jira API', 'Dashboard', 'Widgets'],
        category: 'Web Applications',
        isPrivate: true,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/JiraTrackers`,
        pushed_at: '2026-01-08T12:00:00Z'
    },
    {
        id: 'Customer-Support-Ticketing',
        name: 'Customer-Support-Ticketing',
        description: 'Automated Python customer support ticketing system with SLA tracking, ticket categorization, and email notifications.',
        language: 'Python',
        tags: ['Python', 'Ticketing', 'Customer Support', 'Automation'],
        category: 'Python & Scripts',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/Customer-Support-Ticketing`,
        pushed_at: '2025-12-29T12:00:00Z'
    },
    {
        id: 'KYExpense',
        name: 'KYExpense',
        description: 'Know Your Expense — Modern expense tracking SaaS application built with TypeScript, featuring visual charts and budget alerts.',
        language: 'TypeScript',
        tags: ['TypeScript', 'React', 'Finance', 'SaaS', 'Charts'],
        category: 'Web Applications',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/KYExpense`,
        pushed_at: '2025-12-10T12:00:00Z'
    },
    {
        id: 'Inventory-SaaS',
        name: 'Inventory-SaaS',
        description: 'Multi-tenant SaaS application for multi-location inventory control, stock transfer tracking, and low-stock alerts.',
        language: 'JavaScript',
        tags: ['JavaScript', 'SaaS', 'Inventory', 'Multi-tenant'],
        category: 'E-Commerce & POS',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/Inventory-SaaS`,
        pushed_at: '2025-11-29T12:00:00Z'
    },
    {
        id: 'Inventory_System',
        name: 'Inventory_System',
        description: 'Enterprise TypeScript inventory management system with real-time stock reporting, audit logs, and order fulfilment.',
        language: 'TypeScript',
        tags: ['TypeScript', 'Inventory', 'Enterprise', 'Analytics'],
        category: 'E-Commerce & POS',
        isPrivate: false,
        stargazers_count: 0,
        forks_count: 0,
        html_url: `https://github.com/${GH_USER}/Inventory_System`,
        pushed_at: '2025-11-26T12:00:00Z'
    }
];

const LANG_COLORS = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Vue': '#41b883',
    'PHP': '#4F5D95',
    'HTML': '#e34c26',
    'C#': '#178600',
    'Markdown': '#89e051'
};

const CATEGORIES = ['All', 'AI & Automation', 'Web Applications', 'Chrome Extensions', 'E-Commerce & POS', 'Python & Scripts'];

const accent = (i) => ['hsl(var(--amber))', 'hsl(var(--violet))', 'hsl(200 70% 42%)', 'hsl(150 45% 34%)'][i % 4];

const Reveal = ({ children, delay = 0, className = '' }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

const HomePage = () => {
    const [repos, setRepos] = useState(CURATED_REPOS);
    const [status, setStatus] = useState('loading');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const load = React.useCallback(() => {
        setStatus('loading');
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('gh'))))
            .then((data) => {
                const fetchedList = Array.isArray(data) ? data : [];
                // Merge live GitHub API data with our detailed curated list
                const mergedMap = new Map();

                // Put all curated repos into map first
                CURATED_REPOS.forEach((cr) => mergedMap.set(cr.name.toLowerCase(), cr));

                // Update/enrich with live data from API
                fetchedList.forEach((ghRepo) => {
                    const key = ghRepo.name.toLowerCase();
                    const existing = mergedMap.get(key);

                    // Use curated description if gh description is bare/missing
                    const ghDesc = ghRepo.description?.trim();
                    const finalDescription = (ghDesc && ghDesc.length > 15 && ghDesc !== ghRepo.name && ghDesc !== 'azkar' && ghDesc !== 'vibeguru')
                        ? ghDesc
                        : (existing?.description || ghDesc || 'An in-progress project repository.');

                    mergedMap.set(key, {
                        id: ghRepo.id || key,
                        name: ghRepo.name,
                        description: finalDescription,
                        language: ghRepo.language || existing?.language || 'JavaScript',
                        tags: existing?.tags || (ghRepo.topics?.length ? ghRepo.topics : [ghRepo.language || 'Code']),
                        category: existing?.category || 'Web Applications',
                        isPrivate: ghRepo.private || false,
                        stargazers_count: ghRepo.stargazers_count ?? (existing?.stargazers_count || 0),
                        forks_count: ghRepo.forks_count ?? (existing?.forks_count || 0),
                        html_url: ghRepo.html_url || existing?.html_url || `https://github.com/${GH_USER}/${ghRepo.name}`,
                        pushed_at: ghRepo.pushed_at || existing?.pushed_at
                    });
                });

                const finalArray = Array.from(mergedMap.values()).sort((a, b) => {
                    const timeA = new Date(a.pushed_at || 0).getTime();
                    const timeB = new Date(b.pushed_at || 0).getTime();
                    return timeB - timeA;
                });
                setRepos(finalArray);
                setStatus('ok');
            })
            .catch(() => {
                setRepos(CURATED_REPOS);
                setStatus('ok');
            });
    }, []);

    useEffect(() => { load(); }, [load]);

    // Filtering logic
    const filteredRepos = useMemo(() => {
        return repos.filter((r) => {
            const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || (
                r.name.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                (r.language && r.language.toLowerCase().includes(q)) ||
                (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
            );
            return matchesCategory && matchesSearch;
        });
    }, [repos, selectedCategory, searchQuery]);

    const featuredNames = ['vibeguru', 'Py-Timelogs', 'dailyazkar'];
    const featured = useMemo(() => {
        const top = repos.filter((r) => featuredNames.includes(r.name.toLowerCase()));
        return top.length === 3 ? top : repos.slice(0, 3);
    }, [repos]);

    const rest = useMemo(() => {
        const featuredIds = new Set(featured.map((f) => f.id));
        return filteredRepos.filter((r) => !featuredIds.has(r.id));
    }, [filteredRepos, featured]);

    return (
        <div className="grain min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--ink))] selection:bg-[hsl(var(--amber))] selection:text-black">
            <Helmet>
                <title>Farrukh — Developer & Designer Portfolio</title>
                <meta name="description" content="Portfolio of Farrukh, a developer and designer building expressive websites, interfaces and AI-assisted tools. Featured projects straight from GitHub." />
            </Helmet>

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-[90rem] px-5 sm:px-8 py-4 flex items-center justify-between">
                    <a href="#top" className="font-mono-c text-sm tracking-tight bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-3 py-2 rounded-full">
                        Farrukh<span className="text-[hsl(var(--amber))]">.vibing</span>
                    </a>
                    <nav className="hidden sm:flex items-center gap-1 rounded-full border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--background)/0.7)] backdrop-blur px-2 py-1.5">
                        {[['Work', '#work'], ['About', '#about'], ['Stack', '#stack']].map(([l, h]) => (
                            <a key={l} href={h} className="px-3 py-1.5 text-sm rounded-full hover:bg-[hsl(var(--ink)/0.07)] transition-colors">{l}</a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <a
                            href="https://farrukh-khan.lovable.app/"
                            target="_blank" rel="noreferrer"
                            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[hsl(var(--amber))] text-black px-4 py-2.5 text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition"
                        >
                            <Globe className="h-4 w-4" /> Lovable Profile
                        </a>
                        <a
                            href={`https://github.com/${GH_USER}`}
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--violet))] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[hsl(var(--ink))] active:scale-[0.98] transition"
                        >
                            <Github className="h-4 w-4" strokeWidth={2} /> {GH_LABEL}
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section id="top" className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20">
                <div
                    aria-hidden
                    className="absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--amber)/0.7), transparent 65%)' }}
                />
                <div
                    aria-hidden
                    className="absolute -bottom-56 -left-32 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle at 60% 40%, hsl(var(--violet)/0.6), transparent 65%)' }}
                />

                <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-8">
                    <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-end">
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                                className="font-mono-c text-xs sm:text-sm uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.6)] mb-6"
                            >
                                Developer · Designer · Perpetual tinkerer
                            </motion.p>
                            <h1 className="font-display font-extrabold leading-[0.86] tracking-[-0.04em] text-[clamp(3rem,11vw,10rem)]">
                                {['Builds', 'that'].map((w, i) => (
                                    <motion.span
                                        key={w} className="block"
                                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {w}
                                    </motion.span>
                                ))}
                                <motion.span
                                    className="block relative w-fit"
                                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="font-serif-i italic font-normal pr-2">have a pulse.</span>
                                    <motion.svg
                                        viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden
                                        className="absolute -bottom-1 left-0 w-full h-[0.18em]"
                                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                        style={{ originX: 0 }}
                                    >
                                        <path d="M2 9 C 70 2, 150 13, 298 4" stroke="hsl(var(--amber))" strokeWidth="7" fill="none" strokeLinecap="round" />
                                    </motion.svg>
                                </motion.span>
                            </h1>
                            <div className="mt-10 flex flex-wrap items-center gap-3">
                                <a href="#work" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold hover:bg-[hsl(var(--violet))] active:scale-[0.98] transition">
                                    See the work <ArrowUpRight className="h-4 w-4" />
                                </a>
                                <a href="#about" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.25)] px-6 text-sm font-semibold hover:bg-[hsl(var(--ink)/0.06)] active:scale-[0.98] transition">
                                    Who am I
                                </a>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 2 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden lg:block"
                        >
                            <div className="rounded-[1.75rem] overflow-hidden border-4 border-[hsl(var(--ink))] shadow-[14px_14px_0_hsl(var(--violet))]">
                                <img src="https://images.hostinger.com/af6f1696-0b2e-49d1-9a59-a7990136171e.png" alt="Abstract layered glass panels artwork" className="w-full h-[22rem] object-cover" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="border-y-2 border-[hsl(var(--ink))] bg-[hsl(var(--amber))] py-3 overflow-hidden">
                <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
                    {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
                        <span key={i} className="font-mono-c text-sm uppercase tracking-widest text-black/80 flex items-center gap-8">
                            {w} <span className="text-black/40">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Work / Repos Section */}
            <section id="work" className="mx-auto max-w-[90rem] px-5 sm:px-8 py-24 sm:py-32">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.55)] mb-3">01 — Projects & Repositories</p>
                        <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                            Shipped, live, <span className="font-serif-i italic font-normal">and open source.</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-[hsl(var(--ink)/0.7)] leading-relaxed mb-3">
                            Full archive of 25 repositories from Sotified AI — including web apps, AI tools, extensions, and automated scripts.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--ink)/0.06)] border border-[hsl(var(--ink)/0.12)] font-mono-c text-xs text-[hsl(var(--ink)/0.8)]">
                            <Github className="h-3.5 w-3.5 text-[hsl(var(--violet))]" />
                            <span>{repos.length} Repositories cataloged</span>
                        </div>
                    </div>
                </div>

                {/* Featured Top Cards */}
                <div className="mb-16">
                    <h3 className="font-mono-c text-xs uppercase tracking-wider text-[hsl(var(--ink)/0.5)] mb-6 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--amber))]" /> Featured Core Projects
                    </h3>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {featured.map((r, i) => (
                            <Reveal key={r.id} delay={i * 0.07}>
                                <a
                                    href={r.html_url} target="_blank" rel="noreferrer"
                                    className="group flex h-full flex-col justify-between rounded-[1.5rem] border-2 border-[hsl(var(--ink))] bg-white p-7 transition-transform duration-300 hover:-translate-y-1.5"
                                    style={{ boxShadow: `8px 8px 0 ${accent(i)}` }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: LANG_COLORS[r.language] || '#3178c6' }}
                                                />
                                                <span className="font-mono-c text-xs font-semibold uppercase tracking-wider text-[hsl(var(--ink)/0.8)]">
                                                    {r.language}
                                                </span>
                                                {r.isPrivate ? (
                                                    <span className="inline-flex items-center gap-1 font-mono-c text-[0.65rem] uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                                                        <Lock className="h-2.5 w-2.5" /> Private
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 font-mono-c text-[0.65rem] uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                                        <Globe className="h-2.5 w-2.5" /> Public
                                                    </span>
                                                )}
                                            </div>
                                            <ArrowUpRight className="h-5 w-5 opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                                        </div>
                                        <h3 className="font-display text-2xl font-bold tracking-tight break-words mb-3">{r.name}</h3>
                                        <p className="text-[hsl(var(--ink)/0.7)] text-sm leading-relaxed mb-6">
                                            {r.description}
                                        </p>
                                    </div>
                                    <div>
                                        {/* Tech tags */}
                                        {r.tags && r.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                {r.tags.map((tag) => (
                                                    <span key={tag} className="font-mono-c text-[0.68rem] px-2 py-0.5 rounded-full bg-[hsl(var(--ink)/0.06)] text-[hsl(var(--ink)/0.75)] border border-[hsl(var(--ink)/0.1)]">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between border-t border-[hsl(var(--ink)/0.1)] pt-4 font-mono-c text-xs text-[hsl(var(--ink)/0.6)]">
                                            <div className="flex items-center gap-4">
                                                <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {r.stargazers_count}</span>
                                                <span className="inline-flex items-center gap-1.5"><GitFork className="h-3.5 w-3.5" /> {r.forks_count}</span>
                                            </div>
                                            <span className="text-[0.7rem] text-[hsl(var(--ink)/0.45)]">
                                                {r.category}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Filter and Search Controls */}
                <div className="border-t-2 border-[hsl(var(--ink))] pt-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h3 className="font-display text-2xl font-bold tracking-tight mb-1">
                                Repository Archive
                            </h3>
                            <p className="text-xs font-mono-c text-[hsl(var(--ink)/0.6)]">
                                Showing {filteredRepos.length} of {repos.length} repositories
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[260px] sm:min-w-[320px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--ink)/0.4)]" />
                            <input
                                type="text"
                                placeholder="Search by name, tag, language..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-[hsl(var(--ink)/0.2)] bg-white focus:outline-none focus:border-[hsl(var(--violet))] focus:ring-2 focus:ring-[hsl(var(--violet)/0.2)] transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono-c text-[hsl(var(--ink)/0.5)] hover:text-black"
                                >
                                    clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
                        <span className="font-mono-c text-xs text-[hsl(var(--ink)/0.5)] mr-2 flex items-center gap-1">
                            <Filter className="h-3 w-3" /> Filter:
                        </span>
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                                        isSelected
                                            ? 'bg-[hsl(var(--ink))] text-[hsl(var(--background))] shadow-sm'
                                            : 'bg-white border border-[hsl(var(--ink)/0.15)] text-[hsl(var(--ink)/0.75)] hover:bg-[hsl(var(--ink)/0.06)]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Repository List Table */}
                    {filteredRepos.length === 0 ? (
                        <div className="rounded-[1.5rem] border-2 border-dashed border-[hsl(var(--ink)/0.2)] p-12 text-center bg-white/50">
                            <p className="font-display text-lg font-semibold mb-1">No matching repositories found.</p>
                            <p className="text-sm text-[hsl(var(--ink)/0.6)] mb-4">Try adjusting your search query or category filter.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--ink))] text-white text-xs font-semibold"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-[hsl(var(--ink)/0.15)] border-b border-[hsl(var(--ink)/0.15)]">
                            {filteredRepos.map((r, i) => (
                                <Reveal key={r.id || r.name} delay={Math.min(i * 0.03, 0.2)}>
                                    <a
                                        href={r.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group grid grid-cols-1 md:grid-cols-[1.2fr_2fr_1fr] items-start md:items-center gap-3 md:gap-6 py-5 px-3 -mx-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-[hsl(var(--ink)/0.1)] hover:shadow-sm"
                                    >
                                        {/* Name & Badges */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="font-display text-lg font-bold tracking-tight text-[hsl(var(--ink))] group-hover:text-[hsl(var(--violet))] transition-colors">
                                                    {r.name}
                                                </span>
                                                {r.isPrivate ? (
                                                    <span className="font-mono-c text-[0.65rem] px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium inline-flex items-center gap-1">
                                                        <Lock className="h-2.5 w-2.5" /> Private
                                                    </span>
                                                ) : (
                                                    <span className="font-mono-c text-[0.65rem] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium inline-flex items-center gap-1">
                                                        <Globe className="h-2.5 w-2.5" /> Public
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 font-mono-c text-xs text-[hsl(var(--ink)/0.6)]">
                                                <span
                                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                                    style={{ backgroundColor: LANG_COLORS[r.language] || '#3178c6' }}
                                                />
                                                <span>{r.language || 'Code'}</span>
                                            </div>
                                        </div>

                                        {/* Description & Tags */}
                                        <div>
                                            <p className="text-sm text-[hsl(var(--ink)/0.75)] leading-relaxed mb-2">
                                                {r.description}
                                            </p>
                                            {r.tags && r.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {r.tags.map((t) => (
                                                        <span key={t} className="font-mono-c text-[0.65rem] px-2 py-0.5 rounded bg-[hsl(var(--ink)/0.05)] text-[hsl(var(--ink)/0.65)]">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Category & Link */}
                                        <div className="flex items-center justify-between md:justify-end gap-3 text-right">
                                            <span className="font-mono-c text-xs text-[hsl(var(--ink)/0.5)]">
                                                {r.category}
                                            </span>
                                            <span className="font-mono-c text-xs font-semibold text-[hsl(var(--ink)/0.7)] group-hover:text-[hsl(var(--violet))] inline-flex items-center gap-1">
                                                View <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </span>
                                        </div>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* About */}
            <section id="about" className="bg-[hsl(var(--ink))] text-[hsl(var(--background))] py-24 sm:py-32">
                <div className="mx-auto max-w-[72rem] px-5 sm:px-8 grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
                    <Reveal>
                        <div className="rounded-[1.5rem] overflow-hidden border-4 border-[hsl(var(--amber))] -rotate-2">
                            <img src="/farrukh-portrait.jpg" alt="Farrukh - Developer portrait in a coffee shop" className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--amber))] mb-5">02 — About</p>
                        <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-[-0.03em] mb-6">
                            I design it, then I <span className="font-serif-i italic font-normal">actually build it.</span>
                        </h2>
                        <p className="text-lg leading-relaxed text-[hsl(var(--background)/0.78)] mb-5">
                            I work across the whole stack of a product: the typography and the type-checking, the color palette and the cache layer. Most of my time goes to interfaces that need personality without sacrificing clarity — marketing sites, small tools, AI-assisted experiments.
                        </p>
                        <p className="text-lg leading-relaxed text-[hsl(var(--background)/0.78)]">
                            Everything I make is public. Read the code, fork it, break it, tell me what you would have done differently.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href="https://farrukh-khan.lovable.app/" target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--amber))] text-[hsl(var(--amber))] px-6 text-sm font-semibold hover:bg-[hsl(var(--amber)/0.15)] active:scale-[0.98] transition">
                                <Globe className="h-4 w-4" /> Lovable Profile <ArrowUpRight className="h-4 w-4" />
                            </a>
                            <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--amber))] text-black px-6 text-sm font-semibold active:scale-[0.98] hover:brightness-110 transition">
                                <Github className="h-4 w-4" /> Browse the repos
                            </a>
                            <a href="mailto:Farrukh.tuheed.khan@gmail.com" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--background)/0.35)] px-6 text-sm font-semibold hover:bg-[hsl(var(--background)/0.1)] active:scale-[0.98] transition">
                                <Mail className="h-4 w-4" /> Say hello
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Stack / process */}
            <section id="stack" className="mx-auto max-w-[72rem] px-5 sm:px-8 py-24 sm:py-32">
                <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.55)] mb-3">03 — How I work</p>
                <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-[-0.03em] mb-14 max-w-2xl">
                    Three habits behind every project.
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { icon: Sparkles, t: 'Start with the feeling', d: 'Before a single component, I decide what the page should make someone feel. Type, pace and color follow from that — not from a template.' },
                        { icon: Code2, t: 'Ship small, ship often', d: 'Tight commits, readable diffs, no six-month rewrites. Every repository you see here started as one scrappy afternoon.' },
                        { icon: Github, t: 'Work in the open', d: 'Public repos, honest READMEs, and issues left open when something is genuinely unfinished. It keeps the craft honest.' },
                    ].map((s, i) => (
                        <Reveal key={s.t} delay={i * 0.08}>
                            <div className="border-t-2 border-[hsl(var(--ink))] pt-6">
                                <s.icon className="h-6 w-6 mb-4" style={{ color: accent(i) }} strokeWidth={1.8} />
                                <h3 className="font-display text-xl font-bold mb-3 tracking-tight">{s.t}</h3>
                                <p className="text-[hsl(var(--ink)/0.7)] leading-relaxed">{s.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.12}>
                    <div className="mt-20 rounded-[1.75rem] overflow-hidden border-2 border-[hsl(var(--ink))]">
                        <img src="https://images.hostinger.com/62f1d392-7c0a-4b8c-adcd-089ea4a7d96d.png" alt="Developer workspace with code on screen and UI sketches" className="w-full h-[18rem] sm:h-[26rem] object-cover" />
                    </div>
                </Reveal>
            </section>

            {/* Footer CTA */}
            <footer className="border-t-2 border-[hsl(var(--ink))] bg-[hsl(var(--paper))]">
                <div className="mx-auto max-w-[90rem] px-5 sm:px-8 py-16">
                    <h2 className="font-display font-extrabold text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-[-0.035em] mb-8">
                        Got something <span className="font-serif-i italic font-normal">worth building?</span>
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-14">
                        <a href="https://farrukh-khan.lovable.app/" target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--amber))] text-black px-6 text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition">
                            <Globe className="h-4 w-4" /> Lovable Profile <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <a href="mailto:Farrukh.tuheed.khan@gmail.com" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold hover:bg-[hsl(var(--violet))] active:scale-[0.98] transition">
                            <Mail className="h-4 w-4" /> Farrukh.tuheed.khan@gmail.com
                        </a>
                        <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.3)] px-6 text-sm font-semibold hover:bg-[hsl(var(--ink)/0.06)] active:scale-[0.98] transition">
                            <Github className="h-4 w-4" /> {GH_LABEL}
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--ink)/0.2)] pt-6 font-mono-c text-xs text-[hsl(var(--ink)/0.6)]">
                        <span>Farrukh — developer & designer portfolio</span>
                        <span>© {new Date().getFullYear()} — built from scratch, no template</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
