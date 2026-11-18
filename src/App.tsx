import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { PageSections } from './components/PageSections';
import { Footer } from './components/Footer';
import {
  CatalogueModal,
  QuoteModal,
  JourneyModal,
  ShortlistModal,
  UtilityModal
} from './components/Modals';
import { CourseLevel, DeliveryMode, toggleShortlistItem, COURSE_CATALOGUE } from './utils/trainingLogic';

const HERO_IMAGE = '/src/assets/images/hero_iso_training_1795024722317.jpg';
const INTRO_IMAGE = '/src/assets/images/intro_workshop_session_1795024722782.jpg';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);

  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [catalogueQuery, setCatalogueQuery] = useState('');
  const [catalogueLevel, setCatalogueLevel] = useState<CourseLevel>('All');
  const [catalogueDelivery, setCatalogueDelivery] = useState<DeliveryMode>('All');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteCourse, setQuoteCourse] = useState(COURSE_CATALOGUE[0].title);
  const [quoteDelivery, setQuoteDelivery] = useState<Exclude<DeliveryMode, 'All'>>('In-house');

  const [journeyOpen, setJourneyOpen] = useState(false);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const [utilityMode, setUtilityMode] = useState<'portal' | 'newsletter' | null>(null);

  const openCatalogue = (
    level: CourseLevel = 'All',
    standardQuery = '',
    delivery: DeliveryMode = 'All',
    courseId: string | null = null
  ) => {
    setCatalogueLevel(level);
    setCatalogueQuery(standardQuery);
    setCatalogueDelivery(delivery);
    setSelectedCourseId(courseId);
    setCatalogueOpen(true);
  };

  const openQuoteModal = (
    courseTitle = COURSE_CATALOGUE[0].title,
    deliveryMode: Exclude<DeliveryMode, 'All'> = 'In-house'
  ) => {
    setCatalogueOpen(false);
    setShortlistOpen(false);
    setQuoteCourse(courseTitle);
    setQuoteDelivery(deliveryMode);
    setQuoteOpen(true);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(q) => openCatalogue('All', q, 'All', null)}
        shortlistCount={shortlistIds.length}
        onOpenShortlist={() => setShortlistOpen(true)}
        onOpenPortal={() => setUtilityMode('portal')}
        onOpenQuote={() => openQuoteModal()}
        onOpenCatalogue={(level = 'All', std = '') => openCatalogue(level, std, 'All', null)}
      />

      <main className="flex-1">
        <HeroCarousel
          heroImageSrc={HERO_IMAGE}
          onViewCourse={(courseId) => openCatalogue('All', '', 'All', courseId)}
          onBrowseCourses={(std = '') => openCatalogue('All', std, 'All', null)}
        />

        <PageSections
          introImageSrc={INTRO_IMAGE}
          onBrowseByDelivery={(mode) => openCatalogue('All', '', mode, null)}
          onOpenJourneyModal={() => setJourneyOpen(true)}
        />
      </main>

      <Footer
        onOpenCatalogue={(level = 'All', std = '', delivery = 'All') =>
          openCatalogue(level, std, delivery, null)
        }
        onOpenQuote={() => openQuoteModal()}
        onOpenJourney={() => setJourneyOpen(true)}
        onOpenNewsletter={() => setUtilityMode('newsletter')}
        onOpenPortal={() => setUtilityMode('portal')}
      />

      <CatalogueModal
        open={catalogueOpen}
        onClose={() => setCatalogueOpen(false)}
        initialQuery={catalogueQuery}
        initialLevel={catalogueLevel}
        initialDelivery={catalogueDelivery}
        selectedCourseId={selectedCourseId}
        shortlistIds={shortlistIds}
        onToggleShortlist={(id) => setShortlistIds((prev) => toggleShortlistItem(prev, id))}
        onRequestQuote={(title, mode) => openQuoteModal(title, mode || 'In-house')}
      />

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultCourse={quoteCourse}
        defaultDelivery={quoteDelivery}
      />

      <JourneyModal
        open={journeyOpen}
        onClose={() => setJourneyOpen(false)}
        onSelectLevel={(lvl) => {
          setJourneyOpen(false);
          openCatalogue(lvl, '', 'All', null);
        }}
      />

      <ShortlistModal
        open={shortlistOpen}
        onClose={() => setShortlistOpen(false)}
        shortlistIds={shortlistIds}
        onRemove={(id) => setShortlistIds((prev) => toggleShortlistItem(prev, id))}
        onRequestQuote={(title) => openQuoteModal(title)}
      />

      <UtilityModal mode={utilityMode} onClose={() => setUtilityMode(null)} />
    </div>
  );
}
