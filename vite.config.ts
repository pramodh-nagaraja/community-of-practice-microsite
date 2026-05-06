import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: '/community-of-practice-microsite/',
  build: {
    outDir: 'docs',
    assetsInlineLimit: 10_000_000,
    cssCodeSplit: false,
  },
})