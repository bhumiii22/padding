import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures assets are loaded from the root
  build: {
    outDir: 'dist', // Explicitly tells Vite to put files in 'dist'
    assetsDir: 'assets', // Keeps your JS/CSS organized in an assets folder
  }
})
