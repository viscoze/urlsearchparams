import parseOrigin from './parse'
import stringifyOrigin from './stringify'

import UrlSearchParams, { parse, stringify } from '.'

it('exports parse', () => {
  expect(parse).toBe(parseOrigin)
})

it('exports stringify', () => {
  expect(stringify).toBe(stringifyOrigin)
})

describe('set', () => {
  let urlSearch

  const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2'

  beforeEach(() => {
    urlSearch = UrlSearchParams.fromString(searchString)
  })

  describe('updating', () => {
    it('updates value if param exists', () => {
      urlSearch.set('query1[obj][field1]', 'valueNew')

      expect(urlSearch.toString()).toBe('query1[obj][field2]=value2&query1[obj][field1]=valueNew')
    })

    it('updates object if path points to it', () => {
      urlSearch.set('query1[obj]', 'valueNew')

      expect(urlSearch.toString()).toBe('query1[obj]=valueNew')
    })
  })

  describe('appending', () => {
    it('appends param if it does not exist', () => {
      urlSearch.set('query1[obj][field3]', 'value3').set('query2', 'value2')

      expect(urlSearch.toString()).toBe(
        'query1[obj][field1]=value1&query1[obj][field2]=value2&query1[obj][field3]=value3&query2=value2',
      )
    })

    it('appends param if value is empty string', () => {
      urlSearch.set('query2', '')

      expect(urlSearch.toString()).toBe(
        'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=',
      )
    })

    it('appends param if value is zero', () => {
      urlSearch.set('query2', 0)

      expect(urlSearch.toString()).toBe(
        'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=0',
      )
    })

    it('appends param if value is false', () => {
      urlSearch.set('query2', false)

      expect(urlSearch.toString()).toBe(
        'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=false',
      )
    })

    it('does not append param if value is null', () => {
      urlSearch.set('query2', null)

      expect(urlSearch.toString()).toBe('query1[obj][field1]=value1&query1[obj][field2]=value2')
    })

    it('does not append param if value is undefined', () => {
      urlSearch.set('query2', undefined)

      expect(urlSearch.toString()).toBe('query1[obj][field1]=value1&query1[obj][field2]=value2')
    })
  })

  describe('removing', () => {
    it('removes param if value is null', () => {
      urlSearch.set('query1[obj][field2]', null)

      expect(urlSearch.toString()).toBe('query1[obj][field1]=value1')
    })

    it('removes param if value is undefined', () => {
      urlSearch.set('query1[obj][field2]', undefined)

      expect(urlSearch.toString()).toBe('query1[obj][field1]=value1')
    })

    it('removes object if path points to it', () => {
      urlSearch.set('query1[obj]', null)

      expect(urlSearch.toString()).toBe('')
    })
  })
})

describe('toString', () => {
  const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2'

  it('returns search as string', () => {
    const urlSearch = UrlSearchParams.fromString(searchString)

    expect(urlSearch.toString()).toBe(searchString)
  })

  it('returns search without ?', () => {
    const urlSearch = UrlSearchParams.fromString(`?${searchString}`)

    expect(urlSearch.toString()).toBe(searchString)
  })

  it('returns search as empty string if search string is empty', () => {
    const urlSearch = UrlSearchParams.fromString('')

    expect(urlSearch.toString()).toBe('')
  })
})

describe('toObject', () => {
  it('returns search as object', () => {
    const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value2'

    const urlSearch = UrlSearchParams.fromString(searchString)

    expect(urlSearch.toObject()).toMatchObject({
      query1: {
        obj: {
          field1: 'value1',
          field2: 'value2',
        },
      },
      query2: 'value2',
    })
  })

  it('returns search as empty object if search string is empty', () => {
    const urlSearch = UrlSearchParams.fromString('')

    expect(urlSearch.toObject()).toMatchObject({})
  })
})
