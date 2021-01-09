# UrlSearchParams
A library to make working with a URL search string easier

## Motivation
1. URLSearchParams is not supporeted by EI10
1. URLSearchParams can't work with nesting

## How to use

To add a query param
```javascript
const searchString = 'query[obj][field1]=value1'

UrlSearchParams
  .fromString(searchString)
  .set('query[obj][field2]', 'value2')
  .toObject()
// => { 
//      query: {
//        obj: {
//          field1: 'value1',
//          field2: 'value2',
//        },
//      },
//    }
```

To update a query param
```javascript
const searchString = 'query[obj][field1]=value1&query[obj][field2]=value2'

UrlSearchParams
  .fromString(searchString)
  .set('query[obj][field2]', 'newValue2')
  .toObject()
// => { 
//      query: {
//        obj: {
//          field1: 'value1',
//          field2: 'newValue2',
//        },
//      },
//    }
```

To replace a query param with nesting
```javascript
const searchString = 'query[obj][field1]=value1&query[obj][field2]=value2'

UrlSearchParams
  .fromString(searchString)
  .set('query', 'newValue1')
  .toObject()
// => { 
//      query: newValue1,
//    }
```

To remove a query param
```javascript
const searchString = 'query[obj][field1]=value1&query[obj][field2]=value2'

UrlSearchParams
  .fromString(searchString)
  .set('query[obj][field2]', null)
  .toObject()
// => { 
//      query: {
//        obj: {
//          field1: 'value1',
//        },
//      },
//    }
```

To remove query params by a common part of a path
```javascript
const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3'

UrlSearchParams
  .fromString(searchString)
  .set('query', null)
  .toObject()
// => { 
//      query2: 'value3',
//    }
```

Convert to an object
```javascript
const searchString = 'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3'

UrlSearchParams
  .fromString(searchString)
  .toObject()
// => { 
//      query1: {
//        obj: {
//          field1: 'value1',
//          field2: 'value2',
//        },
//      },
//      query2: 'value3',
//    }
```

Convert back to a string
```javascript
const searchString = 'query[obj][field1]=value1'

UrlSearchParams
  .fromString(searchString)
  .set('query[obj][field1]', 'value2')
  .toString()
// => 'query[obj][field1]=value1&query[obj][field2]=value2'
```
