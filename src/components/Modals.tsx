import React, { useState, useEffect } from 'react';
import {
  COURSE_CATALOGUE,
  CourseItem,
  CourseLevel,
  DeliveryMode,
  filterCourses,
  validateQuoteForm,
  validateNewsletterEmail
} from '../utils/trainingLogic';

interface CatalogueModalProps {
  open: boolean;
  onClose: () => void;
  initialQuery: string;
  initialLevel: CourseLevel;
  initialDelivery: DeliveryMode;
  selectedCourseId: string | null;
  shortlistIds: string[];
  onToggleShortlist: (courseId: string) => void;
  onRequestQuote: (courseTitle: string, deliveryMode?: Exclude<DeliveryMode, 'All'>) => void;
}

export function CatalogueModal({
  open,
  onClose,
  initialQuery,
  initialLevel,
  initialDelivery,
  selectedCourseId,
  shortlistIds,
  onToggleShortlist,
  onRequestQuote
}: CatalogueModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [level, setLevel] = useState<CourseLevel>(initialLevel);
  const [delivery, setDelivery] = useState<DeliveryMode>(initialDelivery);
  const [focusedCourse, setFocusedCourse] = useState<CourseItem | null>(null);

  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
      setLevel(initialLevel);
      setDelivery(initialDelivery);
      if (selectedCourseId) {
        const match = COURSE_CATALOGUE.find((c) => c.id === selectedCourseId) || null;
        setFocusedCourse(match);
      } else {
        setFocusedCourse(null);
      }
    }
  }, [open, initialQuery, initialLevel, initialDelivery, selectedCourseId]);

  if (!open) return null;

  const filtered = filterCourses(COURSE_CATALOGUE, query, level, delivery);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001C40]/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-modal-title"
    >
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[4px] shadow-2xl border border-[#D5DEE8] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#001C40] text-white px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="catalogue-modal-title" className="text-[20px] font-bold">
              ISO Training Course Directory
            </h2>
            <p className="text-[13px] text-[#CBD5E1]">
              Browse Quality, Environmental, Health &amp; Safety, Information Security, and Auditor courses
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close course directory"
            className="text-white hover:text-[#14CDC8] text-[24px] leading-none px-2 py-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] grid sm:grid-cols-3 gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFocusedCourse(null);
            }}
            placeholder="Filter by keyword or ISO standard..."
            aria-label="Filter courses by keyword"
            className="px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] bg-white focus:outline-none focus:border-[#0073C4]"
          />
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as CourseLevel);
              setFocusedCourse(null);
            }}
            aria-label="Filter by course level"
            className="px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] bg-white focus:outline-none focus:border-[#0073C4]"
          >
            <option value="All">All Levels</option>
            <option value="Foundation">Foundation</option>
            <option value="Internal Auditor">Internal Auditor</option>
            <option value="Lead Auditor">Lead Auditor</option>
            <option value="Professional Development">Professional Development</option>
          </select>
          <select
            value={delivery}
            onChange={(e) => {
              setDelivery(e.target.value as DeliveryMode);
              setFocusedCourse(null);
            }}
            aria-label="Filter by delivery format"
            className="px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] bg-white focus:outline-none focus:border-[#0073C4]"
          >
            <option value="All">All Delivery Options</option>
            <option value="Classroom">Classroom</option>
            <option value="Virtual Classroom">Virtual Classroom</option>
            <option value="E-learning">E-learning</option>
            <option value="In-house">In-house</option>
          </select>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4">
          {focusedCourse ? (
            <div className="border-[2px] border-[#3C2869] p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setFocusedCourse(null)}
                  className="text-[14px] font-medium text-[#0073C4] hover:underline cursor-pointer"
                >
                  ← Back to all courses ({filtered.length})
                </button>
                <span className="text-[13px] font-semibold text-[#3C2869]">
                  {focusedCourse.standard} · {focusedCourse.level} · {focusedCourse.duration}
                </span>
              </div>
              <h3 className="text-[24px] font-bold text-[#001C40]">{focusedCourse.title}</h3>
              <p className="text-[15.5px] text-[#333333] leading-[1.6]">{focusedCourse.summary}</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-[14px] font-bold text-[#001C40] mb-1.5">Key Learning Objectives</h4>
                  <ul className="list-disc pl-5 text-[14px] text-[#333333] space-y-1">
                    {focusedCourse.objectives.map((obj) => (
                      <li key={obj}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 text-[14px] text-[#333333]">
                  <p>
                    <strong>Target Audience:</strong> {focusedCourse.audience}
                  </p>
                  <p>
                    <strong>Delivery Modes:</strong> {focusedCourse.deliveryModes.join(' / ')}
                  </p>
                  <p>
                    <strong>Course Fee:</strong> {focusedCourse.feePlaceholder}
                  </p>
                </div>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onRequestQuote(focusedCourse.title, focusedCourse.deliveryModes[0])}
                  className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[14px] px-5 py-2.5 rounded-[3px] cursor-pointer"
                >
                  Request quote for this course
                </button>
                <button
                  type="button"
                  onClick={() => onToggleShortlist(focusedCourse.id)}
                  className="border border-[#3C2869] text-[#3C2869] hover:bg-[#F5F3FA] font-medium text-[14px] px-5 py-2.5 rounded-[3px] cursor-pointer"
                >
                  {shortlistIds.includes(focusedCourse.id) ? 'Remove from shortlist' : 'Add to shortlist'}
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-[#555D66]">
              <p className="text-[16px] font-medium">No courses matched your current filter.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setLevel('All');
                  setDelivery('All');
                }}
                className="mt-3 text-[#0073C4] font-medium hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((course) => {
                const inShortlist = shortlistIds.includes(course.id);
                return (
                  <article
                    key={course.id}
                    className="border-[2px] border-[#3C2869] p-5 flex flex-col justify-between bg-white"
                  >
                    <div>
                      <div className="text-[12.5px] font-semibold text-[#0073C4]">
                        {course.standard} · {course.level} · {course.duration}
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#001C40] mt-1.5 leading-[1.3]">
                        {course.title}
                      </h3>
                      <p className="text-[14px] text-[#333333] mt-2 leading-[1.55]">{course.summary}</p>
                      <p className="text-[12.5px] text-[#555D66] mt-2">
                        Delivery: {course.deliveryModes.join(', ')}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#EDF2F7] flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFocusedCourse(course)}
                        className="bg-[#0073C4] hover:bg-[#005ea3] text-white text-[13px] font-medium px-3.5 py-2 rounded-[3px] cursor-pointer"
                      >
                        View details
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleShortlist(course.id)}
                        className={`text-[13px] font-medium px-3.5 py-2 rounded-[3px] border cursor-pointer ${
                          inShortlist
                            ? 'bg-[#001C40] text-white border-[#001C40]'
                            : 'border-[#CBD5E1] text-[#001C40] hover:border-[#3C2869]'
                        }`}
                      >
                        {inShortlist ? 'Shortlisted ✓' : 'Add to shortlist'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  defaultCourse: string;
  defaultDelivery: Exclude<DeliveryMode, 'All'>;
}

export function QuoteModal({ open, onClose, defaultCourse, defaultDelivery }: QuoteModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [courseTitle, setCourseTitle] = useState(defaultCourse);
  const [deliveryMode, setDeliveryMode] = useState<Exclude<DeliveryMode, 'All'>>(defaultDelivery);
  const [delegates, setDelegates] = useState(4);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setCourseTitle(defaultCourse || COURSE_CATALOGUE[0].title);
      setDeliveryMode(defaultDelivery || 'In-house');
      setErrors({});
      setSubmitted(false);
    }
  }, [open, defaultCourse, defaultDelivery]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateQuoteForm({
      fullName,
      email,
      phone,
      company,
      courseTitle,
      deliveryMode,
      delegates,
      notes
    });
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001C40]/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[4px] shadow-2xl border border-[#D5DEE8]">
        <div className="bg-[#001C40] text-white px-6 py-4 flex items-center justify-between">
          <h2 id="quote-modal-title" className="text-[20px] font-bold">
            Request a Training Quote
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote modal"
            className="text-white hover:text-[#14CDC8] text-[24px] leading-none px-2 py-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#14CDC8]/20 text-[#001C40] flex items-center justify-center text-[22px] font-bold">
                ✓
              </div>
              <h3 className="text-[22px] font-bold text-[#001C40]">Quote Request Prepared</h3>
              <p className="text-[15px] text-[#333333] leading-[1.6]">
                Thank you, <strong>{fullName}</strong>. Your inquiry for{' '}
                <strong>{courseTitle}</strong> ({deliveryMode}, {delegates} delegate
                {delegates === 1 ? '' : 's'}) has been recorded. Connect this form handler to your
                preferred email or CRM endpoint, or reach us at 0557761844 (WhatsApp: 0557761844) / pststandards@gmail.com.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium px-6 py-2.5 rounded-[3px] cursor-pointer"
              >
                Close window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q-name" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="q-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                  />
                  {errors.fullName && <p className="text-[12px] text-red-700 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="q-email" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Business Email *
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                  />
                  {errors.email && <p className="text-[12px] text-red-700 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q-company" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Organisation *
                  </label>
                  <input
                    id="q-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                  />
                  {errors.company && <p className="text-[12px] text-red-700 mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="q-phone" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Telephone
                  </label>
                  <input
                    id="q-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="q-course" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                  Training Course *
                </label>
                <select
                  id="q-course"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] bg-white"
                >
                  {COURSE_CATALOGUE.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
                {errors.courseTitle && <p className="text-[12px] text-red-700 mt-1">{errors.courseTitle}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q-mode" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Preferred Delivery Format
                  </label>
                  <select
                    id="q-mode"
                    value={deliveryMode}
                    onChange={(e) => setDeliveryMode(e.target.value as Exclude<DeliveryMode, 'All'>)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] bg-white"
                  >
                    <option value="In-house">In-house (On your premises)</option>
                    <option value="Virtual Classroom">Virtual Classroom</option>
                    <option value="Classroom">Classroom Venue</option>
                    <option value="E-learning">E-learning</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="q-delegates" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                    Number of Delegates
                  </label>
                  <input
                    id="q-delegates"
                    type="number"
                    min={1}
                    max={100}
                    value={delegates}
                    onChange={(e) => setDelegates(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] tabular-nums"
                  />
                  {errors.delegates && <p className="text-[12px] text-red-700 mt-1">{errors.delegates}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="q-notes" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                  Additional Requirements
                </label>
                <textarea
                  id="q-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferred dates, specific ISO clauses, or bespoke training goals..."
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px] text-[#333333] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[14px] px-6 py-2 rounded-[3px] cursor-pointer"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface JourneyModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLevel: (level: CourseLevel) => void;
}

export function JourneyModal({ open, onClose, onSelectLevel }: JourneyModalProps) {
  if (!open) return null;

  const steps: { stage: string; level: CourseLevel; desc: string }[] = [
    {
      stage: '01. Foundation & Awareness',
      level: 'Foundation',
      desc: 'Understand core ISO standard clauses, Annex SL structure, and management system terminology.'
    },
    {
      stage: '02. Internal Auditor Training',
      level: 'Internal Auditor',
      desc: 'Plan and execute internal compliance audits, gather objective evidence, and verify corrective actions.'
    },
    {
      stage: '03. Lead Auditor Training',
      level: 'Lead Auditor',
      desc: 'Lead full first-, second-, and third-party audit programmes across ISO 9001, 14001, 45001, or 27001.'
    },
    {
      stage: '04. Professional Development & Bespoke',
      level: 'Professional Development',
      desc: 'Strengthen leadership commitment, root-cause analysis, and integrated management systems capability.'
    }
  ];

  const handleDownloadGuide = () => {
    const content = [
      'ISO TRAINING JOURNEY ROADMAP — Pst Professional Standards And Training',
      '=========================================================================',
      '',
      'Stage 01: Foundation & Awareness',
      '- Build core understanding of ISO 9001, ISO 14001, ISO 45001, ISO 22000, BPF, BPD, and ICH requirements.',
      '',
      'Stage 02: Internal Auditor',
      '- Learn ISO 19011 audit principles, checklist preparation, and non-conformity reporting.',
      '',
      'Stage 03: Lead Auditor',
      '- Master end-to-end audit team leadership and management system evaluation.',
      '',
      'Stage 04: Professional Development & Bespoke Workshops',
      '- Tailor workshops to your organisation’s sector, SOP management, and certification roadmap.',
      '',
      'Contact : 0557761844 | WhatsApp : 0557761844 | Email : pststandards@gmail.com'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iso-training-journey-map.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001C40]/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-modal-title"
    >
      <div className="bg-white w-full max-w-2xl rounded-[4px] shadow-2xl border-[3px] border-[#3C2869] overflow-hidden">
        <div className="bg-[#001C40] text-white px-6 py-4 flex items-center justify-between">
          <h2 id="journey-modal-title" className="text-[20px] font-bold">
            Visual ISO Training Journey Map
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close training journey modal"
            className="text-white hover:text-[#14CDC8] text-[24px] leading-none px-2 py-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-[15px] text-[#333333] leading-[1.6]">
            Follow our four-stage pathway to move your team from foundational ISO awareness to confident
            Lead Auditor capability. Click any stage to filter matching courses:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {steps.map((s) => (
              <button
                key={s.stage}
                type="button"
                onClick={() => onSelectLevel(s.level)}
                className="text-left border-[2px] border-[#3C2869] p-4 hover:bg-[#F5FAFF] transition-colors cursor-pointer"
              >
                <div className="text-[16px] font-bold text-[#3C2869]">{s.stage}</div>
                <p className="text-[13.5px] text-[#333333] mt-1.5 leading-[1.5]">{s.desc}</p>
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={handleDownloadGuide}
              className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[14px] px-5 py-2.5 rounded-[3px] cursor-pointer"
            >
              Download Printable Roadmap (.txt)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] text-[#333333] border border-[#CBD5E1] rounded-[3px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ShortlistModalProps {
  open: boolean;
  onClose: () => void;
  shortlistIds: string[];
  onRemove: (courseId: string) => void;
  onRequestQuote: (summaryTitle: string) => void;
}

export function ShortlistModal({
  open,
  onClose,
  shortlistIds,
  onRemove,
  onRequestQuote
}: ShortlistModalProps) {
  if (!open) return null;

  const items = COURSE_CATALOGUE.filter((c) => shortlistIds.includes(c.id));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001C40]/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortlist-modal-title"
    >
      <div className="bg-white w-full max-w-lg rounded-[4px] shadow-2xl border border-[#D5DEE8] overflow-hidden">
        <div className="bg-[#001C40] text-white px-6 py-4 flex items-center justify-between">
          <h2 id="shortlist-modal-title" className="text-[19px] font-bold">
            Selected Training Courses ({items.length})
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortlist"
            className="text-white hover:text-[#14CDC8] text-[24px] leading-none px-2 py-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-[15px] text-[#555D66] text-center py-6">
              Your course shortlist is currently empty. Add courses from the directory to compare or request
              a group quote.
            </p>
          ) : (
            <ul className="divide-y divide-[#E2E8F0]">
              {items.map((item) => (
                <li key={item.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[15px] font-semibold text-[#001C40]">{item.title}</div>
                    <div className="text-[13px] text-[#555D66]">
                      {item.duration} · {item.feePlaceholder}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-[13px] text-red-700 hover:underline shrink-0 cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-2 flex justify-end gap-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] border border-[#CBD5E1] rounded-[3px] cursor-pointer"
            >
              Close
            </button>
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => onRequestQuote(items[0].title)}
                className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[14px] px-5 py-2 rounded-[3px] cursor-pointer"
              >
                Request quote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface UtilityModalProps {
  mode: 'portal' | 'newsletter' | null;
  onClose: () => void;
}

export function UtilityModal({ mode, onClose }: UtilityModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setEmail('');
    setError('');
    setDone(false);
  }, [mode]);

  if (!mode) return null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNewsletterEmail(email);
    if (!res.valid) {
      setError(res.errors.email);
      return;
    }
    setError('');
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001C40]/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="utility-modal-title"
    >
      <div className="bg-white w-full max-w-md rounded-[4px] shadow-2xl border border-[#D5DEE8] overflow-hidden">
        <div className="bg-[#001C40] text-white px-6 py-4 flex items-center justify-between">
          <h2 id="utility-modal-title" className="text-[19px] font-bold">
            {mode === 'portal' ? 'Pst Professional Standards And Training — Client Portal' : 'Newsletter Sign Up'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-white hover:text-[#14CDC8] text-[24px] leading-none px-2 py-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {mode === 'portal' ? (
            <>
              <p className="text-[15px] text-[#333333] leading-[1.6]">
                Link this portal dialog to your organisation’s LMS, delegate certificate verification, or
                client training area: [INSERT CLIENT PORTAL URL OR LOGIN INSTRUCTIONS HERE].
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0073C4] text-white px-5 py-2 rounded-[3px] text-[14px] font-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            </>
          ) : done ? (
            <div className="space-y-4 text-center py-2">
              <p className="text-[15px] text-[#001C40] font-semibold">
                Subscription prepared for {email}.
              </p>
              <p className="text-[13.5px] text-[#555D66]">
                Connect this form to your mailing list provider in production.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0073C4] text-white px-5 py-2 rounded-[3px] text-[14px] font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-4">
              <p className="text-[14.5px] text-[#333333]">
                Receive updates on ISO standard revisions, upcoming training schedules, and audit insights.
              </p>
              <div>
                <label htmlFor="newsletter-email" className="block text-[13.5px] font-semibold text-[#001C40] mb-1">
                  Email Address *
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organisation.com"
                  className="w-full px-3 py-2 border border-[#CBD5E1] rounded-[3px] text-[14px]"
                />
                {error && <p className="text-[12px] text-red-700 mt-1">{error}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[14px] border border-[#CBD5E1] rounded-[3px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0073C4] hover:bg-[#005ea3] text-white font-medium text-[14px] px-5 py-2 rounded-[3px] cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
