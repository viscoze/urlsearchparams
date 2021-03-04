import _cloneDeep from 'lodash/cloneDeep'

import { includesPath } from '../helpers'
import { TParamsArray } from '../types'

class ParamsList {
  paramsArray: TParamsArray = []

  constructor(paramsArray: TParamsArray) {
    this.paramsArray = paramsArray
  }

  static fromArray(paramsArray: TParamsArray) {
    return new ParamsList(paramsArray)
  }

  get(path: string[]) {
    const paramsArray = this.paramsArray.filter(paramItem => includesPath(paramItem.path, path))

    return ParamsList.fromArray(paramsArray)
  }

  append(path: string[], value: string) {
    const nextParamsArray = this.paramsArray.concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  update(path: string[], value: string) {
    const nextParamsArray = this.paramsArray
      .filter(paramItem => !includesPath(paramItem.path, path))
      .concat({ path, value })

    return ParamsList.fromArray(nextParamsArray)
  }

  remove(path: string[]) {
    const nextParamsArray = this.paramsArray.filter(
      paramItem => !includesPath(paramItem.path, path),
    )

    return ParamsList.fromArray(nextParamsArray)
  }

  has(path: string[]) {
    const param = this.paramsArray.find(paramItem => includesPath(paramItem.path, path))

    return Boolean(param)
  }

  toArray() {
    return _cloneDeep(this.paramsArray)
  }
}

export default ParamsList
