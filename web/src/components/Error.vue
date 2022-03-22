<script setup lang="ts">
interface ErrorProps {
  message: string;
}

const props = defineProps<ErrorProps>()
</script>

<template>
  <div class="error">
    {{ props.message }}
  </div>
</template>

<style lang="scss" scoped>
.error {
  background-color: red;
  font-size: 14px;
  color: white;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
