<template>
  <div class="pa-5">
    <Categories />
    <Postes />
    <div class="add-new-post">
      <NuxtLink to="posts/add/1">
        <button class="">Add New Post</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Categories from "../components/categories/index.vue";
import Postes from "../components/posts/index.vue";
import PrimaryButton from "@/components/ui/buttons/PrimaryBtn.vue";

definePageMeta({
  middleware: "auth", // Restrict access to logged-in users
  title: "Custom Title for this Page",
});

const name = ref("");
const phone = ref("");
const s = ref("");
const p = ref("");
</script>
<style scoped>
.add-new-post {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
.add-new-post button {
  color: white;
  padding:  30px;
  text-align: center;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
  border-radius: 16px;
  cursor: pointer;
}
</style>
