import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Default (4096) base64-inlines small images into JS — the About chunk was
    // carrying ~32 KB of logo PNGs as base64, which gzips terribly and defeats
    // loading="lazy". Keep them as real files.
    assetsInlineLimit: 1024,
  },
})
