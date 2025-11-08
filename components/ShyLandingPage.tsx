'use client';
import React from 'react';
import type {MouseEvent, ReactNode} from 'react';
import {ShyWordmark} from './ShyLogo';
import FeaturedLocationsCarousel, {
  type LocationCard,
} from './FeaturedLocationsCarousel';
import ShyMapEmbed from './ShyMapEmbed';
import MobileMenu from './MobileMenu';

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
      <div className="relative card p-5 sm:p-6 md:p-8 h-full hover:bg-white/10 transition-all">
        <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-300 ring-1 ring-yellow-400/30 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed">{description}</p>
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
    {label: 'Shy Locations', href: '#locations'},
    {label: 'Tokens', href: '#pricing'},
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
      alt: 'People relaxing at City Park Shy Location',
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
            <a href="#download" className="btn hidden md:inline-flex">
              Download
            </a>
            <MobileMenu navLinks={navLinks} />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 overflow-hidden" id="product">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-40 md:pt-32">
          <div className="max-w-3xl mx-auto text-center relative">
            {/* New Update Badge - Overlaying top of Meet word */}
            <div className="absolute -top-8 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 z-20 w-32 sm:w-40 md:w-48 lg:w-56 animate-bounce-slow">
              <img 
                src="/images/newUpdate.png" 
                alt="New Update" 
                className="w-full h-auto drop-shadow-2xl"
                style={{
                  filter: 'brightness(1.2) saturate(1.3) hue-rotate(-10deg)',
                }}
              />
            </div>
            
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl relative z-10">
              <span className="block">Meet people nearby.</span>
              <span className="block text-yellow-300 mt-2">
                Keep the connections that matter.
              </span>
            </h1>
            <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-white/75 leading-relaxed px-2">
              Discover people at verified Shy Locations near you. Send a chat request for 1 token. 
              Once accepted, your connection is permanent — rename contacts, message anytime, build lasting relationships.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1"
                onClick={event =>
                  handleDeepLink(
                    event,
                    'shy://location/e8a88b99-6f07-411f-b402-95bb4f0ca7f1',
                    '/download',
                  )
                }
                className="btn w-full sm:w-auto min-h-[44px]">
                Quick Tutorial
              </a>
              <div id="download" className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
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
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-white/60 px-4">
              <span>See who's nearby in real-time</span>
              <span>Works on phone and web</span>
              <span>Your privacy is protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Detailed 6-Step Guide */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              How Shy Works
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Six simple steps to meet people nearby
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400/10 text-yellow-300 text-lg sm:text-xl font-black ring-2 ring-yellow-400/30">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Download Shy on iOS or Android</h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      Set up your profile in seconds. You can change your username, about me description and your photo at anytime.
                    <p className="text-white/70 leading-relaxed text-sm"></p>  
                        <span className="text-yellow-300">Make sure your about me description is accurate. No phone number, no pressure.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-300 text-xl font-black ring-2 ring-yellow-400/30">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Open the Shy Map</h3>
                    <p className="text-white/70 leading-relaxed mb-3 text-sm">
                      Explore live Shy Locations near you across your city, campus, or state.
                    </p>
                    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
                      <p className="text-yellow-200 text-sm">Don't see any? Request one, and we'll activate it within 12 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-300 text-xl font-black ring-2 ring-yellow-400/30">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Go to a Shy location & Browse the Lobby</h3>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">•</span>
                        <span>Open the Shy Lobby to see who's checked in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">•</span>
                        <span>See the list of users and About Me descriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">•</span>
                        <span>Send a chat request to start a convo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">•</span>
                        <span>Or create a group chat (only at live locations)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-300 text-xl font-black ring-2 ring-yellow-400/30">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Start Chatting & Stay Connected</h3>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">✓</span>
                        <span>Once connected, chat freely from anywhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">✓</span>
                        <span>Rename contacts, manage notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">✓</span>
                        <span>Just like your favorite messaging app but safer</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/20 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-300 text-xl font-black ring-2 ring-yellow-400/30">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Delete a Contact = Full Disconnect</h3>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">✗</span>
                        <span>Delete a contact, and the chat and contact disappears from both phones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-0.5">↻</span>
                        <span>Want to reconnect? You'll have to meet again at a Shy Location</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/30 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-br from-yellow-400/10 to-purple-500/5 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 hover:bg-yellow-400/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/20 text-yellow-300 text-xl font-black ring-2 ring-yellow-400/40">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-yellow-200">More Features Coming Soon</h3>
                    <p className="text-white/70 leading-relaxed text-sm mb-3">
                      We're just getting started, stay tuned for:
                    </p>
                    <ul className="space-y-1.5 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>Voice  Calling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>Shy Dating - Profile preferences, connection control, and deal breakers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>…and more on the way</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SHOWCASE */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 lg:py-40 border-y border-white/10" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Features That <span className="text-yellow-300">Empower You</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Everything you need to connect with confidence and keep full control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <FeatureCard
              icon={<MapIcon />}
              title="Verified Shy Locations"
              description="See and be seen only when you're physically present at the same place. No bots, no catfishing, just real people near you, right now."
            />
            <FeatureCard
              icon={<ChatIcon />}
              title="Real Connections"
              description="Send a chat request. If they accept? Boom — you're connected forever. Message anytime, rename contacts, and build something real."
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Mutal Contact Clear"
              description="Delete a contact, and the contact and conversation disappears from both devices instantly."
            />
            <FeatureCard
              icon={<GlobeIcon />}
              title="Works Wherever You Are"
              description="Start chatting at the venue, keep the convo going from anywhere. Phone, tablet, or desktop. Your Shy chats are always in sync."
            />
            <FeatureCard
              icon={<BellIcon />}
              title="See Who's Here, In Real Time"
              description="The moment someone new arrives at your Shy location, you'll know. Skip the awkward glances. Send a chat request discreetly."
            />
            <FeatureCard
              icon={<StarIcon />}
              title="Token Packs & Unlimited tokens (Shy Plus)"
              description="Subscribe to unlock: Unlimited tokens. Buy tokens packs that fit your social activity."
            />
          </div>
        </div>
      </section>

      {/* STATS / SOCIAL PROOF */}
      <section className="relative z-10 py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCard number="Real" label="People at your location" />
            <StatCard number="No Bots" label="No fake accounts" />
            <StatCard number="Secure" label="No personal data shared" />
            <StatCard number="23+" label="Cities with Shy Locations" />
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section
        className="relative z-10 py-32 md:py-40 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent"
        id="locations">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Explore active Shy Locations
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Real-time view of Shy Locations across the United States.
              This is the same map you'll use in the app. See where people are connecting.
            </p>
          </div>

          {/* Live Shy Map */}
          <ShyMapEmbed />

          {/* Featured Locations Carousel (below map) */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Featured <span className="text-yellow-300">Shy Locations</span>
            </h3>
            <FeaturedLocationsCarousel items={featuredLocations} />
          </div>
        </div>
      </section>

      {/* TOKEN SYSTEM */}
      <section
        className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32 border-t border-white/10"
        id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Token System</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Real connections, not random swipes.<br className="hidden sm:block" />
              <span className="block sm:inline"> Shy uses tokens to make every interaction intentional. No noise, No spam.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
                <div className="mb-6">
                  <div className="text-5xl font-black tracking-tight">10</div>
                  <div className="text-white/70 text-sm mt-2">tokens/month — refreshed every 30 days</div>
                </div>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Perfect for casual users</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>Tokens don't roll over, use them before they reset</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Packs */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-bold mb-4">Token Packs</h3>
                <div className="mb-6">
                  <div className="text-white/90 font-semibold">One-Time Purchase</div>
                  <div className="text-white/70 text-sm mt-2">Need more without going full premium?</div>
                </div>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Buy a token pack anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Perfect for casual users, first-time chatters, or travelers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shy Plus - Premium Plan */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/30 to-yellow-500/20 rounded-2xl opacity-100 group-hover:opacity-100 blur transition-opacity" />
              <div className="relative bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 h-full hover:bg-yellow-400/15 transition-all">
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-3 py-1 mb-4">
                  <span className="text-yellow-200 text-xs font-bold tracking-wide uppercase">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-200">Shy Plus — Subscription</h3>
                <div className="mb-6">
                  <div className="text-5xl font-black tracking-tight text-yellow-300">
                    $19.99
                    <span className="text-lg font-semibold text-yellow-200/80">/month</span>
                  </div>
                  <div className="text-yellow-200/90 font-semibold mt-3">Unlimited tokens</div>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Best for socially active users</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Frequent venue visitors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-0.5">✓</span>
                    <span>Community builders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative z-10 px-6 py-24 md:py-32" id="security">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-white/5 p-10 md:p-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="flex items-center gap-3 text-2xl md:text-3xl font-semibold">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/15 text-yellow-300 ring-1 ring-inset ring-yellow-400/30">
                  <LockIcon />
                </span>
                Security
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed">
                Your conversations are protected with end-to-end encryption. 
                Only you and the person you're chatting with can read your messages — 
                we can't see them, and neither can anyone else.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-300/5 ring-1 ring-yellow-400/30">
                <div className="absolute inset-0 m-auto h-14 w-14 text-yellow-300 opacity-90">
                  <LockIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative z-10 border-t border-white/10 py-24 md:py-32"
        id="faqs">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                Frequently asked questions
              </h3>
              <p className="mt-4 text-base text-white/60">
                The essentials on tokens, locations, and privacy so your team
                can launch with confidence.
              </p>
            </div>
            <dl className="space-y-8 text-base text-white/70">
              <div>
                <dt className="font-semibold text-white text-lg">
                  How do tokens work?
                </dt>
                <dd className="mt-3 leading-relaxed">
                  You get 10 free tokens every month. Each new connection request costs 1 token. 
                  Once someone accepts, that connection is permanent — you can message them 
                  anytime for free. Upgrade to premium for unlimited connection requests.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white text-lg">
                  What is a Shy Location?
                </dt>
                <dd className="mt-3 leading-relaxed">
                  Shy Locations are real places like coffee shops, libraries, or gyms. 
                  When you're at one, you can see and connect with other people there. 
                  Think of it as meeting someone in person, but your phone helps break the ice.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white text-lg">
                  Do connections disappear when I leave?
                </dt>
                <dd className="mt-3 leading-relaxed">
                  No! The lobby feed shows who's currently at your location, but accepted 
                  connections become permanent contacts. Rename them, message anytime — 
                  your relationships last beyond the location.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="relative z-10 border-t border-white/10 py-24 md:py-32"
        id="contact">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 md:p-14">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              Don't have a Shy Location near you?
            </h3>
            <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
              Submit a request for a new location in your area and we'll make it happen. 
              Whether it's your favorite coffee shop, gym, or coworking space — we'll work 
              with them to bring Shy to your neighborhood.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:hello@shyapp.com?subject=Request%20New%20Shy%20Location" className="btn">
                Submit location request
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
      <footer className="relative z-10 border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <ShyWordmark />
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Shy Inc. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm font-normal text-white/70 md:col-span-2 md:grid-cols-4">
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
                  <SocialIcon name="tiktok" href="https://www.tiktok.com/@shyapp" />
                  <SocialIcon name="instagram" href="https://www.instagram.com/shyapp" />
                  <SocialIcon name="facebook" href="https://www.facebook.com/shyapp" />
                  <SocialIcon name="linkedin" href="https://www.linkedin.com/company/shyapp" />
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
        className="h-[70px] w-[168px] object-cover"
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

function SocialIcon({name, href}: {name: 'tiktok' | 'instagram' | 'facebook' | 'linkedin'; href: string}) {
  const paths: Record<string, string> = {
    tiktok:
      'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
    instagram:
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm7.25-.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 19.25 6.75z',
    facebook:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    linkedin:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-yellow-300 hover:border-yellow-400/30 transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d={paths[name]} />
      </svg>
    </a>
  );
}
