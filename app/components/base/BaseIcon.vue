<script setup lang="ts">
// Generic SVG icon. Line icons use `stroke`; brand glyphs use `fill`.
// Size via the `size` prop (px). Decorative by default; pass `label` for a11y.
import { iconPaths } from '~/utils/iconPaths'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    label?: string
  }>(),
  { size: 24 },
)

const def = computed(() => iconPaths[props.name])
const filled = computed(() => def.value?.filled ?? false)
</script>

<template>
  <svg
    v-if="def"
    class="icon"
    :class="{ 'icon--filled': filled }"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="filled ? 'currentColor' : 'none'"
    :stroke="filled ? 'none' : 'currentColor'"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
    v-html="def.body"
  />
</template>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
