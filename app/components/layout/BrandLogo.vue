<script setup lang="ts">
// Wordmark lockup: a gold monogram seal + serif wordmark. Links home.
import { getBrand } from '~/services/content.service'

withDefaults(
  defineProps<{ tone?: 'ink' | 'light'; compact?: boolean }>(),
  { tone: 'ink' },
)

const brand = getBrand()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/')" class="logo" :class="`logo--${tone}`" :aria-label="brand.name">
    <span class="logo__seal" aria-hidden="true">
      <svg viewBox="0 0 44 44" width="40" height="40">
        <circle cx="22" cy="22" r="21" class="logo__ring" />
        <path
          d="M22 10 L31 33 H27 L25 27 H19 L17 33 H13 Z M20 23 H24 L22 16 Z"
          class="logo__mark"
        />
      </svg>
    </span>
    <span v-if="!compact" class="logo__word">
      {{ brand.name }}
      <span class="logo__tag">{{ brand.city }}</span>
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}

.logo__seal {
  display: grid;
  place-items: center;
}

.logo__ring {
  fill: none;
  stroke: var(--color-gold-500);
  stroke-width: 1.2;
}

.logo__mark {
  fill: var(--color-gold-500);
}

.logo__word {
  display: flex;
  flex-direction: column;
  font-family: $font-display;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1;
  letter-spacing: 0.01em;
  color: var(--color-emerald-800);
}

.logo__tag {
  @include eyebrow;
  font-size: 0.58rem;
  letter-spacing: 0.34em;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}

.logo--light {
  .logo__word {
    color: var(--color-on-dark);
  }
  .logo__tag {
    color: var(--color-on-dark-soft);
  }
}
</style>
