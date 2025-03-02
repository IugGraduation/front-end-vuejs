<template>
  <div>
    <Posts />
    <v-row class="mb-8">
      <v-pagination
        v-model="page"
        :length="4"
        rounded="circle"
        class="mx-auto"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Posts from "../components/posts/index.vue";
definePageMeta({
  middleware: "auth", // Restrict access to logged-in users
});

const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
const page = ref(1);
</script>

<style></style>
