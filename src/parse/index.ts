import _flow from 'lodash/flow'

import convertor from '../convertor'

function parse(searchString: string): Record<string, unknown> {
  return _flow(convertor.fromSearchString, convertor.toSearchObject)(searchString)
}

export default parse
