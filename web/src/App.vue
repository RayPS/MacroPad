<script setup lang="ts">
import { useConfig } from '@/stores/config'
import KeyItem from './components/KeyItem.vue'
import Button from './components/Button.vue'
import Spinner from './components/Spinner.vue'
import Error from './components/Error.vue'
import Doc from './components/Doc.vue'

const { state, actions } = useConfig()
const { config, loading, error } = state
const { loadConfig, saveConfig } = actions

loadConfig()

</script>

<template>
  <main>
    <div class="config-container">
      <div class="header">
        <h1>&#8984;</h1>
        <h1>MacroPad</h1>
        <h3>Configuration</h3>
      </div>
      <template v-if="!loading && !error">
        <div class="key-grid">
          <KeyItem v-for="macro, index in config.macros" :key="index" :index="index" />
        </div>
        <Button text="Save" @click="saveConfig" />
      </template>
      <Error v-else-if="error" :message="error" />
      <Spinner v-else />
    </div>
    <Doc />
  </main>
</template>

<style lang="scss">
@import '@/assets/reset.css';

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: hsla(0, 0%, 98%, 1);
  color: hsla(0, 0%, 25%, 1);
}

main {
  max-width: 1600px - (40px * 2);
  margin: 0 auto;
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
    width: 100%;
  }
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.shadow {
  box-shadow: 0px 4px 8px 0px hsla(0, 0%, 0%, 0.05), 0px 32px 50px -24px hsla(0, 0%, 0%, 0.1);
}

.card {
  background-color: white;
  border-radius: 16px;
}

@include breakpoint('medium') {
  .config-container {
    height: unset;
    .header {
      padding: 40px 0;
    }
    .key-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      margin-bottom: 40px;
    }
  }
}

@include breakpoint('small') {
  .config-container {
    .key-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
