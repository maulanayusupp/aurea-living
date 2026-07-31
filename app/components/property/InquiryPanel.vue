<script setup lang="ts">
// Sticky inquiry panel on the property detail page. Shows price + a compact
// spec summary and the enquiry CTA: a pre-filled email about this property.
import type { Property } from '~/types'

const props = defineProps<{ property: Property }>()

const { t } = useI18n()
const { price, area } = useFormat()
const { emailInquiry, email } = useContact()
</script>

<template>
  <aside class="inquiry">
    <div class="inquiry__head">
      <BaseBadge tone="gold">{{ t(`properties.collections.${property.collection}`) }}</BaseBadge>
      <p class="inquiry__price">{{ price(property.price, false) }}</p>
      <p class="inquiry__note">{{ t('detail.priceNote') }}</p>
    </div>

    <dl class="inquiry__specs">
      <div><dt>{{ t('properties.spec.beds') }}</dt><dd>{{ property.bedrooms }}</dd></div>
      <div><dt>{{ t('properties.spec.baths') }}</dt><dd>{{ property.bathrooms }}</dd></div>
      <div><dt>{{ t('detail.built') }}</dt><dd>{{ area(property.areaBuilt) }}</dd></div>
      <div v-if="property.areaLand">
        <dt>{{ t('detail.land') }}</dt><dd>{{ area(property.areaLand) }}</dd>
      </div>
    </dl>

    <div class="inquiry__actions">
      <BaseButton :href="emailInquiry(property)" variant="primary" icon="mail" block>
        {{ t('cta.inquireEmail') }}
      </BaseButton>
    </div>

    <p class="inquiry__advisor">
      <BaseIcon name="clock" :size="16" />
      {{ t('detail.advisor', { email }) }}
    </p>
  </aside>
</template>

<style lang="scss" scoped>
.inquiry {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: clamp(1.5rem, 3vw, 2rem);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);

  @include respond-to('lg') {
    position: sticky;
    top: calc(var(--header-h) + 1.5rem);
  }
}

.inquiry__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.inquiry__price {
  font-family: $font-display;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 600;
  color: var(--color-emerald-700);
  margin-top: 0.5rem;
}

.inquiry__note {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.inquiry__specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--color-line);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  overflow: hidden;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.9rem 1rem;
    background: var(--color-surface);
  }

  dt {
    @include eyebrow;
    font-size: 0.62rem;
    color: var(--color-text-muted);
  }
  dd {
    font-weight: 600;
    color: var(--color-emerald-800);
  }
}

.inquiry__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.inquiry__advisor {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);

  :deep(.icon) {
    color: var(--color-accent-strong);
    flex-shrink: 0;
  }
}
</style>
