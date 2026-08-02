import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star, GitFork, Mail, Code2, Sparkles, RefreshCw } from 'lucide-react';

const GH_USER = 'sotified-ai';
const GH_LABEL = "Farrukh's Github";

const marqueeWords = ['React', 'TypeScript', 'Design Systems', 'Tailwind', 'Node', 'Motion', 'Prototyping', 'AI Tooling', 'Interfaces'];

const fallbackRepos = [
    { id: 'f1', name: 'Farrukh-ai', description: 'Profile and experiments in AI-assisted product building.', html_url: `https://github.com/${GH_USER}`, language: 'JavaScript', stargazers_count: 0, forks_count: 0, topics: [] },
];

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
    const [repos, setRepos] = useState([]);
    const [status, setStatus] = useState('loading');

    const load = React.useCallback(() => {
        setStatus('loading');
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('gh'))))
            .then((data) => {
                const clean = (Array.isArray(data) ? data : [])
                    .filter((r) => !r.fork)
                    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at));
                setRepos(clean);
                setStatus('ok');
            })
            .catch(() => {
                setRepos(fallbackRepos);
                setStatus('error');
            });
    }, []);

    useEffect(() => { load(); }, [load]);

    const featured = repos.slice(0, 3);
    const rest = repos.slice(3, 12);

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
                    <a
                        href={`https://github.com/${GH_USER}`}
                        target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--violet))] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[hsl(var(--ink))] active:scale-[0.98] transition"
                    >
                        <Github className="h-4 w-4" strokeWidth={2} /> {GH_LABEL}
                    </a>
                </div>
            </header>

            {/* Hero */}
            <section id="top" className="relative min-h-[100dvh] flex items-end overflow-hidden pt-28 pb-12">
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

            {/* Work */}
            <section id="work" className="mx-auto max-w-[90rem] px-5 sm:px-8 py-24 sm:py-32">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.55)] mb-3">01 — Featured projects</p>
                        <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                            Shipped, live, <span className="font-serif-i italic font-normal">and open source.</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-[hsl(var(--ink)/0.7)] leading-relaxed">
                        Pulled live from GitHub — so what you see here is what I pushed most recently.
                    </p>
                </div>

                {status === 'loading' && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-72 rounded-[1.5rem] border-2 border-[hsl(var(--ink)/0.12)] bg-[hsl(var(--paper))] animate-pulse" />
                        ))}
                    </div>
                )}

                {status !== 'loading' && repos.length === 0 && (
                    <div className="rounded-[1.5rem] border-2 border-dashed border-[hsl(var(--ink)/0.25)] p-12 text-center">
                        <p className="font-display text-xl font-semibold mb-2">No public repositories yet.</p>
                        <p className="text-[hsl(var(--ink)/0.65)]">New work lands here the moment it is pushed.</p>
                    </div>
                )}

                {status !== 'loading' && repos.length > 0 && (
                    <>
                        {status === 'error' && (
                            <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border-2 border-[hsl(var(--ink))] bg-[hsl(var(--paper))] px-5 py-4">
                                <span className="text-sm">GitHub is not responding right now — showing a short version.</span>
                                <button onClick={load} className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-4 py-2 text-xs font-semibold active:scale-[0.98] transition">
                                    <RefreshCw className="h-3.5 w-3.5" /> Retry
                                </button>
                            </div>
                        )}

                        <div className="grid lg:grid-cols-3 gap-6">
                            {featured.map((r, i) => (
                                <Reveal key={r.id} delay={i * 0.07}>
                                    <a
                                        href={r.html_url} target="_blank" rel="noreferrer"
                                        className="group flex h-full flex-col justify-between rounded-[1.5rem] border-2 border-[hsl(var(--ink))] bg-white p-7 transition-transform duration-300 hover:-translate-y-1.5"
                                        style={{ boxShadow: `8px 8px 0 ${accent(i)}` }}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="font-mono-c text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ background: accent(i) }}>
                                                    {r.language || 'Code'}
                                                </span>
                                                <ArrowUpRight className="h-5 w-5 opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                                            </div>
                                            <h3 className="font-display text-2xl font-bold tracking-tight break-words mb-3">{r.name}</h3>
                                            <p className="text-[hsl(var(--ink)/0.7)] leading-relaxed">
                                                {r.description || 'An in-progress build — code and notes live in the repository.'}
                                            </p>
                                        </div>
                                        <div className="mt-8 flex items-center gap-5 font-mono-c text-xs text-[hsl(var(--ink)/0.6)]">
                                            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {r.stargazers_count}</span>
                                            <span className="inline-flex items-center gap-1.5"><GitFork className="h-3.5 w-3.5" /> {r.forks_count}</span>
                                        </div>
                                    </a>
                                </Reveal>
                            ))}
                        </div>

                        {rest.length > 0 && (
                            <div className="mt-16 border-t-2 border-[hsl(var(--ink))] divide-y divide-[hsl(var(--ink)/0.15)]">
                                {rest.map((r, i) => (
                                    <Reveal key={r.id} delay={Math.min(i * 0.04, 0.2)}>
                                        <a href={r.html_url} target="_blank" rel="noreferrer" className="group grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] items-baseline gap-2 sm:gap-8 py-5 hover:bg-[hsl(var(--ink)/0.04)] px-2 -mx-2 transition-colors">
                                            <span className="font-display text-lg font-semibold tracking-tight break-words">{r.name}</span>
                                            <span className="text-sm text-[hsl(var(--ink)/0.65)] line-clamp-2">{r.description || '—'}</span>
                                            <span className="font-mono-c text-xs text-[hsl(var(--ink)/0.55)] inline-flex items-center gap-2">
                                                {r.language || 'repo'} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </span>
                                        </a>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* About */}
            <section id="about" className="bg-[hsl(var(--ink))] text-[hsl(var(--background))] py-24 sm:py-32">
                <div className="mx-auto max-w-[72rem] px-5 sm:px-8 grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
                    <Reveal>
                        <div className="rounded-[1.5rem] overflow-hidden border-4 border-[hsl(var(--amber))] -rotate-2">
                            <img src="https://images.hostinger.com/0918cfa1-49fc-4c89-8f96-43c406347828.png" alt="Portrait of the developer working in a coffee shop" className="w-full h-full object-cover" />
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
                        <a href="mailto:Farrukh.tuheed.khan@gmail.com" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold hover:bg-[hsl(var(--violet))] active:scale-[0.98] transition">
                            <Mail className="h-4 w-4" /> Farrukh.tuheed.khan@gmail.com
                        </a>
                        <a href="/contact" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.3)] px-6 text-sm font-semibold hover:bg-[hsl(var(--ink)/0.06)] active:scale-[0.98] transition">
                            <Mail className="h-4 w-4" /> Contact form
                        </a>
                        <a href="/booking" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--amber))] text-black px-6 text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition">
                            Book a call
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
