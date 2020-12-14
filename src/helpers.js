import _ from 'lodash'

export function convertKeyToPath(key) {
  return key.replace(/[]/g, '$array').replace(/]/g, '').split(/\[/)
}

export function convertPathToKey(path) {
  const [head, ...rest] = path
  const result = rest.reduce((acc, item) => `${acc}[${item}]`, head)

  return result
}

export function comparePaths(pathA, pathB) {
  return pathA.join('.') === pathB.join('.')
}

export function includesPath(pathA, pathB) {
  const lengthA = pathA.length
  const lengthB = pathB.length

  const count = _.takeWhile(
    _.zipWith(pathA, pathB, (a, b) => a === b),
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
