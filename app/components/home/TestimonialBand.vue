<script setup lang="ts">
// Illustrative client impressions. Clearly demonstration content (see
// compliance page). Avatar is an initial monogram tinted per configured hue —
// no fabricated photos of real people.
import { getTestimonials } from '~/services/content.service'

const { t } = useI18n()
const testimonials = getTestimonials()
const { root } = useReveal()

function initial(id: string) {
  return t(`testimonials.items.${id}.name`).charAt(0)
}
// Avatar tint passed as a CSS custom property (value only, styling in SCSS).
function avatarVars(hue: number) {
  return { '--avatar-hue': String(hue) }
}
</script>

<template>
  <section ref="root" class="testi section">
    <div class="container-wide">
      <SectionHeading
        :eyebrow="t('testimonials.eyebrow')"
        :title="t('testimonials.title')"
        align="center"
      />

      <ul class="testi__grid">
        <li v-for="tItem in testimonials" :key="tItem.id" class="testi__card reveal">
          <BaseIcon name="quote" :size="28" class="testi__quote" />
          <p class="testi__text">{{ t(`testimonials.items.${tItem.id}.quote`) }}</p>
          <div class="testi__author">
            <span class="testi__avatar" :style="avatarVars(tItem.hue)">{{ initial(tItem.id) }}</span>
            <div>
              <p class="testi__name">{{ t(`testimonials.items.${tItem.id}.name`) }}</p>
              <p class="testi__role">{{ t(`testimonials.items.${tItem.id}.role`) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testi {
  background: var(--color-surface-alt);
}

.testi__grid {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  grid-template-columns: 1fr;

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testi__card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
}

.testi__quote {
  color: var(--color-gold-400);
}

.testi__text {
  flex: 1;
  font-family: $font-display;
  font-size: 1.3rem;
  line-height: 1.45;
  color: var(--color-emerald-800);
}

.testi__author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-line);
}

.testi__avatar {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-family: $font-display;
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--avatar-hue) 45% 28%);
  background: hsl(var(--avatar-hue) 40% 88%);
}

.testi__name {
  font-weight: 600;
  color: var(--color-emerald-800);
}

.testi__role {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
