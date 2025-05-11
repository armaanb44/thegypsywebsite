import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl' // ✅ THIS LINE is missing in your current config
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), tailwindcss()],
  server: {
    host: true, // 👈 This exposes your dev server on LAN (192.168.x.x)
  },
})
