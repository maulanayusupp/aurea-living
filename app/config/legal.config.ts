// =============================================================================
// Legal / compliance document STRUCTURE. Each section's heading + body live in
// i18n under the referenced keys, so both locales stay in lockstep. Content is
// written to be honest and non-over-claiming (no false certifications).
// =============================================================================
import type { LegalSection } from '~/types'

export const complianceSections: LegalSection[] = [
  { id: 'overview', titleKey: 'compliance.sections.overview.title', bodyKey: 'compliance.sections.overview.body' },
  { id: 'disclosure', titleKey: 'compliance.sections.disclosure.title', bodyKey: 'compliance.sections.disclosure.body' },
  { id: 'data', titleKey: 'compliance.sections.data.title', bodyKey: 'compliance.sections.data.body' },
  { id: 'payments', titleKey: 'compliance.sections.payments.title', bodyKey: 'compliance.sections.payments.body' },
  { id: 'imagery', titleKey: 'compliance.sections.imagery.title', bodyKey: 'compliance.sections.imagery.body' },
  { id: 'contact', titleKey: 'compliance.sections.contact.title', bodyKey: 'compliance.sections.contact.body' },
]

export const privacySections: LegalSection[] = [
  { id: 'collect', titleKey: 'privacy.sections.collect.title', bodyKey: 'privacy.sections.collect.body' },
  { id: 'use', titleKey: 'privacy.sections.use.title', bodyKey: 'privacy.sections.use.body' },
  { id: 'share', titleKey: 'privacy.sections.share.title', bodyKey: 'privacy.sections.share.body' },
  { id: 'cookies', titleKey: 'privacy.sections.cookies.title', bodyKey: 'privacy.sections.cookies.body' },
  { id: 'rights', titleKey: 'privacy.sections.rights.title', bodyKey: 'privacy.sections.rights.body' },
  { id: 'contact', titleKey: 'privacy.sections.contact.title', bodyKey: 'privacy.sections.contact.body' },
]

export const termsSections: LegalSection[] = [
  { id: 'use', titleKey: 'terms.sections.use.title', bodyKey: 'terms.sections.use.body' },
  { id: 'listings', titleKey: 'terms.sections.listings.title', bodyKey: 'terms.sections.listings.body' },
  { id: 'inquiries', titleKey: 'terms.sections.inquiries.title', bodyKey: 'terms.sections.inquiries.body' },
  { id: 'ip', titleKey: 'terms.sections.ip.title', bodyKey: 'terms.sections.ip.body' },
  { id: 'liability', titleKey: 'terms.sections.liability.title', bodyKey: 'terms.sections.liability.body' },
  { id: 'law', titleKey: 'terms.sections.law.title', bodyKey: 'terms.sections.law.body' },
]
