<template>
  <div class="pa-5">
    <SearchInput v-model="searchValue" />
    <Categories :isLoading />
    <Postes :isLoading />

    <v-row>
      <NuxtLink :to="`/posts`" class="mx-auto mt-10 mb-7 mx-auto">
        <PrimaryBtn class="pa-3">
          <span>go to all posts</span>
        </PrimaryBtn>
      </NuxtLink>
    </v-row>

    <div class="add-new-post">
      <NuxtLink to="posts/add/1">
        <PrimaryBtn class="rounded-pill text-h4"
          >+
          <v-tooltip activator="parent" location="start"
            >Add New Post</v-tooltip
          ></PrimaryBtn
        >
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Categories from "../components/categories/index.vue";
import Postes from "../components/posts/index.vue";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import PrimaryBtn from "../components/ui/buttons/PrimaryBtn.vue";
import { useCategoryStore } from "@/stores/categories";
definePageMeta({
  middleware: "auth", // Restrict access to logged-in users
  title: "Custom Title for this Page",
});

const name = ref("");
const phone = ref("");
const searchValue = ref<string>("");
const isLoading = ref(false);
const p = ref("");

let debounceTimeout: String;
const sendSearchRequest = (value) => {
  // Simulate sending a request (replace with actual request logic)
  console.log("Sending request for:", value);
};

watch(searchValue, (newValue) => {
  clearTimeout(debounceTimeout); // إلغاء أي مؤقت سابق
  debounceTimeout = setTimeout(() => {
    isLoading.value = false;
    sendSearchRequest(newValue); // إرسال الطلب بعد ثانيتين
  }, 500);
  isLoading.value = true;
});
onMounted(async () => {
  // await useCategoryStore.fetchCategories();
});
</script>
<style scoped>
.add-new-post {
  position: fixed;
  right: 30px;
  bottom: 60px;
  z-index: 99;
}
.add-new-post button {
width: 50px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
}
</style>
