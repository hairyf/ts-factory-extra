import ts, { factory } from 'typescript'
import { createMultilineComment } from './comment'
import { createExportModifier } from './modifier'
import type { SpecificFiled } from './types'

/**
 * create Type Alias
 * @example [flag] [name] = [value]
 * @example const a = 2
 * @param name
 * @param value
 */
export function createVariable(_export: boolean | undefined, flag: ts.NodeFlags, name: string, value?: string) {
  const declaration = factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(name),
      undefined,
      undefined,
      value ? factory.createIdentifier(value) : undefined,
    )],
    flag,
  )
  if (_export === true) {
    return factory.createVariableStatement(
      [createExportModifier()],
      declaration,
    )
  }
  return declaration
}

/**
 * create Type Alias
 * @example type [name] = [value]
 * @param name
 * @param value
 */
export function createTypeAlias(_export: boolean | undefined, name: string, value: string) {
  return factory.createTypeAliasDeclaration(
    _export === true ? [createExportModifier()] : undefined,
    factory.createIdentifier(name),
    undefined,
    factory.createIdentifier(value) as any,
  )
}

/**
 * create Type Alias Block
 * @example { [item.name]: [item.type], ... }
 * @param alias
 * @returns
 */
export function createTypeAliasBlock(alias: SpecificFiled[]) {
  const statements = alias
    .flatMap((item: any) => {
      if (item.required === true) {
        return [
          item.description && createMultilineComment(item.description),
          factory.createLabeledStatement(
            factory.createIdentifier(item.name),
            factory.createExpressionStatement(factory.createIdentifier(item.type)),
          ),
        ]
      }
      else {
        return [
          item.description && createMultilineComment(item.description),
          factory.createExpressionStatement(
            factory.createConditionalExpression(
              factory.createIdentifier(item.name),
              factory.createToken(ts.SyntaxKind.QuestionToken),
              factory.createIdentifier(''),
              factory.createToken(ts.SyntaxKind.ColonToken),
              factory.createIdentifier(item.type),
            ),
          ),
        ]
      }
    })
    .filter(Boolean) as ts.ExpressionStatement[] | ts.LabeledStatement[]
  return factory.createBlock(
    statements,
    true,
  )
}
