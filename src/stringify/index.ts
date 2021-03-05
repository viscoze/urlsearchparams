import { flow as _flow } from 'lodash'

import convertor from '../convertor'

function stringify(searchObject: object): string {
  return _flow(convertor.fromSearchObject, convertor.toSearchString)(searchObject)
}

export default stringify
