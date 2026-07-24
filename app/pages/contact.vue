<script setup lang="ts">
// Contact page — channels + enquiry form (WhatsApp/email hand-off, no backend).
const { t } = useI18n()

usePageSeo(
  () => t('meta.contact.title'),
  () => t('meta.contact.description'),
)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('contact.eyebrow')"
      :title="t('contact.title')"
      :lead="t('contact.lead')"
    />

    <section class="section">
      <div class="container-wide contact__grid">
        <div class="contact__aside">
          <h2 class="contact__aside-title">{{ t('contact.reachTitle') }}</h2>
          <p class="contact__aside-lead">{{ t('contact.reachLead') }}</p>
          <ContactChannels />
          <div class="contact__hours">
            <BaseIcon name="clock" :size="18" />
            <span>{{ t('contact.hours') }}</span>
          </div>
        </div>

        <div class="contact__form">
          <h2 class="contact__form-title">{{ t('contact.formTitle') }}</h2>
          <p class="contact__form-lead">{{ t('contact.formLead') }}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.contact__grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  align-items: start;

  @include respond-to('lg') {
    grid-template-columns: 0.9fr 1.1fr;
  }
}

.contact__aside {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact__aside-title,
.contact__form-title {
  font-size: 1.75rem;
}

.contact__aside-lead,
.contact__form-lead {
  color: var(--color-text-soft);
  margin-bottom: 0.5rem;
  max-width: 34rem;
}

.contact__hours {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;

  :deep(.icon) {
    color: var(--color-accent-strong);
  }
}

.contact__form {
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.contact__form-title {
  margin-bottom: 0.5rem;
}
</style>
