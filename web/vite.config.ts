import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import viteCompression from 'vite-plugin-compression'
import progmem from './progmem'

import { resolve } from 'path'
import { lookup } from 'dns/promises'

const deviceHost = 'macropad.local'
let deviceIPAddress: string | undefined

export default defineConfig(async ({ mode }) => {
  if (mode === 'development') {
    try {
      const result = await lookup(deviceHost)
      deviceIPAddress = result.address
    } catch (error) {
      console.log(`\n\tCannot resolve '${deviceHost}'\n\tthe device is not powered on or mDNS failed.\n`)
      return
    }
  }

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    base: './',
    plugins: [
      vue(),
      viteSingleFile(),
      viteCompression({
        success () {
          progmem({
            source: './dist/index.html.gz',
            destination: '../src/html.h',
          })
        },
      }),
    ],
    build: {
      target: 'esnext',
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => 'html.js',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import \'@/assets/_variables\';',
        },
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': `http://${deviceIPAddress}`,
      },
    },
  }
})
