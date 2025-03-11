<template>
  <button><slot></slot></button>
</template>

<script></script>

<style scoped>
button {
  text-align: center;
  border: 2px solid rgb(var(--v-theme-error));
  background: rgb(var(--v-theme-error));
  color: rgb(var(--v-theme-white));
  border-radius: 16px;
  cursor: pointer;
}
</style>
