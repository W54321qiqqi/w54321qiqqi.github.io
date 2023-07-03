export {}
declare global {
  type Recordable<T = any> = Record<string, T>
  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }
}
