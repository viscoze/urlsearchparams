import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _isPlainObject from 'lodash/isPlainObject'

import { ARRAY } from '../constants'
import { convertKeyToPath, convertPathToKey } from '../helpers'

function fromSearchString(searchString) {
  return searchString
    .split('&')
    .filter(Boolean)
    .map(paramString => paramString.split('='))
    .map(([key, value]) => ({
      key,
      value,
    }))
    .map(({ key, value }) => ({
      path: convertKeyToPath(key),
      value,
    }))
}

function toSearchString(paramsArray) {
  return paramsArray
    .map(({ path, value }) => ({
      key: convertPathToKey(path),
      value,
    }))
    .map(({ key, value }) => [key, value])
    .map(paramArray => paramArray.join('='))
    .join('&')
}

function fromSearchObject(searchObject) {
  function convertToArray(object, path = [], result = []) {
    return _reduce(
      object,
      (acc, value, key) => {
        if (_isPlainObject(value)) {
          return convertToArray(value, path.concat(key), acc)
        }

        if (_isArray(value)) {
          return value.reduce(
            (items, item) => items.concat({ path: path.concat(key).concat(ARRAY), value: item }),
            acc,
          )
        }

        return acc.concat({ path: path.concat(key), value })
      },
      result,
    )
  }

  return convertToArray(searchObject)
}

function toSearchObject(paramsArray) {
  function convert(path, value, acc = {}) {
    const [head, ...rest] = path
    const [nextHead] = rest
    const node = acc[head] ?? {}

    if (nextHead === ARRAY) {
      return {
        ...acc,
        [head]: _get(acc, head, []).concat(value),
      }
    }

    if (_isEmpty(rest)) {
      return {
        ...acc,
        [head]: value,
      }
    }

    return {
      ...acc,
      [head]: {
        ...node,
        ...convert(rest, value, node),
      },
    }
  }

  return paramsArray.reduce((acc, { path, value }) => convert(path, value, acc), {})
}

export default {
  fromSearchString,
  toSearchString,
  fromSearchObject,
  toSearchObject,
}
