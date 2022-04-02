import { reactive, toRefs, readonly } from 'vue'
import { api } from '@/api'

type ConfigState = {
  config: MacroPadConfig,
  error?: string | null,
  loading: boolean,
}

const state: ConfigState = reactive({
  config: {
    macros: [],
  },
  error: null,
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
        api.config.save(state.config)
          .then(ok => { alert(ok ? 'Saved!' : 'Failed!') })
          .catch(() => { state.error = 'Failed to save config' })
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
