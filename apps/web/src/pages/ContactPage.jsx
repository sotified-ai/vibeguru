import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import pocketbaseClient from '@/lib/pocketbaseClient';

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

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [error, setError] = useState('');

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            await pocketbaseClient.collection('contact_submissions').create(form);
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setError(err?.message || 'Something went wrong. Please try again.');
        }
    };

    const inputCls =
        'w-full rounded-2xl border-2 border-[hsl(var(--ink)/0.2)] bg-white px-4 py-3 text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink)/0.4)] focus:border-[hsl(var(--violet))] focus:outline-none transition-colors';

    return (
        <div className="grain min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--ink))] selection:bg-[hsl(var(--amber))] selection:text-black">
            <Helmet>
                <title>Contact — Farrukh</title>
                <meta name="description" content="Send a message to Farrukh. Tell me what you are building and I will get back to you." />
            </Helmet>

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-[90rem] px-5 sm:px-8 py-4 flex items-center justify-between">
                    <a href="/" className="font-mono-c text-sm tracking-tight bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-3 py-2 rounded-full">
                        Farrukh<span className="text-[hsl(var(--amber))]">.vibing</span>
                    </a>
                    <nav className="hidden sm:flex items-center gap-1 rounded-full border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--background)/0.7)] backdrop-blur px-2 py-1.5">
                        {[['Home', '/'], ['Work', '/#work'], ['About', '/#about']].map(([l, h]) => (
                            <a key={l} href={h} className="px-3 py-1.5 text-sm rounded-full hover:bg-[hsl(var(--ink)/0.07)] transition-colors">{l}</a>
                        ))}
                    </nav>
                    <a href="/booking" className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--violet))] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[hsl(var(--ink))] active:scale-[0.98] transition">
                        Book a call <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </header>

            <section className="relative min-h-[100dvh] flex items-center pt-32 pb-16 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle at 60% 40%, hsl(var(--violet)/0.6), transparent 65%)' }}
                />
                <div className="relative mx-auto w-full max-w-[72rem] px-5 sm:px-8 grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
                    <Reveal>
                        <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.55)] mb-5">Contact</p>
                        <h1 className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-[clamp(2.5rem,7vw,5rem)] mb-6">
                            Let's talk about <span className="font-serif-i italic font-normal">the build.</span>
                        </h1>
                        <p className="text-lg leading-relaxed text-[hsl(var(--ink)/0.7)] mb-8">
                            Working on something that needs a designer who codes — or a developer with taste? Drop the details below and I will reply within a day or two.
                        </p>
                        <a href="mailto:hello@Farrukh.vibing" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.25)] px-6 text-sm font-semibold hover:bg-[hsl(var(--ink)/0.06)] active:scale-[0.98] transition">
                            <Mail className="h-4 w-4" /> hello@Farrukh.vibing
                        </a>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="rounded-[1.75rem] border-2 border-[hsl(var(--ink))] bg-white p-7 sm:p-9 shadow-[10px_10px_0_hsl(var(--amber))]">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center text-center py-10">
                                    <CheckCircle2 className="h-12 w-12 text-[hsl(var(--violet))] mb-5" strokeWidth={1.8} />
                                    <h2 className="font-display text-2xl font-bold mb-2">Message sent.</h2>
                                    <p className="text-[hsl(var(--ink)/0.7)] mb-6">Thanks for reaching out — I will get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold active:scale-[0.98] transition"
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Name</label>
                                        <input
                                            id="name" type="text" required value={form.name} onChange={update('name')}
                                            placeholder="Your name" className={inputCls}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Email</label>
                                        <input
                                            id="email" type="email" required value={form.email} onChange={update('email')}
                                            placeholder="you@example.com" className={inputCls}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="message" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Message</label>
                                        <textarea
                                            id="message" required rows={5} value={form.message} onChange={update('message')}
                                            placeholder="What are you building?" className={inputCls + ' resize-none'}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-start gap-2 rounded-xl border-2 border-[hsl(var(--destructive)/0.4)] bg-[hsl(var(--destructive)/0.08)] px-4 py-3 text-sm text-[hsl(var(--destructive))]">
                                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit" disabled={status === 'submitting'}
                                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold hover:bg-[hsl(var(--violet))] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Sending…' : (<>Send message <Send className="h-4 w-4" /></>)}
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
