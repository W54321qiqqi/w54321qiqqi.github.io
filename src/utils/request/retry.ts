import type { AxiosError, AxiosInstance } from 'axios'
// 重连
export class AxiosRetry {
  retry(service: AxiosInstance, err: AxiosError) {
    const config = err?.config as any
    config._retryCount = config._retryCount || 0
    config._retryCount += 1
    delete config.headers
    setTimeout(() => {
      service(config)
    }, 100)
  }
}
