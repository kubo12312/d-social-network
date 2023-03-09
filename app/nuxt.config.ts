// https://nuxt.com/docs/api/configuration/nuxt-config
import { Buffer } from 'buffer'
import inject from '@rollup/plugin-inject'
import Inspect from 'vite-plugin-inspect'

export default defineNuxtConfig({
  ssr: false,
  css: ['/assets/css/main.scss'],
  vite: {
    esbuild: {
      target: 'esnext',
    },
    build: {
      target: 'esnext',
    },
    define: {
      'global': {},
      'process.env.NODE_DEBUG': JSON.stringify(''),
      'process.env.BROWSER': true,
    },
    plugins: [
      inject({
        Buffer: ['buffer', 'Buffer'],
      }),
      Inspect(),
    ],
    optimizeDeps: {
      include: [
        'buffer',
        '@solana/web3.js',
        '@solana/wallet-adapter-base',
        '@solana/wallet-adapter-phantom',
        '@project-serum/anchor',
      ],
      esbuildOptions: {
        target: 'esnext',
      },
    },
  },
  build: {
    transpile: ['@solana/web3.js', '@solana/wallet-adapter-base', '@solana/wallet-adapter-phantom'],
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
    },
  },
  runtimeConfig: {
    public: {
      SANITY_ID: 'nedqxbx1',
      TOKEN:
        'sksx68zPVMgmPVzyEm6MWEX0k2lWiSuBb05fXHrIZ0dXDNSXFZGpbTaTzOj38mhNW5W2VnoFqIgjJ8SD55LMSARUaVlrxxSDWxwJ8HwXkZaFdfQ5sFZyIYyMCH8ZmFHi99cLokmPbZd6aqYBEUGFTsfCcLILaJJf8nx42vRC7p83TBR033GD',
    },
  },
})
