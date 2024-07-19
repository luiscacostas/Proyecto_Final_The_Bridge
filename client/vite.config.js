import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://proyecto-final-the-bridge.onrender.com', // Cambia esto a la URL de tu backend en Render
    },
  },
})
