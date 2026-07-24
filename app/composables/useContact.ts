// =============================================================================
// Contact composable — wires runtimeConfig (WhatsApp number, email, phone) and
// i18n to the pure builders in contact.service. Used by CTAs across the app,
// especially the WhatsApp inquiry flow (primary commerce channel).
// =============================================================================
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
} from '~/services/contact.service'
import type { Property } from '~/types'

export function useContact() {
  const runtime = useRuntimeConfig()
  const { t, locale } = useI18n()

  const whatsappNumber = runtime.public.whatsapp as string
  const email = runtime.public.contactEmail as string
  const phone = runtime.public.contactPhone as string

  /** Generic WhatsApp link with an optional custom message. */
  function whatsappUrl(message?: string): string {
    return buildWhatsAppUrl(whatsappNumber, message ?? t('contact.wa.general'))
  }

  /** Property-specific WhatsApp inquiry with a localized, pre-filled message. */
  function whatsappInquiry(property: Property): string {
    const name = t(`properties.items.${property.id}.name`)
    const url = `${runtime.public.siteUrl}/${locale.value === 'en' ? 'en/' : ''}residences/${property.slug}`
    const message = t('contact.wa.inquiry', {
      name,
      collection: t(`properties.collections.${property.collection}`),
      url,
    })
    return buildWhatsAppUrl(whatsappNumber, message)
  }

  function mailto(subject?: string, body?: string): string {
    return buildMailtoUrl(email, subject, body)
  }

  function tel(): string {
    return buildTelUrl(phone)
  }

  return {
    whatsappNumber,
    email,
    phone,
    whatsappUrl,
    whatsappInquiry,
    mailto,
    tel,
  }
}
