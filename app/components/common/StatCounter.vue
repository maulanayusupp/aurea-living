<script setup lang="ts">
// A single statistic: large value + label. Presentational; tone adapts to
// light/dark backgrounds.
withDefaults(
  defineProps<{
    value: string
    label: string
    suffix?: string
    tone?: 'light' | 'dark'
  }>(),
  { tone: 'light' },
)
</script>

<template>
  <div class="stat" :class="`stat--${tone}`">
    <p class="stat__value">
      {{ value }}<span v-if="suffix" class="stat__suffix">{{ suffix }}</span>
    </p>
    <p class="stat__label">{{ label }}</p>
  </div>
</template>

<style lang="scss" scoped>
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stat__value {
  font-family: $font-display;
  font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1;
  color: var(--color-emerald-700);
}

.stat__suffix {
  color: var(--color-accent);
  margin-left: 0.1em;
}

.stat__label {
  @include eyebrow;
  color: var(--color-text-muted);
  font-size: 0.72rem;
}

.stat--dark {
  .stat__value {
    color: var(--color-on-dark);
  }
  .stat__label {
    color: var(--color-on-dark-soft);
  }
  .stat__suffix {
    color: var(--color-gold-400);
  }
}
</style>
