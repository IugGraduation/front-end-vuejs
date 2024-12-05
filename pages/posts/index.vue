<template>
  <div>
    <Posts />
  </div>
</template>

<script lang="ts" setup>
import Posts from "../components/posts/index.vue";
definePageMeta({
  middleware: "auth", // Restrict access to logged-in users
});

const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);

</script>

<style></style>
