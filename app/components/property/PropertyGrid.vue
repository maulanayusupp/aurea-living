<script setup lang="ts">
// Responsive grid of PropertyCards with a scroll-reveal wrapper. Emits nothing;
// purely presentational. Shows an empty state when the list is empty.
import type { Property } from '~/types'

defineProps<{ properties: Property[] }>()

const { t } = useI18n()
const { root } = useReveal()
</script>

<template>
  <div ref="root">
    <div v-if="properties.length" class="pgrid">
      <PropertyCard v-for="p in properties" :key="p.id" :property="p" />
    </div>
    <div v-else class="pgrid__empty">
      <BaseIcon name="compass" :size="40" />
      <p>{{ t('properties.empty') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pgrid {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  grid-template-columns: 1fr;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pgrid__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 1rem;
  text-align: center;
  color: var(--color-text-muted);

  :deep(.icon) {
    color: var(--color-gold-400);
  }
}
</style>
