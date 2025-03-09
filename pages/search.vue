<template>
  <v-container>
    <div class="">
      <div class="search d-flex align-start justify-space-between">
        <div class="w-75">
          <SearchInput v-model="searchText" @input="handleSearch" />
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
      <v-row v-if="isLoading">
      <v-col cols="12" md="4" v-for="i in 3" :key="i" class="rounded-xl">
        <v-skeleton-loader
          class="border w-full rounded-xl overflow-hidden"
          type="image, paragraph"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="post in posts"
        :key="post.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        class="post-card-wrapper mb-8"
      >
        <PostCard
          :id="post.id"
          :imageUrl="post.image"
          :avatarUrl="post.avatarUrl"
          :name="post.name"
          :title="post.title"
          :status="post.status"
          :description="post.description"
          :num_offers="post.num_offers"
        />
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "@/stores/posts";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import CustomDropDownMenu from "@/components/ui/inputs/CustomDropdown.vue";
import PostCard from "@/components/ui/cards/PostCard.vue";
const postStore = usePostStore();
const route = useRoute();
const selectedFilter = ref([]);
const searchText = ref("");
const posts = ref([]);
const loading = ref(true);

// Fetch categories on component mount
onMounted(async () => {
  await postStore.fetchCategories();

  // Initialize selected filter if category is in route query
  if (route.query.category) {
    const selectedCategory = postStore.categories.find(
      (c) => c.uuid === route.query.category
    );
    if (selectedCategory) {
      selectedFilter.value = [selectedCategory.name];
      try {
        const response = await postStore.fetchPostsByCategory(
          selectedCategory.uuid
        ); // Replace with your category UUID
        console.log(response);

        if (response.success) {
          posts.value = postStore.posts; // Use the posts from the store
        } else {
          console.error("Failed to fetch posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        loading.value = false;
      }
    }
  }
});

// Computed list of filter options
const filters = computed(() =>
  postStore.categories.map((category) => category.name)
);

// Handle category selection
const handleSelect = async (option) => {
  const selectedCategory = postStore.categories.find((c) => c.name === option);
  if (selectedCategory) {
    selectedFilter.value = [selectedCategory.name];
    await postStore.fetchPostsByCategory(selectedCategory.uuid);
  }
};

// Handle search input
const handleSearch = async () => {
  const selectedCategory =
    selectedFilter.value.length > 0
      ? postStore.categories.find((c) => c.name === selectedFilter.value[0])
      : null;
  const categoryUuid = selectedCategory ? selectedCategory.uuid : null;
  await postStore.searchPosts({ searchTerm: searchText.value, categoryUuid });
};

// Watch for changes in route query and update selectedFilter
watch(
  () => route.query.category,
  async (newCategory) => {
    if (newCategory) {
      const newCategoryc = postStore.categories.find(
        (c) => c.uuid === newCategory
      );
      if (newCategoryc) {
        selectedFilter.value = [newCategoryc.name];
        await postStore.fetchPostsByCategory(newCategoryc.uuid);
      }
    }
  },

  { immediate: true }
);
</script>
