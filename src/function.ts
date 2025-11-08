import ts, { factory } from 'typescript'
import type { SpecificFiled, SpecificFunction } from './types'
import { createMultilineComment } from './comment'

/**
 * create Function
 * @example [o.export] function [o.name] ([o.parameters]) { [o.body] }
 * @param o
 * @returns
 */
export function createFunction(o: SpecificFunction) {
  const functionName = factory.createIdentifier(o.name)
  const parameters = o.parameters?.map(createParameter) || []
  let comment: ts.JSDoc | undefined

  const functionNode = factory.createFunctionDeclaration(
    [
      o.export && factory.createModifier(ts.SyntaxKind.ExportKeyword),
      o.async && factory.createModifier(ts.SyntaxKind.AsyncKeyword),
    ].filter(Boolean) as ts.Modifier[],
    o.generator ? factory.createToken(ts.SyntaxKind.AsteriskToken) : undefined,
    functionName,
    o.generics?.map((g) =>
      factory.createTypeParameterDeclaration(
        undefined,
        factory.createIdentifier(g.name),
        g.extends ? factory.createTypeReferenceNode(g.extends) : undefined,
        g.default ? factory.createTypeReferenceNode(g.default) : undefined,
      ),
    ),
    parameters,
    o.returnType ? factory.createTypeReferenceNode(o.returnType) : undefined,
    o.body ? factory.createBlock(o.body, true) : undefined,
  )

  if (o.comment?.length)
    comment = createMultilineComment(o.comment)
  return [comment, functionNode].filter(Boolean) as ts.FunctionDeclaration[]
}

/**
 * create Function Parameter
 * @example function name([o.name]:[o.type])
 * @param o
 * @returns
 */
export function createParameter(o: SpecificFiled) {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    factory.createIdentifier(o.name),
    (typeof o.required === 'undefined' || o.required === false) ? factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    o.type ? factory.createTypeReferenceNode(o.type) : undefined,
  )
}
