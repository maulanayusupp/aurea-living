// =============================================================================
// Content data-access layer for non-property structure (nav, stats, amenities,
// journey, testimonials, legal). UI imports from here, not from `config/*`.
// =============================================================================
import { brand, brandStats } from '~/config/brand.config'
import { footerNav, primaryNav, socialChannels } from '~/config/navigation.config'
import { amenities, journeySteps, testimonials } from '~/config/experience.config'
import { complianceSections, privacySections, termsSections } from '~/config/legal.config'
import type {
  Amenity,
  ContactChannel,
  JourneyStep,
  LegalSection,
  NavItem,
  Stat,
  Testimonial,
} from '~/types'

export function getBrand() {
  return brand
}

export function getPrimaryNav(): NavItem[] {
  return primaryNav
}

export function getFooterNav(): NavItem[] {
  return footerNav
}

export function getSocialChannels(): ContactChannel[] {
  return socialChannels
}

export function getBrandStats(): Stat[] {
  return brandStats
}

export function getAmenities(): Amenity[] {
  return amenities
}

export function getJourneySteps(): JourneyStep[] {
  return journeySteps
}

export function getTestimonials(): Testimonial[] {
  return testimonials
}

export function getLegalSections(doc: 'compliance' | 'privacy' | 'terms'): LegalSection[] {
  switch (doc) {
    case 'compliance':
      return complianceSections
    case 'privacy':
      return privacySections
    case 'terms':
      return termsSections
  }
}
