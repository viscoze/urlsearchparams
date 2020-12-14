import _ from 'lodash'

import convertor from '../convertor'

function parse(searchString) {
  return _.flow(convertor.fromSearchString, convertor.toSearchObject)(searchString)
}

export default parse
