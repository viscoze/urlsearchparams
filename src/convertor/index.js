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
  const paramsArray = []

  function convertToArray(object, path = []) {
    _.forEach(object, (value, key) => {
      if (_.isPlainObject(value)) {
        convertToArray(value, path.concat(key))
      } else {
        paramsArray.push({ path: path.concat(key), value })
      }
    })
  }

  convertToArray(searchObject)

  return paramsArray
}

function toSearchObject(paramsArray) {
  function convertToObject(array) {
    const object = {}

    array.forEach(({ path, value }) => {
      const [head, ...rest] = path

      if (_.isEmpty(rest)) {
        object[head] = value

        return
      }

      if (!object[head]) {
        object[head] = []
      }

      object[head].push({
        path: rest,
        value,
      })
    })

    _.mapValues(object, (value, key) => {
      if (_.isArray(value)) {
        object[key] = convertToObject(value)
      }

      return value
    })

    return object
  }

  return convertToObject(paramsArray)
}

export default { fromSearchString, toSearchString, fromSearchObject, toSearchObject }
