<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <h2>Posts</h2>
      </v-col>
    </v-row>
    <pre></pre>
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
        v-for="post in visiblePosts"
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
          :isMyPost="authStore.user.uuid == post.userId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PostCard from "../ui/cards/PostCard.vue";
import { usePostStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";

const postsStore = usePostStore();
const authStore = useAuthStore();

const posts = ref([{}]);

watch(
  () => postsStore.topPosts,
  (newValue) => {
    posts.value = newValue;
  },
  { deep: true, immediate: true }
);
const showAll = ref(false);

const isLoading = computed(() => (visiblePosts.length == 0 ? true : false));

const visiblePosts = computed(() => {
  return posts.value;
});

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
