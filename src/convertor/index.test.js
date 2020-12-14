import convertor from '.'

describe('fromSearchString', () => {
  it('converts search string to params array', () => {
    const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3'

    const paramsArray = convertor.fromSearchString(searchString)

    expect(paramsArray).toMatchObject([
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value3' },
    ])
  })
})

describe('toSearchString', () => {
  it('converts params array to search string', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value3' },
    ]

    const searchString = convertor.toSearchString(paramsArray)

    expect(searchString).toBe('query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3')
  })
})

describe('toSearchObject', () => {
  it('converts params array to search object', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value3' },
    ]

    const searchObject = convertor.toSearchObject(paramsArray)

    expect(searchObject).toMatchObject({
      query1: {
        obj: {
          field1: 'value1',
          field2: 'value2',
        },
      },
      query2: 'value3',
    })
  })
})

describe('fromSearchObject', () => {
  it('converts search object to params array', () => {
    const searchObject = {
      query1: {
        obj: {
          field1: 'value1',
          field2: 'value2',
        },
      },
      query2: 'value3',
    }

    const paramsArray = convertor.fromSearchObject(searchObject)

    expect(paramsArray).toMatchObject([
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value3' },
    ])
  })
})
