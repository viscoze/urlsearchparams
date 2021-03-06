import _flow from 'lodash/flow'

import convertor from '../convertor'

function stringify(searchObject: Record<string, unknown>): string {
  return _flow(convertor.fromSearchObject, convertor.toSearchString)(searchObject)
}

export default stringify
