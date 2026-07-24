<script setup lang="ts">
// Small status/label pill. Tone controls color; `dot` shows a leading marker.
withDefaults(
  defineProps<{
    tone?: 'gold' | 'emerald' | 'neutral' | 'muted'
    dot?: boolean
  }>(),
  { tone: 'neutral' },
)
</script>

<template>
  <span class="badge" :class="`badge--${tone}`">
    <span v-if="dot" class="badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
  font-family: $font-body;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.badge--gold {
  background: var(--color-gold-200);
  color: var(--color-gold-600);
}
.badge--emerald {
  background: rgb(20 58 49 / 0.1);
  color: var(--color-emerald-700);
}
.badge--neutral {
  background: var(--color-sand);
  color: var(--color-text-soft);
}
.badge--muted {
  background: transparent;
  border: 1px solid var(--color-line);
  color: var(--color-text-muted);
}
</style>
