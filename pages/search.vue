<template>
  <v-container>
    <div class="">
      <div class="search d-flex align-start justify-space-between">
        <div class="w-100">
          <SearchInput v-model="searchText" @input="handleSearchInput" />
        </div>
        <div class="serach_filters w-25 mt-4">
          <v-select
            :items="categories"
            v-model="selectedCategory"
            label="Categories"
            chips
            variant="outlined"
            selection-type="checkbox"
            item-title="name"
            item-value="uuid"
            @update:modelValue="handleCategoryChange"
          ></v-select>
        </div>
      </div>
      <v-row v-if="loading">
        <v-col
          cols="12"
          md="4"
          sm="6"
          v-for="i in 6"
          :key="i"
          class="rounded-xl"
        >
          <v-skeleton-loader
            class="border w-full rounded-xl overflow-hidden"
            type="image, paragraph"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else-if="posts.length === 0">
        <v-col cols="12" class="text-center">
          <p class="text-h6">No posts found.</p>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="post in posts"
          :key="post.uuid"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          xl="4"
          class="post-card-wrapper mb-8"
        >
          <PostCard
            :id="post.uuid"
            :imageUrl="post.post_image"
            :avatarUrl="post.user_image"
            :name="post.user_name"
            :title="post.post_name"
            :status="post.status"
            :description="post.post_details"
            :num_offers="post.num_offers"
            :isMyPost="authStore.user.uuid == post.user_uuid"
          />
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row v-if="totalPages > 1 && posts.length !== 0" class="mt-4">
        <v-col cols="12" class="d-flex justify-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            @update:modelValue="handlePageChange"
          ></v-pagination>
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
import PostCard from "@/components/ui/cards/PostCard.vue";
import { useAuthStore } from "@/stores/auth";

const postStore = usePostStore();
const authStore = useAuthStore();

const route = useRoute();
const searchText = ref("");
const posts = ref([]);
const loading = ref(true);
const currentPage = ref(1); // Track current page
const totalPages = ref(1); // Track total number of pages
const selectedCategory = ref(null);

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// Debounced search handler
const debouncedSearch = debounce(async () => {
  if (searchText.value.trim() === "") {
    currentPage.value = 1; // Reset to first page when search is cleared
    await fetchPosts(currentPage.value);
  } else {
    const response = await postStore.searchPosts({
      searchTerm: searchText.value,
      categoryUuid: selectedCategory.value || null, // Extract UUID if selectedCategory is an object
      page: currentPage.value, // Pass the current page
    });

    posts.value = response.data;
    totalPages.value = response.pages.last_page; // Update total pages from the response
  }
}, 1000); // 1 second delay

// Handle search input
const handleSearchInput = () => {
  debouncedSearch();
};
// Fetch categories on component mount
onMounted(async () => {
  await postStore.fetchCategories();

  // Initialize selected category if category is in route query
  if (route.query.category) {
    const category = postStore.categories.find(
      (c) => c.uuid === route.query.category
    );
    if (category) {
      selectedCategory.value = category;
      const { data } = await postStore.fetchPostsByCategory(
        category.uuid,
        currentPage.value
      );
      console.log(data);

      posts.value = data;
    }
  } else {
    await postStore.fetchPosts(currentPage.value);
  }
});

// Computed list of filter options
const categories = computed(() => postStore.categories);

// Handle category change
const handleCategoryChange = async (newCategory) => {
  searchText.value = ""; // Clear search text when category changes
  console.log("new cateogry", newCategory);

  selectedCategory.value = newCategory;
  currentPage.value = 1; // Reset to first page when category changes
  await fetchPosts(currentPage.value);
};

// Fetch posts by category or all posts
const fetchPosts = async (page) => {
  loading.value = true;
  try {
    let response;
    if (selectedCategory.value) {
      response = await postStore.fetchPostsByCategory(
        selectedCategory.value,
        page
      );
    } else {
      response = await postStore.fetchAllPosts(page);
    }
    if (response.success) {
      posts.value = response.data;
      totalPages.value = response.pages.last_page; // Update total pages from the response
    } else {
      console.error("Failed to fetch posts:", response.message);
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchPosts(page);
};

// Watch for changes in route query and update selectedCategory
watch(
  () => route.query.category,
  async (newCategory) => {
    if (newCategory) {
      const category = postStore.categories.find((c) => c.uuid === newCategory);
      if (category) {
        selectedCategory.value = category;
        const { data } = await postStore.fetchPostsByCategory(
          category.uuid,
          currentPage.value
        );
        posts.value = data;
      }
    }
  },
  { immediate: true }
);
</script>
