import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/geocode':"https://api.openrouteservice.org"
    }
  },
  plugins: [react()],
})
