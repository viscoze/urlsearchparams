import { convertKeyToPath, convertPathToKey, comparePaths, includesPath } from './helpers'

describe('convertKeyToPath', () => {
  it('parses key into path', () => {
    const key = 'query[object][field]'

    const path = convertKeyToPath(key)

    expect(path).toMatchObject(['query', 'object', 'field'])
  })
})

describe('convertPathToKey', () => {
  it('stringifies path into key', () => {
    const path = ['query', 'object', 'field']

    const key = convertPathToKey(path)

    expect(key).toBe('query[object][field]')
  })
})

describe('comparePaths', () => {
  it('returns true if paths are equel', () => {
    const pathA = ['query1', 'obj', 'field1']
    const pathB = ['query1', 'obj', 'field1']
    const result = comparePaths(pathA, pathB)

    expect(result).toBe(true)
  })

  it('returns false if paths are not equel', () => {
    const pathA = ['query1', 'obj', 'field1']
    const pathB = ['query1', 'obj', 'field2']
    const result = comparePaths(pathA, pathB)

    expect(result).toBe(false)
  })
})

describe('includesPath', () => {
  it('returns true if paths are equel', () => {
    const pathA = ['query1', 'obj', 'field1']
    const pathB = ['query1', 'obj', 'field1']
    const result = includesPath(pathA, pathB)

    expect(result).toBe(true)
  })

  it('returns true if path B is part of path A', () => {
    const pathA = ['query1', 'obj', 'field1']
    const pathB = ['query1', 'obj']
    const result = includesPath(pathA, pathB)

    expect(result).toBe(true)
  })

  it('returns false if path A is part of path B', () => {
    const pathA = ['query1', 'obj']
    const pathB = ['query1', 'obj', 'field1']
    const result = includesPath(pathA, pathB)

    expect(result).toBe(false)
  })

  it('returns false if path B is not part of path A', () => {
    const pathA = ['query', 'obj1', 'field1']
    const pathB = ['query', 'obj2', 'field1']
    const result = includesPath(pathA, pathB)

    expect(result).toBe(false)
  })
})
