<template>
  <button><slot></slot></button>
</template>

<script></script>

<style scoped>
button {
  text-align: center;
  border: 2px solid rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-white));
  color: rgb(var(--v-theme-primary));
  border-radius: 16px;
  cursor: pointer;
}
</style>
