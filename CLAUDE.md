# CLAUDE.md — Project guide for AI assistants & contributors

> Keep this file in sync with reality. **Any change to code rules, features,
> pages, or content MUST also update: this file, the compliance/legal page(s),
> and BOTH i18n locales (`en` + `id`).** Hard project rule (see §Rules).

## What this is

**Aurea Living** (an editable **placeholder** brand — not a real company) is a
**luxury property marketing + e-commerce** site: a curated collection of villas,
residences, penthouses, and estates. It is built to feel premium, editorial, and
interactive, and to convert interest into conversations. The "commerce" channel
is **WhatsApp** (appropriate for high-value property, not a cart/checkout): every
listing has an *Enquire via WhatsApp* CTA that opens a pre-filled message.

- **Aesthetic:** Editorial Light Luxury — ivory paper, deep emerald ink,
  champagne gold accent; serif display (Cormorant Garamond) + sans body (Manrope).
- **Content is honest / no over-claiming:** figures are modest and labelled
  illustrative; testimonials are marked as samples; imagery is clearly generated
  demo art (see the compliance page). Contact: Bandung, Indonesia.

## Stack (verified versions)

| Concern    | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | **Nuxt 4.5.0** (Vue 3.5, Nitro 2, Vite)            |
| Language   | TypeScript (strict)                                |
| i18n       | `@nuxtjs/i18n` 10.5.0 — EN + **ID (default)**      |
| SEO        | `@nuxtjs/seo` 5.3.6 (sitemap, robots, schema.org)  |
| Styling    | **SCSS only** (`sass` 1.101.6), no inline CSS      |
| Favicons   | `favicons` 7.3.0 (build-time script)               |
| Posters    | Generated SVG art via `sharp` 0.34.5 + a Node script |
| Node       | ≥ 20.11                                            |

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build (validated)
pnpm preview      # run the built server (node .output/server/index.mjs)
pnpm generate     # static generation
pnpm favicons     # regenerate favicons from assets/favicon-source.svg
pnpm posters      # regenerate the 36 property posters (public/posters/)
pnpm og           # regenerate per-property OG cards (public/og/) — run after posters
pnpm typecheck    # vue-tsc type check
```

## Directory map (Nuxt 4 `app/` srcDir)

```
app/
  app.vue                 # root: <html lang> + hreflang + title template
  error.vue               # 404 / 500 page
  assets/scss/            # design system (see §Styling)
  components/
    base/                 # BaseIcon, BaseButton, BaseBadge, BaseCard (primitives)
    common/               # SectionHeading, PageHero, LegalDocument, StatCounter
    layout/               # AppHeader, AppFooter, BrandLogo, LanguageSwitcher
    home/                 # HeroShowcase, StatsBand, FeaturedCollection,
                          #   ExperienceStrip, ProcessSteps, TestimonialBand, CtaBand
    property/             # PropertyCard, PropertyGrid, PropertyFilters,
                          #   PropertyGallery, InquiryPanel, WhatsAppFab
    contact/              # ContactForm, ContactChannels
  composables/            # usePageSeo, useFormat, useContact, useReveal, usePropertyFilters
  config/                 # brand/navigation/properties/experience/legal (STRUCTURE, not text)
  layouts/default.vue     # header + <slot> + footer + floating WhatsApp
  pages/                  # index, residences/index, residences/[slug],
                          #   about, contact, compliance, privacy, terms
  services/               # content.service, property.service, contact.service
  types/                  # shared TS types
  utils/iconPaths.ts      # SVG icon registry
