import ts, { factory } from 'typescript'
import { createMultilineComment } from './comment'
import type { SpecificFiled, SpecificInterface } from './types'

patchInterfaceComment()

/**
 * create Interface
 * @example [o.export] interface [o.name] { [properties] }
 * @example [o.export] interface [o.name]<[o.generics]> { [properties] }
 * @param o
 * @returns
 */
export function createInterface(o: SpecificInterface) {
  const exportModifier = factory.createModifier(ts.SyntaxKind.ExportKeyword)
  const interfaceName = factory.createIdentifier(o.name)
  const properties: ts.PropertySignature[] = o.properties.flatMap((item) => {
    return [
      item.description && createMultilineComment(item.description),
      createInterfaceProperty(item),
    ]
  })
    .filter(Boolean) as any

  const typeParameters = o.generics?.map((name) =>
    factory.createTypeParameterDeclaration(
      undefined,
      factory.createIdentifier(name),
      undefined,
      undefined,
    ),
  )

  return factory.createInterfaceDeclaration(
    o.export === true ? [exportModifier] : undefined,
    interfaceName,
    typeParameters,
    undefined,
    properties,
  )
}

/**
 * create Interface Property
 * @example [filed.name][filed.required]: [filed.type]
 * @example a?: string
 * @param filed
 * @returns
 */
export function createInterfaceProperty(filed: SpecificFiled) {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(filed.name),
    (typeof filed.required === 'undefined' || filed.required === false) ? factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    filed.type ? factory.createTypeReferenceNode(filed.type) : undefined,
  )
}

function patchInterfaceComment() {
  const isTypeElement = ts.isTypeElement
  ts.isTypeElement = function (node): node is ts.TypeElement {
    return isTypeElement(node) || ts.isJSDoc(node) || ts.isIdentifier(node)
  }
}
