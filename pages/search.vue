<template>
  <v-container>
    <div class="">
      <div class="search d-flex align-start justify-space-between">
        <div class="w-75">
          <SearchInput v-model="searchText" />
        </div>
        <div class="serach_filters w-25 mt-4">
          <CustomDropDownMenu
            :options="filters"
            placeholder="Select an option"
            @select="handleSelect"
            v-model="selectedFilter"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>
<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "@/stores/posts";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import CustomDropDownMenu from "@/components/ui/inputs/CustomDropdown.vue";

const postStore = usePostStore();
const route = useRoute();
const selectedFilter = ref([]);

// Computed list of filter options
const filters = computed(() =>
  postStore.categories.map((category) => category.name)
);

// Handle option selection
const handleSelect = (option) => {
  // selectedFilter.value = [option];
  console.log("Selected option:", option);
};

// Watch for changes in route query and update selectedFilter
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      const newCategoryc = postStore.categories.find(
        (c) => c.uuid == newCategory
      );
      console.log("new category",newCategoryc);

      selectedFilter.value = [newCategoryc];
    }
  },
  { immediate: true }
);

// Initialize selectedFilter on page load
onMounted(() => {
  if (route.query.category) {
    const selectedCategory = postStore.categories.find(
      (c) => c.uuid === route.query.category
    );
    console.log('selected category in mounted' , selectedCategory);
    
    if (selectedCategory) {
      selectedFilter.value = [selectedCategory.name];
    }
  }
});
</script>
