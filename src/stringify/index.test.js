import stringify from '.'

it('stringifies simple search object', () => {
  const searchObject = {
    query1: 'value1',
    query2: 'value2',
    query3: 'value3',
  }

  const searchString = stringify(searchObject)

  expect(searchString).toBe('query1=value1&query2=value2&query3=value3')
})

it('stringifies complex search object', () => {
  const searchObject = {
    query1: {
      obj: {
        field1: 'value1',
        field2: 'value2',
      },
    },
    query2: 'value3',
  }

  const searchString = stringify(searchObject)

  expect(searchString).toBe('query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3')
})
