import ParamsList from '.'

describe('append', () => {
  it('appends param', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value2' },
    ]

    const paramsList = ParamsList.fromArray(paramsArray)

    const nextParamsList = paramsList
      .append(['query1', 'obj', 'field4'], 'value4')
      .append(['query1', 'obj', 'field5'], 'value5')

    expect(nextParamsList.toArray()).toMatchObject([
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2'], value: 'value2' },
      { path: ['query1', 'obj', 'field4'], value: 'value4' },
      { path: ['query1', 'obj', 'field5'], value: 'value5' },
    ])
  })
})

describe('update', () => {
  it('update value', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
    ]

    const paramsList = ParamsList.fromArray(paramsArray)

    const nextParamsList = paramsList.update(['query1', 'obj', 'field1'], 'valueNew')

    expect(nextParamsList.toArray()).toMatchObject([
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query1', 'obj', 'field1'], value: 'valueNew' },
    ])
  })

  it('update value by path head', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2', 'obj', 'field3'], value: 'value3' },
    ]

    const paramsList = ParamsList.fromArray(paramsArray)

    const nextParamsList = paramsList.update(['query1', 'obj'], 'valueNew')

    expect(nextParamsList.toArray()).toMatchObject([
      { path: ['query2', 'obj', 'field3'], value: 'value3' },
      { path: ['query1', 'obj'], value: 'valueNew' },
    ])
  })
})

describe('remove', () => {
  it('removes param', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
    ]

    const paramsList = ParamsList.fromArray(paramsArray)

    const nextParamsList = paramsList.remove(['query1', 'obj', 'field1'])

    expect(nextParamsList.toArray()).toMatchObject([
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
    ])
  })

  it('removes param by part of path', () => {
    const paramsArray = [
      { path: ['query1', 'obj', 'field1'], value: 'value1' },
      { path: ['query1', 'obj', 'field2'], value: 'value2' },
      { path: ['query2', 'obj', 'field3'], value: 'value3' },
    ]

    const paramsList = ParamsList.fromArray(paramsArray)

    const nextParamsList = paramsList.remove(['query1', 'obj'])

    expect(nextParamsList.toArray()).toMatchObject([
      { path: ['query2', 'obj', 'field3'], value: 'value3' },
    ])
  })
})

describe('has', () => {
  const paramsArray = [{ path: ['query1', 'obj', 'field1'], value: 'value1' }]

  const paramsList = ParamsList.fromArray(paramsArray)

  it('returns true if there is item with passed path', () => {
    const path = ['query1', 'obj', 'field1']
    const result = paramsList.has(path)

    expect(result).toBe(true)
  })

  it('returns true if there are items with passed head of path', () => {
    const path = ['query1', 'obj']
    const result = paramsList.has(path)

    expect(result).toBe(true)
  })

  it('returns false if there is no item with passed path', () => {
    const path = ['query1', 'obj', 'field3']
    const result = paramsList.has(path)

    expect(result).toBe(false)
  })
})
