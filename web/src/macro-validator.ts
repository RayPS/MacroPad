import { macroLexer, macroParser } from '@/macro-parser'

export type MacroSyntaxErrorInfo = {
  index: number,
  line?: number,
}

export class MacroSyntaxError extends Error {
  public errorInfo: MacroSyntaxErrorInfo
  constructor (message: string, info: MacroSyntaxErrorInfo) {
    super(message)
    this.name = 'MacroSyntaxError'
    this.errorInfo = info
  }
}

export const validateMacros = (macros: Array<Macro>) => {
  return new Promise((resolve, reject) => {
    for (const [index, macro] of macros.entries()) {
      const macroString = macro.join('\n').trim()
      const lexerResult = macroLexer.tokenize(macroString)

      if (lexerResult.errors.length) {
        // console.table(lexerResult.tokens.map(({ image, tokenType }) => ({ image, tokenType: tokenType.name })))
        const [{ line, message }] = lexerResult.errors
        reject(new MacroSyntaxError(message, { index, line }))
        return
      }

      macroParser.input = lexerResult.tokens
      macroParser.macro()

      if (macroParser.errors.length) {
        const { message, token: { startLine: line } } = macroParser.errors[0]
        reject(new MacroSyntaxError(message, { index, line }))
        return
      }
    }
    resolve(null)
  })
}
