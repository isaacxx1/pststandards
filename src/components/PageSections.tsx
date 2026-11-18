import React, { useState } from 'react';
import { ClassroomVenueIcon, OnlineLearningIcon, InHouseTrainingIcon, BenefitIcon } from './Icons';
import { DeliveryMode, nextSlideIndex } from '../utils/trainingLogic';

interface PageSectionsProps {
  introImageSrc: string;
  onBrowseByDelivery: (mode: DeliveryMode) => void;
  onOpenJourneyModal: () => void;
}

const BENEFITS = [
  {
    title: 'Standards-aligned & accredited courses',
    description:
      '[INSERT ACCREDITATION OR COURSE RECOGNITION DETAILS HERE — e.g. Detail your recognition status for Quality, Environmental, Health & Safety, and Information Security courses.]'
  },
  {
    title: 'Flexible learning options',
    description:
      'We offer full flexibility in how your team learns, with classroom venues, live virtual sessions, e-learning modules, and on-site in-house delivery.'
  },
  {
    title: 'Bespoke training to meet your needs',
    description:
      'We design tailored ISO training programmes built around your organisation’s management system documentation, industry risks, and operational workflows.'
  },
  {
    title: 'Competitively priced',
    description:
      'Clear and transparent course fees with [INSERT PRICING OR MULTI-DELEGATE DISCOUNT DETAILS HERE] and zero hidden charges.'
  },
  {
    title: 'Experienced industry educators',
    description:
      'Training sessions are delivered by qualified practitioners with practical, hands-on experience in ISO implementation and third-party auditing.'
  },
  {
    title: 'Measurable learner outcomes',
    description:
      '[INSERT PASS RATE OR LEARNER OUTCOME METRICS HERE — e.g. Describe your delegate assessment support and completion outcomes.]'
  },
  {
    title: 'Ongoing technical guidance',
    description:
      '[INSERT TECHNICAL SUPPORT DETAILS HERE — Explain how your training advisors and technical team guide delegates before and after course completion.]'
  },
  {
    title: 'Credible certification pathway',
    description:
      '[INSERT CERTIFICATION OR CREDENTIALING BODY DETAILS HERE — Outline how your training supports ISO 9001, ISO 14001, ISO 45001, and ISO 27001 readiness.]'
  },
  {
    title: 'Strengthen your organisation',
    description:
      'Practical management systems training helps streamline internal processes, build audit confidence, improve customer trust, and support continual improvement.'
  }
];

const TESTIMONIALS = [
  {
    quote:
      '"[INSERT CLIENT TESTIMONIAL 1 HERE — Share verified feedback describing how your ISO training helped delegates apply management system principles in practice.]"',
    author: '[INSERT CLIENT NAME & JOB TITLE] — [INSERT ORGANISATION NAME]'
  },
  {
    quote:
      '"[INSERT CLIENT TESTIMONIAL 2 HERE — Highlight the responsiveness of your trainers and clarity of your internal or lead auditor workshops.]"',
    author: '[INSERT CLIENT NAME & JOB TITLE] — [INSERT ORGANISATION NAME]'
  },
  {
    quote:
      '"[INSERT CLIENT TESTIMONIAL 3 HERE — Describe measurable operational, safety, or compliance improvements achieved following training.]"',
    author: '[INSERT CLIENT NAME & JOB TITLE] — [INSERT ORGANISATION NAME]'
  },
  {
    quote:
      '"[INSERT CLIENT TESTIMONIAL 4 HERE — Note why your organisation is chosen as a trusted partner for in-house or virtual ISO training.]"',
    author: '[INSERT CLIENT NAME & JOB TITLE] — [INSERT ORGANISATION NAME]'
  }
];

