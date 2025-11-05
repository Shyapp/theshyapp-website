import React from 'react';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E13]/90 via-[#0B0E13]/85 to-[#0B0E13]" />
        </div>
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Download Shy App
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Install the mobile app to join Shy Locations, send token-backed chat
            requests, and stay synced with the web dashboard.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              id="download-app-store"
              href="https://apps.apple.com/us/app/shy/id6444877711"
              target="_blank"
              rel="noopener noreferrer"
              className="group store-badge inline-flex items-center gap-3 rounded-[12px] bg-black px-4 py-3 text-white ring-1 ring-white/20 transition hover:ring-yellow-400/60"
              aria-label="Download Shy App on the App Store">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="shrink-0">
                <path
                  fill="currentColor"
                  d="M16.36 1.43c0 1.14-.45 2.22-1.19 3.05-.74.84-1.93 1.47-3.08 1.38-.13-1.09.54-2.25 1.26-3.03.81-.87 2.12-1.5 3.01-.4zM20.88 17.04c-.58 1.34-1.27 2.67-2.31 3.88-.78.91-1.72 1.94-2.96 1.95-1.25.02-1.66-.63-3.06-.63s-1.81.62-3.06.65c-1.26.02-2.22-1.01-3-1.92-1.64-1.9-2.9-4.82-2.95-7.66-.03-1.49.3-2.96 1.07-4.22.73-1.2 1.74-2.02 2.95-2.04 1.17-.02 2.05.67 3.06.67s1.78-.67 3.07-.65c1.1.02 2.25.6 3.08 1.63-1.35.81-2.16 2.31-2.04 3.87.16 2.23 2 3.74 4.05 3.96.33.03.65.05.97.03-.1.34-.21.67-.35.99z"
                />
              </svg>
              <span className="flex flex-col leading-none text-left">
                <span className="text-[10px] uppercase tracking-[.12em] text-white/70">
                  Download on the
                </span>
                <span className="-mt-0.5 text-[14px] font-semibold">
                  App Store
                </span>
              </span>
            </a>
            <a
              id="download-google-play"
              href="https://play.google.com/store/apps/details?id=com.shyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="group store-badge inline-flex items-center gap-3 rounded-[12px] bg-black px-4 py-3 text-white ring-1 ring-white/20 transition hover:ring-yellow-400/60"
              aria-label="Get Shy App on Google Play">
              <svg
                width="22"
                height="22"
                viewBox="0 0 512 512"
                aria-hidden="true"
                className="shrink-0">
                <path
                  fill="#34A853"
                  d="M325.3 234.3 90.6 36.9c-7.3-6-18.2-.8-18.2 8.7v420.8c0 9.5 11 14.6 18.3 8.6l177.8-149.4 0-139.3z"
                />
                <path
                  fill="#FBBC05"
                  d="M386.4 197.6 325.3 234l-56.8-47.7 85.6-72c9.7-8.1 24.3-1.1 24.3 11.5v71.8z"
                />
                <path
                  fill="#EA4335"
                  d="M386.4 314.4v71.8c0 12.6-14.6 19.6-24.3 11.5l-85.6-72 56.8-47.7 53.1 36.4z"
                />
                <path
                  fill="#4285F4"
                  d="M268.5 186.3 90.6 36.9c-7.3-6-18.2-.8-18.2 8.7v420.8c0 9.5 11 14.6 18.3 8.6l177.8-149.4 0-139.3z"
                />
              </svg>
              <span className="flex flex-col leading-none text-left">
                <span className="text-[10px] uppercase tracking-[.12em] text-white/70">
                  Get it on
                </span>
                <span className="-mt-0.5 text-[14px] font-semibold">
                  Google Play
                </span>
              </span>
            </a>
          </div>
          <div className="mt-8 space-y-2 text-xs text-white/60">
            <p>
              Already on desktop? The Shy web app stays in sync with your token
              balance and lobby history.
            </p>
            <p>
              Need an invite or to provision a new Shy Location? Email{' '}
              <a
                className="text-yellow-300 underline"
                href="mailto:hello@shyapp.com">
                hello@shyapp.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
