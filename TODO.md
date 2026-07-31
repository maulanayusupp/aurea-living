# TODO / Backlog — Aurea Living

Track future work here. When a change lands, update `CLAUDE.md`, the compliance/
legal pages, and **both** i18n locales as required by the project rules.

## Next up

- [x] **Real photography.** Uses self-hosted Unsplash stock photos
      (`public/properties/`, `pnpm photos`). Next: replace the shared stock set
      with official per-property photography (unique gallery per listing).
- [x] **Per-property OG images.** `pnpm og` composes poster + brand + name/price
      into `public/og/<slug>.png` for social/messenger link previews.
- [ ] **Map on detail pages.** Optional static map image or embed per location.
- [ ] **Saved / shortlist.** Let visitors bookmark residences (localStorage), with
      a combined email enquiry for the whole shortlist.
- [ ] **Filter polish.** Add an area (m²) range and a "ready to move in" toggle;
      persist scroll position when navigating back from a detail page.

## Content & i18n

- [ ] Add a third locale (e.g. `zh`) — clone the locale file, keep keys in lockstep,
      register in `nuxt.config.i18n.locales`, and run the key-parity check.
- [ ] Expand each residence's `detail` copy and add a short neighbourhood blurb.
- [ ] FAQ section/page (buying process, viewings) — honest, no guarantees.

## Engineering

- [ ] Unit tests for `contact.service` (URL builders) and `property.service`
      (query/sort/filter) with Vitest.
- [ ] Lighthouse/a11y audit pass (contrast, focus order, reduced-motion paths).
- [ ] Self-host fonts (Cormorant Garamond + Manrope) to drop the Google Fonts
      request and improve privacy/perf.
- [ ] `pnpm typecheck` in CI; add `vue-tsc` to a lint/build workflow.
- [ ] Enable dynamic OG-image rendering once a bundled renderer is acceptable.

## Commerce (email-first)

- [ ] Optional lead capture: a lightweight serverless endpoint to log enquiries
      (update the privacy + compliance pages and both locales if added).
- [ ] Track email CTA clicks (privacy-respecting analytics) to measure interest.

## Ideas (nice to have)

- [ ] Subtle 3D / parallax hero variant (respecting reduced-motion).
- [ ] "Collections" landing sections (Villa / Residence / Penthouse / Estate) with
      editorial intros.
- [ ] Print-friendly one-page brochure per residence.
