<script setup lang="ts">
// Sticky header. Transparent over the homepage hero, turns to frosted glass on
// scroll. Desktop nav + language switcher + WhatsApp CTA; mobile slide-in menu.
import { getPrimaryNav } from '~/services/content.service'

const { t } = useI18n()
const localePath = useLocalePath()
const { whatsappUrl } = useContact()
const nav = getPrimaryNav()

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Close the mobile menu on route change.
const route = useRoute()
watch(() => route.fullPath, () => (menuOpen.value = false))

// Lock body scroll while the mobile menu is open.
watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.documentElement.classList.toggle('is-menu-open', open)
  }
})

function target(item: { to: string; hash?: string }) {
  return item.hash ? `${localePath(item.to)}${item.hash}` : localePath(item.to)
}
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="container-wide header__bar">
      <BrandLogo tone="ink" />

      <nav class="header__nav" :aria-label="t('nav.primary')">
        <NuxtLink
          v-for="item in nav"
          :key="item.id"
          :to="target(item)"
          class="header__link"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <LanguageSwitcher class="header__lang" />
        <BaseButton
          :href="whatsappUrl()"
          variant="dark"
          size="sm"
          icon="whatsapp"
          class="header__cta"
        >
          {{ t('cta.whatsapp') }}
        </BaseButton>
        <button
          class="header__toggle"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? t('nav.close') : t('nav.open')"
          @click="menuOpen = !menuOpen"
        >
          <BaseIcon :name="menuOpen ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <transition name="drawer">
      <div v-if="menuOpen" class="drawer">
        <nav class="drawer__nav" :aria-label="t('nav.primary')">
          <NuxtLink
            v-for="item in nav"
            :key="item.id"
            :to="target(item)"
            class="drawer__link"
          >
            {{ t(item.labelKey) }}
          </NuxtLink>
        </nav>
        <div class="drawer__footer">
          <LanguageSwitcher />
          <BaseButton :href="whatsappUrl()" variant="primary" icon="whatsapp" block>
            {{ t('cta.whatsapp') }}
          </BaseButton>
        </div>
      </div>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: z('header');
  transition: background var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out);

  &.is-scrolled,
  &.is-open {
    @include glass;
    box-shadow: 0 1px 0 var(--color-line);
  }
}

.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  height: var(--header-h);
}

.header__nav {
  display: none;
  gap: 2rem;

  @include respond-to('lg') {
    display: flex;
  }
}

.header__link {
  position: relative;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-soft);
  transition: color var(--dur) var(--ease-out);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 1.5px;
    background: var(--color-accent);
    transition: width var(--dur) var(--ease-out);
  }

  &:hover,
  &.router-link-active {
    color: var(--color-emerald-800);

    &::after {
      width: 100%;
    }
  }
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.header__lang {
  display: none;

  @include respond-to('md') {
    display: inline-flex;
  }
}

.header__cta {
  display: none;

  @include respond-to('md') {
    display: inline-flex;
  }
}

.header__toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--color-emerald-800);

  @include respond-to('lg') {
    display: none;
  }
}

// --- Mobile drawer -----------------------------------------------------------
.drawer {
  @include glass(rgb(250 247 240 / 0.98));
  padding: 1.5rem $gutter 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid var(--color-line);
}

.drawer__nav {
  display: flex;
  flex-direction: column;
}

.drawer__link {
  padding: 1rem 0;
  font-family: $font-display;
  font-size: 1.5rem;
  color: var(--color-emerald-800);
  border-bottom: 1px solid var(--color-line);
}

.drawer__footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
