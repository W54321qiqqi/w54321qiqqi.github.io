import { warmup } from 'vite-plugin-warmup'
export const createWarmup = () => {
  return warmup({
    clientFiles: ['./src/**'],
  })
}