server/api/__sitemap__/urls.ts  # dynamic property routes for the sitemap
i18n/locales/{en,id}.json # ALL user-facing text
public/                   # generated favicons, manifest, og-image, posters/
scripts/generate-favicons.mjs
scripts/generate-posters.mjs
assets/favicon-source.svg # favicon source of truth
```

Components are auto-imported by **filename** (`pathPrefix: false`), so folder
names don't appear in tags: `<BaseButton>`, `<PropertyCard>`, etc.

## Architecture conventions

- **Config → Services → Composables/Components.** Components never import
  `config/*` directly; they read through `services/*.service.ts`. This lets the
  content source move to a CMS/API later without touching the UI.
- **Structure vs. text.** `config/*` holds structure (ids, prices, areas, media
  paths, hues, routes). All human-readable strings live in i18n by key.
- **Helpers = composables.** `usePageSeo`, `useFormat` (locale currency/area),
  `useContact` (WhatsApp/mailto/tel deep-links), `useReveal` (scroll reveal),
  `usePropertyFilters` (URL-synced catalogue state).
- **Commerce = WhatsApp.** `useContact().whatsappInquiry(property)` builds a
  localized, pre-filled `wa.me` message. Number/email/phone come from
  `runtimeConfig.public` (env: `NUXT_PUBLIC_WHATSAPP`, etc.). No server cart.

## Styling (SCSS, no inline CSS — hard rule)

- `_variables.scss` (build-time vars) + `_mixins.scss` (`z()`, `respond-to`,
  `container`, `glass`, `focus-ring`, `eyebrow`, `section-padding`, `motion-safe`)
  are injected into every component `<style>` via `nuxt.config` →
  `vite.css.preprocessorOptions.scss.additionalData` (`@use "_shared.scss" as *`).
- Partials pulled into `main.scss` via `@use` (`_typography`, `_base`,
  `_utilities`) **must `@use 'variables'/'mixins'` themselves** — additionalData
  only reaches Vite entry files, not `@use`-loaded partials.
- Runtime/theme values are **CSS custom properties** in `_tokens.scss`
  (`var(--color-accent)`, `var(--color-emerald-800)`, …). **Single light theme.**
- `main.scss` is the global entry (tokens → reset → typography → base → utilities).
- **Never** use `style="..."` for visual declarations. The **only** permitted
  `:style` use is passing **CSS custom properties** (values, e.g. `--px`,
  `--avatar-hue`) that scoped SCSS consumes — see `HeroShowcase` (pointer
  parallax) and `TestimonialBand` (avatar tint). Visual rules stay in SCSS.

## i18n

- Locales in `i18n/locales/{en,id}.json`; **ID is the default** (no prefix),
  EN lives under `/en/*` (`strategy: 'prefix_except_default'`).
- Keys mirror page/section structure. **Keep EN and ID in lockstep** — same keys,
  no missing translations (296 keys each; verify with a parity check).
- Property copy lives under `properties.items.<id>.{name,location,description,detail}`.
- Interpolations: `{name}`, `{collection}`, `{url}`, `{phone}`, `{count}`,
  and the form/WA `template` strings. A literal `@` must be escaped `{'@'}`.

## SEO

- Per-page: `usePageSeo(titleGetter, descGetter, { image, type })` — reactive to
  locale; sets title/description + OG + Twitter tags.
- Global title template + hreflang/`<html lang>` in `app.vue` via `useLocaleHead`.
- Structured data via `useSchemaOrg` (Organization/WebSite on home, Product on
  detail pages).
- Sitemap/robots by `@nuxtjs/seo`; dynamic property routes added through
  `server/api/__sitemap__/urls.ts` (i18n adds locale variants + hreflang).
- Site URL from `NUXT_PUBLIC_SITE_URL` (default `https://aurea-living.vercel.app`).
- **Link previews (WhatsApp / Instagram / Facebook / X).** `usePageSeo` sets
  absolute `og:image` (+ `og:image:width/height/type/alt`) and Twitter tags;
  `@nuxtjs/seo` adds `og:url`, `og:site_name`, `og:locale`, canonical. **og:image
  must be a raster PNG** — crawlers do not render SVG. Home uses
  `public/og-image.png`; detail pages use `public/og/<slug>.png` (per-property
  cards, ~230 KB, under WhatsApp's limit). Dynamic OG-image *rendering* stays
  disabled (no bundled native renderer); we ship pre-generated PNGs instead.

## Imagery

- The 36 property posters in `public/posters/` are **generated SVG art**
  (`scripts/generate-posters.mjs`), unique per residence + mood — self-contained,
  no external photo dependency. They are **illustrative demo visuals, not real
  photos** (stated on the compliance page). Replace with official photography for
  production; keep slugs/hues in the script in sync with `properties.config.ts`.
- Per-property **OG cards** (`public/og/<slug>.png`, `scripts/generate-og.mjs`)
  composite the poster + brand + name/location/price for link previews. The
  script's property list (slug/id/collection/price) must also stay in sync with
  `properties.config.ts`; names/locations are read from the ID locale.

## Rules (do not break)

1. **No inline CSS.** SCSS only, centralized as above (custom-property `:style`
   pass-through is the sole exception).
2. **Multilingual parity.** Update EN + ID together for every text change.
3. **Sync on change.** Every code/rule/feature change updates this file, the
   compliance/legal page(s), and both locales.
4. **Evidence over assumption.** Verify versions/APIs before relying on them.
5. **No over-claiming.** No fake certifications, awards, guarantees, or metrics.
6. **Commits.** Author = **Maulana Yusup Abdullah <maulanayusupp@gmail.com>**.
   **No AI/Claude co-author trailer.** Commit **and push** after each change.
7. **Brand is a placeholder.** Do not present Aurea Living as a real developer.

## Backlog

See [TODO.md](./TODO.md).
