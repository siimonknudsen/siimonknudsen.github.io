/**
 * optimize-images.mjs — one command keeps project imagery lean.
 *
 *   node scripts/optimize-images.mjs
 *
 * 1. Converts every .jpg/.jpeg/.png under public/projects to WebP
 *    (photos q82, PNG/UI-screenshots q90 — visually lossless), deletes the
 *    original only when the WebP is actually smaller (git keeps history).
 * 2. Generates a 320px-wide thumb.webp from each project's hero for the
 *    header dropdown menus (they render ~64px rows; the full hero is 2000px).
 *
 * After adding new images, run this, then make sure content.json refs use
 * the .webp extension. Media.jsx tries .webp first for extensionless paths.
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/projects', import.meta.url).pathname
const THUMB_WIDTH = 320 // 2× the ~160px max the menus ever render

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

let before = 0
let after = 0
const kept = []

for await (const path of walk(ROOT)) {
  const ext = extname(path).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const src = await stat(path)
  const out = path.slice(0, -ext.length) + '.webp'
  const isPng = ext === '.png'
  await sharp(path)
    .webp({ quality: isPng ? 90 : 82, effort: 6, smartSubsample: true })
    .toFile(out)
  const dst = await stat(out)

  before += src.size
  if (dst.size < src.size) {
    after += dst.size
    await unlink(path)
    console.log(`${path.replace(ROOT + '/', '')}  ${fmt(src.size)} → ${fmt(dst.size)}`)
  } else {
    // WebP didn't win — keep the original, drop the attempt.
    after += src.size
    await unlink(out)
    kept.push(path.replace(ROOT + '/', ''))
  }
}

// Dropdown thumbs from each project's hero.
for (const entry of await readdir(ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const hero = join(ROOT, entry.name, 'images', 'hero.webp')
  const thumb = join(ROOT, entry.name, 'images', 'thumb.webp')
  try {
    await sharp(hero).resize({ width: THUMB_WIDTH }).webp({ quality: 80 }).toFile(thumb)
    const t = await stat(thumb)
    console.log(`${entry.name}/images/thumb.webp  ${fmt(t.size)}`)
  } catch {
    console.log(`${entry.name}: no hero.webp — skipped thumb`)
  }
}

console.log(`\nTotal: ${fmt(before)} → ${fmt(after)} (saved ${fmt(before - after)})`)
if (kept.length) console.log(`Kept as-is (WebP was not smaller): ${kept.join(', ')}`)
