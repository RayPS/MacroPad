import { reactive, toRefs, readonly } from 'vue'
import { api } from '@/api'
import { validateMacros, MacroSyntaxError } from '@/macro-validator'

type ConfigState = {
  config: MacroPadConfig,
  error?: string | null,
  syntaxError: MacroSyntaxError | null,
  loading: boolean,
}

const state: ConfigState = reactive({
  config: {
    macros: [],
  },
  error: null,
  syntaxError: null,
  loading: true,
})

export function useConfig () {
  return {
    state: toRefs(readonly(state)),
    actions: {
      loadConfig () {
        api.config.load()
          .then(({ macros }) => {
            state.config.macros = macros
          })
          .catch(() => { state.error = 'Failed to load config' })
          .finally(() => { state.loading = false })
      },
      saveConfig () {
        validateMacros(state.config.macros)
          .then(() => api.config.save(state.config))
          .then(ok => { alert(ok ? 'Saved!' : 'Failed!') })
          .catch((error) => {
            if (error instanceof MacroSyntaxError) {
              state.syntaxError = error
            } else {
              state.error = 'Failed to save config'
            }
          })
          .finally(() => { state.loading = false })
      },
    },
    mutations: {
      setMacro (index: number, macro: Macro) {
        state.config.macros[index] = macro
      },
    },
  }
}
