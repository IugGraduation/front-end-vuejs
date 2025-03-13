<template>
  <v-container>
    <div v-if="!loading">
      <!-- Post Cards -->
      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.uuid"
          cols="12"
          sm="6"
          md="4"
          lg="4"
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
      <v-row class="mb-8" v-if="totalPages > 1">
        <v-pagination
          v-model="page"
          :length="totalPages"
          rounded="circle"
          class="mx-auto w-100"
          @update:modelValue="fetchPosts"
        ></v-pagination>
      </v-row>
    </div>
    <!-- Loading State -->
    <v-row v-if="loading">
      <v-col cols="12" md="4" sm="6" v-for="i in 6" :key="i" class="rounded-xl">
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
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import PostCard from "@/components/ui/cards/PostCard.vue"; // Adjust the import path as needed
import { usePostStore } from "../../stores/posts";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

definePageMeta({
  middleware: "auth", // Restrict access to logged-in users
});

const route = useRoute();
const postStore = usePostStore();

// Reactive state
const page = ref(1);
const posts = ref([]);
const totalPages = ref(0);
const loading = ref(false);
const error = ref("");

// Fetch posts function
const fetchPosts = async () => {
  loading.value = true;
  error.value = "";

  try {
    const { success, data, pages, message } = await postStore.fetchAllPosts(
      page.value
    );
    if (success) {
      posts.value = data; // Assign the array of posts
      totalPages.value = pages?.last_page || 1; // Use the last_page value from the API
    } else {
      error.value = message || "Failed to fetch posts.";
    }
  } catch (err) {
    console.error("Fetch Posts Error:", err);
    error.value = "An error occurred while fetching posts.";
  } finally {
    loading.value = false;
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
</script>

<style scoped>
/* Add custom styles if needed */
</style>
