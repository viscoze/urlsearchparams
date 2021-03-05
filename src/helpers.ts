import _zipWith from 'lodash/zipWith'
import _takeWhile from 'lodash/takeWhile'

import { ARRAY } from './constants'
import { TPath } from './types'

export function convertKeyToPath(key: string): TPath {
  return key.replace(/\[\]/g, '[$array]').replace(/]/g, '').split(/\[/g)
}

export function convertPathToKey(path: TPath): string {
  const [head, ...rest] = path
  const result = rest.reduce((acc, item) => {
    if (item === ARRAY) {
      return `${acc}[]`
    }

    return `${acc}[${item}]`
  }, head)

  return result
}

export function comparePaths(pathA: TPath, pathB: TPath): boolean {
  return pathA.join('.') === pathB.join('.')
}

export function includesPath(pathA: TPath, pathB: TPath): boolean {
  const lengthA = pathA.length
  const lengthB = pathB.length

  const count = _takeWhile(
    _zipWith(pathA as any[], pathB as any[], (a: TPath, b: TPath) => a === b),
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
