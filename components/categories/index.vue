<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <h2>Categories</h2>
      </v-col>
      <v-col cols="auto">
        <button @click="toggleSeeAll" class="see-all-btn" color="primary">
          {{ showAll ? "See Less" : "See All" }}
        </button>
      </v-col>
    </v-row>

    <v-row>
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

// Define an array of categories
const categories = [
  { image: "https://picsum.photos/500/300?image=232", title: "Category 1" },
  { image: "https://picsum.photos/500/300?image=233", title: "Category 2" },
  { image: "https://picsum.photos/500/300?image=234", title: "Category 3" },
  { image: "https://picsum.photos/500/300?image=235", title: "Category 4" },
  { image: "https://picsum.photos/500/300?image=236", title: "Category 5" },
  { image: "https://picsum.photos/500/300?image=237", title: "Category 6" },
  { image: "https://picsum.photos/500/300?image=238", title: "Category 7" },
  { image: "https://picsum.photos/500/300?image=239", title: "Category 8" },
  { image: "https://picsum.photos/500/300?image=240", title: "Category 9" },
  { image: "https://picsum.photos/500/300?image=241", title: "Category 10" },
  { image: "https://picsum.photos/500/300?image=242", title: "Category 11" },
  { image: "https://picsum.photos/500/300?image=243", title: "Category 12" },
];

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

definePageMeta({
  layout: "default",
});
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
