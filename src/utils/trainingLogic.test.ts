import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COURSE_CATALOGUE,
  filterCourses,
  nextSlideIndex,
  prevSlideIndex,
  toggleShortlistItem,
  validateQuoteForm,
  validateNewsletterEmail
} from './trainingLogic';

test('filterCourses filters by search query, level, and delivery mode', () => {
  const byQuery = filterCourses(COURSE_CATALOGUE, '9001', 'All', 'All');
  assert.equal(byQuery.length, 2);

  const byLevel = filterCourses(COURSE_CATALOGUE, '', 'Lead Auditor', 'All');
  assert.equal(byLevel.length, 3);

  const byDelivery = filterCourses(COURSE_CATALOGUE, '', 'All', 'E-learning');
  assert.equal(byDelivery.length, 3);

  const empty = filterCourses(COURSE_CATALOGUE, 'nonexistent-xyz', 'All', 'All');
  assert.equal(empty.length, 0);
});

test('carousel slide index helpers wrap around cleanly', () => {
  assert.equal(nextSlideIndex(0, 4), 1);
  assert.equal(nextSlideIndex(3, 4), 0);
  assert.equal(prevSlideIndex(0, 4), 3);
  assert.equal(prevSlideIndex(2, 4), 1);
  assert.equal(nextSlideIndex(0, 0), 0);
});

test('toggleShortlistItem adds and removes course IDs idempotently', () => {
  const step1 = toggleShortlistItem([], 'iso-9001-lead-auditor');
  assert.deepEqual(step1, ['iso-9001-lead-auditor']);

  const step2 = toggleShortlistItem(step1, 'iso-27001-lead-auditor');
  assert.deepEqual(step2, ['iso-9001-lead-auditor', 'iso-27001-lead-auditor']);

  const step3 = toggleShortlistItem(step2, 'iso-9001-lead-auditor');
  assert.deepEqual(step3, ['iso-27001-lead-auditor']);
});

test('validateQuoteForm catches missing or invalid fields and accepts valid input', () => {
  const invalid = validateQuoteForm({
    fullName: '',
    email: 'not-an-email',
    phone: '',
    company: '',
    courseTitle: '',
    deliveryMode: 'In-house',
    delegates: 0,
    notes: ''
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.courseTitle);
  assert.ok(invalid.errors.delegates);

  const valid = validateQuoteForm({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+44 1234 567890',
    company: 'Northgate Manufacturing Ltd',
    courseTitle: 'ISO 9001 Quality Management Lead Auditor Course',
    deliveryMode: 'In-house',
    delegates: 8,
    notes: 'Prefer Q2 dates.'
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateNewsletterEmail validates email syntax', () => {
  assert.equal(validateNewsletterEmail('bad').valid, false);
  assert.equal(validateNewsletterEmail('team@company.co.uk').valid, true);
});
