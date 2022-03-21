import { reactive, toRefs } from 'vue'
import { api } from '@/api'

interface configState {
  config: MacroPadConfig,
  error: Error | null,
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
      .catch(error => { state.error = error })
      .finally(() => { state.loading = false })
  }

  function saveConfig () {
    api.config.save(state.config)
      .then(ok => { alert(ok ? 'Saved!' : 'Failed!') })
      .catch(error => { state.error = error })
      .finally(() => { state.loading = false })
  }

  return { state: toRefs(state), loadConfig, saveConfig }
}
