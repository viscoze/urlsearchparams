import _flow from 'lodash/flow'
import _last from 'lodash/last'
import _first from 'lodash/first'
import _isNil from 'lodash/isNil'
import _isArray from 'lodash/isArray'

import { ARRAY } from './constants'
import convertor from './convertor'
import ParamsList from './ParamsList'
import { convertKeyToPath } from './helpers'

export { default as parse } from './parse'

export { default as stringify } from './stringify'

function preparePath(key) {
  if (_isArray(key)) {
    return key
  }

  return convertKeyToPath(key)
}

class UrlSearchParams {
  paramsList = null

  constructor(searchString) {
    this.paramsList = _flow(
      string => string.replace(/^\?/, ''),
      convertor.fromSearchString,
      ParamsList.fromArray,
    )(searchString)
  }

  static fromString(searchString) {
    return new UrlSearchParams(searchString)
  }

  get(key) {
    const path = preparePath(key)
    const params = this.paramsList.get(path).toArray()

    if (params.length === 1) {
      return _first(params).value
    }

    const paramsWihoutCommonPath = params.map(param => ({
      path: param.path.slice(path.length),
      value: param.value,
    }))

    return convertor.toSearchObject(paramsWihoutCommonPath)
  }

  set(key, value) {
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

  has(key) {
    const path = preparePath(key)

    return this.paramsList.has(path)
  }

  toString() {
    return convertor.toSearchString(this.paramsList.toArray())
  }

  toObject() {
    return convertor.toSearchObject(this.paramsList.toArray())
  }
}

export default UrlSearchParams
