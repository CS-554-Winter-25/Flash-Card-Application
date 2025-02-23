import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simulates a browser environment for DOM testing
    setupFiles: './setupTests.js' 
  },
})
