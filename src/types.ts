export type TKey = string | string[]

export type TPath = string[]

export type TValue = number | string | boolean | null | undefined

export type TParamItem = {
  path: string[]
  value: TValue
}

export type TParamsArray = TParamItem[]
