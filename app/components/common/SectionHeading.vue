<script setup lang="ts">
// Reusable section header: eyebrow + title + optional lead. `align` and
// `tone` (light/dark backgrounds) adjust presentation.
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
    as?: 'h2' | 'h1' | 'h3'
  }>(),
  { align: 'left', tone: 'light', as: 'h2' },
)
</script>

<template>
  <div class="heading" :class="[`heading--${align}`, `heading--${tone}`]">
    <p v-if="eyebrow" class="heading__eyebrow">{{ eyebrow }}</p>
    <component :is="as" class="heading__title">{{ title }}</component>
    <p v-if="lead" class="heading__lead t-lead">{{ lead }}</p>
  </div>
</template>

<style lang="scss" scoped>
.heading {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  max-width: 46rem;
}

.heading--center {
  align-items: center;
  text-align: center;
  margin-inline: auto;
}

.heading__eyebrow {
  @include eyebrow;
  color: var(--color-accent-strong);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: currentColor;
  }
}

.heading--center .heading__eyebrow::after {
  content: '';
  width: 2rem;
  height: 1px;
  background: currentColor;
}

.heading__lead {
  margin-top: 0.25rem;
}

.heading--dark {
  .heading__title {
    color: var(--color-on-dark);
  }
  .heading__lead {
    color: var(--color-on-dark-soft);
  }
  .heading__eyebrow {
    color: var(--color-gold-400);
  }
}
</style>
