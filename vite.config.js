import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

    //para servir las imágenes del backend config Vite
    server: {
      proxy: {
        // Redirigir solicitudes de imágenes al servidor backend en el puerto 3000
        '/assets/images': 'http://localhost:3000',
      },
    },
  })
  

