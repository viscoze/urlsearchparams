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

  it('converts search string to params array with respect to array values', () => {
    const searchString =
      'query[field1][]=value1&query[field1][]=value2&query[field2][]=value3&query[field3]=value4'

    const paramsArray = convertor.fromSearchString(searchString)

    expect(paramsArray).toMatchObject([
      { path: ['query', 'field1', '$array'], value: 'value1' },
      { path: ['query', 'field1', '$array'], value: 'value2' },
      { path: ['query', 'field2', '$array'], value: 'value3' },
      { path: ['query', 'field3'], value: 'value4' },
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

  it('converts params array to search string with respect to array values', () => {
    const paramsArray = [
      { path: ['query', 'field1', '$array'], value: 'value1' },
      { path: ['query', 'field1', '$array'], value: 'value2' },
      { path: ['query', 'field2', '$array'], value: 'value3' },
      { path: ['query', 'field3'], value: 'value4' },
    ]

    const searchString = convertor.toSearchString(paramsArray)

    expect(searchString).toBe(
      'query[field1][]=value1&query[field1][]=value2&query[field2][]=value3&query[field3]=value4',
    )
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

  it('converts search object to params array with respect to array values', () => {
    const searchObject = {
      query: {
        field1: ['value1', 'value2'],
        field2: ['value3'],
        field3: 'value4',
      },
    }

    const paramsArray = convertor.fromSearchObject(searchObject)

    expect(paramsArray).toMatchObject([
      { path: ['query', 'field1', '$array'], value: 'value1' },
      { path: ['query', 'field1', '$array'], value: 'value2' },
      { path: ['query', 'field2', '$array'], value: 'value3' },
      { path: ['query', 'field3'], value: 'value4' },
    ])
  })
})

describe('toSearchObject', () => {
  it('converts params array to search object', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query1', 'obj', 'field3', 'subfield'], value: 'value3' },
      { path: ['query2'], value: 'value3' },
    ]

    const searchObject = convertor.toSearchObject(paramsArray)

    expect(searchObject).toMatchObject({
      query1: {
        obj: {
          field1: 'value1',
          field2: 'value2',
          field3: {
            subfield: 'value3',
          },
        },
      },
      query2: 'value3',
    })
  })

  it('converts params array to search object with respect to array values', () => {
    const paramsArray = [
      { path: ['query', 'field1', '$array'], value: 'value1' },
      { path: ['query', 'field1', '$array'], value: 'value2' },
      { path: ['query', 'field2', '$array'], value: 'value3' },
      { path: ['query', 'field3'], value: 'value4' },
    ]

    const searchObject = convertor.toSearchObject(paramsArray)

    expect(searchObject).toMatchObject({
      query: {
        field1: ['value1', 'value2'],
        field2: ['value3'],
        field3: 'value4',
      },
    })
  })
})
