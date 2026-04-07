import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate the heavy Spline runtime (~6.8 MB) into its own chunk
          // so it never blocks the main vendor bundle
          spline: ['@splinetool/react-spline', '@splinetool/runtime'],
          // Keep animation + scroll libs together (small, always needed)
          motion: ['framer-motion'],
          gsap: ['gsap'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
