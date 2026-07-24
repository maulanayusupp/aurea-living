<script setup lang="ts">
// About page — the studio's philosophy, values, and honest positioning.
import { getBrandStats } from '~/services/content.service'

const { t } = useI18n()
const stats = getBrandStats()
const { root } = useReveal()

usePageSeo(
  () => t('meta.about.title'),
  () => t('meta.about.description'),
)

const values = ['craft', 'transparency', 'stewardship', 'service'] as const
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="t('about.eyebrow')"
      :title="t('about.title')"
      :lead="t('about.lead')"
    />

    <section class="section">
      <div class="container about__intro">
        <p class="about__statement reveal">{{ t('about.statement') }}</p>
        <p class="about__body reveal">{{ t('about.body') }}</p>
      </div>
    </section>

    <section class="about__stats">
      <div class="container-wide about__stats-grid">
        <StatCounter
          v-for="s in stats"
          :key="s.id"
          :value="s.value"
          :label="t(s.labelKey)"
          tone="dark"
        />
      </div>
    </section>

    <section class="section">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="t('about.valuesEyebrow')"
          :title="t('about.valuesTitle')"
          align="center"
        />
        <ul class="about__values">
          <li v-for="(v, i) in values" :key="v" class="about__value reveal">
            <span class="about__value-num">0{{ i + 1 }}</span>
            <h3 class="about__value-title">{{ t(`about.values.${v}.title`) }}</h3>
            <p class="about__value-desc">{{ t(`about.values.${v}.desc`) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style lang="scss" scoped>
.about__intro {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about__statement {
  font-family: $font-display;
  font-size: clamp(1.6rem, 3.2vw, 2.5rem);
  line-height: 1.3;
  color: var(--color-emerald-800);
  max-width: 40rem;
}

.about__body {
  color: var(--color-text-soft);
  line-height: 1.8;
  max-width: 42rem;
  font-size: 1.08rem;
}

.about__stats {
  background: var(--color-emerald-800);
  padding-block: clamp(3rem, 6vw, 5rem);
}

.about__stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem clamp(1rem, 4vw, 3rem);

  @include respond-to('md') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.about__values {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  grid-template-columns: 1fr;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.about__value {
  padding: 1.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition: transform var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out);

  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-gold-400);
  }
}

.about__value-num {
  font-family: $font-display;
  font-size: 1.5rem;
  color: var(--color-gold-500);
}

.about__value-title {
  font-size: 1.3rem;
  margin: 0.75rem 0 0.5rem;
}

.about__value-desc {
  color: var(--color-text-soft);
  line-height: 1.6;
  font-size: 0.95rem;
}
</style>
