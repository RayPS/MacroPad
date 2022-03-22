<script setup lang="ts">
interface ButtonProps {
  text: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <div class="button">
    {{ props.text }}
  </div>
</template>

<style lang="scss" scoped>
.button {
  background-color: hsla(0, 0%, 25%, 1);
  border-radius: 8px;
  text-align: center;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}
</style>
