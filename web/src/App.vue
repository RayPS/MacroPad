<script setup lang="ts">
import { useConfig } from '@/modules/config'
import KeyItem from './components/KeyItem.vue'
import Button from './components/Button.vue'
import Spinner from './components/Spinner.vue'
import Error from './components/Error.vue'

const { state, loadConfig, saveConfig } = useConfig()
const { config, loading, error } = state

loadConfig()

</script>

<template>
  <div class="config-container">
    <div class="header">
      <h1>&#8984;</h1>
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
      <Button text="Save" @click="saveConfig" />
    </template>
    <Error v-else-if="error" :message="error" />
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
  color: hsla(0, 0%, 25%, 1);
}

.config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  min-height: 700px;

  .header {
    text-align: center;
  }

  .key-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 40px;
    padding: 0 40px;
    max-width: 1800px - 40px * 2;
  }
}

</style>
