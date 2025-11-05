'use client';
import React from 'react';
import type {MouseEvent, ReactNode} from 'react';
import {ShyWordmark} from './ShyLogo';
import FeaturedLocationsCarousel, {
  type LocationCard,
} from './FeaturedLocationsCarousel';

// Helper Components
function StatCard({number, label}: {number: string; label: string}) {
  return (
    <div className="text-center space-y-2 group">
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="text-sm md:text-base text-white/60 font-medium">
        {label}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
      <div className="relative card p-8 h-full hover:bg-white/10 transition-all">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-300 ring-1 ring-yellow-400/30 mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-white/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Icon Components
function MapIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

export default function ShyLandingPage() {
  const [mousePosition, setMousePosition] = React.useState({x: 0, y: 0});
  const [isMouseMoving, setIsMouseMoving] = React.useState(false);
  const mouseMoveTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Smooth interpolation for drag effect
      setMousePosition(prev => ({
        x: prev.x + (e.clientX - prev.x) * 0.15,
        y: prev.y + (e.clientY - prev.y) * 0.15,
      }));
      setIsMouseMoving(true);
      
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
      
      mouseMoveTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Request animation frame for smooth updates
    let animationId: number;
    const updatePosition = () => {
      animationId = requestAnimationFrame(updatePosition);
    };
    updatePosition();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  const trackStoreClick = (platform: 'ios' | 'android') => {
    try {
      const g = (window as any).gtag as undefined | ((...args: any[]) => void);
      if (!g) {
        return;
      }
      g('event', 'store_badge_click', {
        platform,
        position: 'hero',
        page_location: window.location.href,
        page_title: document.title,
      });
      const AW_ID = process.env.NEXT_PUBLIC_AW_ID;
      const IOS_LABEL = (window as any).SHY_ADS_IOS_LABEL;
      const ANDROID_LABEL = (window as any).SHY_ADS_ANDROID_LABEL;
      if (AW_ID && platform === 'ios' && IOS_LABEL) {
        g('event', 'conversion', {send_to: `${AW_ID}/${IOS_LABEL}`});
      }
      if (AW_ID && platform === 'android' && ANDROID_LABEL) {
        g('event', 'conversion', {send_to: `${AW_ID}/${ANDROID_LABEL}`});
      }
    } catch {}
  };

  const navLinks = [
    {label: 'Product', href: '#product'},
    {label: 'Locations', href: '#locations'},
    {label: 'Pricing', href: '#pricing'},
    {label: 'Security', href: '#security'},
    {label: 'FAQs', href: '#faqs'},
    {label: 'Contact', href: '#contact'},
  ];

  const handleDeepLink = (
    event: MouseEvent<HTMLAnchorElement>,
    deepLink: string,
    fallback: string,
  ) => {
    event.preventDefault();
    const timeout = window.setTimeout(
      () => window.location.assign(fallback),
      800,
    );
    window.location.assign(deepLink);
    window.addEventListener('pagehide', () => window.clearTimeout(timeout), {
      once: true,
    });
  };

  const featuredLocations: LocationCard[] = [
    {
      id: 'coffee-corner',
      name: 'Coffee Corner',
      city: 'New York, NY',
      status: 'Active now - 8 nearby',
      deepLink: 'shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1',
      fallbackHref: '/download',
      image: '/images/locations/coffee-corner.jpg',
      alt: 'Guests meeting at Coffee Corner in New York',
    },
    {
      id: 'midtown-library',
      name: 'Midtown Library',
      city: 'New York, NY',
      status: 'Quiet zone - 12 nearby',
      deepLink: 'shy://location/3c07a2dd-a781-4e70-816a-36b28479ba11',
      fallbackHref: '/download',
      image: '/images/locations/library-lounge.jpg',
      alt: 'Reading tables inside the Midtown Library Shy Location',
    },
    {
      id: 'city-park',
      name: 'City Park',
      city: 'New York, NY',
      status: 'Sunset session - 5 nearby',
      deepLink: 'shy://location/e93720fe-ecd1-4bc3-8025-ca456c7a67e9',
      fallbackHref: '/download',
      image: '/images/locations/city-park.jpg',
      alt: 'People relaxing within the City Park Shy geofence',
    },
    {
      id: 'book-nook',
      name: 'Book Nook',
      city: 'New York, NY',
      status: 'Premium tier - 15 nearby',
      deepLink: 'shy://location/82508c38-09bc-42ed-a7ab-81825441fd72',
      fallbackHref: '/download',
      image: '/images/locations/book-nook.jpg',
      alt: 'Shy members browsing shelves at Book Nook',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased relative">
      {/* Global animated background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" 
          style={{
            opacity: 0.35
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Wide gradient glow - auto gliding when stationary */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent transition-all duration-1000 ease-in-out ${isMouseMoving ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundSize: '200% 100%',
            animation: 'slide-auto 16s ease-in-out infinite',
          }}
        />
        
        {/* Wider mouse-following glow with drag trail */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isMouseMoving ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(ellipse 1800px 1400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.06) 0%, rgba(251,191,36,0.025) 40%, transparent 70%)`,
            transition: 'background 0.3s ease-out',
          }}
        />
      </div>
      {/* Particle Color Morph Animation */}
      <div className="particles-container z-[1]">
        {Array.from({length: 10}, (_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <header className="relative z-50 backdrop-blur-md bg-black/80 sticky top-0 border-b border-white/5">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <ShyWordmark />
          <div className="hidden items-center gap-8 md:flex text-sm font-medium text-white/80">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-yellow-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#download" className="btn">
              Download
            </a>
            <button className="md:hidden rounded-full border border-white/15 p-2 text-white/70 hover:text-yellow-300">
              <span className="sr-only">Open menu</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 overflow-hidden" id="product">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-16 md:grid-cols-1 md:pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              <span className="block">Connect with people nearby.</span>
              <span className="block text-yellow-300">
                Real interactions. Real locations.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-light text-white/75">
              Discover and chat with people within 50 meters at verified Shy Locations.
              Privacy-first design with intentional connections — no endless swiping, just real moments.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1"
                onClick={event =>
                  handleDeepLink(
                    event,
                    'shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1',
                    '/download',
                  )
                }
                className="btn">
                Open Coffee Corner
              </a>
              <div id="download" className="flex flex-wrap items-center gap-3">
                <StoreBadge
                  type="apple"
                  onClick={() => trackStoreClick('ios')}
                />
                <StoreBadge
                  type="google"
                  onClick={() => trackStoreClick('android')}
                />
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/60">
              <span>Live presence, Supabase backed.</span>
              <span>Cross-platform token sync.</span>
              <span>Privacy-first by design.</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / SOCIAL PROOF */}
      <section className="relative z-10 py-20 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCard number="50 m" label="Verified radius per lobby" />
            <StatCard number="1 token" label="Required for chat invites" />
            <StatCard number="0 leaks" label="Personal data shared" />
            <StatCard number="45+" label="Cities with Shy Locations" />
          </div>
        </div>
      </section>

      {/* FEATURES SHOWCASE */}
      <section className="relative z-10 py-32" id="features">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Features that <span className="text-yellow-300">empower you</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to connect authentically while maintaining
              your privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MapIcon />}
              title="Verified Shy Locations"
              description="Supabase policies enforce our 50 m radius so only people physically inside the same Shy Location appear in your lobby feed."
            />
            <FeatureCard
              icon={<ChatIcon />}
              title="Lobby-first discovery"
              description="Tokens and proximity keep introductions intentional - send a request when you're ready to talk, not before."
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Privacy native messaging"
              description="One-to-one chats stay encrypted and tied to token usage so you always know who initiated and when."
            />
            <FeatureCard
              icon={<GlobeIcon />}
              title="Cross-platform parity"
              description="Mobile, web, and admin pull from the same Supabase tables - profiles, tokens, and map glow stay synchronized."
            />
            <FeatureCard
              icon={<BellIcon />}
              title="Realtime enter + leave"
              description="Presence updates fire instantly when someone joins or leaves your location so you never miss a moment."
            />
            <FeatureCard
              icon={<StarIcon />}
              title="Unlimited tier perks"
              description="Upgrade for unlimited tokens, priority support, and exclusive Shy Locations curated for top members."
            />
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section
        className="relative z-10 py-32 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent"
        id="locations">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Explore active Shy Locations
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Every lobby is geofenced to 50 meters. Open the app to step into
              the rooms closest to you.
            </p>
          </div>
          <FeaturedLocationsCarousel items={featuredLocations} />
        </div>
      </section>

      {/* TOKEN SYSTEM */}
      <section
        className="relative z-10 py-20 border-t border-white/10"
        id="pricing">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Token System</h2>
              <p className="max-w-2xl text-white/70 font-normal">
                TokenManager and our Supabase functions sync deductions across
                every platform. Free members receive{' '}
                <span className="font-semibold text-white">10 Shy tokens</span>{' '}
                each month for new chats; the unlimited tier removes the cap
                entirely.
              </p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
              <Card>
                <h3 className="text-lg font-semibold">Standard</h3>
                <div className="mt-3 text-4xl font-black tracking-tight">
                  10
                  <span className="ml-2 text-lg font-semibold text-white/70">
                    tokens
                  </span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                  <Dot /> Resets monthly
                </div>
              </Card>
              <Card className="border-yellow-500/40 bg-gradient-to-b from-yellow-500/10 to-transparent">
                <h3 className="text-lg font-semibold text-yellow-300">
                  Premium
                </h3>
                <div className="mt-3 text-4xl font-black tracking-tight text-yellow-300">
                  $7.99
                  <span className="ml-2 text-lg font-semibold text-yellow-200/80">
                    /month
                  </span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-sm text-yellow-100">
                  <Dot color="currentColor" /> Unlimited tokens
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative z-10 px-6 py-16" id="security">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="flex items-center gap-3 text-2xl font-semibold">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/15 text-yellow-300 ring-1 ring-inset ring-yellow-400/30">
                  <LockIcon />
                </span>
                Security
              </h3>
              <p className="mt-3 max-w-2xl text-white/70">
                Enjoy end-to-end encryption to keep your chats secure. We pair
                industry best practices with ephemeral lobby conversations that
                vanish when the group closes.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <div className="relative h-28 w-28 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-300/5 ring-1 ring-yellow-400/30">
                <div className="absolute inset-0 m-auto h-12 w-12 text-yellow-300 opacity-90">
                  <LockIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative z-10 border-t border-white/10 py-16"
        id="faqs">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold tracking-tight">
                Frequently asked questions
              </h3>
              <p className="mt-3 text-sm text-white/60">
                The essentials on tokens, locations, and privacy so your team
                can launch with confidence.
              </p>
            </div>
            <dl className="space-y-6 text-sm text-white/70">
              <div>
                <dt className="font-semibold text-white">
                  How do Shy tokens work?
                </dt>
                <dd className="mt-2">
                  Every new chat request costs a single token unless your
                  account holds the unlimited tier. Deductions run through
                  TokenManager and the same Supabase functions used in
                  production.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">
                  What defines a Shy Location?
                </dt>
                <dd className="mt-2">
                  Locations are geofenced to 50 meters. Users are only listed in
                  the lobby if Supabase confirms their device is inside that
                  radius via{' '}
                  <code className="text-xs text-yellow-300">
                    ensure_active_location
                  </code>
                  .
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">
                  Can people see my identity?
                </dt>
                <dd className="mt-2">
                  No. Profiles only surface the fields you share. Private chats
                  are encrypted and lobbies disappear as soon as the group
                  closes.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="relative z-10 border-t border-white/10 py-16"
        id="contact">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
            <h3 className="text-3xl font-bold tracking-tight">
              Need help launching a new location?
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Our team can provision Shy Locations, seed lobbies, and monitor
              token usage for special events. Drop us a line and we&rsquo;ll
              coordinate access within one business day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:hello@shyapp.com" className="btn">
                Email support
              </a>
              <a
                href="https://web-oisjx0yop-shy-app.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-yellow-400/60">
                Open web app
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-3">
              <ShyWordmark />
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Shy Inc. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm font-normal text-white/70 md:col-span-2 md:grid-cols-4">
              <FooterCol
                title="Home"
                links={['Security', 'Features', 'FAQs']}
              />
              <FooterCol
                title="Shy Map"
                links={['Heat Map', 'Lobbies', 'Proximity']}
              />
              <FooterCol
                title="Company"
                links={['Pricing', 'Careers', 'Contact']}
              />
              <div className="space-y-3">
                <div className="font-semibold text-white">Follow</div>
                <div className="flex items-center gap-3">
                  <SocialIcon name="twitter" />
                  <SocialIcon name="instagram" />
                  <SocialIcon name="github" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Dot({color = '#A1A1AA'}: {color?: string}) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-full w-full"
      fill="currentColor">
      <path d="M7 10V8a5 5 0 1 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h6V8a3 3 0 1 0-6 0v2z" />
    </svg>
  );
}

function StoreBadge({
  type,
  onClick,
}: {
  type: 'apple' | 'google';
  onClick?: () => void;
}) {
  if (type === 'apple') {
    return (
      <a
        id="btn-appstore"
        onClick={onClick}
        href="https://apps.apple.com/us/app/shy/id6444877711?itscg=30200&itsct=apps_box_link&mttnsubad=6444877711"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="inline-block transition-opacity hover:opacity-80">
        <img 
          src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1672358400" 
          alt="Download on the App Store" 
          className="h-[50px] w-[168px] object-contain"
        />
      </a>
    );
  }
  return (
    <a
      id="btn-googleplay"
      onClick={onClick}
      href="https://play.google.com/store/apps/details?id=com.shyapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className="inline-block transition-opacity hover:opacity-80">
      <img 
        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" 
        alt="Get it on Google Play" 
        className="h-[60px] w-[168px] object-cover"
      />
    </a>
  );
}

function FooterCol({title, links}: {title: string; links: string[]}) {
  return (
    <div>
      <div className="font-semibold text-white">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map(l => (
          <li key={l}>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({name}: {name: 'twitter' | 'instagram' | 'github'}) {
  const paths: Record<string, string> = {
    twitter:
      'M23 4.72c-.8.35-1.66.6-2.56.71a4.48 4.48 0 0 0 1.96-2.47 8.98 8.98 0 0 1-2.83 1.08A4.48 4.48 0 0 0 12.2 7.9c0 .35.04.7.12 1.02A12.73 12.73 0 0 1 3.15 3.6a4.47 4.47 0 0 0-.61 2.26 4.48 4.48 0 0 0 1.99 3.73a4.43 4.43 0 0 1-2.03-.56v.06c0 2.2 1.56 4.03 3.63 4.45-.38.1-.78.16-1.2.16-.29 0-.57-.03-.85-.08.57 1.79 2.25 3.1 4.24 3.14A8.98 8.98 0 0 1 2 19.54a12.66 12.66 0 0 0 6.86 2.01c8.24 0 12.75-6.83 12.75-12.75v-.58A9.1 9.1 0 0 0 23 4.72z',
    instagram:
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm7.25-.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 19.25 6.75z',
    github:
      'M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.35 1.12 2.93.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.38-2.05 1.02-2.78-.11-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.06a9.2 9.2 0 0 1 5 0c1.9-1.33 2.74-1.06 2.74-1.06.55 1.42.21 2.47.1 2.73.64.73 1.02 1.65 1.02 2.78 0 4-2.35 4.85-4.58 5.1.36.32.69.93.69 1.88 0 1.36-.01 2.46-.01 2.79 0 .27.18.6.69.49A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z',
  };
  return (
    <a
      href="#"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-yellow-300">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d={paths[name]} />
      </svg>
    </a>
  );
}
