<script setup lang="ts">
// "Featured residences" section — a curated grid of highlighted listings with
// a link through to the full catalogue.
import { getFeaturedProperties } from '~/services/property.service'

const { t } = useI18n()
const localePath = useLocalePath()
const featured = getFeaturedProperties(6)
</script>

<template>
  <section id="collection" class="collection section">
    <div class="container-wide">
      <div class="collection__head">
        <SectionHeading
          :eyebrow="t('collection.eyebrow')"
          :title="t('collection.title')"
          :lead="t('collection.lead')"
        />
        <BaseButton :to="localePath('/residences')" variant="ghost" icon-right="arrow-up-right" class="collection__all">
          {{ t('collection.viewAll') }}
        </BaseButton>
      </div>

      <PropertyGrid :properties="featured" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.collection__head {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.collection__all {
  flex-shrink: 0;
}
</style>
