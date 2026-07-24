<script setup lang="ts">
// The acquisition journey — four honest steps. No financial/legal guarantees;
// framed as guidance, with a WhatsApp advisor CTA.
import { getJourneySteps } from '~/services/content.service'

const { t } = useI18n()
const { whatsappUrl } = useContact()
const steps = getJourneySteps()
const { root } = useReveal()
</script>

<template>
  <section ref="root" class="process section">
    <div class="container-wide process__inner">
      <div class="process__intro reveal">
        <SectionHeading
          :eyebrow="t('journey.eyebrow')"
          :title="t('journey.title')"
          :lead="t('journey.lead')"
        />
        <BaseButton :href="whatsappUrl()" variant="dark" icon="whatsapp" class="process__cta">
          {{ t('cta.talkAdvisor') }}
        </BaseButton>
      </div>

      <ol class="process__steps">
        <li v-for="s in steps" :key="s.id" class="process__step reveal">
          <span class="process__num">{{ s.index }}</span>
          <div>
            <h3 class="process__step-title">{{ t(s.titleKey) }}</h3>
            <p class="process__step-desc">{{ t(s.descKey) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process__inner {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);

  @include respond-to('lg') {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: start;
  }
}

.process__intro {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include respond-to('lg') {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
  }
}

.process__cta {
  align-self: flex-start;
}

.process__steps {
  display: flex;
  flex-direction: column;
}

.process__step {
  display: flex;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-top: 1px solid var(--color-line);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}

.process__num {
  font-family: $font-display;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-gold-500);
  flex-shrink: 0;
  min-width: 3rem;
}

.process__step-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.process__step-desc {
  color: var(--color-text-soft);
  line-height: 1.65;
  max-width: 34rem;
}
</style>
