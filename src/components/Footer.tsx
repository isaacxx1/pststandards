import React from 'react';
import { BrandMark } from './Icons';
import { CourseLevel, DeliveryMode } from '../utils/trainingLogic';

interface FooterProps {
  onOpenCatalogue: (level?: CourseLevel, standardQuery?: string, delivery?: DeliveryMode) => void;
  onOpenQuote: () => void;
  onOpenJourney: () => void;
  onOpenNewsletter: () => void;
  onOpenPortal: () => void;
}

export function Footer({
  onOpenCatalogue,
  onOpenQuote,
  onOpenJourney,
  onOpenNewsletter,
  onOpenPortal
}: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="contact-footer" className="w-full bg-[#001C40] text-white pt-16 pb-10 px-4 sm:px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-6">
          {/* Column 1: Company Logo, Mission, Social, Contact, Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark light />
              <span className="text-[16px] font-bold leading-snug">Pst Professional Standards And Training</span>
            </div>
            <p className="text-[14px] text-[#DCEAF7] leading-[1.55]">
              Formation complémentaire et perfectionnement dans les secteurs pharmaceutique et agroalimentaire.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#contact-footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenNewsletter();
                }}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-[13px] font-bold hover:border-[#14CDC8] hover:text-[#14CDC8] transition-colors"
              >
                in
              </a>
              <a
                href="#contact-footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenNewsletter();
                }}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-[13px] font-bold hover:border-[#14CDC8] hover:text-[#14CDC8] transition-colors"
              >
                f
              </a>
              <a
                href="#contact-footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenNewsletter();
                }}
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-[12px] font-bold hover:border-[#14CDC8] hover:text-[#14CDC8] transition-colors"
              >
                ▶
              </a>
            </div>

            <ul className="space-y-1.5 text-[14px] text-[#E2EEF9] pt-1">
              <li>
                <a href="tel:0557761844" className="hover:text-[#14CDC8] transition-colors">
                  Contact : 0557761844
                </a>
              </li>
              <li>
                <span>WhatsApp : 0557761844</span>
              </li>
              <li>
                <a href="mailto:pststandards@gmail.com" className="hover:text-[#14CDC8] transition-colors">
                  Email : pststandards@gmail.com
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenNewsletter}
                className="bg-[#0073C4] hover:bg-[#005ea3] text-[#F5FAFF] text-[14px] font-medium px-4 py-2.5 rounded-[3px] transition-colors cursor-pointer"
              >
                Sign up for our Newsletter
              </button>
            </div>
          </div>

          {/* Column 2: Standards */}
          <div>
            <h3 className="text-[16px] font-bold text-white mb-4">Standards</h3>
            <ul className="space-y-2.5 text-[14px] text-[#DCEAF7]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '9001')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  ISO 9001 Quality
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '14001')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  ISO 14001 Environmental
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '45001')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  ISO 45001 Health &amp; Safety
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '27001')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  ISO 27001 InfoSec
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Training */}
          <div>
            <h3 className="text-[16px] font-bold text-white mb-4">Training</h3>
            <ul className="space-y-2.5 text-[14px] text-[#DCEAF7]">
              <li>
                <a
                  href="#overview"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('overview');
                  }}
                  className="hover:text-[#14CDC8]"
                >
                  Training Overview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '', 'Classroom')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Classroom Training
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '', 'Virtual Classroom')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Virtual &amp; E-learning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All', '', 'In-house')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  In-house Training
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Courses */}
          <div>
            <h3 className="text-[16px] font-bold text-white mb-4">Courses</h3>
            <ul className="space-y-2.5 text-[14px] text-[#DCEAF7]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('Foundation')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Foundation Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('Internal Auditor')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Internal Auditor Training
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('Lead Auditor')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Lead Auditor Training
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('Professional Development')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Professional Development
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div>
            <h3 className="text-[16px] font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2.5 text-[14px] text-[#DCEAF7]">
              <li>
                <button
                  type="button"
                  onClick={onOpenJourney}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Training Journey Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCatalogue('All')}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Course Finder
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Company */}
          <div>
            <h3 className="text-[16px] font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2.5 text-[14px] text-[#DCEAF7]">
              <li>
                <a
                  href="#why-choose"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('why-choose');
                  }}
                  className="hover:text-[#14CDC8]"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('testimonials');
                  }}
                  className="hover:text-[#14CDC8]"
                >
                  Client Testimonials
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenNewsletter}
                  className="hover:text-[#14CDC8] text-left cursor-pointer"
                >
                  Newsletter Signup
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13px] text-[#CBD5E1]">
          <p>
            © 2026 Pst Professional Standards And Training. [INSERT COMPANY REGISTRATION NUMBER &amp; REGISTERED
            OFFICE ADDRESS HERE]. All Rights Reserved.
          </p>
          <p className="shrink-0">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#14CDC8]">
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
