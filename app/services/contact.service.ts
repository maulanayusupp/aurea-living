// =============================================================================
// Contact channel helpers — pure functions (no framework access). Composables
// wire these to runtimeConfig + i18n. Building deep-links here keeps URL/format
// logic testable and in one place. Email is the only contact channel.
// =============================================================================

/** Build a `mailto:` link with subject + body. */
export function buildMailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString()
  return `mailto:${email}${qs ? `?${qs}` : ''}`
}
