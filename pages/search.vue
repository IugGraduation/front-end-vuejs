<template>
  <v-container>
    <div class="">
      <div class="search d-flex align-start justify-space-between">
        <div class="w-100">
          <SearchInput v-model="searchText" @input="handleSearchInput" />
        </div>
        <!-- <div class="serach_filters w-25 mt-4">
          <CustomDropDownMenu
            :options="filters"
            placeholder="Select an option"
            @select="handleSelect"
            v-model="selectedFilter"
          />
        </div> -->
      </div>
      <v-row v-if="loading">
        <v-col cols="12" md="4" v-for="i in 3" :key="i" class="rounded-xl">
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
import CustomDropDownMenu from "@/components/ui/inputs/CustomDropdown.vue";
import PostCard from "@/components/ui/cards/PostCard.vue";
import { useAuthStore } from "@/stores/auth";

const postStore = usePostStore();
const authStore = useAuthStore();

const route = useRoute();
const selectedFilter = ref([]);
const searchText = ref("");
const posts = ref([]);
const loading = ref(true);
const currentPage = ref(1); // Track current page
const totalPages = ref(1); // Track total number of pages

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
    await fetchAllPosts(currentPage.value);
  } else {
    const selectedCategory =
      selectedFilter.value.length > 0
        ? postStore.categories.find((c) => c.name === selectedFilter.value[0])
        : null;
    const categoryUuid = selectedCategory ? selectedCategory.uuid : null;
    const response = await postStore.searchPosts({
      searchTerm: searchText.value,
      categoryUuid,
      page: currentPage.value,
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

  // Initialize selected filter if category is in route query
  if (route.query.category) {
    const selectedCategory = postStore.categories.find(
      (c) => c.uuid === route.query.category
    );
    if (selectedCategory) {
      selectedFilter.value = [selectedCategory.name];
      await fetchPostsByCategory(selectedCategory.uuid, currentPage.value);
    }
  } else {
    await fetchAllPosts(currentPage.value);
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
    currentPage.value = 1; // Reset to first page when category changes
    await fetchPostsByCategory(selectedCategory.uuid, currentPage.value);
  }
};

// Fetch posts by category
const fetchPostsByCategory = async (categoryUuid, page) => {
  loading.value = true;
  try {
    const response = await postStore.fetchPostsByCategory(categoryUuid, page);
    if (response.success) {
      posts.value = response.data;
      totalPages.value = response.pages.last_page; // Update total pages from the response
    } else {
      console.error("Failed to fetch posts:", response.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch all posts
const fetchAllPosts = async (page) => {
  loading.value = true;
  try {
    const response = await postStore.fetchAllPosts(page);
    posts.value = response.data;
    totalPages.value = response.pages.last_page; // Update total pages from the response
  } catch (error) {
    console.error("Error fetching all posts:", error);
  } finally {
    loading.value = false;
  }
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  if (selectedFilter.value.length > 0) {
    const selectedCategory = postStore.categories.find(
      (c) => c.name === selectedFilter.value[0]
    );
    if (selectedCategory) {
      fetchPostsByCategory(selectedCategory.uuid, page);
    }
  } else {
    fetchAllPosts(page);
  }
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
        await fetchPostsByCategory(newCategoryc.uuid, currentPage.value);
      }
    }
  },
  { immediate: true }
);

// Watch for changes in selectedFilter
watch(selectedFilter, async (newFilter) => {
  if (newFilter.length > 0) {
    const selectedCategory = postStore.categories.find(
      (c) => c.name === newFilter[0]
    );
    if (selectedCategory) {
      currentPage.value = 1; // Reset to first page when category changes
      await fetchPostsByCategory(selectedCategory.uuid, currentPage.value);
    }
  } else {
    currentPage.value = 1; // Reset to first page when no category is selected
    await fetchAllPosts(currentPage.value);
  }
});
</script>
