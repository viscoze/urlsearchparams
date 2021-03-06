import _get from 'lodash/get'
import _flow from 'lodash/flow'
import _last from 'lodash/last'
import _isNil from 'lodash/isNil'
import _isArray from 'lodash/isArray'

import { ARRAY } from './constants'
import { TKey, TValue } from './types'
import convertor from './convertor'
import ParamsList from './ParamsList'
import { convertKeyToPath } from './helpers'

export { default as parse } from './parse'

export { default as stringify } from './stringify'

function preparePath(key: TKey): string[] {
  if (_isArray(key)) {
    return key
  }

  return convertKeyToPath(key)
}

class UrlSearchParams {
  paramsList: ParamsList

  constructor(searchString: string) {
    this.paramsList = _flow(
      (string: string) => string.replace(/^\?/, ''),
      convertor.fromSearchString,
      ParamsList.fromArray,
    )(searchString)
  }

  static fromString(searchString: string): UrlSearchParams {
    return new UrlSearchParams(searchString)
  }

  get(key: TKey): Record<string, unknown> | string {
    const path = preparePath(key)
    const params = this.paramsList.get(path).toArray()
    const searchObject = convertor.toSearchObject(params)

    return _get(searchObject, path, null)
  }

  set(key: TKey, value: TValue): UrlSearchParams {
    const path = preparePath(key)

    if (_isNil(value)) {
      this.paramsList = this.paramsList.remove(path)

      return this
    }

    if (_last(path) === ARRAY) {
      this.paramsList = this.paramsList.append(path, value)

      return this
    }

    if (this.paramsList.has(path)) {
      this.paramsList = this.paramsList.update(path, value)

      return this
    }

    this.paramsList = this.paramsList.append(path, value)

    return this
  }

  has(key: TKey): boolean {
    const path = preparePath(key)

    return this.paramsList.has(path)
  }

  toString(): string {
    return convertor.toSearchString(this.paramsList.toArray())
  }

  toObject(): Record<string, unknown> {
    return convertor.toSearchObject(this.paramsList.toArray())
  }
}

export default UrlSearchParams
