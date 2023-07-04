import compression from 'vite-plugin-compression'

export const createCompression = (env: Record<string, string>) => {
  const plugin: any[] = []
  const { VITE_BUILD_COMPRESS } = env
  const compressList = VITE_BUILD_COMPRESS.split(',')
  if (compressList.includes('gz')) {
    plugin.push(
      compression({
        ext: '.gz',
        deleteOriginFile: false,
      }),
    )
  }
  if (compressList.includes('br')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false,
      }),
    )
  }
  return plugin
}
