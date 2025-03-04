<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <h2>Categories</h2>
      </v-col>
      <v-col cols="auto" v-show="!isLoading">
        <button @click="toggleSeeAll" class="see-all-btn" color="primary">
          {{ showAll ? "See Less" : "See All" }}
        </button>
      </v-col>
    </v-row>

    <v-row v-if="isLoading">
      <v-col cols="12" md="4" v-for="i in 3" :key="i" class="rounded-xl">
        <v-skeleton-loader
          class="border w-full rounded-xl overflow-hidden"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(category, index) in visibleCategories"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        class="category-card-wrapper"
      >
        <categoryCard
          :image="category.image"
          :title="category.name"
          :index="category.uuid"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import categoryCard from "../ui/cards/CategoryCard.vue";
import { useCategoryStore } from "@/stores/categories";
import { usePostStore } from "../../stores/posts";

const categoryStore = useCategoryStore();
const postStore = usePostStore();

const isLoading = ref(true);
const categories = ref([]);

watch(
  () => postStore.categories,
  (newValue) => {
    console.log("Categories changed:", newValue);
    isLoading.value = newValue.length === 0;
  },
  { deep: true, immediate: true }
);
const showAll = ref(false);

const visibleCategories = computed(() => {
  return postStore.categories;
});

function toggleSeeAll() {
  showAll.value = !showAll.value;
}
</script>

<style scoped>
.see-all-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(var(--v-theme-primary));
}

.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
