import type ts from 'typescript'

export interface SpecificGeneric {
  name: string
  extends?: string
  default?: string
}

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
  /**
   * async function
   */
  async?: boolean
  /**
   * generator function
   */
  generator?: boolean
  /**
   * return type
   */
  returnType?: string
  /**
   * generics
   */
  generics?: SpecificGeneric[]
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
   * generics
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
