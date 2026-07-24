// =============================================================================
// Per-property Open Graph images (1200×630 PNG) for rich link previews on
// WhatsApp, Instagram/Facebook, X, etc. Crawlers do NOT render SVG og:images,
// so detail pages must point at these rasterized PNGs (public/og/<slug>.png).
//
// Each card = the property poster (rendered to raster) + a dark gradient scrim
// + brand eyebrow, name, location, and price. Text is read from the ID locale
// (names/locations are locale-agnostic), keeping copy DRY with i18n.
//
// Run: pnpm og   (after pnpm photos, since it composites over public/properties/*.jpg)
//
// NOTE: keep this property list (slug/id/collection/price/hero) in sync with
// app/config/properties.config.ts.
// =============================================================================
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PROPS = resolve(root, 'public/properties')
const OUT = resolve(root, 'public/og')
const LOCALE = resolve(root, 'i18n/locales/id.json')

const W = 1200
const H = 630

// slug + i18n id + collection + price (IDR) + hero photo. Keep in sync with properties.config.ts.
const items = [
  { slug: 'serene-villa', id: 'serene-villa', collection: 'villa', price: 14_500_000_000, hero: 'p01' },
  { slug: 'canopy-villa', id: 'canopy-villa', collection: 'villa', price: 11_900_000_000, hero: 'p00' },
  { slug: 'lumen-villa', id: 'lumen-villa', collection: 'villa', price: 16_800_000_000, hero: 'p03' },
  { slug: 'ivory-terrace', id: 'ivory-terrace', collection: 'residence', price: 6_300_000_000, hero: 'p19' },
  { slug: 'saffron-court', id: 'saffron-court', collection: 'residence', price: 7_450_000_000, hero: 'p04' },
  { slug: 'meridian-garden', id: 'meridian-garden', collection: 'residence', price: 5_900_000_000, hero: 'p14' },
  { slug: 'skyline-crown', id: 'skyline-crown', collection: 'penthouse', price: 22_500_000_000, hero: 'p13' },
  { slug: 'celestia-penthouse', id: 'celestia', collection: 'penthouse', price: 27_800_000_000, hero: 'p18' },
  { slug: 'highland-manor', id: 'highland-manor', collection: 'estate', price: 34_000_000_000, hero: 'p10' },
  { slug: 'riverstone-estate', id: 'riverstone', collection: 'estate', price: 41_500_000_000, hero: 'p09' },
  { slug: 'azure-cliff-villa', id: 'azure-cliff', collection: 'villa', price: 18_900_000_000, hero: 'p07' },
  { slug: 'palma-grove', id: 'palma-grove', collection: 'residence', price: 8_200_000_000, hero: 'p15' },
]

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Compact IDR (ID formatting), e.g. "Rp 14,5 M" / "Rp 745 Jt".
function priceLabel(value) {
  const b = value / 1_000_000_000
  const m = value / 1_000_000
  const trim = (n) => {
    const r = Math.round(n * 10) / 10
    return (Number.isInteger(r) ? String(r) : r.toFixed(1)).replace('.', ',')
  }
  return b >= 1 ? `Rp ${trim(b)} M` : `Rp ${trim(m)} Jt`
}

function overlay({ eyebrow, name, location, price }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0c221d" stop-opacity="0"/>
        <stop offset="0.55" stop-color="#0c221d" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#0c221d" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#scrim)"/>
    <!-- brand seal top-left -->
    <g transform="translate(64,54)">
      <circle cx="26" cy="26" r="25" fill="none" stroke="#c9a24b" stroke-width="2" opacity="0.7"/>
      <path d="M26 9 L44 60 H36 L32 47 H20 L16 60 H8 Z M22 39 H30 L26 26 Z" fill="#c9a24b" transform="scale(0.86) translate(4,3)"/>
      <text x="66" y="34" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="#f4efe4">AUREA LIVING</text>
    </g>
    <!-- bottom text block -->
    <text x="64" y="452" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="#d8b767">${esc(eyebrow)}</text>
    <text x="60" y="524" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="#faf7f0">${esc(name)}</text>
    <text x="64" y="574" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#f4efe4" opacity="0.85">${esc(location)}  ·  ${esc(price)}</text>
  </svg>`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const locale = JSON.parse(await readFile(LOCALE, 'utf8'))
  const collections = locale.properties.collections

  let count = 0
  for (const it of items) {
    const item = locale.properties.items[it.id]
    if (!item) throw new Error(`Missing i18n copy for property id "${it.id}"`)

    const heroPhoto = await readFile(resolve(PROPS, `${it.hero}.jpg`))
    const base = await sharp(heroPhoto)
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .toBuffer()

    await sharp(base)
      .composite([
        {
          input: overlay({
            eyebrow: `${collections[it.collection]} · Bandung`.toUpperCase(),
            name: item.name,
            location: item.location,
            price: priceLabel(it.price),
          }),
        },
      ])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(resolve(OUT, `${it.slug}.jpg`))
    count++
  }
  console.log(`✓ Generated ${count} per-property OG images → public/og/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
