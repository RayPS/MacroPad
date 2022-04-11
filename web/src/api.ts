export const api = {
  config: {
    load: async () => {
      const response = await fetch('/api/config')
      return response.json()
    },
    save: async (config: MacroPadConfig) => {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config), // TODO: Check content-length
      })
      return response.ok
    },
  },
  device: {
    restart: async () => {
      const response = await fetch('/api/restart')
      return response.ok
    },
    reset: async () => {
      const response = await fetch('/api/reset')
      return response.ok
    },
  },
}
