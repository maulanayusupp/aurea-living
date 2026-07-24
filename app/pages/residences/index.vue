<script setup lang="ts">
// Residences catalogue (the "shop"). Filter/sort state lives in usePropertyFilters
// (URL-synced); PropertyFilters is fully controlled via v-model bindings.
const { t } = useI18n()

usePageSeo(
  () => t('meta.residences.title'),
  () => t('meta.residences.description'),
)

const {
  collections,
  priceRange,
  collection,
  maxPrice,
  minBedrooms,
  sort,
  results,
  isFiltered,
  reset,
} = usePropertyFilters()
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('residences.eyebrow')"
      :title="t('residences.title')"
      :lead="t('residences.lead')"
    />

    <section class="catalogue section">
      <div class="container-wide catalogue__inner">
        <PropertyFilters
          v-model:collection="collection"
          v-model:max-price="maxPrice"
          v-model:min-bedrooms="minBedrooms"
          v-model:sort="sort"
          :collections="collections"
          :price-range="priceRange"
          :result-count="results.length"
          :is-filtered="isFiltered"
          @reset="reset"
        />

        <PropertyGrid :properties="results" />
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style lang="scss" scoped>
.catalogue__inner {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3.5rem);
}
</style>
