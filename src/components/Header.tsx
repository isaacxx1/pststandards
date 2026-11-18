import React, { useState, useRef, useEffect } from 'react';
import { BrandMark } from './Icons';
import { CourseLevel } from '../utils/trainingLogic';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  shortlistCount: number;
  onOpenShortlist: () => void;
  onOpenPortal: () => void;
  onOpenQuote: (preselectedCourse?: string) => void;
  onOpenCatalogue: (level?: CourseLevel, standardQuery?: string) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  shortlistCount,
  onOpenShortlist,
  onOpenPortal,
  onOpenQuote,
  onOpenCatalogue
}: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<'standards' | 'training' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  const scrollToSection = (id: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="w-full bg-white border-b border-[#E6ECF2] relative z-40" ref={navRef}>
      {/* Top Navy Utility Bar */}
      <div className="w-full bg-[#001C40] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[48px] sm:h-[50px] flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenPortal}
            className="bg-[#14CDC8] hover:bg-[#11b9b4] text-[#001C40] font-semibold text-[11.5px] sm:text-[13px] px-2.5 sm:px-3.5 py-1.5 rounded-[4px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Pst Professional Standards And Training · </span>Client Portal
          </button>
          <button
            type="button"
            onClick={onOpenShortlist}
            aria-label={`Course shortlist (${shortlistCount} selected)`}
            className="relative inline-flex items-center justify-center p-1.5 text-white hover:text-[#14CDC8] transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.17 14.75l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25z" />
            </svg>
            {shortlistCount > 0 && (
              <span
                data-testid="shortlist-count"
                className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold bg-[#14CDC8] text-[#001C40] rounded-full tabular-nums"
              >
                {shortlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Header Row: Logo, Search Bar, Contact & Quote CTA */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 sm:gap-4 lg:gap-8">
        {/* Brand Logo Slot */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-[#001C40] no-underline shrink-0"
        >
          <BrandMark />
          <span className="text-[13.5px] sm:text-[17px] xl:text-[18.5px] font-bold leading-tight whitespace-nowrap">
            Pst Professional Standards And Training
          </span>
        </a>

        {/* Course Search Input */}
        <form
          onSubmit={handleFormSubmit}
          className="order-3 lg:order-2 w-full lg:max-w-[420px] flex items-stretch border border-[#C6D1DD] rounded-[3px] overflow-hidden bg-white focus-within:border-[#0073C4]"
          role="search"
        >
          <label htmlFor="header-course-search" className="sr-only">
            Search ISO training courses
          </label>
          <input
            id="header-course-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ISO courses (e.g. ISO 9001, Lead Auditor)"
            className="flex-1 px-3.5 py-2 text-[14px] text-[#333333] placeholder-[#6B7280] bg-white focus:outline-none min-w-0"
          />
          <button
            type="submit"
            aria-label="Search courses"
            className="bg-[#0073C4] hover:bg-[#005ea3] text-white px-3.5 inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        {/* Right Actions: Account, Phone, Get a quote */}
        <div className="order-2 lg:order-3 flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenPortal}
            aria-label="Open Client Portal"
            className="hidden sm:inline-flex items-center justify-center text-[#001C40] hover:text-[#0073C4] p-1.5 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>

          <a
            href="tel:0557761844"
            className="hidden xl:inline-flex items-center gap-2 text-[#001C40] hover:text-[#0073C4] font-semibold text-[15px] whitespace-nowrap transition-colors tabular-nums"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
            </svg>
            <span>0557761844</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[15px] px-6 sm:px-8 py-2 rounded-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get a quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden inline-flex items-center justify-center p-2 border border-[#D5DEE8] rounded-[3px] text-[#001C40] hover:bg-[#F5F8FB] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5" aria-hidden="true">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Centered Desktop Navigation Row */}
      <nav aria-label="Main navigation" className="hidden lg:block border-t border-[#F0F4F8] bg-white">
        <div className="max-w-[1240px] mx-auto px-6 h-[48px] flex items-center justify-center gap-8 text-[15px] text-[#333333]">
          {/* Dropdown 1: ISO Standards */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown((prev) => (prev === 'standards' ? null : 'standards'))}
              aria-expanded={openDropdown === 'standards'}
              className="inline-flex items-center gap-1.5 py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>ISO Standards</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {openDropdown === 'standards' && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-[#D5DEE8] shadow-lg rounded-[4px] py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('All', '9001');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  ISO 9001 Quality Management
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('All', '14001');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  ISO 14001 Environmental Management
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('All', '45001');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  ISO 45001 Occupational Health &amp; Safety
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('All', '27001');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  ISO 27001 Information Security
                </button>
              </div>
            )}
          </div>

          {/* Dropdown 2: Training */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown((prev) => (prev === 'training' ? null : 'training'))}
              aria-expanded={openDropdown === 'training'}
              className="inline-flex items-center gap-1.5 py-2 text-[#0073C4] font-medium hover:text-[#005ea3] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Training</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-80" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {openDropdown === 'training' && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-[#D5DEE8] shadow-lg rounded-[4px] py-2 z-50">
                <button
                  type="button"
                  onClick={() => scrollToSection('overview')}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  Training Overview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('Internal Auditor');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  Internal Auditor Courses
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('Lead Auditor');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5FAFF] hover:text-[#0073C4] cursor-pointer"
                >
                  Lead Auditor Courses
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenCatalogue('All');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[14px] font-medium text-[#0073C4] hover:bg-[#F5FAFF] cursor-pointer"
                >
                  View All Training Courses
                </button>
              </div>
            )}
          </div>

          <a
            href="#flexible-learning"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('flexible-learning');
            }}
            className="py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap"
          >
            Flexible Learning
          </a>
          <a
            href="#why-choose"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('why-choose');
            }}
            className="py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap"
          >
            Why Choose Us
          </a>
          <a
            href="#training-journey"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('training-journey');
            }}
            className="py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap"
          >
            Training Journey
          </a>
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('testimonials');
            }}
            className="py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap"
          >
            Testimonials
          </a>
          <a
            href="#contact-footer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact-footer');
            }}
            className="py-2 hover:text-[#0073C4] transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E6ECF2] px-4 py-4 space-y-2 shadow-md">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCatalogue('All');
            }}
            className="block w-full text-left px-3 py-2.5 text-[15px] font-medium text-[#0073C4] rounded hover:bg-[#F5FAFF] cursor-pointer"
          >
            All ISO Training Courses
          </button>
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('overview');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Training Overview
          </a>
          <a
            href="#flexible-learning"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('flexible-learning');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Flexible Learning
          </a>
          <a
            href="#why-choose"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('why-choose');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Why Choose Us
          </a>
          <a
            href="#training-journey"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('training-journey');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Training Journey
          </a>
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('testimonials');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Testimonials
          </a>
          <a
            href="#contact-footer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact-footer');
            }}
            className="block px-3 py-2.5 text-[15px] text-[#333333] rounded hover:bg-[#F5FAFF]"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
