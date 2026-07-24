<script setup lang="ts">
// Generic surface card. `interactive` adds hover lift; `flush` removes padding
// for media-first cards (e.g. property cards manage their own internal spacing).
withDefaults(
  defineProps<{
    interactive?: boolean
    flush?: boolean
    tone?: 'surface' | 'sand' | 'dark'
  }>(),
  { tone: 'surface' },
)
</script>

<template>
  <div
    class="card"
    :class="[
      `card--${tone}`,
      { 'card--interactive': interactive, 'card--flush': flush },
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-line);
  overflow: hidden;
  transition:
    transform var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out);
}

.card:not(.card--flush) {
  padding: clamp(1.5rem, 3vw, 2.25rem);
}

.card--surface {
  background: var(--color-surface);
}
.card--sand {
  background: var(--color-surface-alt);
}
.card--dark {
  background: var(--color-emerald-800);
  border-color: var(--color-line-dark);
  color: var(--color-on-dark);
}

.card--interactive {
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-gold-400);
  }
}
</style>
