// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  //uncomment this line before creating build
  base: "/",  // ← use this, exactly as the URL path
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    host: 'localhost',
    port: 3000,
  //   proxy: {
  //     '/api': 'http://192.168.1.4:5000',
  //   },
  },
  
});


// "homepage" in package.json is only relevant for Create React App (CRA), not Vite
// In Vite, you control the base path using this in vite.config.ts