'use client';
import React, {useEffect, useState} from 'react';
import type {MouseEvent} from 'react';

export default function ShyHero() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (locked) {
      document.body.classList.add('overflow-hidden', 'h-screen');
    } else {
      document.body.classList.remove('overflow-hidden', 'h-screen');
    }
    return () => document.body.classList.remove('overflow-hidden', 'h-screen');
  }, [locked]);

  return (
    <section className="relative isolate flex min-h-screen items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_15%_-10%,rgba(255,208,0,0.18),transparent),radial-gradient(900px_480px_at_90%_30%,rgba(255,208,0,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      <div className="mx-auto grid w-[min(1200px,94%)] grid-cols-1 gap-8 px-2 md:grid-cols-2 md:items-center">
        {/* Left stack */}
        <div className="pt-28 md:pt-36">
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Meet the people already here.
          </h1>
          <p className="mt-4 text-lg text-zinc-200 md:text-xl">
            Every Shy lobby stays within a verified 50 m radius.
          </p>

          {/* Featured pill */}
          <div className="mt-6 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Featured Shy Location
                </p>
                <p className="mt-1 text-base font-semibold">Coffee Corner</p>
                <p className="text-sm text-zinc-300">New York, NY</p>
                <p className="mt-2 text-sm text-yellow-300">
                  Active now • 8 nearby users
                </p>
              </div>
              <a
                href="shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1"
                onClick={e =>
                  openDeepLink(
                    e,
                    'shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1',
                    '/download',
                  )
                }
                className="rounded-xl bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400">
                Open Coffee Corner
              </a>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-sm text-zinc-300">
            Shy verifies every visitor in the lobby before they appear in the
            feed. Tokens keep chat requests intentional - one per invite unless
            you&apos;re on the unlimited tier.
          </p>
        </div>

        {/* Right visual */}
        <div className="relative order-first h-[60vh] w-full md:order-none md:h-[70vh]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/40 animate-[spin_60s_linear_infinite] motion-reduce:animate-none" />
          <div className="absolute left-1/2 top-1/2 aspect-[9/19] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[38px] border border-white/15 bg-black/60 shadow-2xl ring-1 ring-white/10 md:w-[320px]">
            <div className="absolute inset-2 rounded-[32px] bg-gradient-to-b from-zinc-900 to-black p-6">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="text-2xl font-bold">Shy</div>
                <p className="text-zinc-300">Connect quietly. Live freely.</p>
                <div className="mt-2 grid w-full gap-2">
                  <button className="rounded-xl bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-300">
                    Create Account
                  </button>
                  <button className="rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20">
                    Sign In
                  </button>
                  <button className="text-sm text-zinc-300 underline/30 hover:underline">
                    Trouble signing in?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating lock control */}
      <div className="pointer-events-auto fixed bottom-6 right-6 z-50">
        {!locked ? (
          <button
            onClick={() => setLocked(true)}
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-lg backdrop-blur hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400"
            aria-pressed="false">
            Tap to lock
          </button>
        ) : (
          <button
            onClick={() => setLocked(false)}
            className="rounded-full border border-white/10 bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-lg hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-600"
            aria-pressed="true">
            Back to scroll
          </button>
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </section>
  );
}

function openDeepLink(
  event: MouseEvent<HTMLAnchorElement>,
  deep: string,
  fallback?: string,
) {
  event.preventDefault();
  const timeout = window.setTimeout(() => {
    if (fallback) {
      window.location.assign(fallback);
    }
  }, 800);
  window.location.assign(deep);
  window.addEventListener('pagehide', () => window.clearTimeout(timeout), {
    once: true,
  });
}
