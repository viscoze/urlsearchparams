import _zipWith from 'lodash/zipWith'
import _takeWhile from 'lodash/takeWhile'

import { ARRAY } from './constants'

export function convertKeyToPath(key) {
  return key.replace(/\[\]/g, '[$array]').replace(/]/g, '').split(/\[/g)
}

export function convertPathToKey(path) {
  const [head, ...rest] = path
  const result = rest.reduce((acc, item) => {
    if (item === ARRAY) {
      return `${acc}[]`
    }

    return `${acc}[${item}]`
  }, head)

  return result
}

export function comparePaths(pathA, pathB) {
  return pathA.join('.') === pathB.join('.')
}

export function includesPath(pathA, pathB) {
  const lengthA = pathA.length
  const lengthB = pathB.length

  const count = _takeWhile(
    _zipWith(pathA, pathB, (a, b) => a === b),
    Boolean,
  ).length

  if (lengthA === lengthB && lengthA === count) {
    return true
  }

  if (pathB.length === count) {
    return true
  }

  return false
}
