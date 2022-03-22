<template>
  <div class="spinner" />
</template>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  animation: fadeIn 0.25s 1 cubic-bezier(0.32, 0, 0.67, 0);
  text-align: center;
  &::before {
    content: '';
    display: inline-block;
    padding: 10px;
    border-radius: 20px;
    border: 4px solid hsla(0, 0%, 25%, 1);
    border-top: 4px solid transparent;
    animation: spin 0.5s infinite linear;
  }
  &::after {
    content: 'Loading';
    display: block;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
