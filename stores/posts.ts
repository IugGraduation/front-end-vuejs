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
  date: string;
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
  pages?: Number;
}

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
    categories: [] as Category[],
    topPosts: [] as Post[],
    myPosts: [] as Post[],
    selectedCategory: null,
    searchText: "",
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
      const authStore = useAuthStore();

      try {
        const { data: post } = await $fetch<Post>(
          `${config.public.API_BASE_URL}/post/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`, // Pass the auth token
            },
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
          date: post.date,
          num_offers: post.num_offers,
          favorite_categories: post.favorite_categories,
        };

        return { success: true, data: result };
      } catch (err) {
        console.error("Fetch Post Error:", err);
        return { success: false, message: "Failed to fetch post details." };
      }
    },

    async fetchMyPosts(
      page: number,
      perPage: number
    ): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/profile/posts?page=${page}&perPage=${perPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`, // Pass the auth token
            },
          }
        );

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
        console.error("Fetch My Posts Error:", error);
        return { success: false, message: "Failed to fetch posts." };
      }
    },
    async addPost(formData: FormData): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();

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

    async deletePost(postId: string): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/${postId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          return { success: true, message: "Post deleted successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to delete post.",
          };
        }
      } catch (error) {
        console.error("Delete Post Error:", error);
        return { success: false, message: "Failed to delete post." };
      }
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
    async fetchPostById(postId: string): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/${postId}/edit`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          return { success: true, data: response.data };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch post.",
          };
        }
      } catch (error) {
        console.error("Fetch Post Error:", error);
        return { success: false, message: "Failed to fetch post." };
      }
    },

    // Update a post
    async updatePost(formData: FormData): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/post/update`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          return { success: true, message: "Post updated successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to update post.",
          };
        }
      } catch (error) {
        console.error("Update Post Error:", error);
        return { success: false, message: "Failed to update post." };
      }
    },
    async fetchCategories(): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/see_all?type=category`,
          {
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          this.categories = response.data; // Store categories in the state
          return { success: true, message: "Categories fetched successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch categories.",
          };
        }
      } catch (error) {
        console.error("Fetch Categories Error:", error);
        return { success: false, message: "Failed to fetch categories." };
      }
    },

    // Fetch posts by category UUID
    async fetchPostsByCategory(
      categoryUuid: string
    ): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/category/${categoryUuid.uuid}/posts`,
          {
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          this.posts = response.data; // Store the posts in the state
          return {
            success: true,
            message: "Posts fetched successfully.",
            data: response.data,
            pages: response.pages,
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch posts.",
          };
        }
      } catch (error) {
        console.error("Fetch Posts by Category Error:", error);
        return { success: false, message: "Failed to fetch posts." };
      }
    },

    // Search posts by search term and category UUID
    async searchPosts({
      searchTerm,
      categoryUuid,
    }: {
      searchTerm: string;
      categoryUuid?: string;
    }): Promise<ApiResponse<any>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/search`,
          {
            query: {
              search: searchTerm,
              "category_uuid[0]": categoryUuid.uuid,
            },
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          this.posts = response.data; // Store search results in the state
          return {
            success: true,
            message: "Posts searched successfully.",
            data: response.data,
            pages: response.pages,
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to search posts.",
          };
        }
      } catch (error) {
        console.error("Search Posts Error:", error);
        return { success: false, message: "Failed to search posts." };
      }
    },
  },
  persist: true,
});
