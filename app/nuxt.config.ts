// https://nuxt.com/docs/api/configuration/nuxt-config
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
export default defineNuxtConfig({
  ssr: false,
  css: ['/assets/css/main.scss'],
  vite: {
    optimizeDeps: {
      include: ['@solana/web3.js', '@solana/wallet-adapter-base'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
  },
  build: {
    transpile: ['@solana/web3.js', '@solana/wallet-adapter-base'],
  },
  buildModules: ['@nuxtjs/google-fonts'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  nitro: {
    rollupConfig: {
      external: [
        'borsh',
        'util',
        'secp256k1',
        '@solana/web3.js',
        '@solana/wallet-adapter-phantom',
        '@solana/wallet-adapter-base',
      ],
    },
  },
  googleFonts: {
    families: {
      Lato: [300, 400, 600, 700, 900],
    }
  }
})
