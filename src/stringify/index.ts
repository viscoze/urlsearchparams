import _flow from 'lodash/flow'

import convertor from '../convertor'

function stringify(searchObject: object) {
  return _flow(convertor.fromSearchObject, convertor.toSearchString)(searchObject)
}

export default stringify
