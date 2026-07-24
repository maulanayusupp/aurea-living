<script setup lang="ts">
// Catalogue filter bar. State is owned by the parent (usePropertyFilters) and
// bound here via defineModel. Collection chips + bedroom stepper + price ceiling
// + sort select + reset. Fully controlled; no config access.
import type { PropertyCollection } from '~/types'

const props = defineProps<{
  collections: readonly PropertyCollection[]
  priceRange: { min: number; max: number }
  resultCount: number
  isFiltered: boolean
}>()

const emit = defineEmits<{ reset: [] }>()

const collection = defineModel<PropertyCollection | 'all'>('collection', { required: true })
const maxPrice = defineModel<number>('maxPrice', { required: true })
const minBedrooms = defineModel<number>('minBedrooms', { required: true })
const sort = defineModel<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('sort', {
  required: true,
})

const { t } = useI18n()
const { price } = useFormat()

const chips = computed<(PropertyCollection | 'all')[]>(() => ['all', ...props.collections])
const step = computed(() => Math.round((props.priceRange.max - props.priceRange.min) / 20))
</script>

<template>
  <div class="filters">
    <div class="filters__chips" role="group" :aria-label="t('filters.collection')">
      <button
        v-for="c in chips"
        :key="c"
        class="chip"
        :class="{ 'is-active': collection === c }"
        :aria-pressed="collection === c"
        @click="collection = c"
      >
        {{ c === 'all' ? t('filters.all') : t(`properties.collections.${c}`) }}
      </button>
    </div>

    <div class="filters__controls">
      <label class="field field--beds">
        <span class="field__label">{{ t('filters.beds') }}</span>
        <span class="stepper">
          <button
            type="button"
            :aria-label="t('filters.bedsDown')"
            :disabled="minBedrooms <= 0"
            @click="minBedrooms = Math.max(0, minBedrooms - 1)"
          >
            <BaseIcon name="minus" :size="16" />
          </button>
          <span class="stepper__value">{{ minBedrooms === 0 ? t('filters.any') : `${minBedrooms}+` }}</span>
          <button
            type="button"
            :aria-label="t('filters.bedsUp')"
            :disabled="minBedrooms >= 6"
            @click="minBedrooms = Math.min(6, minBedrooms + 1)"
          >
            <BaseIcon name="plus" :size="16" />
          </button>
        </span>
      </label>

      <label class="field field--price">
        <span class="field__label">
          {{ t('filters.maxPrice') }}
          <strong>{{ price(maxPrice) }}</strong>
        </span>
        <input
          v-model.number="maxPrice"
          type="range"
          class="range"
          :min="priceRange.min"
          :max="priceRange.max"
          :step="step"
        />
      </label>

      <label class="field field--sort">
        <span class="field__label">{{ t('filters.sort') }}</span>
        <span class="select">
          <select v-model="sort">
            <option value="featured">{{ t('filters.sortOptions.featured') }}</option>
            <option value="price-asc">{{ t('filters.sortOptions.priceAsc') }}</option>
            <option value="price-desc">{{ t('filters.sortOptions.priceDesc') }}</option>
            <option value="area-desc">{{ t('filters.sortOptions.areaDesc') }}</option>
          </select>
          <BaseIcon name="chevron-down" :size="16" />
        </span>
      </label>
    </div>

    <div class="filters__meta">
      <p class="filters__count">{{ t('filters.showing', { count: resultCount }) }}</p>
      <button v-if="isFiltered" class="filters__reset" @click="emit('reset')">
        <BaseIcon name="close" :size="15" /> {{ t('filters.reset') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-soft);
  transition: all var(--dur) var(--ease-out);

  &:hover {
    border-color: var(--color-gold-400);
    color: var(--color-emerald-800);
  }

  &.is-active {
    background: var(--color-emerald-800);
    border-color: var(--color-emerald-800);
    color: var(--color-on-dark);
  }
}

.filters__controls {
  display: grid;
  gap: 1.25rem;
  padding: 1.4rem;
  background: var(--color-surface-alt);
  border-radius: var(--radius-lg);

  @include respond-to('md') {
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 2rem;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.field__label {
  @include eyebrow;
  font-size: 0.68rem;
  color: var(--color-text-muted);
  display: flex;
  gap: 0.5rem;
  align-items: baseline;

  strong {
    font-family: $font-display;
    font-size: 1rem;
    letter-spacing: 0;
    text-transform: none;
    color: var(--color-emerald-700);
  }
}

.stepper {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  padding: 0.25rem;

  button {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: var(--color-emerald-800);
    transition: background var(--dur) var(--ease-out);

    &:hover:not(:disabled) {
      background: var(--color-sand);
    }
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
}

.stepper__value {
  min-width: 3rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.range {
  width: 100%;
  accent-color: var(--color-gold-500);
  cursor: pointer;
}

.select {
  position: relative;
  display: inline-flex;
  align-items: center;

  select {
    appearance: none;
    padding: 0.6rem 2.2rem 0.6rem 1rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-line);
    background: var(--color-surface);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
  }

  :deep(.icon) {
    position: absolute;
    right: 0.85rem;
    pointer-events: none;
    color: var(--color-text-muted);
  }
}

.filters__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.filters__count {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.filters__reset {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-accent-strong);

  &:hover {
    text-decoration: underline;
  }
}
</style>
