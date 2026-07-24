// =============================================================================
// Generative property posters. Produces unique, on-brand SVG "architectural
// landscape" art for each residence (poster + 2 gallery variants) so the demo
// is fully self-contained with distinctive imagery — no external photo deps.
//
// Deterministic: seeded by slug+variant, so re-running yields identical output.
// Palette is biased to the Aurea Living brand (ivory / emerald / gold) with the
// per-property `hue` adding subtle variety across the collection.
//
// Run: pnpm posters   (writes to public/posters/*.svg)
//
// NOTE: These are illustrative visuals for demonstration, NOT real photography.
// Replace with official property photos for production (see TODO.md / compliance).
// =============================================================================
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/posters')

// Keep this list in sync with app/config/properties.config.ts (slug + hue).
const properties = [
  { slug: 'serene-villa', hue: 158, pool: true },
  { slug: 'canopy-villa', hue: 142, pool: true },
  { slug: 'lumen-villa', hue: 172, pool: true },
  { slug: 'ivory-terrace', hue: 44, pool: false },
  { slug: 'saffron-court', hue: 38, pool: false },
  { slug: 'meridian-garden', hue: 96, pool: false },
  { slug: 'skyline-crown', hue: 205, pool: false, tower: true },
  { slug: 'celestia-penthouse', hue: 225, pool: false, tower: true },
  { slug: 'highland-manor', hue: 128, pool: true },
  { slug: 'riverstone-estate', hue: 188, pool: true },
  { slug: 'azure-cliff-villa', hue: 196, pool: true },
  { slug: 'palma-grove', hue: 76, pool: true },
]

// Three tonal moods so the poster + two gallery shots differ per property.
const moods = [
  { key: 'a', name: 'dawn', skyTop: [42, 62, 92], skyBot: [40, 30, 96], sun: [44, 85, 82], sunY: 0.34 },
  { key: 'b', name: 'day', skyTop: [200, 30, 88], skyBot: [46, 40, 97], sun: [46, 70, 92], sunY: 0.22 },
  { key: 'c', name: 'dusk', skyTop: [255, 35, 32], skyBot: [30, 55, 74], sun: [28, 80, 72], sunY: 0.42 },
]

const W = 1200
const H = 900

// --- Deterministic PRNG (mulberry32 seeded from a string) --------------------
function seedFrom(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hsl = (h, s, l, a = 1) => `hsl(${h} ${s}% ${l}%${a < 1 ? ` / ${a}` : ''})`
const r2 = (n) => Math.round(n * 100) / 100

// --- Layer builders ----------------------------------------------------------
function hills(rand, hue, baseY, layers) {
  let out = ''
  for (let i = 0; i < layers; i++) {
    const y = baseY + i * 60 + rand() * 30
    const l = 30 - i * 5
    const points = []
    const segs = 6
    for (let s = 0; s <= segs; s++) {
      const px = (W / segs) * s
      const py = y - Math.sin(s * 1.3 + i + rand()) * (46 - i * 8) - rand() * 20
      points.push(`${r2(px)},${r2(py)}`)
    }
    out += `<path d="M0,${H} L0,${r2(y)} L${points.join(' L')} L${W},${r2(y)} L${W},${H} Z" fill="${hsl(hue, 24, Math.max(12, l), 0.9)}"/>`
  }
  return out
}

function palm(x, y, scale, hue) {
  const trunk = `<path d="M${x},${y} q${6 * scale},${-40 * scale} ${2 * scale},${-80 * scale}" stroke="${hsl(hue, 30, 14)}" stroke-width="${4 * scale}" fill="none" stroke-linecap="round"/>`
  let fronds = ''
  const top = y - 80 * scale
  for (let a = 0; a < 7; a++) {
    const ang = (Math.PI / 7) * a - Math.PI / 2 - 0.2
    const fx = x + 2 * scale + Math.cos(ang) * 54 * scale
    const fy = top + Math.sin(ang) * 40 * scale
    fronds += `<path d="M${r2(x + 2 * scale)},${r2(top)} Q${r2((x + fx) / 2)},${r2(top - 18 * scale)} ${r2(fx)},${r2(fy)}" stroke="${hsl(hue, 34, 20)}" stroke-width="${2.6 * scale}" fill="none" stroke-linecap="round"/>`
  }
  return trunk + fronds
}

function tree(x, y, scale, hue) {
  return `<g>
    <rect x="${r2(x - 3 * scale)}" y="${r2(y - 34 * scale)}" width="${r2(6 * scale)}" height="${r2(34 * scale)}" fill="${hsl(hue, 30, 14)}"/>
    <circle cx="${x}" cy="${r2(y - 46 * scale)}" r="${r2(26 * scale)}" fill="${hsl(hue, 34, 18)}"/>
    <circle cx="${r2(x - 18 * scale)}" cy="${r2(y - 34 * scale)}" r="${r2(18 * scale)}" fill="${hsl(hue, 34, 16)}"/>
    <circle cx="${r2(x + 16 * scale)}" cy="${r2(y - 36 * scale)}" r="${r2(20 * scale)}" fill="${hsl(hue, 34, 17)}"/>
  </g>`
}

// Warm-lit window grid on a dark building mass.
function windows(x, y, w, h, cols, rows, glow) {
  const pad = 14
  const gw = (w - pad * (cols + 1)) / cols
  const gh = (h - pad * (rows + 1)) / rows
  let out = ''
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const wx = x + pad + c * (gw + pad)
      const wy = y + pad + r * (gh + pad)
      const on = glow > 0.35
      out += `<rect x="${r2(wx)}" y="${r2(wy)}" width="${r2(gw)}" height="${r2(gh)}" rx="2" fill="${on ? hsl(45, 90, 72, 0.92) : hsl(45, 30, 40, 0.5)}"/>`
    }
  }
  return out
}

