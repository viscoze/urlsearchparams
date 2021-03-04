import _zipWith from 'lodash/zipWith'
import _takeWhile from 'lodash/takeWhile'

import { ARRAY } from './constants'

export function convertKeyToPath(key: string) {
  return key.replace(/\[\]/g, '[$array]').replace(/]/g, '').split(/\[/g)
}

export function convertPathToKey(path: string[]) {
  const [head, ...rest] = path
  const result = rest.reduce((acc, item) => {
    if (item === ARRAY) {
      return `${acc}[]`
    }

    return `${acc}[${item}]`
  }, head)

  return result
}

export function comparePaths(pathA: string[], pathB: string[]) {
  return pathA.join('.') === pathB.join('.')
}

export function includesPath(pathA: string[], pathB: string[]) {
  const lengthA = pathA.length
  const lengthB = pathB.length

  const count = _takeWhile(
    _zipWith(pathA, pathB, (a: string[], b: string[]) => a === b),
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
