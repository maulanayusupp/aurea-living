// =============================================================================
// Contact composable — wires runtimeConfig (email) and i18n to the pure builders
// in contact.service. Used by CTAs across the app, especially the property
// enquiry flow. Email is the single contact channel: no phone, no WhatsApp.
// =============================================================================
import { buildMailtoUrl } from '~/services/contact.service'
import type { Property } from '~/types'

export function useContact() {
  const runtime = useRuntimeConfig()
  const { t, locale } = useI18n()

  const email = runtime.public.contactEmail as string

  /** Generic enquiry email with an optional custom body. */
  function emailUrl(body?: string): string {
    return buildMailtoUrl(
      email,
      t('contact.mail.generalSubject'),
      body ?? t('contact.mail.general'),
    )
  }

  /** Property-specific email enquiry with a localized, pre-filled message. */
  function emailInquiry(property: Property): string {
    const name = t(`properties.items.${property.id}.name`)
    const url = `${runtime.public.siteUrl}/${locale.value === 'en' ? 'en/' : ''}residences/${property.slug}`
    const body = t('contact.mail.inquiry', {
      name,
      collection: t(`properties.collections.${property.collection}`),
      url,
    })
    return buildMailtoUrl(email, t('contact.email.subject', { name }), body)
  }

  function mailto(subject?: string, body?: string): string {
    return buildMailtoUrl(email, subject, body)
  }

  return {
    email,
    emailUrl,
    emailInquiry,
    mailto,
  }
}
