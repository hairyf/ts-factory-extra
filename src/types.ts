import type ts from 'typescript'

export interface SpecificFunction {
  /**
   * function name
   */
  name: string
  /**
   * function params
   */
  parameters?: SpecificFiled[]
  /**
   * function block
   */
  body?: ts.Statement[]
  /**
   * is export
   */
  export?: boolean
  /**
   * function comment
   */
  comment?: string | string[]
}

export interface SpecificInterface {
  /**
   * interface name
   */
  name: string
  /**
   * all properties
   */
  properties: SpecificFiled[]
  /**
   * is export
   */
  export?: boolean
  /**
   * generic type parameters
   * @example ['T', 'K'] > interface Name<T, K> { }
   */
  generics?: string[]
}

export interface SpecificFiled {
  name: string
  type?: string
  required?: boolean
  description?: string | string[]
}

/**
 * @example 'a' > { a }
 * @example ['a', 'b'] > { a: b }
 * @example ['...', 'c'] > { ...c }
 */
export type LiteralFiled = string | [string | '...', string]
