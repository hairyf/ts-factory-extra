import * as comment from './comment'
import * as convert from './convert'
import * as definition from './definition'
import * as functions from './function'
import * as imports from './import'
import * as interfaces from './interface'
import * as object from './object'

export * from './comment'
export * from './convert'
export * from './definition'
export * from './function'
export * from './import'
export * from './interface'
export * from './object'
export type {
  LiteralFiled,
  SpecificFiled,
  SpecificFunction,
  SpecificInterface,
} from './types'

const factory = {
  ...comment,
  ...convert,
  ...definition,
  ...functions,
  ...imports,
  ...interfaces,
  ...object,
}

export default factory
