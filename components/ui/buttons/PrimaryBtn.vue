<template>
  <button
    type="submit"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  isDisabled: {
    type: Boolean,
    requierd: false,
  },
});
</script>

<style scoped>
button {
  text-align: center;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
  border-radius: 16px;
  cursor: pointer;
  
}
</style>
