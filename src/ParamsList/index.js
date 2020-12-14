import _ from 'lodash'

import { comparePaths, includesPath } from '../helpers'

class ParamsList {
  paramsArray = []

  constructor(paramsArray) {
    this.paramsArray = paramsArray
  }

  static fromArray(paramsArray) {
    return new ParamsList(paramsArray)
  }

  append(path, value) {
    const nextParamsArray = this.paramsArray.concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  update(path, value) {
    const nextParamsArray = this.paramsArray
      .filter(paramItem => !includesPath(paramItem.path, path))
      .concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  remove(path) {
    const nextParamsArray = this.paramsArray.filter(
      paramItem => !includesPath(paramItem.path, path),
    )

    return ParamsList.fromArray(nextParamsArray)
  }

  has(path) {
    const param = this.paramsArray.find(paramItem => includesPath(paramItem.path, path))

    return Boolean(param)
  }

  toArray() {
    return _.cloneDeep(this.paramsArray)
  }
}

export default ParamsList
