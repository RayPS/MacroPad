<script setup lang="ts">
import { useConfig } from '@/modules/config'
import KeyItem from './components/KeyItem.vue'
import Spinner from './components/Spinner.vue'

const { state, loadConfig, saveConfig } = useConfig()
const { config, loading, error } = state

loadConfig()

</script>

<template>
  <div class="header">
    <h1>⌘</h1>
    <h1>MacroPad</h1>
    <h3>Configuration</h3>
  </div>

  <template v-if="!loading && !error">
    <div class="key-grid">
      <KeyItem
        v-for="macro, index in config.macros" :key="index"
        :index="index" :macro="macro"
      />
    </div>
    <div class="button" @click="saveConfig">
      Save
    </div>
  </template>

  <div v-else-if="error" class="error">
    Failed to load config
    <Spinner v-else />
  </div>
</template>

<style lang="scss">
@import '@/assets/reset.css';

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: hsla(0, 0%, 98%, 1);
  height: 100vh;
  overflow-y: scroll;
  text-align: center;
  color: hsla(0, 0%, 25%, 1);
}

.header {
  padding: 40px 0;
}

.key-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
  max-width: 1800px - 40px * 2;
  margin: 0 auto;
}

.button {
  background-color: hsla(0, 0%, 25%, 1);
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px hsla(0, 0%, 0%, 0.05), 0px 32px 50px -24px hsla(0, 0%, 0%, 0.1);
  text-align: center;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: inline-block;
  margin-top: 40px;
  cursor: pointer;
  user-select: none;
}

.error {
  background-color: red;
  font-size: 14px;
  color: white;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
