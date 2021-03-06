export declare function parse(s: string): Record<string, unknown>
export declare function stringify(o: Record<string, unknown>): string
declare class UrlSearchParams {
  static fromString(searchString: string): UrlSearchParams
  get(key: string | string[]): Record<string, unknown> | string
  set(key: string | string[], value: number | string | boolean | null | undefined): UrlSearchParams
  has(key: string | string[]): boolean
  toString(): string
  toObject(): Record<string, unknown>
}
export default UrlSearchParams
