import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { useRuntimeConfig } from "#imports";

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [],
    categories: [],
    topPosts: [],
    myPosts: [],
  }),

  actions: {
    async fetchHomeData() {
      const config = useRuntimeConfig();
      try {
        const response = await axios.get(`${config.public.API_BASE_URL}/home`);
        if (response.data.status) {
          const { data } = response.data;
          data.data.forEach((section) => {
            if (section.data_type === "Categories") {
              this.categories = section.data;
            } else if (section.data_type === "Top Interactive") {
              this.topPosts = section.data.map((product) => ({
                id: product.uuid,
                userId: product.user_uuid,
                avatarUrl: product.user_image,
                name: product.user_name,
                image: product.post_image,
                title: product.post_name,
                description: product.post_details,
                status: product.status,
                offers: [],
              }));
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    },

    async fetchOnePost(postId: String) {
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/${postId}`,
          {
            method: "GET",
          }
        );

        if (response.status) {
          return response.data;
        }
      } catch (err) {
        console.error("Fetch Post Error:", err);
      }
      return { message: "Failed to fetch post details.", status: false };
    },
    async fetchMyPosts() {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      this.myPosts = this.topPosts.filter(
        (post) => post.userId === authStore.user.uuid
      );
    },

    async addPost(payload) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }
      // Add New Post
      const config = useRuntimeConfig();
      // loading.value = true;
      // error.value = null;
      // success.value = null;
      console.log(payload);

      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const value = payload[key];

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/store`,
          {
            method: "POST",
            body: formData,
          }
        );
        console.log(response);

        if (response.status) {
          // success.value = "Post added successfully!";
          return true;
        }
      } catch (err) {
        // error.value = err.data?.message || "Failed to add post.";
        console.error("Add Post Error:", err);
      } finally {
      }
      return false;
    },

    async deletePost(postId) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      this.myPosts = this.myPosts.filter(
        (post) => post.id !== postId || post.userId !== authStore.user.uuid
      );
      this.posts = this.posts.filter((post) => post.id !== postId);
    },

    async addOfferToPost(postId, offer) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const post = this.posts.find((post) => post.id === postId);
      if (post) {
        const newOffer = {
          ...offer,
          id: Date.now().toString(),
          userId: authStore.user.uuid,
        };
        post.offers.push(newOffer);
      }
    },
  },
  persist: true,
});
