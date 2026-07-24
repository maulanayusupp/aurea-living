<script setup lang="ts">
// Signature living experiences (amenities) on an emerald background. Anchor
// target #experience for the primary nav. Icon + title + description cards.
import { getAmenities } from '~/services/content.service'

const { t } = useI18n()
const amenities = getAmenities()
const { root } = useReveal()
</script>

<template>
  <section id="experience" ref="root" class="exp section">
    <div class="exp__aura" aria-hidden="true" />
    <div class="container-wide exp__inner">
      <SectionHeading
        :eyebrow="t('amenities.eyebrow')"
        :title="t('amenities.title')"
        :lead="t('amenities.lead')"
        tone="dark"
        align="center"
      />

      <ul class="exp__grid">
        <li v-for="a in amenities" :key="a.id" class="exp__card reveal">
          <span class="exp__icon"><BaseIcon :name="a.icon" :size="26" /></span>
          <h3 class="exp__card-title">{{ t(a.titleKey) }}</h3>
          <p class="exp__card-desc">{{ t(a.descKey) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.exp {
  position: relative;
  background: var(--color-emerald-800);
  color: var(--color-on-dark);
  overflow: hidden;
}

.exp__aura {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(50% 50% at 90% 10%, rgb(201 162 75 / 0.16), transparent 60%),
    radial-gradient(50% 50% at 5% 90%, rgb(63 124 106 / 0.35), transparent 60%);
  pointer-events: none;
}

.exp__inner {
  position: relative;
}

.exp__grid {
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  grid-template-columns: 1fr;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.exp__card {
  padding: clamp(1.5rem, 2.5vw, 2rem);
  border: 1px solid var(--color-line-dark);
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 0.03);
  transition: transform var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out), background var(--dur) var(--ease-out);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-gold-400);
    background: rgb(255 255 255 / 0.05);
  }
}

.exp__icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-bottom: 1.25rem;
  color: var(--color-gold-400);
  background: rgb(201 162 75 / 0.12);
  border: 1px solid rgb(201 162 75 / 0.25);
}

.exp__card-title {
  color: var(--color-on-dark);
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.exp__card-desc {
  color: var(--color-on-dark-soft);
  line-height: 1.65;
}
</style>
