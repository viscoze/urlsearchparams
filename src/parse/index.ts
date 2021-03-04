import _flow from 'lodash/flow'

import convertor from '../convertor'

function parse(searchString: string): object {
  return _flow(convertor.fromSearchString, convertor.toSearchObject)(searchString)
}

export default parse
