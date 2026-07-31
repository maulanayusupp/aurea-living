<script setup lang="ts">
// Contact form. There is no server backend: on submit we compose the enquiry
// into an email and hand off to the visitor's own mail app. This is honest
// about how enquiries are actually received — no data is stored.
const { t } = useI18n()
const { mailto } = useContact()

const form = reactive({ name: '', phone: '', interest: 'villa', message: '' })
const touched = ref(false)

const valid = computed(() => form.name.trim().length > 1 && form.message.trim().length > 3)

function composedMessage() {
  return t('contactForm.template', {
    name: form.name,
    phone: form.phone || '—',
    interest: t(`properties.collections.${form.interest}`),
    message: form.message,
  })
}

function sendEmail() {
  touched.value = true
  if (!valid.value) return
  window.location.href = mailto(t('contactForm.emailSubject'), composedMessage())
}
</script>

<template>
  <form class="cform" novalidate @submit.prevent="sendEmail">
    <div class="cform__row">
      <label class="cfield">
        <span class="cfield__label">{{ t('contactForm.name') }} *</span>
        <input
          v-model="form.name"
          type="text"
          class="cfield__input"
          :placeholder="t('contactForm.namePlaceholder')"
          autocomplete="name"
        />
      </label>
      <label class="cfield">
        <span class="cfield__label">{{ t('contactForm.phone') }}</span>
        <input
          v-model="form.phone"
          type="tel"
          class="cfield__input"
          :placeholder="t('contactForm.phonePlaceholder')"
          autocomplete="tel"
        />
      </label>
    </div>

    <label class="cfield">
      <span class="cfield__label">{{ t('contactForm.interest') }}</span>
      <span class="select">
        <select v-model="form.interest" class="cfield__input">
          <option value="villa">{{ t('properties.collections.villa') }}</option>
          <option value="residence">{{ t('properties.collections.residence') }}</option>
          <option value="penthouse">{{ t('properties.collections.penthouse') }}</option>
          <option value="estate">{{ t('properties.collections.estate') }}</option>
        </select>
        <BaseIcon name="chevron-down" :size="16" />
      </span>
    </label>

    <label class="cfield">
      <span class="cfield__label">{{ t('contactForm.message') }} *</span>
      <textarea
        v-model="form.message"
        class="cfield__input cfield__textarea"
        rows="4"
        :placeholder="t('contactForm.messagePlaceholder')"
      />
    </label>

    <p v-if="touched && !valid" class="cform__error">{{ t('contactForm.error') }}</p>

    <div class="cform__actions">
      <BaseButton type="submit" icon="mail">{{ t('contactForm.sendEmail') }}</BaseButton>
    </div>
    <p class="cform__note">{{ t('contactForm.privacyNote') }}</p>
  </form>
</template>

<style lang="scss" scoped>
.cform {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cform__row {
  display: grid;
  gap: 1.25rem;

  @include respond-to('sm') {
    grid-template-columns: 1fr 1fr;
  }
}

.cfield {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cfield__label {
  @include eyebrow;
  font-size: 0.68rem;
  color: var(--color-text-muted);
}

.cfield__input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: 0.95rem;
  transition: border-color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out);

  &::placeholder {
    color: var(--color-text-muted);
  }
  &:focus {
    border-color: var(--color-gold-500);
    box-shadow: 0 0 0 3px rgb(201 162 75 / 0.15);
    outline: none;
  }
}

.cfield__textarea {
  resize: vertical;
  min-height: 7rem;
  font-family: $font-body;
}

.select {
  position: relative;
  display: block;

  select {
    appearance: none;
    cursor: pointer;
    padding-right: 2.4rem;
  }

  :deep(.icon) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-muted);
  }
}

.cform__error {
  color: #b4452f;
  font-size: 0.88rem;
}

.cform__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.25rem;
}

.cform__note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
