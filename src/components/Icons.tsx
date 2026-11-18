import React from 'react';

export function BrandMark({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 ${
        light ? 'bg-white rounded-[4px] p-1 w-12 h-10' : 'w-12 h-11 sm:w-14 sm:h-12'
      } ${className}`}
    >
      <img
        src="/assets/aistudio/photo_2026-11-18_19-43-09_6b50232c.jpg"
        alt="Pst Professional Standards And Training logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain scale-[1.32]"
      />
    </span>
  );
}

export function ClassroomVenueIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" aria-hidden="true">
      <rect x="8" y="14" width="24" height="40" stroke="#001C40" strokeWidth="2.6" />
      <rect x="32" y="24" width="24" height="30" stroke="#3C2869" strokeWidth="2.6" />
      <rect x="14" y="21" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="22" y="21" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="14" y="30" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="22" y="30" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <path d="M17 54V43H23V54" stroke="#001C40" strokeWidth="2.4" />
      <rect x="38" y="31" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="46" y="31" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="38" y="40" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
      <rect x="46" y="40" width="5" height="5" stroke="#0073C4" strokeWidth="2" />
    </svg>
  );
}

export function OnlineLearningIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" aria-hidden="true">
      <rect x="8" y="12" width="48" height="34" rx="2" stroke="#001C40" strokeWidth="2.6" />
      <path d="M22 54H42M32 46V54" stroke="#001C40" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="25" r="5" stroke="#3C2869" strokeWidth="2.4" />
      <path d="M22 39C22 34.5 26.5 32 32 32C37.5 32 42 34.5 42 39" stroke="#0073C4" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function InHouseTrainingIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" aria-hidden="true">
      <circle cx="32" cy="18" r="5" stroke="#001C40" strokeWidth="2.5" />
      <circle cx="16" cy="24" r="4" stroke="#3C2869" strokeWidth="2.3" />
      <circle cx="48" cy="24" r="4" stroke="#3C2869" strokeWidth="2.3" />
      <path d="M23 36C23 31.5 27 28 32 28C37 28 41 31.5 41 36" stroke="#001C40" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 38C10 34.5 12.7 32 16 32C19.3 32 22 34.5 22 38" stroke="#0073C4" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M42 38C42 34.5 44.7 32 48 32C51.3 32 54 34.5 54 38" stroke="#0073C4" strokeWidth="2.3" strokeLinecap="round" />
      <rect x="14" y="42" width="36" height="8" rx="1.5" stroke="#001C40" strokeWidth="2.4" />
    </svg>
  );
}

export function BenefitIcon({ index }: { index: number }) {
  const stroke = '#3C2869';
  const accent = '#001C40';
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="6" y="8" width="36" height="26" stroke={stroke} strokeWidth="2.4" />
          <circle cx="18" cy="19" r="4" stroke={accent} strokeWidth="2.2" />
          <path d="M12 29C12 25.5 14.7 23.5 18 23.5C21.3 23.5 24 25.5 24 29" stroke={accent} strokeWidth="2.2" />
          <path d="M28 17H36M28 23H36" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 40L24 34L30 40" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="6" y="10" width="36" height="24" rx="1.5" stroke={stroke} strokeWidth="2.4" />
          <path d="M18 40H30M24 34V40" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M14 20H24M14 25H34" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="8" y="8" width="26" height="20" stroke={stroke} strokeWidth="2.4" />
          <circle cx="16" cy="34" r="3.5" stroke={accent} strokeWidth="2.2" />
          <circle cx="28" cy="34" r="3.5" stroke={accent} strokeWidth="2.2" />
          <circle cx="38" cy="24" r="3.5" stroke={accent} strokeWidth="2.2" />
          <path d="M14 16H28M14 21H22" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="6" y="12" width="36" height="24" rx="2" stroke={stroke} strokeWidth="2.4" />
          <circle cx="24" cy="24" r="6" stroke={accent} strokeWidth="2.2" />
          <path d="M11 18H13M35 30H37" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="8" y="8" width="32" height="32" stroke={stroke} strokeWidth="2.4" />
          <circle cx="24" cy="19" r="5" stroke={accent} strokeWidth="2.2" />
          <path d="M14 35C14 29.8 18.5 26.5 24 26.5C29.5 26.5 34 29.8 34 35" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <path d="M24 7L29 17.5L40.5 19L32 27L34 38.5L24 33L14 38.5L16 27L7.5 19L19 17.5L24 7Z" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M19 24L22.5 27.5L30 20" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <path d="M12 24C12 16.8 17.4 11 24 11C30.6 11 36 16.8 36 24" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="8" y="22" width="6" height="11" rx="2" stroke={accent} strokeWidth="2.2" />
          <rect x="34" y="22" width="6" height="11" rx="2" stroke={accent} strokeWidth="2.2" />
          <path d="M36 33C36 36.5 32.5 38 27 38H24" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 7:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <rect x="8" y="10" width="32" height="28" stroke={stroke} strokeWidth="2.4" />
          <path d="M15 19H25M15 26H33M15 32H28" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M29 18L31.5 20.5L36 16" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
          <path d="M10 38V22H18V38H10Z" stroke={accent} strokeWidth="2.4" />
          <path d="M20 38V16H28V38H20Z" stroke={stroke} strokeWidth="2.4" />
          <path d="M30 38V10H38V38H30Z" stroke={accent} strokeWidth="2.4" />
        </svg>
      );
  }
}
