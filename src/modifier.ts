import ts, { factory } from 'typescript'

export function createExportModifier() {
  return factory.createModifier(ts.SyntaxKind.ExportKeyword)
}
