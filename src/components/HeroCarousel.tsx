import React, { useState, useEffect } from 'react';
import { nextSlideIndex, prevSlideIndex } from '../utils/trainingLogic';

interface HeroCarouselProps {
  heroImageSrc: string;
  onViewCourse: (courseId: string) => void;
  onBrowseCourses: (standardQuery?: string) => void;
}

interface HeroSlide {
  id: string;
  type: 'promo' | 'course';
  headline: string;
  subheading?: string;
  ctaText: string;
  secondaryText?: string;
  footnote: string;
  courseId?: string;
  standardQuery?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-promo',
    type: 'promo',
    headline: '[INSERT PROMOTIONAL OFFER OR TRAINING HEADLINE HERE]',
    ctaText: 'Explore training courses',
    footnote: '[INSERT OFFER VALIDITY OR ENROLMENT TERMS HERE]'
  },
  {
    id: 'slide-9001',
    type: 'course',
    headline: 'ISO 9001 Lead Auditor Course',
    subheading: 'Gain the understanding to effectively audit a Quality Management System.',
    ctaText: 'View course',
    secondaryText: 'Find out more',
    footnote:
      'A 5-day course designed for delegates who carry responsibility within a QMS or will lead management system audits.',
    courseId: 'iso-9001-lead-auditor',
    standardQuery: '9001'
  },
  {
    id: 'slide-14001-45001',
    type: 'course',
    headline: 'ISO 14001 & 45001 Lead Auditor Course',
    subheading: 'Providing skills to audit Environmental and Occupational Health & Safety systems.',
    ctaText: 'View course',
    secondaryText: 'Find out more',
    footnote:
      '[INSERT TRAINING COURSE DETAILS HERE] — Equip existing or new auditors with practical assessment skills across ISO 14001 and ISO 45001.',
    courseId: 'iso-14001-45001-lead-auditor',
    standardQuery: '14001'
  },
  {
    id: 'slide-27001',
    type: 'course',
    headline: 'ISO 27001 & Internal Auditor Training',
    subheading: 'Find the knowledge to succeed with our in-house or online training courses.',
    ctaText: 'View course',
    secondaryText: 'Find out more',
    footnote:
      'Practical courses designed for delegates to plan, implement, and report internal and third-party management system audits.',
    courseId: 'iso-27001-lead-auditor',
    standardQuery: '27001'
  }
];

export function HeroCarousel({ heroImageSrc, onViewCourse, onBrowseCourses }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => nextSlideIndex(prev, HERO_SLIDES.length));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section aria-label="Featured ISO training highlights" className="w-full bg-white">
      {/* Breadcrumb Bar matching reference */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3 text-[14px] text-[#333333]">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-[#0073C4] underline hover:text-[#001C40] transition-colors"
        >
          Home
        </a>
        <span className="mx-1.5 text-[#6B7280]" aria-hidden="true">
          »
        </span>
        <span>Training</span>
      </div>

      {/* Full-Width Hero Banner */}
      <div
        className="relative w-full overflow-hidden bg-[#001C40] min-h-[410px] md:min-h-[450px] flex items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {activeSlide.type === 'promo' ? (
          /* Slide 1: Promotional / Flagship Geometric Gradient Banner */
          <div className="relative w-full min-h-[410px] md:min-h-[450px] flex items-center bg-gradient-to-br from-[#001C40] via-[#003E63] to-[#006978]">
            {/* Abstract curved dark teal waves */}
            <svg
              viewBox="0 0 1440 450"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
              aria-hidden="true"
            >
              <path d="M0,450 C320,310 540,80 960,180 C1200,240 1350,90 1440,30 L1440,450 Z" fill="#00294D" />
              <path d="M200,450 C480,260 790,140 1160,260 C1300,305 1380,220 1440,180 L1440,450 Z" fill="#004C6D" opacity="0.65" />
            </svg>

            <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 sm:px-10 py-14 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-6">
                <h1 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.15] text-balance">
                  {activeSlide.headline}
                </h1>
                <div>
                  <button
                    type="button"
                    onClick={() => onBrowseCourses()}
                    className="inline-flex items-center gap-3 bg-[#0073C4] hover:bg-[#005ea3] text-[#F5FAFF] font-medium text-[16px] px-6 py-3 rounded-[40px] transition-colors cursor-pointer"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="text-[13px] text-[#DCEAF7]">{activeSlide.footnote}</p>
              </div>

              <div className="md:col-span-6 flex flex-col items-start md:items-end justify-center text-left md:text-right">
                <div className="text-[54px] sm:text-[74px] lg:text-[88px] font-bold text-white leading-[0.95] tracking-tight">
                  [INSERT OFFER]
                </div>
                <div className="text-[22px] sm:text-[28px] font-semibold text-[#F5FAFF] mt-2">
                  all ISO training courses
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Slides 2–4: Diagonal Navy Overlay Left + Corporate Training Photo Right */
          <div className="relative w-full min-h-[410px] md:min-h-[450px] flex items-center">
            <img
              src={heroImageSrc}
              alt="Professionals collaborating during an ISO management systems training session"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Mobile full-width high-contrast scrim + Desktop diagonal navy scrim */}
            <div
              className="md:hidden absolute inset-0 pointer-events-none bg-[#10284A]/85"
              aria-hidden="true"
            />
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(102deg, rgba(16, 40, 74, 0.96) 0%, rgba(20, 48, 86, 0.92) 52%, rgba(20, 48, 86, 0.35) 68%, rgba(20, 48, 86, 0.15) 100%)'
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 sm:px-10 py-14">
              <div className="max-w-[600px] space-y-4">
                <h1 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.15] text-balance">
                  {activeSlide.headline}
                </h1>
                {activeSlide.subheading && (
                  <h2 className="text-[21px] sm:text-[27px] font-medium text-[#F5FAFF] leading-[1.28]">
                    {activeSlide.subheading}
                  </h2>
                )}
                <div className="pt-3 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => activeSlide.courseId && onViewCourse(activeSlide.courseId)}
                    className="inline-flex items-center gap-2.5 bg-[#0073C4] hover:bg-[#005ea3] text-[#F5FAFF] font-medium text-[15px] px-6 py-2.5 rounded-[40px] transition-colors cursor-pointer"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  {activeSlide.secondaryText && (
                    <button
                      type="button"
                      onClick={() => onBrowseCourses(activeSlide.standardQuery)}
                      className="inline-flex items-center gap-2 text-[#F5FAFF] hover:text-[#14CDC8] font-medium text-[15px] px-3 py-2 rounded-[40px] transition-colors cursor-pointer"
                    >
                      <span>{activeSlide.secondaryText}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
                <p className="pt-2 text-[14px] text-[#E2EEF9] leading-[1.55] max-w-[520px]">
                  {activeSlide.footnote}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Accessible Slide Controls (subtle prev/next) */}
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => prevSlideIndex(prev, HERO_SLIDES.length))}
          aria-label="Previous hero slide"
          className="hidden md:inline-flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors cursor-pointer"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => nextSlideIndex(prev, HERO_SLIDES.length))}
          aria-label="Next hero slide"
          className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors cursor-pointer"
        >
          ›
        </button>
      </div>

      {/* 4 Pagination Dots centered below hero */}
      <div className="py-4 flex items-center justify-center gap-2.5" role="tablist" aria-label="Hero slide pagination">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
              activeIndex === idx ? 'bg-[#001C40]' : 'bg-[#CBD5E1] hover:bg-[#94A3B8]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
