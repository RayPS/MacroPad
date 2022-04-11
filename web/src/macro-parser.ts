import { createToken, Lexer, CstParser, IMultiModeLexerDefinition } from 'chevrotain'

const Seperator = createToken({ name: 'Seperator', pattern: / / })
const Break = createToken({ name: 'Break', pattern: /\n/, line_breaks: true, pop_mode: true })
const Integer = createToken({ name: 'Integer', pattern: /\d+/ })
const Literal = createToken({ name: 'Literal', pattern: /[\x20-\x7E]+/ })

// Statement:
const Statement = createToken({ name: 'Statement', pattern: Lexer.NA })
const Comment = createToken({ name: 'Comment', pattern: /#([ |\S])*/, push_mode: 'literal_mode', categories: Statement })
const Print = createToken({ name: 'Print', pattern: /\$/, push_mode: 'literal_mode', categories: Statement })
const Delay = createToken({ name: 'Delay', pattern: /!/, push_mode: 'integer_mode', categories: Statement })
const Interval = createToken({ name: 'Interval', pattern: /~/, push_mode: 'integer_mode', categories: Statement })
const KeyPress = createToken({ name: 'KeyPress', pattern: /@/, push_mode: 'combo_mode', categories: Statement })
const KeyDown = createToken({ name: 'KeyDown', pattern: /\+/, push_mode: 'combo_mode', categories: Statement })
const KeyUp = createToken({ name: 'KeyUp', pattern: /-/, push_mode: 'combo_mode', categories: Statement })
const KeyReset = createToken({ name: 'KeyReset', pattern: /\./, categories: Statement })

// Keywords:
const Keyword = createToken({ name: 'Keyword', pattern: Lexer.NA })
const ModifierKey = createToken({ name: 'ModifierKey', pattern: /R?(CTRL|SHIFT|ALT|WIN|CMD)/, categories: Keyword })
const FunctionKey = createToken({ name: 'FunctionKey', pattern: /F([3-9]|1[0-9]?|2[0-4]?)/, categories: Keyword })
const ArrowKey = createToken({ name: 'ArrowKey', pattern: /(UP|DOWN|LEFT|RIGHT)/, categories: Keyword })
const SymbolKey = createToken({ name: 'SymbolKey', pattern: /[`\-=[\]\\;',./]/, categories: Keyword })
const OtherKey = createToken({ name: 'OtherKey', pattern: /(RETURN|ENTER|ESC|(BACK)?SPACE|TAB|CAPSLOCK|INSERT|DELETE|PAGE(UP|DOWN)|HOME|END)/, categories: Keyword })
const LetterKey = createToken({ name: 'LetterKey', pattern: /[A-Z]/, categories: Keyword })
const NumberKey = createToken({ name: 'NumberKey', pattern: /\d/, categories: Keyword })

const allTokens = [
  Seperator,
  Comment, Print, KeyPress, KeyDown, KeyUp, KeyReset, Delay, Interval, Statement, // Statement
  ModifierKey, FunctionKey, ArrowKey, SymbolKey, OtherKey, LetterKey, NumberKey, Keyword, // Keyword
  Integer, Literal,
  Break,
]

const LexerModes: IMultiModeLexerDefinition = {
  modes: {
    default_mode: [
      Break, Comment, Print, KeyPress, KeyDown, KeyUp, KeyReset, Delay, Interval,
    ],
    literal_mode: [
      Seperator, Break,
      Literal,
    ],
    combo_mode: [
      Seperator, Break,
      ModifierKey, FunctionKey, ArrowKey, SymbolKey, OtherKey, LetterKey, NumberKey,
    ],
    integer_mode: [
      Seperator, Break,
      Integer,
    ],
  },
  defaultMode: 'default_mode',
}

export const macroLexer = new Lexer(LexerModes)

class MacroParser extends CstParser {
  constructor () {
    super(allTokens)
    this.performSelfAnalysis()
  }

  public macro = this.RULE('macro', () => {
    this.MANY_SEP({
      SEP: Break,
      DEF: () => { this.SUBRULE(this.line) },
    })
  })

  private line = this.RULE('line', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.combo) },
      { ALT: () => this.SUBRULE(this.print) },
      { ALT: () => this.SUBRULE(this.delay) },
      { ALT: () => this.CONSUME(KeyReset) },
      { ALT: () => this.CONSUME(Comment) },
    ])
  })

  private print = this.RULE('print', () => {
    this.CONSUME(Print)
    this.CONSUME(Seperator)
    this.CONSUME(Literal)
  })

  private combo = this.RULE('combo', () => {
    this.OR([
      { ALT: () => this.CONSUME(KeyPress) },
      { ALT: () => this.CONSUME(KeyDown) },
      { ALT: () => this.CONSUME(KeyUp) },
    ])
    this.CONSUME(Seperator)
    this.AT_LEAST_ONE_SEP({
      SEP: Seperator,
      DEF: () => {
        this.CONSUME(Keyword)
      },
    })
  })

  private delay = this.RULE('delay', () => {
    this.CONSUME(Delay)
    this.CONSUME(Seperator)
    this.CONSUME(Integer)
  })
}

export const macroParser = new MacroParser()
