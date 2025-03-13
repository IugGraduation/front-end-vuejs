<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <h2>My Posts</h2>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="isLoading">
      <v-col cols="12" md="4" v-for="i in 3" :key="i" class="rounded-xl">
        <v-skeleton-loader
          class="border w-full rounded-xl overflow-hidden"
          type="image, paragraph"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-if="error">
      <v-col cols="12" class="text-center">
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>

    <!-- Posts -->
    <v-row v-else>
      <v-col
        v-for="post in visiblePosts"
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
          :offers="post.num_offers"
          :isMyPost="authStore.user.uuid == post.user_uuid"
        />
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="mb-8" v-if="totalPages > 1">
      <v-pagination
        v-model="page"
        :length="totalPages"
        rounded="circle"
        class="mx-auto"
        @update:modelValue="fetchPosts"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import PostCard from "../ui/cards/PostCard.vue";
import { usePostStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";

// Reactive state
const isLoading = ref(false);
const error = ref("");
const posts = ref([]);
const page = ref(1); // Current page
const perPage = 9; // Number of posts per page
const totalPages = ref(0); // Total number of pages

const postStore = usePostStore();
const authStore = useAuthStore();

// Fetch posts function
const fetchPosts = async () => {
  isLoading.value = true;
  error.value = "";
  
  try {
    const { success, data, pages, message } = await postStore.fetchMyPosts(
      page.value,
      perPage
    );
    if (success) {
      posts.value = data; // Assign the fetched posts
      totalPages.value = pages?.last_page || 1; // Set total pages from API response
    } else {
      error.value = message || "Failed to fetch posts.";
    }
  } catch (err) {
    console.error("Fetch My Posts Error:", err);
    error.value = "An error occurred while fetching posts.";
  } finally {
    isLoading.value = false;
  }
};

// Fetch posts on mounted
onMounted(() => {
  fetchPosts();
});

// Fetch posts when page changes
watch(page, () => {
  fetchPosts();
});

// Computed property to determine visible posts
const visiblePosts = computed(() => {
  return posts.value; // Show all posts for the current page
});

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

/* Optional: custom styling for post cards */
.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-skeleton-loader .v-skeleton-loader__image {
  border-radius: 23px 23px 0 0 !important;
}
</style>
