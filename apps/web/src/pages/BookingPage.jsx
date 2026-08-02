import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
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

const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];

const todayStr = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
};

const BookingPage = () => {
    const [form, setForm] = useState({ name: '', email: '', date: '', time: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            await pocketbaseClient.collection('bookings').create(form);
            setStatus('success');
            setForm({ name: '', email: '', date: '', time: '' });
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
                <title>Book a call — Farrukh</title>
                <meta name="description" content="Book a 30-minute call with Farrukh. Pick a date and a time slot that works for you." />
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
                    <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--violet))] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[hsl(var(--ink))] active:scale-[0.98] transition">
                        Contact <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </header>

            <section className="relative min-h-[100dvh] flex items-center pt-32 pb-16 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--amber)/0.7), transparent 65%)' }}
                />
                <div className="relative mx-auto w-full max-w-[72rem] px-5 sm:px-8 grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
                    <Reveal>
                        <p className="font-mono-c text-xs uppercase tracking-[0.25em] text-[hsl(var(--ink)/0.55)] mb-5">Booking</p>
                        <h1 className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-[clamp(2.5rem,7vw,5rem)] mb-6">
                            Grab <span className="font-serif-i italic font-normal">30 minutes.</span>
                        </h1>
                        <p className="text-lg leading-relaxed text-[hsl(var(--ink)/0.7)] mb-8">
                            A quick call to see if we are a fit. Pick a day, choose a slot, and I will confirm by email with the meeting link.
                        </p>
                        <div className="flex flex-col gap-3 font-mono-c text-xs text-[hsl(var(--ink)/0.6)]">
                            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Weekdays only</span>
                            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> 09:00 – 17:00, your local time</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="rounded-[1.75rem] border-2 border-[hsl(var(--ink))] bg-white p-7 sm:p-9 shadow-[10px_10px_0_hsl(var(--violet))]">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center text-center py-10">
                                    <CheckCircle2 className="h-12 w-12 text-[hsl(var(--violet))] mb-5" strokeWidth={1.8} />
                                    <h2 className="font-display text-2xl font-bold mb-2">Booking requested.</h2>
                                    <p className="text-[hsl(var(--ink)/0.7)] mb-6">I will confirm your slot by email shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold active:scale-[0.98] transition"
                                    >
                                        Book another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="b-name" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Name</label>
                                        <input
                                            id="b-name" type="text" required value={form.name} onChange={update('name')}
                                            placeholder="Your name" className={inputCls}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="b-email" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Email</label>
                                        <input
                                            id="b-email" type="email" required value={form.email} onChange={update('email')}
                                            placeholder="you@example.com" className={inputCls}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="b-date" className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Date</label>
                                        <input
                                            id="b-date" type="date" required min={todayStr()} value={form.date} onChange={update('date')}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono-c text-xs uppercase tracking-widest text-[hsl(var(--ink)/0.6)]">Time</span>
                                        <div className="grid grid-cols-4 gap-2">
                                            {timeSlots.map((t) => {
                                                const active = form.time === t;
                                                return (
                                                    <button
                                                        key={t} type="button"
                                                        onClick={() => setForm((f) => ({ ...f, time: t }))}
                                                        className={
                                                            'min-h-[44px] rounded-xl border-2 px-2 py-2 text-sm font-mono-c transition active:scale-[0.98] ' +
                                                            (active
                                                                ? 'border-[hsl(var(--violet))] bg-[hsl(var(--violet))] text-white'
                                                                : 'border-[hsl(var(--ink)/0.2)] hover:border-[hsl(var(--ink)/0.5)] hover:bg-[hsl(var(--ink)/0.04)]')
                                                        }
                                                    >
                                                        {t}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <input type="hidden" name="time" value={form.time} required />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-start gap-2 rounded-xl border-2 border-[hsl(var(--destructive)/0.4)] bg-[hsl(var(--destructive)/0.08)] px-4 py-3 text-sm text-[hsl(var(--destructive))]">
                                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit" disabled={status === 'submitting' || !form.time}
                                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--background))] px-6 text-sm font-semibold hover:bg-[hsl(var(--violet))] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Requesting…' : (<>Request booking <Calendar className="h-4 w-4" /></>)}
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

export default BookingPage;
