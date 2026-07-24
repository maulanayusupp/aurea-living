// =============================================================================
// Catalogue filter state for the residences page. Keeps filter/sort state in
// the URL query so shared links reproduce the same view, and derives the
// filtered list through the property.service (never touches config directly).
// =============================================================================
import {
  getCollections,
  getPriceRange,
  queryProperties,
} from '~/services/property.service'
import type { PropertyCollection } from '~/types'

export function usePropertyFilters() {
  const route = useRoute()
  const router = useRouter()
  const { min, max } = getPriceRange()

  const collection = ref<PropertyCollection | 'all'>(
    (route.query.collection as PropertyCollection) || 'all',
  )
  const maxPrice = ref<number>(Number(route.query.maxPrice) || max)
  const minBedrooms = ref<number>(Number(route.query.beds) || 0)
  const sort = ref<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>(
    (route.query.sort as 'featured') || 'featured',
  )

  const results = computed(() =>
    queryProperties({
      collection: collection.value,
      maxPrice: maxPrice.value,
      minBedrooms: minBedrooms.value,
      sort: sort.value,
    }),
  )

  const isFiltered = computed(
    () =>
      collection.value !== 'all' ||
      minBedrooms.value > 0 ||
      maxPrice.value < max ||
      sort.value !== 'featured',
  )

  // Reflect state in the URL (replace, so back-button isn't spammed).
  watch([collection, maxPrice, minBedrooms, sort], () => {
    router.replace({
      query: {
        ...(collection.value !== 'all' ? { collection: collection.value } : {}),
        ...(maxPrice.value < max ? { maxPrice: String(maxPrice.value) } : {}),
        ...(minBedrooms.value > 0 ? { beds: String(minBedrooms.value) } : {}),
        ...(sort.value !== 'featured' ? { sort: sort.value } : {}),
      },
    })
  })

  function reset() {
    collection.value = 'all'
    maxPrice.value = max
    minBedrooms.value = 0
    sort.value = 'featured'
  }

  return {
    collections: getCollections(),
    priceRange: { min, max },
    collection,
    maxPrice,
    minBedrooms,
    sort,
    results,
    isFiltered,
    reset,
  }
}
