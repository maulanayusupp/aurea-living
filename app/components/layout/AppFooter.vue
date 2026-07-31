<script setup lang="ts">
// Site footer: brand blurb, navigation columns, contact channels, newsletter-
// free (no data collection claims). Emerald background to bookend the page.
import {
  getBrand,
  getFooterNav,
  getSocialChannels,
} from '~/services/content.service'

const { t } = useI18n()
const localePath = useLocalePath()
const { email, mailto } = useContact()

const brand = getBrand()
const nav = getFooterNav()
const social = getSocialChannels()
const year = 2026 // build-time constant; avoids hydration mismatch from new Date()
</script>

<template>
  <footer class="footer">
    <div class="footer__aura" aria-hidden="true" />
    <div class="container-wide footer__inner">
      <div class="footer__brand">
        <BrandLogo tone="light" />
        <p class="footer__blurb">{{ t('footer.blurb') }}</p>
        <div class="footer__contact">
          <a :href="mailto()" class="footer__contact-item">
            <BaseIcon name="mail" :size="18" />{{ email }}
          </a>
          <p class="footer__contact-item">
            <BaseIcon name="map-pin" :size="18" />{{ brand.city }}, {{ brand.country }}
          </p>
        </div>
      </div>

      <nav class="footer__nav" :aria-label="t('footer.explore')">
        <h3 class="footer__col-title">{{ t('footer.explore') }}</h3>
        <NuxtLink
          v-for="item in nav"
          :key="item.id"
          :to="localePath(item.to)"
          class="footer__link"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="footer__connect">
        <h3 class="footer__col-title">{{ t('footer.connect') }}</h3>
        <a
          v-for="s in social"
          :key="s.id"
          :href="s.href"
          class="footer__link footer__link--icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BaseIcon :name="s.icon" :size="18" />
          <span>{{ s.value }}</span>
        </a>
        <BaseButton :href="mailto()" variant="primary" icon="mail" class="footer__cta">
          {{ t('cta.consult') }}
        </BaseButton>
      </div>
    </div>

    <div class="container-wide footer__base">
      <p class="footer__copy">© {{ year }} {{ brand.name }}. {{ t('footer.rights') }}</p>
      <p class="footer__disclaimer">{{ t('footer.disclaimer') }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  background: var(--color-emerald-900);
  color: var(--color-on-dark);
  overflow: hidden;
  padding-top: clamp(4rem, 8vw, 6rem);
}

.footer__aura {
  position: absolute;
  inset: auto 0 0 0;
  height: 60%;
  background: radial-gradient(60% 100% at 20% 100%, rgb(201 162 75 / 0.16), transparent 70%);
  pointer-events: none;
}

.footer__inner {
  position: relative;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  padding-bottom: clamp(3rem, 6vw, 4.5rem);

  @include respond-to('md') {
    grid-template-columns: 1.6fr 1fr 1.2fr;
  }
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 26rem;
}

.footer__blurb {
  color: var(--color-on-dark-soft);
  line-height: 1.7;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__contact-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-on-dark-soft);
  transition: color var(--dur) var(--ease-out);

  &:hover {
    color: var(--color-gold-400);
  }
}

.footer__col-title {
  @include eyebrow;
  color: var(--color-gold-400);
  font-family: $font-body;
  margin-bottom: 1.4rem;
}

.footer__nav,
.footer__connect {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.footer__link {
  color: var(--color-on-dark-soft);
  transition: color var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);
  width: fit-content;

  &:hover {
    color: var(--color-on-dark);
    transform: translateX(3px);
  }

  &--icon {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }
}

.footer__cta {
  margin-top: 0.75rem;
}

.footer__base {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.75rem;
  border-top: 1px solid var(--color-line-dark);
}

.footer__copy,
.footer__disclaimer {
  font-size: 0.82rem;
  color: var(--color-on-dark-soft);
}

.footer__disclaimer {
  max-width: 34rem;
  opacity: 0.75;
}
</style>
