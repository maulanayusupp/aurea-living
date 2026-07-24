<script setup lang="ts">
// Error page (404/500). Minimal, on-brand. Not wrapped in the default layout,
// so it renders its own header/footer via components.
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="err">
    <AppHeader />
    <main class="err__main">
      <div class="container err__inner">
        <p class="err__code">{{ error.statusCode || 500 }}</p>
        <h1 class="err__title">
          {{ error.statusCode === 404 ? t('error.notFound.title') : t('error.generic.title') }}
        </h1>
        <p class="err__lead t-lead">
          {{ error.statusCode === 404 ? t('error.notFound.lead') : t('error.generic.lead') }}
        </p>
        <div class="err__actions">
          <BaseButton icon-right="arrow-right" @click="goHome">{{ t('error.home') }}</BaseButton>
          <BaseButton :to="localePath('/residences')" variant="outline">
            {{ t('error.browse') }}
          </BaseButton>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.err__main {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding-block: 8rem 4rem;
}

.err__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.err__code {
  font-family: $font-display;
  font-size: clamp(5rem, 18vw, 11rem);
  line-height: 0.9;
  color: var(--color-gold-400);
}

.err__lead {
  max-width: 34rem;
}

.err__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}
</style>
