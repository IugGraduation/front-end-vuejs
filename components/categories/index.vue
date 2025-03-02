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
      <!-- Show categories based on showAll state -->

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
          :title="category.title"
          :index="index"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import categoryCard from "../ui/cards/CategoryCard.vue";
import { useCategoryStore } from "@/stores/categories";

const categoryStore = useCategoryStore();

await categoryStore.fetchCategories();

const isLoading = ref < Boolean > true;

const categories = categoryStore.categories;

// Reactive state for toggling 'See All'
const showAll = ref(false);

// Computed property to determine which categories to show
const visibleCategories = computed(() => {
  return showAll.value ? categories : categories.slice(0, 3); // Show first 4 categories or all if showAll is true
});

// Function to toggle the visibility of categories
function toggleSeeAll() {
  showAll.value = !showAll.value;
}


</script>

<style scoped>
/* Adjust button styling */
.see-all-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(var(--v-theme-primary));
}

/* Optional: custom styling for category cards */
.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Add fade transition effect for when categories are revealed */
/* .category-card-wrapper {
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.category-card-wrapper-enter-active,
.category-card-wrapper-leave-active {
  opacity: 1;
} */
</style>
