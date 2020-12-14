import _ from 'lodash'

import convertor from '../convertor'

function stringify(searchObject) {
  return _.flow(convertor.fromSearchObject, convertor.toSearchString)(searchObject)
}

export default stringify
