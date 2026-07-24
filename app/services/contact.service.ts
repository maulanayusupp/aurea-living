// =============================================================================
// Contact channel helpers — pure functions (no framework access). Composables
// wire these to runtimeConfig + i18n. Building deep-links here keeps URL/format
// logic testable and in one place.
// =============================================================================

/** Normalise a phone number to WhatsApp's digits-only international form. */
export function normaliseWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, '')
}

/** Build a wa.me deep-link with an optional pre-filled message. */
export function buildWhatsAppUrl(number: string, message?: string): string {
  const digits = normaliseWhatsAppNumber(number)
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Build a `mailto:` link with subject + body. */
export function buildMailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString()
  return `mailto:${email}${qs ? `?${qs}` : ''}`
}

/** Build a `tel:` link from a display phone number. */
export function buildTelUrl(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
