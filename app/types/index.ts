// =============================================================================
// Shared TypeScript types. Config holds STRUCTURE (ids, numbers, media, routes);
// all human-readable text lives in i18n keyed by these ids.
// =============================================================================

export type LocaleCode = 'id' | 'en'

/** Navigation entry — `labelKey` resolves against i18n `nav.*`. */
export interface NavItem {
  id: string
  labelKey: string
  to: string
  /** Anchor within the target route, if any. */
  hash?: string
}

/** A property listing. `nameKey`/`taglineKey`/`descKey`/`locationKey` resolve
 *  against i18n `properties.items.<id>.*`. Numbers/media stay in config. */
export interface Property {
  id: string
  slug: string
  /** i18n key namespace: `properties.items.<id>`. */
  collection: PropertyCollection
  status: PropertyStatus
  /** Price in IDR (whole rupiah). Formatted at render time per locale. */
  price: number
  bedrooms: number
  bathrooms: number
  /** Built-up area in square metres. */
  areaBuilt: number
  /** Land area in square metres. */
  areaLand: number
  /** Poster image (generated SVG) shown on cards + gallery hero. */
  poster: string
  /** Additional gallery images. */
  gallery: string[]
  /** Feature ids resolving to i18n `properties.features.<id>`. */
  features: string[]
  /** Highlight this listing in the featured home collection. */
  featured: boolean
  /** Accent hue (deg) used for the poster + subtle card accent. */
  hue: number
}

export type PropertyCollection = 'villa' | 'residence' | 'penthouse' | 'estate'
export type PropertyStatus = 'available' | 'ready' | 'offplan' | 'sold'

/** Homepage / detail statistic. */
export interface Stat {
  id: string
  value: string
  labelKey: string
}

/** Amenity / experience item. Icon is a BaseIcon name. */
export interface Amenity {
  id: string
  icon: string
  titleKey: string
  descKey: string
}

/** A step in the acquisition journey. */
export interface JourneyStep {
  id: string
  index: string
  titleKey: string
  descKey: string
}

/** Client testimonial. Text lives in i18n `testimonials.items.<id>.*`. */
export interface Testimonial {
  id: string
  hue: number
}

/** Contact / social channel. */
export interface ContactChannel {
  id: string
  icon: string
  labelKey: string
  value: string
  href: string
  primary?: boolean
}

/** Legal / compliance document section. */
export interface LegalSection {
  id: string
  titleKey: string
  bodyKey: string
}
