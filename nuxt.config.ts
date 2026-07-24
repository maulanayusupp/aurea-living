import { fileURLToPath } from 'node:url'

// Inject shared SCSS (variables + mixins — no CSS output) into every component's
// <style lang="scss"> block. Absolute path so Sass @use always resolves.
const scssShared = fileURLToPath(
  new URL('./app/assets/scss/_shared.scss', import.meta.url),
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/seo'],

  // Name components by filename only (ignore folder prefix) for concise tags.
  components: [{ path: '~/components', pathPrefix: false }],

  // Single centralized SCSS entrypoint. No inline styles anywhere in the app.
  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#0F2A24' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  // @nuxtjs/seo site-wide identity (sitemap, robots, schema.org).
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://aurea-living.example.com',
    name: 'Aurea Living',
    description:
      'Aurea Living — koleksi villa & residence mewah dengan desain arsitektur, material premium, dan pengalaman hunian yang tenang.',
    defaultLocale: 'id',
  },

  // Dynamic OG-image rendering needs a native renderer we do not bundle; OG meta
  // tags are still set manually via usePageSeo. A static default OG image is used.
  ogImage: { enabled: false },

  // Include dynamic property detail routes in the sitemap (i18n adds locale
  // variants + hreflang). Static routes are auto-discovered.
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aurea-living.example.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    bundle: {
      // Silences the v10 optimize-directive advisory; we use $t/useI18n, not v-t.
      optimizeTranslationDirective: false,
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aurea-living.example.com',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'maulanayusupp@gmail.com',
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '6287822766333',
      contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE || '+62 878-2276-6333',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "${scssShared}" as *;`,
        },
      },
    },
  },

  typescript: {
    typeCheck: false,
    strict: true,
  },
})
