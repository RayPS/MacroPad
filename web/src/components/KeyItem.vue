<script setup lang="ts">
import { useConfig } from '@/modules/config'
const { state: { config } } = useConfig()

interface KeyItemProps {
  index: number,
  macro: Macro
}

const props = defineProps<KeyItemProps>()

function handleInput (event: Event) {
  const target = event.target as HTMLTextAreaElement
  const content: string = target.value.replaceAll(/[^\x20-\x7E\n]/g, '')
  const macro: Macro = content.split('\n')
  config.value.macros[props.index] = macro
}

</script>

<template>
  <div class="key-item card shadow">
    <div class="index">
      {{ index + 1 }}
    </div>
    <textarea :value="props.macro.join('\n')" class="macro mono" rows="4" @input="handleInput" />
  </div>
</template>

<style lang="scss" scoped>
.key-item {
  padding: 16px;
  display: flex;
  flex-direction: column;

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

  .macro {
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
}
</style>
