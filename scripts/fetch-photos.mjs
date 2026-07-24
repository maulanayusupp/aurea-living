// =============================================================================
// Download + optimise real property photography (Unsplash) into
// public/properties/. Self-hosted so the site has no runtime image dependency
// and works offline after fetching. Photos are used under the Unsplash License
// (free to use; attribution appreciated). These are stock photos for
// DEMONSTRATION — replace with official property photography for production.
//
// Run: pnpm photos   (requires network; commit the resulting JPGs)
//
// Output: public/properties/p00.jpg … p22.jpg (max 1600px wide, mozjpeg q78).
// =============================================================================
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/properties')

// Verified Unsplash photo IDs (luxury exteriors, pools, interiors, a highland
// manor, an aerial estate). Index = filename pNN.jpg (see properties.config.ts).
const ids = [
  '1600585154340-be6161a56a0c', // 00 modern house + tree (dusk)
  '1600596542815-ffad4c1539a9', // 01 white villa + pool
  '1600607687939-ce8a6c25118c', // 02 open-plan living room
  '1512917774080-9991f1c4c750', // 03 modern villa + plants
  '1600047509807-ba8f99d2cdde', // 04 villa terrace + pool
  '1600585152220-90363fe7e115', // 05 brick/modern house exterior
  '1600566753086-00f18fb6b3ea', // 06 living room + stairs
  '1580587771525-78b9dba3b914', // 07 modern kitchen
  '1512918728675-ed5a9ecdebfd', // 08 modern villa + pool
  '1564013799919-ab600027ffc6', // 09 large villa + pool + palms
  '1568605114967-8130f3a36994', // 10 highland manor at dusk
  '1502672260266-1c1ef2d93688', // 11 bedroom
  '1493809842364-78817add7ffb', // 12 living room (plants)
  '1600210492486-724fe5c67fb0', // 13 living room + blue sofa (view)
  '1600607688969-a5bfcd646154', // 14 warm leather living room
  '1600566753190-17f0baa2a6c3', // 15 (spare)
  '1512699355324-f07e3106dae5', // 16 wood/black modern house
  '1522708323590-d24dbb6b0267', // 17 aerial neighbourhood / estate
  '1600607687920-4e2a09cf159d', // 18 bright living/dining
  '1523217582562-09d0def993a6', // 19 dark elegant dining
  '1505691938895-1758d7feb511', // 20 white minimalist villa
  '1616486338812-3dadae4b4ace', // 21 bright living room + art
]

async function main() {
  await mkdir(OUT, { recursive: true })
  let count = 0
  for (let i = 0; i < ids.length; i++) {
    const url = `https://images.unsplash.com/photo-${ids[i]}?w=1600&q=80&auto=format&fit=crop`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Fetch failed (${res.status}) for #${i} ${ids[i]}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const name = `p${String(i).padStart(2, '0')}.jpg`
    await sharp(buf)
      .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(resolve(OUT, name))
    count++
    process.stdout.write(`  ✓ ${name}\n`)
  }
  console.log(`\n✓ Downloaded ${count} property photos → public/properties/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
