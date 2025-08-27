import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: [
      '8964308fbc5f.ngrok-free.app', // 👈 add your ngrok domain here
      'dress-issued-harbour-brooklyn.trycloudflare.com', // 👈 add your cloudflare domain here
      'gzip-jeff-des-ra.trycloudflare.com',
      'speeds-thumbs-newly-arm.trycloudflare.com',
    ],
  },
});
