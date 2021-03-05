import { flow as _flow } from 'lodash'

import convertor from '../convertor'

function parse(searchString: string): object {
  return _flow(convertor.fromSearchString, convertor.toSearchObject)(searchString)
}

export default parse
