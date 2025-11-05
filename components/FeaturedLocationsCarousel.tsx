'use client';

import Image from 'next/image';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {MouseEvent} from 'react';

export type LocationCard = {
  id: string;
  name: string;
  city: string;
  status: string;
  deepLink: string;
  fallbackHref?: string;
  image: string;
  alt: string;
};

export default function FeaturedLocationsCarousel({
  title = 'Featured Shy Locations',
  items,
}: {
  title?: string;
  items: LocationCard[];
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const prefersReducedMotion = useCallback(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true,
    [],
  );

  const scrollToIndex = useCallback(
    (target: number) => {
      const ul = listRef.current;
      if (!ul) {
        return;
      }
      const clamped = Math.max(0, Math.min(target, items.length - 1));
      const el = ul.children.item(clamped) as HTMLElement | null;
      if (!el) {
        return;
      }
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setIndex(clamped);
    },
    [items.length, prefersReducedMotion],
  );

  const prev = useCallback(() => {
    scrollToIndex(index - 1);
  }, [index, scrollToIndex]);

  const next = useCallback(() => {
    scrollToIndex(index + 1);
  }, [index, scrollToIndex]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      }
    };
    region.addEventListener('keydown', handleKey);
    return () => region.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  useEffect(() => {
    const ul = listRef.current;
    if (!ul || typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }
    const observer = new window.IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) {
          return;
        }
        const nextIndex = Array.from(ul.children).indexOf(
          visible.target as Element,
        );
        if (nextIndex >= 0) {
          setIndex(nextIndex);
        }
      },
      {root: ul, threshold: [0.6]},
    );
    Array.from(ul.children).forEach(li => observer.observe(li));
    return () => observer.disconnect();
  }, [items.length]);

  const scrollBehaviorClass = prefersReducedMotion() ? '' : 'scroll-smooth';

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      tabIndex={0}
      className="relative mx-auto max-w-6xl px-4 py-8 outline-none"
      id="locations">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={prev}
            aria-label="Previous location"
            disabled={index === 0}
            className="rounded-xl bg-white/10 px-3 py-2 hover:bg-white/20 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400">
            Prev
          </button>
          <button
            onClick={next}
            aria-label="Next location"
            disabled={index === items.length - 1}
            className="rounded-xl bg-white/10 px-3 py-2 hover:bg-white/20 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400">
            Next
          </button>
        </div>
      </div>

      <ul
        ref={listRef}
        role="listbox"
        aria-live="polite"
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] ${scrollBehaviorClass}`}>
        {items.map((loc, i) => (
          <li
            key={loc.id}
            role="option"
            aria-selected={i === index}
            className="min-w-[85%] snap-center md:min-w-[48%] lg:min-w-[32%]">
            <article className="group relative overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-white/10 shadow-lg">
              <Image
                src={loc.image}
                alt={loc.alt}
                width={1280}
                height={720}
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                sizes="(max-width:768px)85vw,(max-width:1024px)48vw,32vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-lg font-semibold">{loc.name}</h3>
                <p className="text-sm text-zinc-200">{loc.city}</p>
                <p className="mt-1 text-sm text-yellow-300">{loc.status}</p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={loc.deepLink}
                    onClick={event =>
                      handleDeepLink(event, loc.deepLink, loc.fallbackHref)
                    }
                    className="inline-flex items-center rounded-xl bg-yellow-400 px-3 py-2 font-medium text-black hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400"
                    aria-label={`Open ${loc.name} in Shy App`}>
                    Open in App
                  </a>
                  <a
                    href={loc.fallbackHref || '/download'}
                    className="inline-flex items-center rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400">
                    Download
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? 'bg-yellow-400' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function handleDeepLink(
  event: MouseEvent<HTMLAnchorElement>,
  deepLink: string,
  fallback?: string,
) {
  event.preventDefault();
  const timeout = window.setTimeout(() => {
    if (fallback) {
      window.location.assign(fallback);
    }
  }, 800);
  window.location.assign(deepLink);
  window.addEventListener('pagehide', () => window.clearTimeout(timeout), {
    once: true,
  });
}
