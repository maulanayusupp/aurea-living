<script setup lang="ts">
// Contact channel cards for the contact page: WhatsApp, phone, email, location.
import { getBrand } from '~/services/content.service'

const { t } = useI18n()
const { whatsappUrl, tel, mailto, email, phone } = useContact()
const brand = getBrand()

const channels = computed(() => [
  { id: 'whatsapp', icon: 'whatsapp', label: t('contact.channels.whatsapp'), value: phone, href: whatsappUrl(), external: true },
  { id: 'phone', icon: 'phone', label: t('contact.channels.phone'), value: phone, href: tel(), external: false },
  { id: 'email', icon: 'mail', label: t('contact.channels.email'), value: email, href: mailto(), external: false },
  { id: 'location', icon: 'map-pin', label: t('contact.channels.location'), value: `${brand.city}, ${brand.country}`, href: '', external: false },
])
</script>

<template>
  <ul class="channels">
    <li v-for="c in channels" :key="c.id" class="channel">
      <span class="channel__icon"><BaseIcon :name="c.icon" :size="22" /></span>
      <div class="channel__body">
        <p class="channel__label">{{ c.label }}</p>
        <a
          v-if="c.href"
          :href="c.href"
          class="channel__value"
          :target="c.external ? '_blank' : undefined"
          :rel="c.external ? 'noopener noreferrer' : undefined"
        >
          {{ c.value }}
        </a>
        <p v-else class="channel__value">{{ c.value }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.channels {
  display: grid;
  gap: 1rem;
}

.channel {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  transition: border-color var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);

  &:hover {
    border-color: var(--color-gold-400);
    transform: translateY(-2px);
  }
}

.channel__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  color: var(--color-emerald-700);
  background: var(--color-sand);
}

.channel__label {
  @include eyebrow;
  font-size: 0.64rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.channel__value {
  font-weight: 600;
  color: var(--color-emerald-800);
  transition: color var(--dur) var(--ease-out);

  a#{&}:hover {
    color: var(--color-accent-strong);
  }
}
</style>
