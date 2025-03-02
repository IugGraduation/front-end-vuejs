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
import { useCategoryStore } from "@/stores/categories";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import CustomDropDownMenu from "@/components/ui/inputs/CustomDropdown.vue";

const categoryStore = useCategoryStore();
const route = useRoute();
const selectedFilter = ref([]);

// Computed list of filter options
const filters = computed(() =>
  categoryStore.categories.map((category) => category.title)
);

// Handle option selection
const handleSelect = (option) => {
  console.log("Selected option:", option);
};

// Watch for changes in route query and update selectedFilter
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedFilter.value = [newCategory];
    }
  },
  { immediate: true }
);

// Initialize selectedFilter on page load
onMounted(() => {
  if (route.query.category) {
    
    selectedFilter.value = [route.query.category];
    console.log(route.query.category , selectedFilter.value );
  
  }
});
</script>
