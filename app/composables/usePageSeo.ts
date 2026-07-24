// =============================================================================
// Per-page SEO helper. Reactive to locale so title/description update on switch.
// Pairs with the global title template + hreflang set in app.vue.
// =============================================================================

interface PageSeoOptions {
  /** Absolute or generated OG image path. Defaults to the static brand OG. */
  image?: string
  /** og:type — 'website' (default) or 'article'/'product' for detail pages. */
  type?: string
}

/**
 * Set reactive <title> and meta description + Open Graph / Twitter tags.
 * Pass getters so values re-evaluate when the locale (or data) changes.
 */
export function usePageSeo(
  title: () => string,
  description: () => string,
  options: PageSeoOptions = {},
) {
  const { image = '/og-image.png', type = 'website' } = options
  const runtime = useRuntimeConfig()
  const siteUrl = runtime.public.siteUrl as string
  const ogImage = computed(() => (image.startsWith('http') ? image : `${siteUrl}${image}`))

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type as 'website',
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogImageAlt: title,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterImageAlt: title,
  })
}
