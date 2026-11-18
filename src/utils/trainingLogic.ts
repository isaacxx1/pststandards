export type DeliveryMode = 'All' | 'Classroom' | 'Virtual Classroom' | 'E-learning' | 'In-house';
export type CourseLevel = 'All' | 'Foundation' | 'Internal Auditor' | 'Lead Auditor' | 'Professional Development';

export interface CourseItem {
  id: string;
  standard: string;
  title: string;
  level: Exclude<CourseLevel, 'All'>;
  duration: string;
  deliveryModes: Exclude<DeliveryMode, 'All'>[];
  summary: string;
  audience: string;
  objectives: string[];
  feePlaceholder: string;
}

export interface QuoteFormInput {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  courseTitle: string;
  deliveryMode: Exclude<DeliveryMode, 'All'>;
  delegates: number;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const COURSE_CATALOGUE: CourseItem[] = [
  {
    id: 'iso-9001-lead-auditor',
    standard: 'ISO 9001',
    title: 'ISO 9001 Quality Management Lead Auditor Course',
    level: 'Lead Auditor',
    duration: '5 Days',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'In-house'],
    summary:
      'Comprehensive training designed for delegates who lead audits or carry responsibility within a Quality Management System (QMS).',
    audience: 'Quality managers, prospective lead auditors, and compliance specialists.',
    objectives: [
      'Interpret ISO 9001 clauses from an audit perspective',
      'Plan, conduct, report, and follow up QMS audits in line with ISO 19011',
      'Manage audit teams and opening/closing meetings effectively'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'iso-14001-45001-lead-auditor',
    standard: 'ISO 14001 & ISO 45001',
    title: 'ISO 14001 & 45001 Environmental & OH&S Lead Auditor',
    level: 'Lead Auditor',
    duration: '3–5 Days',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'In-house'],
    summary:
      'Equip auditors with practical skills to audit Environmental Management (ISO 14001) and Occupational Health & Safety (ISO 45001) systems.',
    audience: 'EHS managers, sustainability leads, and existing QMS auditors expanding scope.',
    objectives: [
      'Evaluate environmental aspects, hazards, and operational controls',
      'Assess legal compliance frameworks and risk-based thinking',
      'Conduct integrated EMS and OH&S management system audits'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'iso-27001-lead-auditor',
    standard: 'ISO 27001',
    title: 'ISO 27001 Information Security Lead Auditor Course',
    level: 'Lead Auditor',
    duration: '5 Days',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'In-house'],
    summary:
      'Plan, implement, and report thorough audits of an Information Security Management System (ISMS) aligned with ISO/IEC 27001.',
    audience: 'InfoSec officers, IT governance leads, and risk & compliance auditors.',
    objectives: [
      'Audit ISMS scope, Statement of Applicability, and Annex A controls',
      'Assess information security risk assessment methodologies',
      'Evaluate corrective actions and continual improvement evidence'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'iso-9001-internal-auditor',
    standard: 'ISO 9001',
    title: 'ISO 9001 Quality Management Internal Auditor',
    level: 'Internal Auditor',
    duration: '2 Days',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'E-learning', 'In-house'],
    summary:
      'Build internal capability to verify Quality Management System conformance and prepare confidently for third-party assessments.',
    audience: 'Internal audit team members, process owners, and supervisors.',
    objectives: [
      'Prepare practical internal audit checklists and schedules',
      'Gather objective audit evidence through interviews and sampling',
      'Write clear, actionable non-conformity and observation reports'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'iso-45001-internal-auditor',
    standard: 'ISO 45001',
    title: 'ISO 45001 Occupational Health & Safety Internal Auditor',
    level: 'Internal Auditor',
    duration: '2 Days',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'In-house'],
    summary:
      'Develop confidence auditing workplace hazard identification, worker participation, and OH&S management processes.',
    audience: 'Health & safety coordinators, site supervisors, and internal auditors.',
    objectives: [
      'Audit ISO 45001 requirements including worker consultation clauses',
      'Review incident investigation and preventive control effectiveness',
      'Report findings to support safer workplace operations'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'iso-14001-foundation',
    standard: 'ISO 14001',
    title: 'ISO 14001 Environmental Management Foundation',
    level: 'Foundation',
    duration: '1 Day',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'E-learning', 'In-house'],
    summary:
      'An accessible introduction to Environmental Management System structure, lifecycle thinking, and sustainability governance.',
    audience: 'Managers, operations staff, and teams starting an EMS implementation.',
    objectives: [
      'Understand the Annex SL high-level structure and EMS principles',
      'Identify environmental aspects, impacts, and compliance obligations',
      'Clarify leadership and employee roles in environmental performance'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  },
  {
    id: 'custom-professional-development',
    standard: 'Professional Standards',
    title: '[INSERT TRAINING COURSE HERE] — Bespoke & Professional Development',
    level: 'Professional Development',
    duration: '1–3 Days (Custom)',
    deliveryModes: ['Classroom', 'Virtual Classroom', 'E-learning', 'In-house'],
    summary:
      '[INSERT COURSE DESCRIPTION HERE — Tailor this slot for your custom management systems, root-cause analysis, or leadership training workshops.]',
    audience: '[INSERT TARGET AUDIENCE HERE]',
    objectives: [
      '[INSERT LEARNING OBJECTIVE 1 HERE]',
      '[INSERT LEARNING OBJECTIVE 2 HERE]',
      '[INSERT LEARNING OBJECTIVE 3 HERE]'
    ],
    feePlaceholder: '[INSERT COURSE FEE HERE]'
  }
];

export function filterCourses(
  courses: CourseItem[],
  query: string,
  level: CourseLevel,
  delivery: DeliveryMode
): CourseItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return courses.filter((course) => {
    const matchesLevel = level === 'All' || course.level === level;
    const matchesDelivery = delivery === 'All' || course.deliveryModes.includes(delivery);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      course.title.toLowerCase().includes(normalizedQuery) ||
      course.standard.toLowerCase().includes(normalizedQuery) ||
      course.summary.toLowerCase().includes(normalizedQuery) ||
      course.level.toLowerCase().includes(normalizedQuery);
    return matchesLevel && matchesDelivery && matchesQuery;
  });
}

export function nextSlideIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function prevSlideIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function toggleShortlistItem(shortlistIds: string[], courseId: string): string[] {
  if (shortlistIds.includes(courseId)) {
    return shortlistIds.filter((id) => id !== courseId);
  }
  return [...shortlistIds, courseId];
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateQuoteForm(input: QuoteFormInput): ValidationResult {
  const errors: Record<string, string> = {};
  if (!input.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!input.email.trim() || !isValidEmail(input.email)) {
    errors.email = 'Please enter a valid business email address.';
  }
  if (!input.company.trim()) {
    errors.company = 'Please enter your organisation name.';
  }
  if (!input.courseTitle.trim()) {
    errors.courseTitle = 'Please select a training course.';
  }
  if (!Number.isFinite(input.delegates) || input.delegates < 1) {
    errors.delegates = 'Please specify at least 1 delegate.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateNewsletterEmail(email: string): ValidationResult {
  const errors: Record<string, string> = {};
  if (!email.trim() || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
