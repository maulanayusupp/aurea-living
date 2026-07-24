// =============================================================================
// Homepage "experience" content: signature amenities, acquisition journey, and
// testimonials. STRUCTURE only — copy resolves via i18n keys.
// =============================================================================
import type { Amenity, JourneyStep, Testimonial } from '~/types'

/** Signature living experiences highlighted on the homepage. */
export const amenities: Amenity[] = [
  { id: 'architecture', icon: 'compass', titleKey: 'amenities.architecture.title', descKey: 'amenities.architecture.desc' },
  { id: 'materials', icon: 'gem', titleKey: 'amenities.materials.title', descKey: 'amenities.materials.desc' },
  { id: 'wellness', icon: 'leaf', titleKey: 'amenities.wellness.title', descKey: 'amenities.wellness.desc' },
  { id: 'smart', icon: 'bolt', titleKey: 'amenities.smart.title', descKey: 'amenities.smart.desc' },
  { id: 'privacy', icon: 'shield', titleKey: 'amenities.privacy.title', descKey: 'amenities.privacy.desc' },
  { id: 'concierge', icon: 'bell', titleKey: 'amenities.concierge.title', descKey: 'amenities.concierge.desc' },
]

/** Step-by-step acquisition journey (no financial/legal guarantees implied). */
export const journeySteps: JourneyStep[] = [
  { id: 'discover', index: '01', titleKey: 'journey.discover.title', descKey: 'journey.discover.desc' },
  { id: 'visit', index: '02', titleKey: 'journey.visit.title', descKey: 'journey.visit.desc' },
  { id: 'reserve', index: '03', titleKey: 'journey.reserve.title', descKey: 'journey.reserve.desc' },
  { id: 'move', index: '04', titleKey: 'journey.move.title', descKey: 'journey.move.desc' },
]

/** Testimonials. Names + quotes live in i18n `testimonials.items.<id>.*`.
 *  These are illustrative demo statements, not verified client reviews. */
export const testimonials: Testimonial[] = [
  { id: 'nadia', hue: 158 },
  { id: 'reza', hue: 205 },
  { id: 'sari', hue: 44 },
]
