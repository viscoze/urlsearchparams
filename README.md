# UrlSearchParams

A library to make working with a URL search string easier

## Motivation

1. URLSearchParams is not supporeted by EI10
1. URLSearchParams can't work with nested query params
1. URLSearchParams can't work with array query params

## How to use

### To get query param

To get a value of a query param you can specify an exact path to it

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1').get('query[obj][field1]')
// => value1
```

You can get velues as an object by a part of the path

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1&query[obj][field2]=value2').get('query[obj]')
// => {
//      field1: 'value1',
//      field2: 'value2',
//    }
```

If the query param is an array you will get an array of values

```javascript
UrlSearchParams.fromString('query[]=valu1&query[]=valu2').get('query')
// => [
//      'value1',
//      'value2',
//    ]
```

### To add query param

To add a query param you should provide an exact path and a value

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1')
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

You can add another value to an array query param

```javascript
UrlSearchParams.fromString('query[]=value1&query[]=value2').set('query[]', 'value3').toObject()
// => {
//      query: [
//        'value1',
//        'value2',
//        'value3',
//        },
//      ],
//    }
```

### To update query param

To update a query param you should provide an exact path and a new value

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1&query[obj][field2]=value2')
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

You can overwrite a nested query param by a part of the path

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1&query[obj][field2]=value2')
  .set('query', 'newValue1')
  .toObject()
// => {
//      query: newValue1,
//    }
```

You can overwrite an array query param by its exact pass without `[]`

```javascript
UrlSearchParams.fromString('query[]=value1&query[]=value2').set('query', 'value3').toObject()
// => {
//      query: value3,
//    }
```

### To remove query param

To remove a query param you should provide an exact path and either `null` or `undefined`

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1&query[obj][field2]=value2')
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

You can remove nested query params by a common part of the path

```javascript
UrlSearchParams.fromString('query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3')
  .set('query1', null)
  .toObject()
// => {
//      query2: 'value3',
//    }
```

### To convert

You can convert to an object

```javascript
UrlSearchParams.fromString(
  'query1[obj][field1]=value1&query1[obj][field2]=value2&query2=value3',
).toObject()
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

You can convert back to a string

```javascript
UrlSearchParams.fromString('query[obj][field1]=value1')
  .set('query[obj][field1]', 'value2')
  .toString()
// => 'query[obj][field1]=value1&query[obj][field2]=value2'
```

## Additional Info

All of the functions that accept the path to a value in a format like `query[obj][field1]` also can accept it as an array like `['query', 'obj', 'field1']` so that you can use you own format for the path.
