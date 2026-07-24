<script setup lang="ts">
// Property detail page. Resolves the listing by slug (404 otherwise), renders
// gallery + description + features + sticky inquiry panel + related listings.
import {
  getPropertyBySlug,
  getRelatedProperties,
} from '~/services/property.service'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))
const property = computed(() => getPropertyBySlug(slug.value))

// 404 for unknown slugs.
if (!property.value) {
  throw createError({ statusCode: 404, statusMessage: 'Residence not found', fatal: true })
}

const p = property.value
const related = getRelatedProperties(slug.value, 3)
const images = computed(() => [p.poster, ...p.gallery])
const nameKey = `properties.items.${p.id}`

usePageSeo(
  () => t(`${nameKey}.name`),
  () => t(`${nameKey}.description`),
  // Rasterized OG card (crawlers don't render SVG posters). See scripts/generate-og.mjs.
  { image: `/og/${p.slug}.png`, type: 'product' },
)

useSchemaOrg([
  defineProduct({
    name: () => t(`${nameKey}.name`),
    description: () => t(`${nameKey}.description`),
    image: p.poster,
  }),
])
</script>

<template>
  <div v-if="property" class="detail">
    <div class="container-wide detail__crumbs">
      <NuxtLink :to="localePath('/residences')" class="detail__back">
        <BaseIcon name="chevron-left" :size="16" /> {{ t('detail.back') }}
      </NuxtLink>
    </div>

    <header class="container-wide detail__head">
      <div class="detail__head-main">
        <div class="detail__badges">
          <BaseBadge tone="gold">{{ t(`properties.collections.${p.collection}`) }}</BaseBadge>
          <BaseBadge tone="emerald" dot>{{ t(`properties.status.${p.status}`) }}</BaseBadge>
        </div>
        <h1 class="detail__title">{{ t(`${nameKey}.name`) }}</h1>
        <p class="detail__loc">
          <BaseIcon name="map-pin" :size="18" /> {{ t(`${nameKey}.location`) }}
        </p>
      </div>
    </header>

    <div class="container-wide detail__grid">
      <div class="detail__col">
        <PropertyGallery :images="images" :alt="t(`${nameKey}.name`)" />

        <section class="detail__block">
          <h2 class="detail__block-title">{{ t('detail.about') }}</h2>
          <p class="detail__prose">{{ t(`${nameKey}.description`) }}</p>
          <p class="detail__prose">{{ t(`${nameKey}.detail`) }}</p>
        </section>

        <section class="detail__block">
          <h2 class="detail__block-title">{{ t('detail.features') }}</h2>
          <ul class="detail__features">
            <li v-for="f in p.features" :key="f">
              <BaseIcon name="check" :size="18" />
              {{ t(`properties.features.${f}`) }}
            </li>
          </ul>
        </section>
      </div>

      <div class="detail__col detail__col--side">
        <InquiryPanel :property="p" />
      </div>
    </div>

    <section v-if="related.length" class="detail__related section">
      <div class="container-wide">
        <SectionHeading :eyebrow="t('detail.relatedEyebrow')" :title="t('detail.related')" />
        <div class="detail__related-grid">
          <PropertyCard v-for="r in related" :key="r.id" :property="r" />
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style lang="scss" scoped>
.detail__crumbs {
  padding-top: calc(var(--header-h) + 1.5rem);
}

.detail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-soft);

  &:hover {
    color: var(--color-accent-strong);
  }
}

.detail__head {
  padding-block: 1.5rem 2.5rem;
}

.detail__badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail__title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
}

.detail__loc {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

.detail__grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;

  @include respond-to('lg') {
    grid-template-columns: 1.6fr 0.9fr;
  }
}

.detail__col {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
}

.detail__block-title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-line);
}

.detail__prose {
  color: var(--color-text-soft);
  line-height: 1.75;
  margin-bottom: 1rem;
  max-width: 44rem;
}

.detail__features {
  display: grid;
  gap: 0.85rem 1.5rem;
  grid-template-columns: 1fr;

  @include respond-to('sm') {
    grid-template-columns: 1fr 1fr;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--color-text-soft);
  }

  :deep(.icon) {
    color: var(--color-accent-strong);
    flex-shrink: 0;
  }
}

.detail__related-grid {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  margin-top: 2.5rem;
  grid-template-columns: 1fr;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
