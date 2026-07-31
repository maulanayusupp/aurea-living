<script setup lang="ts">
// Property listing card. Poster image, status/collection badges, name, location,
// price, key specs, and an email inquiry CTA. Whole card links to the detail
// page; the CTA opens the visitor's email app with a pre-filled message.
import type { Property } from '~/types'

const props = defineProps<{ property: Property }>()

const { t } = useI18n()
const localePath = useLocalePath()
const { price, area } = useFormat()
const { emailInquiry } = useContact()

const detailPath = computed(() => localePath(`/residences/${props.property.slug}`))
const statusTone = computed(() =>
  props.property.status === 'sold' ? 'muted' : props.property.status === 'ready' ? 'emerald' : 'gold',
)
</script>

<template>
  <article class="pcard reveal">
    <NuxtLink :to="detailPath" class="pcard__media" :aria-label="t(`properties.items.${property.id}.name`)">
      <img
        :src="property.poster"
        :alt="t(`properties.items.${property.id}.name`)"
        loading="lazy"
        width="800"
        height="600"
        class="pcard__img"
      />
      <div class="pcard__badges">
        <BaseBadge tone="neutral">{{ t(`properties.collections.${property.collection}`) }}</BaseBadge>
        <BaseBadge :tone="statusTone" dot>{{ t(`properties.status.${property.status}`) }}</BaseBadge>
      </div>
    </NuxtLink>

    <div class="pcard__body">
      <div class="pcard__head">
        <h3 class="pcard__name">
          <NuxtLink :to="detailPath">{{ t(`properties.items.${property.id}.name`) }}</NuxtLink>
        </h3>
        <p class="pcard__loc">
          <BaseIcon name="map-pin" :size="15" />
          {{ t(`properties.items.${property.id}.location`) }}
        </p>
      </div>

      <p class="pcard__price">{{ price(property.price) }}</p>

      <ul class="pcard__specs">
        <li><BaseIcon name="bed" :size="17" /> {{ property.bedrooms }} {{ t('properties.spec.beds') }}</li>
        <li><BaseIcon name="bath" :size="17" /> {{ property.bathrooms }} {{ t('properties.spec.baths') }}</li>
        <li><BaseIcon name="ruler" :size="17" /> {{ area(property.areaBuilt) }}</li>
      </ul>

      <div class="pcard__actions">
        <BaseButton :to="detailPath" variant="outline" size="sm" icon-right="arrow-right">
          {{ t('cta.details') }}
        </BaseButton>
        <BaseButton
          :href="emailInquiry(property)"
          variant="primary"
          size="sm"
          icon="mail"
        >
          {{ t('cta.inquire') }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.pcard {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out);

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-gold-400);
  }
}

.pcard__media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.pcard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}

.pcard:hover .pcard__img {
  transform: scale(1.05);
}

.pcard__badges {
  position: absolute;
  inset: 0.85rem 0.85rem auto;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.pcard__badges :deep(.badge--neutral) {
  @include glass(rgb(250 247 240 / 0.9));
}

.pcard__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.4rem;
  flex: 1;
}

.pcard__name {
  font-size: 1.4rem;
  line-height: 1.2;

  a:hover {
    color: var(--color-accent-strong);
  }
}

.pcard__loc {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-top: 0.35rem;
}

.pcard__price {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-emerald-700);
}

.pcard__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  padding-top: 1rem;
  margin-top: auto;
  border-top: 1px solid var(--color-line);

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    color: var(--color-text-soft);
  }

  :deep(.icon) {
    color: var(--color-accent-strong);
  }
}

.pcard__actions {
  display: flex;
  gap: 0.6rem;

  :deep(.btn) {
    flex: 1;
  }
}
</style>
