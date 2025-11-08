'use client';
import React, {useState, useEffect} from 'react';
import {ShyWordmark} from './ShyLogo';

interface MobileMenuProps {
  navLinks: Array<{label: string; href: string}>;
}

export default function MobileMenu({navLinks}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = (href: string) => {
    closeMenu();
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden rounded-full border border-white/15 p-2 text-white/70 hover:text-yellow-300 hover:border-yellow-400/30 transition-colors z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen ? 'true' : 'false'}>
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <ShyWordmark />
            <button
              onClick={closeMenu}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-yellow-300 hover:border-yellow-400/30 transition-colors"
              aria-label="Close menu">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white/80 hover:text-yellow-300 hover:bg-white/5 rounded-lg transition-all">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 border-t border-white/10 space-y-3">
            <a
              href="#download"
              onClick={closeMenu}
              className="btn w-full text-center block">
              Download App
            </a>
            <div className="flex items-center justify-center gap-3 text-white/60 text-xs">
              <a
                href="https://www.tiktok.com/@shyapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors">
                TikTok
              </a>
              <span>•</span>
              <a
                href="https://www.instagram.com/shyapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors">
                Instagram
              </a>
              <span>•</span>
              <a
                href="mailto:hello@shyapp.com"
                className="hover:text-yellow-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
