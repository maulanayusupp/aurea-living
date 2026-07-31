<script setup lang="ts">
// Closing call-to-action. Emerald canvas, gold headline accent, email +
// contact-page CTAs. Reused on home and inner pages.
const { t } = useI18n()
const localePath = useLocalePath()
const { emailUrl } = useContact()
</script>

<template>
  <section class="cta">
    <div class="cta__aura" aria-hidden="true" />
    <div class="container cta__inner">
      <p class="cta__eyebrow">{{ t('ctaBand.eyebrow') }}</p>
      <h2 class="cta__title">
        {{ t('ctaBand.title') }}
        <em>{{ t('ctaBand.titleEm') }}</em>
      </h2>
      <p class="cta__lead">{{ t('ctaBand.lead') }}</p>
      <div class="cta__actions">
        <BaseButton :href="emailUrl()" size="lg" icon="mail">{{ t('cta.email') }}</BaseButton>
        <BaseButton :to="localePath('/contact')" variant="outline" size="lg" class="cta__alt">
          {{ t('cta.contactUs') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta {
  position: relative;
  background: var(--color-emerald-900);
  color: var(--color-on-dark);
  padding-block: clamp(4.5rem, 9vw, 8rem);
  overflow: hidden;
}

.cta__aura {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(45% 60% at 50% 0%, rgb(201 162 75 / 0.22), transparent 65%),
    radial-gradient(60% 80% at 50% 120%, rgb(63 124 106 / 0.4), transparent 60%);
  pointer-events: none;
}

.cta__inner {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cta__eyebrow {
  @include eyebrow;
  color: var(--color-gold-400);
}

.cta__title {
  color: var(--color-on-dark);
  font-size: clamp(2.25rem, 5.5vw, 4rem);
  max-width: 20ch;

  em {
    font-style: italic;
    color: var(--color-gold-400);
  }
}

.cta__lead {
  max-width: 40rem;
  color: var(--color-on-dark-soft);
  font-size: clamp(1.02rem, 1.5vw, 1.2rem);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.cta__alt {
  border-color: var(--color-line-dark);
  color: var(--color-on-dark);

  &:hover {
    background: var(--color-on-dark);
    color: var(--color-emerald-800);
    border-color: var(--color-on-dark);
  }
}
</style>
