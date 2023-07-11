export {}
declare global {
  type Recordable<T = any> = Record<string, T>
  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
}
