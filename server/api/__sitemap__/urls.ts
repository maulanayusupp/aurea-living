// Dynamic sitemap source: emits the property detail routes so @nuxtjs/sitemap
// (via @nuxtjs/seo) includes them. The i18n integration adds locale variants
// and hreflang alternates automatically. Registered in nuxt.config → sitemap.sources.
import { defineSitemapEventHandler } from '#imports'
import { properties } from '~/config/properties.config'

export default defineSitemapEventHandler(() => {
  return properties.map((p) => ({
    loc: `/residences/${p.slug}`,
    _i18nTransform: true,
    changefreq: 'monthly' as const,
    priority: 0.8,
  }))
})