export function PageSections({
  introImageSrc,
  onBrowseByDelivery,
  onOpenJourneyModal
}: PageSectionsProps) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <>
      {/* SECTION 1: Two-Column Intro */}
      <section id="overview" className="w-full bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="w-full overflow-hidden bg-[#F1F5F9]">
            <img
              src={introImageSrc}
              alt="Instructor leading an ISO 9001 quality management training workshop"
              referrerPolicy="no-referrer"
              className="w-full aspect-[603/514] object-cover block"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-[24px] sm:text-[26px] font-semibold text-[#0073C4] leading-[1.3]">
              Why choose training with Pst Professional Standards And Training?
            </h3>
            <p className="text-[16px] leading-[1.65] text-[#333333]">
              Notre centre est spécialisé dans la formation complémentaire et le perfectionnement dans les
              secteurs pharmaceutique et agroalimentaire. Nous proposons des formations en assurance qualité,
              contrôle qualité, production pharmaceutique, affaires réglementaires, direction technique,
              distribution, importation et exportation des produits pharmaceutiques.
            </p>
            <p className="text-[16px] leading-[1.65] text-[#333333]">
              Nos programmes couvrent également les BPF, BPD, référentiels ICH, pharmacopées et normes ISO
              9001, ISO 45001, ISO 14001 et ISO 22000. Nous accompagnons les entreprises dans la gestion
              documentaire, l&apos;élaboration des SOP, procédures et instructions de travail, ainsi que dans
              la mise en place des systèmes de management et la préparation à leur certification.
            </p>
            <p className="text-[16px] leading-[1.65] text-[#333333]">
              All ISO training courses in our portfolio are available for in-house delivery, enabling you to
              upskill multiple delegates together at a venue and schedule that suits your organisation.
            </p>
            <p className="text-[16px] leading-[1.65] text-[#333333]">
              We can also develop bespoke ISO training and professional development workshops tailored to the
              specific processes and objectives of your business.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Full-Width Blue Flexible Learning Band */}
      <section id="flexible-learning" className="w-full bg-[#0073C4] text-white py-20 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          <h2 className="text-[36px] md:text-[55px] font-medium leading-[1.12] text-center text-white max-w-[780px] mx-auto text-balance">
            Flexible learning that meets your needs
          </h2>
          <div className="max-w-[780px] mx-auto text-center text-[16px] leading-[1.6] text-[#F5FAFF] mt-5 mb-12 space-y-2">
            <p>
              Equip your employees with the practical skills required to implement, audit, and maintain
              management systems across your organisation.
            </p>
            <p>
              Nos programmes couvrent les référentiels BPF, BPD, ICH, pharmacopées ainsi que les normes ISO
              9001, ISO 45001, ISO 14001 et ISO 22000 pour les secteurs pharmaceutique et agroalimentaire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Classroom */}
            <article className="bg-white text-[#333333] px-7 py-10 text-center flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
              <ClassroomVenueIcon />
              <h3 className="text-[26px] font-medium text-[#0073C4] mt-5 mb-4 leading-[1.25]">
                You come to us
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-[#333333]">
                <strong>Classroom-based training:</strong> Attend structured face-to-face courses at our
                training centres. [INSERT TRAINING VENUES &amp; LOCATIONS HERE]
              </p>
              <button
                type="button"
                onClick={() => onBrowseByDelivery('Classroom')}
                className="mt-auto pt-6 text-[14px] font-semibold text-[#0073C4] hover:text-[#001C40] transition-colors cursor-pointer"
              >
                View classroom courses →
              </button>
            </article>

            {/* Card 2: Online */}
            <article className="bg-white text-[#333333] px-7 py-10 text-center flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
              <OnlineLearningIcon />
              <h3 className="text-[26px] font-medium text-[#0073C4] mt-5 mb-4 leading-[1.25]">
                Online learning
              </h3>
              <div className="text-[15.5px] leading-[1.6] text-[#333333] space-y-3">
                <p>
                  <strong>Virtual Classroom:</strong> Bringing the classroom to you anywhere, with engaging
                  and interactive tutor-led sessions delivered live online.
                </p>
                <p>
                  <strong>E-learning:</strong> Access self-paced ISO awareness and foundation modules via
                  [INSERT ONLINE LEARNING PLATFORM DETAILS HERE].
                </p>
              </div>
              <button
                type="button"
                onClick={() => onBrowseByDelivery('Virtual Classroom')}
                className="mt-auto pt-6 text-[14px] font-semibold text-[#0073C4] hover:text-[#001C40] transition-colors cursor-pointer"
              >
                View online courses →
              </button>
            </article>

            {/* Card 3: In-House */}
            <article className="bg-white text-[#333333] px-7 py-10 text-center flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
              <InHouseTrainingIcon />
              <h3 className="text-[26px] font-medium text-[#0073C4] mt-5 mb-4 leading-[1.25]">
                We come to you
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-[#333333]">
                <strong>In-house training:</strong> Choose exactly what, where, and when your team studies.
                Our in-house courses are delivered on your premises{' '}
                <em>
                  <strong>by our experienced management systems trainers.</strong>
                </em>
              </p>
              <button
                type="button"
                onClick={() => onBrowseByDelivery('In-house')}
                className="mt-auto pt-6 text-[14px] font-semibold text-[#0073C4] hover:text-[#001C40] transition-colors cursor-pointer"
              >
                View in-house options →
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 3: 9-Card Grid ("Why choose [Company] for your training?") */}
      <section id="why-choose" className="w-full bg-white py-20 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          <h2 className="text-[36px] md:text-[55px] font-medium text-[#001C40] text-center leading-[1.14] mb-12 text-balance">
            Why choose Pst Professional Standards And Training for your training?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {BENEFITS.map((item, idx) => (
              <article
                key={item.title}
                className="border-[3px] border-[#3C2869] bg-white px-6 py-10 flex flex-col items-start transition-transform duration-200 hover:-translate-y-1"
              >
                <BenefitIcon index={idx} />
                <h3 className="text-[26px] font-medium text-[#3C2869] leading-[1.22] mt-5 mb-3.5">
                  {item.title}
                </h3>
                <p className="text-[15.5px] leading-[1.6] text-[#333333]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Bordered Visual Training Journey CTA Box */}
      <section id="training-journey" className="w-full bg-white pb-20 pt-2 px-4 sm:px-6">
        <div className="max-w-[880px] mx-auto border-[3px] border-[#3C2869] px-6 sm:px-12 py-12 text-center">
          <h2 className="text-[30px] sm:text-[44px] font-bold text-[#001C40] leading-[1.16] text-balance">
            Download a visual map of your training journey
          </h2>
          <h3 className="text-[18px] sm:text-[20px] font-medium text-[#333333] max-w-[660px] mx-auto mt-4 mb-7 leading-[1.45]">
            Are you wondering which training course is right for you? Find out more about the steps you can
            take here.
          </h3>
          <button
            type="button"
            onClick={onOpenJourneyModal}
            className="inline-flex items-center justify-center bg-[#0073C4] hover:bg-[#005ea3] text-[#F5FAFF] font-medium text-[15px] px-6 py-3 rounded-[3px] transition-colors cursor-pointer"
          >
            Download
          </button>
        </div>
      </section>

      {/* SECTION 5: Off-White Testimonials Carousel */}
      <section
        id="testimonials"
        aria-label="Client testimonials"
        className="w-full bg-[#FCFCFD] border-t border-b border-[#EEF2F6] py-20 px-4 sm:px-6"
      >
        <div className="max-w-[840px] mx-auto text-center">
          <blockquote className="text-[21px] sm:text-[25px] font-semibold text-[#1E293B] leading-[1.45]">
            {TESTIMONIALS[testimonialIdx].quote}
          </blockquote>
          <p className="mt-5 text-[15px] text-[#555D66] font-normal">
            {TESTIMONIALS[testimonialIdx].author}
          </p>

          <div className="mt-10 flex items-center justify-center gap-2.5" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={testimonialIdx === idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setTestimonialIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                  testimonialIdx === idx ? 'bg-[#001C40]' : 'bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTestimonialIdx((prev) => nextSlideIndex(prev, TESTIMONIALS.length))}
            className="sr-only"
          >
            Next testimonial
          </button>
        </div>
      </section>
    </>
  );
}