function villa(rand, hue, mood, tower) {
  const groundY = H * 0.72
  let out = `<g>`
  const glow = mood.key === 'a' || mood.key === 'c' ? 0.9 : 0.2

  if (tower) {
    // City tower massing for penthouses.
    const tw = 150 + rand() * 40
    const tx = W * 0.5 - tw / 2 + (rand() - 0.5) * 80
    const th = 360 + rand() * 90
    const ty = groundY - th
    out += `<rect x="${r2(tx)}" y="${r2(ty)}" width="${r2(tw)}" height="${r2(th)}" fill="${hsl(hue, 22, 12)}"/>`
    out += windows(tx, ty, tw, th, 4, 9, glow)
    // Neighbour blocks.
    out += `<rect x="${r2(tx - 130)}" y="${r2(groundY - 230)}" width="110" height="230" fill="${hsl(hue, 20, 10)}"/>`
    out += windows(tx - 130, groundY - 230, 110, 230, 3, 6, glow * 0.8)
    out += `<rect x="${r2(tx + tw + 20)}" y="${r2(groundY - 280)}" width="120" height="280" fill="${hsl(hue, 20, 11)}"/>`
    out += windows(tx + tw + 20, groundY - 280, 120, 280, 3, 7, glow * 0.7)
  } else {
    // Low modern villa massing: two stacked cuboids + a flat canopy.
    const bw = 420 + rand() * 90
    const bx = W * 0.5 - bw / 2 + (rand() - 0.5) * 70
    const bh = 150 + rand() * 30
    const by = groundY - bh
    out += `<rect x="${r2(bx)}" y="${r2(by)}" width="${r2(bw)}" height="${r2(bh)}" fill="${hsl(hue, 24, 13)}"/>`
    // Upper block, offset.
    const uw = bw * 0.5
    const ux = bx + (rand() * 0.4 + 0.1) * bw
    const uh = 110 + rand() * 30
    const uy = by - uh
    out += `<rect x="${r2(ux)}" y="${r2(uy)}" width="${r2(uw)}" height="${r2(uh)}" fill="${hsl(hue, 22, 16)}"/>`
    // Thin flat-roof canopy line.
    out += `<rect x="${r2(bx - 18)}" y="${r2(by - 8)}" width="${r2(bw + 36)}" height="8" fill="${hsl(hue, 30, 22)}"/>`
    out += windows(bx, by, bw, bh, 5, 2, glow)
    out += windows(ux, uy, uw, uh, 2, 2, glow)
  }
  out += `</g>`
  return { svg: out, groundY }
}

