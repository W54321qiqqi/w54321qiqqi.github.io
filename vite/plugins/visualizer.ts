import { visualizer } from 'rollup-plugin-visualizer'
export const createVisualizer = () => {
  visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
    filename: 'report.html',
  })
}
