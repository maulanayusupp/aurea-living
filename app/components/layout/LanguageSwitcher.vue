<script setup lang="ts">
// EN/ID switcher. Uses switchLocalePath to preserve the current route when
// changing language. Renders as a compact segmented control.
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  (locales.value as { code: string; name: string }[]).map((l) => ({
    code: l.code,
    label: l.code.toUpperCase(),
    name: l.name,
  })),
)
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <NuxtLink
      v-for="l in available"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="lang__opt"
      :class="{ 'is-active': l.code === locale }"
      :aria-current="l.code === locale ? 'true' : undefined"
      :title="l.name"
    >
      {{ l.label }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.2rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
}

.lang__opt {
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  transition:
    background var(--dur) var(--ease-out),
    color var(--dur) var(--ease-out);

  &:hover {
    color: var(--color-text);
  }

  &.is-active {
    background: var(--color-emerald-800);
    color: var(--color-on-dark);
  }
}
</style>
