<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <h2>My Posts</h2>
      </v-col>
    </v-row>
    <v-row v-if="isLoading">
      <v-col cols="12" md="4" v-for="i in 3" :key="i" class="rounded-xl">
        <v-skeleton-loader
          class="border w-full rounded-xl overflow-hidden"
          type="image, paragraph"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <!-- Show Posts based on showAll state -->
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
          :index="post.id"
          :imageUrl="post.image"
          :avatarUrl="post.avatarUrl"
          :name="post.name"
          :title="post.title"
          :status="post.status"
          :description="post.description"
          :offers="post.offers ? post.offers.length : 0"
          :isMyPost="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PostCard from "../ui/cards/PostCard.vue";
import PrimaryBtn from "../ui/buttons/PrimaryBtn.vue";
import { usePostStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
// Define an array of Posts
const postsStore = usePostStore();
const authStore = useAuthStore();
// defineProps({
//   isLoading: {
//     type: Boolean,
//   },
// });
const isLoading = ref(false);
const posts = ref([]);
onMounted(async () => {
  isLoading.value = true;
  fetchPosts();
});
const fetchPosts = async () => {
  try {
    posts.value = await postsStore.fetcMyhPosts(authStore.user.id);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};
// const Posts = [
//   {
//     image: "https://picsum.photos/500/300?image=232",
//     avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
//     name: "John Doe",
//     title: "Software Engineer",
//     status: "opne",
//     description: "A passionate software engineer with 5+ years of experience.",
//   },
//   {
//     image: "https://picsum.photos/500/300?image=233",
//     avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//     name: "Jane Smith",
//     title: "Product Manager",
//     status: "close",
//     description: "Experienced product manager leading cross-functional teams.",
//   },
//   {
//     image: "https://picsum.photos/500/300?image=234",
//     avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//     name: "Mark Wilson",
//     title: "Data Scientist",
//     status: "open",
//     description:
//       "Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI.",
//   },
//   {
//     image: "https://picsum.photos/500/300?image=235",
//     avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
//     name: "Emily Davis",
//     title: "UX Designer UX Designer UX Designer",
//     status: "open",
//     description:
//       "Creative UX designer dedicated to crafting intuitive user interfaces.",
//   },
//   {
//     image: "https://picsum.photos/500/300?image=335",
//     avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
//     name: "Emily Davis",
//     title: "UX Designer",
//     status: "open",
//     description:
//       "Creative UX designer dedicated to crafting intuitive user interfaces.",
//   },
//   {
//     image: "https://picsum.photos/500/300?image=535",
//     avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
//     name: "Emily Davis",
//     title: "UX Designer",
//     status: "open",
//     description:
//       "Creative UX designer dedicated to crafting intuitive user interfaces.",
//   },
// ];
// Reactive state for toggling 'See All'
const showAll = ref(false);

// Computed property to determine which Posts to show
const visiblePosts = computed(() => {
  // return showAll.value ? Posts : Posts.slice(0, 3); // Show first 4 Posts or all if showAll is true
  return posts.value;
});

// Function to toggle the visibility of Posts
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
.all-posts {
}
.v-skeleton-loader .v-skeleton-loader__image {
  border-radius: 23px 23px 0 0 !important;
}
</style>
