<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/stores/config'

const {
  state: { config },
  mutations: { setMacro },
} = useConfig()

const props = defineProps<{
  index: number,
}>()

const macro = computed(() => config.value.macros[props.index].join('\n'))

function handleInput (event: Event) {
  const target = event.target as HTMLTextAreaElement
  const content: string = target.value.replaceAll(/[^\x20-\x7E\n]/g, '')
  const newMacro: Macro = content.split('\n')
  setMacro(props.index, newMacro)
}

</script>

<template>
  <div class="key-item card shadow">
    <div class="index">
      {{ index + 1 }}
    </div>
    <textarea :value="macro" class="macro mono" rows="4" @input="handleInput" />
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
