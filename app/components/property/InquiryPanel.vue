<script setup lang="ts">
// Sticky inquiry panel on the property detail page. Shows price + a compact
// spec summary and the commerce CTAs: WhatsApp inquiry (primary), call, email.
import type { Property } from '~/types'

const props = defineProps<{ property: Property }>()

const { t } = useI18n()
const { price, area } = useFormat()
const { whatsappInquiry, tel, mailto, phone } = useContact()

const emailSubject = computed(() =>
  t('contact.email.subject', { name: t(`properties.items.${props.property.id}.name`) }),
)
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
      <BaseButton :href="whatsappInquiry(property)" variant="primary" icon="whatsapp" block>
        {{ t('cta.inquireWhatsApp') }}
      </BaseButton>
      <div class="inquiry__row">
        <BaseButton :href="tel()" variant="outline" size="sm" icon="phone">{{ t('cta.call') }}</BaseButton>
        <BaseButton :href="mailto(emailSubject)" variant="outline" size="sm" icon="mail">
          {{ t('cta.email') }}
        </BaseButton>
      </div>
    </div>

    <p class="inquiry__advisor">
      <BaseIcon name="clock" :size="16" />
      {{ t('detail.advisor', { phone }) }}
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

.inquiry__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;

  :deep(.btn) {
    width: 100%;
  }
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
