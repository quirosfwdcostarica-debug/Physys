// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- ¡Esto fue lo que borré por error!

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Restauramos Tailwind
  ],
  server: {
    watch: {
      ignored: ['**/db.json'] // Evita el reseteo brusco
    }
  }
})