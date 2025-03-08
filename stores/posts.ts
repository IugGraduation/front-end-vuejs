import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRuntimeConfig } from "#imports";

interface Post {
  id: string;
  userId: string;
  avatarUrl: string;
  name: string;
  image: string;
  title: string;
  description: string;
  status: boolean;
  offers: any[]; // Define a proper type for offers if possible
  num_offers: number;
  favorite_categories: Category[];
}

interface Category {
  userId: string;
  id: string;
  name: string;
}

interface HomeDataResponse {
  status: boolean;
  data: {
    data_type: string;
    data: Post[] | Category[];
  }[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
    categories: [] as Category[],
    topPosts: [] as Post[],
    myPosts: [] as Post[],
  }),

  actions: {
    async fetchHomeData(): Promise<ApiResponse<void>> {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<HomeDataResponse>(
          `${config.public.API_BASE_URL}/home`
        );

        if (response.status) {
          if (Array.isArray(response.data.data)) {
            // Handle array response
            response.data.data.forEach((section) => {
              if (section.data_type === "Categories") {
                this.categories = section.data as Category[];
              } else if (section.data_type === "Top Interactive") {
                this.topPosts = section.data.map((post) => ({
                  id: post.uuid,
                  userId: post.user_uuid,
                  avatarUrl: post.user_image,
                  name: post.user_name,
                  image: post.post_image,
                  title: post.post_name,
                  description: post.post_details,
                  status: post.status,
                  num_offers: post.num_offers,
                }));
              }
            });
          } else if (response.data && typeof response.data === "object") {
            // Handle object response
            if (response.data.Categories) {
              this.categories = response.data.Categories;
            }
            if (response.data["Top Interactive"]) {
              this.topPosts = response.data["Top Interactive"].map((post) => ({
                id: post.uuid,
                userId: post.user_uuid,
                avatarUrl: post.user_image,
                name: post.user_name,
                image: post.post_image,
                title: post.post_name,
                description: post.post_details,
                status: post.status,
                offers: [],
                num_offers: post.num_offers,
              }));
            }
          } else {
            console.error("Invalid data format: Expected an array or object.");
            return { success: false, message: "Invalid data format." };
          }

          return { success: true };
        } else {
          return { success: false, message: "Invalid response from server." };
        }
      } catch (error) {
        console.error("Failed to fetch home data", error);
        return { success: false, message: "Failed to fetch home data." };
      }
    },

    async fetchOnePost(postId: string): Promise<ApiResponse<Post>> {
      const config = useRuntimeConfig();

      try {
        const { data: post } = await $fetch<Post>(
          `${config.public.API_BASE_URL}/post/${postId}`,
          {
            method: "GET",
          }
        );

        if (!post.status) {
          return { success: false, message: "Invalid post data received." };
        }

        const result: Post = {
          id: post.uuid,
          userId: post.user_uuid,
          avatarUrl: post.user_image,
          name: post.user_name,
          image: post.post_image,
          title: post.post_name,
          description: post.post_details,
          status: post.status,
          offers: post.offers,
          num_offers: post.num_offers,
          favorite_categories: post.favorite_categories,
        };

        return { success: true, data: result };
      } catch (err) {
        console.error("Fetch Post Error:", err);
        return { success: false, message: "Failed to fetch post details." };
      }
    },

    async fetchMyPosts(): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();

      if (!authStore.user) {
        return { success: false, message: "User not authenticated." };
      }

      try {
        this.myPosts = this.topPosts.filter(
          (post) => post.userId === authStore.user.uuid
        );
        return { success: true };
      } catch (error) {
        console.error("Failed to fetch user posts", error);
        return { success: false, message: "Failed to fetch user posts." };
      }
    },

    async addPost(formData: FormData): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();
      console.log("from add post >> auth token", authStore.authToken);

      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/store`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${authStore.authToken}`, // Use the token from runtime config
            },
          }
        );
        console.log("respons from add posts", response);

        if (response.status) {
          return { success: true, message: "Post added successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to add post.",
          };
        }
      } catch (error) {
        console.error("Add Post Error:", error);
        return { success: false, message: "Failed to add post." };
      }
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
    async fetchAllPosts(page: number): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/see_all?type=recent_posts&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );
        console.log(response.pages);

        if (response.status) {
          return {
            success: true,
            data: response.data, // Array of posts
            pages: response.pages, // Pagination metadata
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch posts.",
          };
        }
      } catch (error) {
        console.error("Fetch All Posts Error:", error);
        return { success: false, message: "Failed to fetch posts." };
      }
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
