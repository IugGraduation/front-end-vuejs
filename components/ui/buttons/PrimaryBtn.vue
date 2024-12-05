<template>
  <button type="submit"><slot></slot></button>
</template>

<script></script>

<style scoped>
button {
  text-align: center;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
  border-radius: 16px;
  cursor: pointer;
}
</style>
