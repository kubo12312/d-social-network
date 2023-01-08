// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['@solana/web3.js', '@solana/wallet-adapter-base'],
    },
  },
  build: {
    transpile: ['@solana/web3.js', '@solana/wallet-adapter-base'],
  },
  modules: ['@nuxtjs/tailwindcss'],
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
})
