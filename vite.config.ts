import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base './' = relative asset paths, so the build works from a GitHub Pages subfolder
export default defineConfig({
  plugins: [react()],
  base: './',
})
