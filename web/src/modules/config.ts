import { reactive, toRefs } from 'vue'
import { api } from '@/api'

interface configState {
  config: MacroPadConfig,
  error: string | null,
  loading: boolean,
}

const state: configState = reactive({
  config: {
    macros: [],
  },
  error: null,
  loading: true,
})

export function useConfig () {
  function loadConfig () {
    api.config.load()
      .then(({ macros }) => {
        state.config.macros = macros
      })
      .catch(() => { state.error = 'Failed to load config' })
      .finally(() => { state.loading = false })
  }

  function saveConfig () {
    api.config.save(state.config)
      .then(ok => { alert(ok ? 'Saved!' : 'Failed!') })
      .catch(() => { state.error = 'Failed to save config' })
      .finally(() => { state.loading = false })
  }

  return { state: toRefs(state), loadConfig, saveConfig }
}
