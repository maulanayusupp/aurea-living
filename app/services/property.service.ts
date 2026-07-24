// =============================================================================
// Property data-access layer. Components/composables call these functions and
// never import `config/properties.config` directly — so the source can move to
// a CMS/API later without touching the UI.
// =============================================================================
import { collections, featureIds, properties } from '~/config/properties.config'
import type { Property, PropertyCollection } from '~/types'

export interface PropertyQuery {
  collection?: PropertyCollection | 'all'
  /** Inclusive price ceiling in IDR; undefined = no ceiling. */
  maxPrice?: number
  /** Minimum bedrooms. */
  minBedrooms?: number
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'area-desc'
}

/** All listings (immutable copy). */
export function getAllProperties(): Property[] {
  return [...properties]
}

/** Listings flagged for the homepage featured collection. */
export function getFeaturedProperties(limit = 6): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit)
}

/** Single listing by slug (or undefined). */
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

/** Slugs for static route prerendering / sitemap. */
export function getPropertySlugs(): string[] {
  return properties.map((p) => p.slug)
}

/** Related listings from the same collection, excluding the current one. */
export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const current = getPropertyBySlug(slug)
  if (!current) return []
  return properties
    .filter((p) => p.slug !== slug && p.collection === current.collection)
    .slice(0, limit)
}

/** Filter + sort listings for the catalogue page. */
export function queryProperties(query: PropertyQuery = {}): Property[] {
  const { collection = 'all', maxPrice, minBedrooms = 0, sort = 'featured' } = query

  let list = properties.filter((p) => {
    if (collection !== 'all' && p.collection !== collection) return false
    if (maxPrice != null && p.price > maxPrice) return false
    if (p.bedrooms < minBedrooms) return false
    return true
  })

  const sorters: Record<NonNullable<PropertyQuery['sort']>, (a: Property, b: Property) => number> = {
    'featured': (a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'area-desc': (a, b) => b.areaBuilt - a.areaBuilt,
  }
  list = [...list].sort(sorters[sort])
  return list
}

export function getCollections(): readonly PropertyCollection[] {
  return collections
}

export function getFeatureIds(): readonly string[] {
  return featureIds
}

/** Price bounds across the catalogue (for the filter slider). */
export function getPriceRange(): { min: number; max: number } {
  const prices = properties.map((p) => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
