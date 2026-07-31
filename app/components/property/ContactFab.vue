<script setup lang="ts">
// Floating email button — the primary (and only) enquiry channel. Appears after
// the user scrolls past the hero. Fixed, above content, keyboard-accessible.
const { t } = useI18n()
const { emailUrl } = useContact()

const visible = ref(false)
function onScroll() {
  visible.value = window.scrollY > 480
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="fab">
    <a
      v-show="visible"
      :href="emailUrl()"
      class="fab"
      :aria-label="t('cta.contactUs')"
    >
      <BaseIcon name="mail" :size="26" />
      <span class="fab__label">{{ t('cta.contactUs') }}</span>
    </a>
  </transition>
</template>

<style lang="scss" scoped>
.fab {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: z('sticky');
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem;
  border-radius: var(--radius-pill);
  background: var(--color-emerald-800);
  color: var(--color-on-dark);
  box-shadow: var(--shadow-lg);
  transition: padding var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);

  &:hover {
    transform: translateY(-3px);
    padding-inline: 0.85rem 1.25rem;
  }
}

.fab__label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.9rem;
  transition: max-width var(--dur) var(--ease-out);
}

.fab:hover .fab__label,
.fab:focus-visible .fab__label {
  max-width: 12rem;
}

.fab-enter-active,
.fab-leave-active {
  transition: opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(1rem) scale(0.9);
}
</style>
