<script setup lang="ts">
// Compact hero for inner pages (about, contact, legal). Emerald background with
// a soft gold aura. Breadcrumb-style eyebrow + title + lead.
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
  }>(),
  {},
)
</script>

<template>
  <header class="page-hero">
    <div class="page-hero__aura" aria-hidden="true" />
    <div class="container page-hero__inner">
      <p v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="lead" class="page-hero__lead">{{ lead }}</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  background: var(--color-emerald-800);
  color: var(--color-on-dark);
  padding-block: clamp(7rem, 12vw, 10rem) clamp(3rem, 6vw, 5rem);
  overflow: hidden;
}

.page-hero__aura {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 80% at 85% 0%, rgb(201 162 75 / 0.28), transparent 60%),
    radial-gradient(50% 60% at 0% 100%, rgb(63 124 106 / 0.35), transparent 65%);
  pointer-events: none;
}

.page-hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 48rem;
}

.page-hero__eyebrow {
  @include eyebrow;
  color: var(--color-gold-400);
}

.page-hero__title {
  color: var(--color-on-dark);
  font-size: clamp(2.5rem, 6vw, 4.25rem);
}

.page-hero__lead {
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  color: var(--color-on-dark-soft);
  max-width: 40rem;
}
</style>
