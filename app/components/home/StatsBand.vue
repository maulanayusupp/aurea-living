<script setup lang="ts">
// A slim band of headline figures. Values are illustrative (see brand.config).
import { getBrandStats } from '~/services/content.service'

const { t } = useI18n()
const stats = getBrandStats()
const { root } = useReveal()
</script>

<template>
  <section ref="root" class="stats">
    <div class="container-wide stats__inner reveal">
      <StatCounter
        v-for="s in stats"
        :key="s.id"
        :value="s.value"
        :label="t(s.labelKey)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  background: var(--color-surface-alt);
  border-block: 1px solid var(--color-line);
}

.stats__inner {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem clamp(1rem, 4vw, 3rem);
  padding-block: clamp(2.5rem, 5vw, 4rem);

  @include respond-to('md') {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
