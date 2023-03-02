import { createClient } from '@sanity/client'

const config = useRuntimeConfig()

export const client = createClient({
  projectId: config.public.SANITY_ID,
  useCdn: false,
  dataset: 'production',
  apiVersion: '1',
  token: config.public.TOKEN,
})
