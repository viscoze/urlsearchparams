import _ from 'lodash'

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
    return _.reduce(
      object,
      (acc, value, key) => {
        if (_.isPlainObject(value)) {
          return convertToArray(value, path.concat(key), acc)
        }

        if (_.isArray(value)) {
          return value.reduce(
            (items, item) => items.concat({ path: path.concat(key).concat('$array'), value: item }),
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

    if (nextHead === '$array') {
      return {
        ...acc,
        [head]: _.get(acc, head, []).concat(value),
      }
    }

    if (_.isEmpty(rest)) {
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

export default { fromSearchString, toSearchString, fromSearchObject, toSearchObject }
