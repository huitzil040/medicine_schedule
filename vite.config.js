import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PWA Hoge App',
        short_name: 'App Name',
        description: 'test app',
        background_color: '#ffffff',
        theme_color: '#0078D7',
        icons: [
          {
            src: '192_sample_img.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512_sample_img.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }
  )],
})
