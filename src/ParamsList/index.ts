import _cloneDeep from 'lodash/cloneDeep'

import { includesPath } from '../helpers'
import { TParamsArray, TPath, TValue } from '../types'

class ParamsList {
  paramsArray: TParamsArray = []

  constructor(paramsArray: TParamsArray) {
    this.paramsArray = paramsArray
  }

  static fromArray(paramsArray: TParamsArray) {
    return new ParamsList(paramsArray)
  }

  get(path: TPath) {
    const paramsArray = this.paramsArray.filter(paramItem => includesPath(paramItem.path, path))

    return ParamsList.fromArray(paramsArray)
  }

  append(path: TPath, value: TValue) {
    const nextParamsArray = this.paramsArray.concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  update(path: TPath, value: TValue) {
    const nextParamsArray = this.paramsArray
      .filter(paramItem => !includesPath(paramItem.path, path))
      .concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  remove(path: TPath) {
    const nextParamsArray = this.paramsArray.filter(
      paramItem => !includesPath(paramItem.path, path),
    )

    return ParamsList.fromArray(nextParamsArray)
  }

  has(path: TPath) {
    const param = this.paramsArray.find(paramItem => includesPath(paramItem.path, path))

    return Boolean(param)
  }

  toArray() {
    return _cloneDeep(this.paramsArray)
  }
}

export default ParamsList
