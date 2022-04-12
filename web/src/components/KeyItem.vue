<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/stores/config'

const {
  state: { config, syntaxError },
  mutations: { setMacro, resetSyntaxError },
} = useConfig()

const props = defineProps<{
  index: number,
}>()

const macro = computed(() => config.value.macros[props.index].join('\n'))
const hasSyntaxError = computed(() => syntaxError.value?.errorInfo.index === props.index)

function handleInput (event: Event) {
  const target = event.target as HTMLTextAreaElement
  const newMacro: Macro = target.value.split('\n')
  setMacro(props.index, newMacro)
  resetSyntaxError()
}

</script>

<template>
  <div class="key-item card shadow">
    <div class="index">
      {{ index + 1 }}
    </div>
    <textarea
      :value="macro" class="macro mono" :class="{invalid: hasSyntaxError}" rows="4"
      @input="handleInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.key-item {
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-width: 20%;

  .index {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    box-shadow: inset 0 0 0 2px hsla(0, 0%, 25%, 1);
    font-size: 24px;
    user-select: none;
    text-align: center;
  }

  textarea.macro {
    white-space: pre;
    resize: none;
    margin-top: 16px;
    font-size: 13px;
    padding: 8px;
    border-radius: 8px;
    background: hsla(0, 0%, 99%, 1);
    outline: 1px solid hsla(0, 0%, 95%, 1);
    border: none;
    width: 100%;
  }

  textarea.macro.invalid {
    outline: 4px solid hsla(0, 100%, 50%, 0.25);
    animation: invalid 0.5s ease-in-out infinite alternate-reverse;
  }
}

@keyframes invalid {
  0% {
    outline-color: hsla(0, 100%, 50%, 0.25);
    outline-width: 4px;
  }
  100% {
    outline-color: hsla(0, 100%, 50%, 0);
    outline-width: 0;
  }
}

@include breakpoint('medium') {
  .key-item {
    textarea.macro {
      height: 12em;
    }
  }
}
</style>
