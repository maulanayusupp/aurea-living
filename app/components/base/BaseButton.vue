<script setup lang="ts">
// Polymorphic button/link. Renders <NuxtLink> for internal `to`, <a> for
// external `href`, else <button>. Variants: primary (gold), dark (emerald),
// ghost, outline. All styling via scoped SCSS — no inline styles.
withDefaults(
  defineProps<{
    variant?: 'primary' | 'dark' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    type?: 'button' | 'submit'
    icon?: string
    iconRight?: string
    block?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="!to && !href ? type : undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    :disabled="disabled || undefined"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <BaseIcon v-if="icon" :name="icon" :size="18" class="btn__icon" />
    <span class="btn__label"><slot /></span>
    <BaseIcon v-if="iconRight" :name="iconRight" :size="18" class="btn__icon" />
  </component>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: $font-body;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition:
    transform var(--dur) var(--ease-out),
    background var(--dur) var(--ease-out),
    color var(--dur) var(--ease-out),
    border-color var(--dur) var(--ease-out),
    box-shadow var(--dur) var(--ease-out);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: translateY(1px) scale(0.99);
  }

  &--block {
    display: flex;
    width: 100%;
  }
}

// --- Sizes -------------------------------------------------------------------
.btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}
.btn--md {
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
}
.btn--lg {
  padding: 1rem 2rem;
  font-size: 1.02rem;
}

// --- Variants ----------------------------------------------------------------
.btn--primary {
  background: linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600));
  color: var(--color-emerald-900);
  box-shadow: var(--shadow-sm);

  &:not(:disabled):hover {
    box-shadow: var(--shadow-gold);
    transform: translateY(-2px);
  }
}

.btn--dark {
  background: var(--color-emerald-800);
  color: var(--color-on-dark);

  &:not(:disabled):hover {
    background: var(--color-emerald-700);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.btn--outline {
  border: 1px solid var(--color-emerald-800);
  color: var(--color-emerald-800);

  &:not(:disabled):hover {
    background: var(--color-emerald-800);
    color: var(--color-on-dark);
  }
}

.btn--ghost {
  color: var(--color-text);

  &:not(:disabled):hover {
    color: var(--color-accent-strong);
  }
}

.btn__icon {
  transition: transform var(--dur) var(--ease-out);
}
.btn:not(:disabled):hover .btn__icon {
  transform: translateX(2px);
}
</style>
