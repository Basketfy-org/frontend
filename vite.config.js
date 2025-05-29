import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  nodePolyfills(),],
  server : {
    allowedHosts: ['.herokuapp.com', 'localhost',"d0e7-197-211-59-77.ngrok-free.app"],
  }
})