function pool(groundY, hue, mood) {
  const py = groundY + 8
  const grad = hsl(mood.key === 'c' ? 24 : 46, 70, 70, 0.55)
  return `<g>
    <rect x="0" y="${r2(py)}" width="${W}" height="${r2(H - py)}" fill="${hsl(hue, 30, 10)}"/>
    <ellipse cx="${W / 2}" cy="${r2(py + 70)}" rx="${W * 0.42}" ry="70" fill="${hsl(hue, 45, 30, 0.9)}"/>
    <rect x="${r2(W * 0.16)}" y="${r2(py + 34)}" width="${r2(W * 0.68)}" height="10" fill="${grad}" opacity="0.7"/>
    <rect x="${r2(W * 0.22)}" y="${r2(py + 64)}" width="${r2(W * 0.56)}" height="6" fill="${grad}" opacity="0.5"/>
  </g>`
}

function ground(groundY, hue) {
  return `<rect x="0" y="${r2(groundY)}" width="${W}" height="${r2(H - groundY)}" fill="${hsl(hue, 26, 12)}"/>`
}

// --- Compose one poster ------------------------------------------------------
function poster(slug, hue, mood, hasPool) {
  const rand = mulberry32(seedFrom(slug + mood.key))
  const sunX = 0.2 + rand() * 0.6
  const skyTop = hsl(mood.skyTop[0], mood.skyTop[1], mood.skyTop[2])
  const skyBot = hsl(mood.skyBot[0], mood.skyBot[1], mood.skyBot[2])
  const id = `g_${slug.replace(/[^a-z]/g, '')}${mood.key}`

  const { svg: building, groundY } = villa(rand, hue, mood, false)
  const cityBuilding = villa(rand, hue, mood, true)

  const useTower = ['skyline-crown', 'celestia-penthouse'].includes(slug)
  const mass = useTower ? cityBuilding : { svg: building, groundY }

  const treesN = 2 + Math.floor(rand() * 3)
  let flora = ''
  for (let i = 0; i < treesN; i++) {
    const x = rand() < 0.5 ? 60 + rand() * 180 : W - 60 - rand() * 200
    const s = 0.9 + rand() * 0.8
    flora += (hue < 100 || slug.includes('palma') || slug.includes('azure'))
      ? palm(x, mass.groundY + 6, s, hue)
      : tree(x, mass.groundY + 6, s, hue)
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="${id}_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="1" stop-color="${skyBot}"/>
    </linearGradient>
    <radialGradient id="${id}_sun" cx="${r2(sunX)}" cy="${mood.sunY}" r="0.5">
      <stop offset="0" stop-color="${hsl(mood.sun[0], mood.sun[1], mood.sun[2], 0.95)}"/>
      <stop offset="0.4" stop-color="${hsl(mood.sun[0], mood.sun[1], mood.sun[2], 0.35)}"/>
      <stop offset="1" stop-color="${hsl(mood.sun[0], mood.sun[1], mood.sun[2], 0)}"/>
    </radialGradient>
    <linearGradient id="${id}_vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(0 0% 0% / 0.18)"/>
      <stop offset="0.35" stop-color="hsl(0 0% 0% / 0)"/>
      <stop offset="1" stop-color="hsl(${hue} 40% 6% / 0.35)"/>
    </linearGradient>
    <pattern id="${id}_grain" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="hsl(0 0% 100% / 0)"/>
      <circle cx="1" cy="1" r="0.5" fill="hsl(0 0% 100% / 0.05)"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#${id}_sky)"/>
  <rect width="${W}" height="${H}" fill="url(#${id}_sun)"/>
  <circle cx="${r2(sunX * W)}" cy="${r2(mood.sunY * H)}" r="46" fill="${hsl(mood.sun[0], mood.sun[1], Math.min(96, mood.sun[2] + 8), 0.9)}"/>

  ${hills(rand, hue, H * 0.5, 3)}
  ${useTower ? '' : ground(mass.groundY, hue)}
  ${mass.svg}
  ${flora}
  ${hasPool && !useTower ? pool(mass.groundY, hue, mood) : ''}

  <rect width="${W}" height="${H}" fill="url(#${id}_grain)"/>
  <rect width="${W}" height="${H}" fill="url(#${id}_vig)"/>
</svg>`
}

// --- Write all ----------------------------------------------------------------
async function main() {
  await mkdir(OUT, { recursive: true })
  let count = 0
  for (const p of properties) {
    for (const mood of moods) {
      const name = mood.key === 'a' ? `${p.slug}.svg` : `${p.slug}-${mood.key}.svg`
      const svg = poster(p.slug, p.hue, mood, p.pool)
      await writeFile(resolve(OUT, name), svg, 'utf8')
      count++
    }
  }
  console.log(`✓ Generated ${count} posters for ${properties.length} residences → public/posters/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
