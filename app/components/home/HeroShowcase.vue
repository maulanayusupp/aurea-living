<script setup lang="ts">
// Homepage hero. Editorial serif headline over ivory, with an auto-rotating
// showcase of featured residences and a floating spec card. Subtle pointer
// parallax (motion-safe, client-only) gives it a living, premium feel.
import { getFeaturedProperties } from '~/services/property.service'

const { t } = useI18n()
const localePath = useLocalePath()
const { price, area } = useFormat()
const { whatsappUrl } = useContact()

const featured = getFeaturedProperties(4)
const index = ref(0)
const current = computed(() => featured[index.value]!)

let timer: ReturnType<typeof setInterval> | undefined
const parallax = reactive({ x: 0, y: 0 })
const prefersReduced = ref(false)

function rotate(to?: number) {
  index.value = to ?? (index.value + 1) % featured.length
}

function onPointer(e: PointerEvent) {
  if (prefersReduced.value) return
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  parallax.x = ((e.clientX - cx) / cx) * 10
  parallax.y = ((e.clientY - cy) / cy) * 10
}

onMounted(() => {
  prefersReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced.value) {
    timer = setInterval(() => rotate(), 5000)
    window.addEventListener('pointermove', onPointer, { passive: true })
  }
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('pointermove', onPointer)
})

// Expose parallax offsets as CSS custom properties on the root (set via a bound
// style object of custom properties only — not visual inline CSS). Rule-safe:
// we drive presentation through variables, styling stays in SCSS.
const parallaxVars = computed(() => ({
  '--px': `${parallax.x}px`,
  '--py': `${parallax.y}px`,
}))
</script>

<template>
  <section class="hero" :style="parallaxVars">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__orb hero__orb--gold" />
      <span class="hero__orb hero__orb--green" />
      <span class="hero__grain" />
    </div>

    <div class="container-wide hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 class="hero__title">
          {{ t('hero.titleLead') }}
          <em class="hero__title-em">{{ t('hero.titleEm') }}</em>
          {{ t('hero.titleTail') }}
        </h1>
        <p class="hero__lead">{{ t('hero.lead') }}</p>

        <div class="hero__actions">
          <BaseButton :to="localePath('/residences')" size="lg" icon-right="arrow-right">
            {{ t('cta.explore') }}
          </BaseButton>
          <BaseButton :href="whatsappUrl()" variant="outline" size="lg" icon="whatsapp">
            {{ t('cta.consult') }}
          </BaseButton>
        </div>

        <dl class="hero__facts">
          <div><dt>{{ t('hero.facts.collections') }}</dt><dd>04</dd></div>
          <div><dt>{{ t('hero.facts.residences') }}</dt><dd>12</dd></div>
          <div><dt>{{ t('hero.facts.city') }}</dt><dd>Bandung</dd></div>
        </dl>
      </div>

      <div class="hero__showcase">
        <transition name="fade" mode="out-in">
          <NuxtLink
            :key="current.id"
            :to="localePath(`/residences/${current.slug}`)"
            class="hero__frame"
          >
            <img
              :src="current.poster"
              :alt="t(`properties.items.${current.id}.name`)"
              class="hero__img"
              width="900"
              height="1100"
            />
            <div class="hero__spec">
              <p class="hero__spec-collection">{{ t(`properties.collections.${current.collection}`) }}</p>
              <p class="hero__spec-name">{{ t(`properties.items.${current.id}.name`) }}</p>
              <div class="hero__spec-meta">
                <span>{{ price(current.price) }}</span>
                <span class="hero__spec-dot" aria-hidden="true">•</span>
                <span>{{ current.bedrooms }} {{ t('properties.spec.beds') }}</span>
                <span class="hero__spec-dot" aria-hidden="true">•</span>
                <span>{{ area(current.areaBuilt) }}</span>
              </div>
            </div>
          </NuxtLink>
        </transition>

        <div class="hero__dots" role="tablist" :aria-label="t('hero.showcaseNav')">
          <button
            v-for="(p, i) in featured"
            :key="p.id"
            class="hero__dot"
            :class="{ 'is-active': i === index }"
            role="tab"
            :aria-selected="i === index"
            :aria-label="t(`properties.items.${p.id}.name`)"
            @click="rotate(i)"
          />
        </div>
      </div>
    </div>

    <a class="hero__scroll" href="#collection" :aria-label="t('hero.scroll')">
      <BaseIcon name="chevron-down" :size="22" />
    </a>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: var(--header-h);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: z('below');
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  transition: transform var(--dur-slow) var(--ease-out);

  &--gold {
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, var(--color-gold-200), transparent 70%);
    top: -10%;
    right: -5%;
    transform: translate(calc(var(--px) * 1), calc(var(--py) * 1));
  }

  &--green {
    width: 45vw;
    height: 45vw;
    background: radial-gradient(circle, rgb(63 124 106 / 0.4), transparent 70%);
    bottom: -20%;
    left: -10%;
    transform: translate(calc(var(--px) * -1), calc(var(--py) * -1));
  }
}

.hero__grain {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgb(23 32 28 / 0.03) 1px, transparent 1px);
  background-size: 4px 4px;
}

.hero__inner {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  align-items: center;
  padding-block: clamp(3rem, 6vw, 5rem);

  @include respond-to('lg') {
    grid-template-columns: 1.05fr 0.95fr;
  }
}

.hero__eyebrow {
  @include eyebrow;
  color: var(--color-accent-strong);
  margin-bottom: 1.25rem;
}

.hero__title {
  font-size: clamp(2.75rem, 6.5vw, 5.25rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
}

.hero__title-em {
  font-style: italic;
  color: var(--color-accent-strong);
}

.hero__lead {
  margin-top: 1.5rem;
  max-width: 32rem;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  color: var(--color-text-soft);
  line-height: 1.65;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 2rem;
}

.hero__facts {
  display: flex;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-line);

  dt {
    @include eyebrow;
    font-size: 0.62rem;
    color: var(--color-text-muted);
    margin-bottom: 0.35rem;
  }
  dd {
    font-family: $font-display;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-emerald-700);
  }
}

// --- Showcase ----------------------------------------------------------------
.hero__showcase {
  position: relative;
  transform: translate(calc(var(--px) * 0.4), calc(var(--py) * 0.4));
  transition: transform var(--dur-slow) var(--ease-out);
}

.hero__frame {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-line);
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__spec {
  position: absolute;
  inset: auto 1rem 1rem;
  @include glass(rgb(250 247 240 / 0.86));
  padding: 1.1rem 1.35rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgb(255 255 255 / 0.4);
}

.hero__spec-collection {
  @include eyebrow;
  font-size: 0.62rem;
  color: var(--color-accent-strong);
}

.hero__spec-name {
  font-family: $font-display;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-emerald-800);
  margin: 0.15rem 0 0.4rem;
}

.hero__spec-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-soft);
}

.hero__spec-dot {
  color: var(--color-gold-500);
}

.hero__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-line);
  transition: all var(--dur) var(--ease-out);

  &.is-active {
    width: 26px;
    border-radius: var(--radius-pill);
    background: var(--color-gold-500);
  }
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--color-line);
  color: var(--color-emerald-700);
  background: var(--color-surface);

  @include motion-safe {
    animation: bob 2.4s var(--ease-in-out) infinite;
  }
}

@keyframes bob {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 6px); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-slow) var(--ease-out);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
