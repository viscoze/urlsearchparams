import parse from '.'

it('parses simple URL search string', () => {
  const searchString = 'query1=value1&query2=value2&query3=value3'

  const searchObject = parse(searchString)

  expect(searchObject).toMatchObject({
    query1: 'value1',
    query2: 'value2',
    query3: 'value3',
  })
})

it('parses complex URL search string', () => {
  const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3'

  const searchObject = parse(searchString)

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
