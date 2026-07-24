// =============================================================================
// Generate favicons + web app manifest from assets/favicon-source.svg using the
// `favicons` package. Outputs into public/. Also copies the source SVG as
// public/favicon.svg (crisp vector icon for modern browsers).
//
// Run: pnpm favicons
// =============================================================================
import { favicons } from 'favicons'
import { readFile, writeFile, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = resolve(root, 'assets/favicon-source.svg')
const OUT = resolve(root, 'public')

const configuration = {
  path: '/',
  appName: 'Aurea Living',
  appShortName: 'Aurea',
  appDescription: 'A collection of luxury villas & residences.',
  developerName: 'Aurea Living',
  background: '#0f2a24',
  theme_color: '#0f2a24',
  display: 'standalone',
  start_url: '/',
  lang: 'id-ID',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
}

async function run() {
  const source = await readFile(SOURCE)
  const response = await favicons(source, configuration)

  // Write generated raster images (png/ico).
  await Promise.all(
    response.images.map((image) => writeFile(resolve(OUT, image.name), image.contents)),
  )

  // Write only the manifest file; skip injected HTML files (we set links in
  // nuxt.config). Rename to the conventional site.webmanifest.
  const manifest = response.files.find((f) => f.name.endsWith('.json'))
  if (manifest) {
    await writeFile(resolve(OUT, 'site.webmanifest'), manifest.contents)
  }

  // Crisp vector favicon for modern browsers.
  await copyFile(SOURCE, resolve(OUT, 'favicon.svg'))

  console.log(`✓ Generated ${response.images.length} favicon assets + site.webmanifest → public/`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
