import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth"; // Import the auth store to get user info
interface posts {
  id: string;
  userId: string;
  image: string;
  images: string[];
  avatarUrl: string;
  name: string;
  title: string;
  status: string;
  categories: string[];
  description: string;
  offers: Offers[]
}

interface Offers {
  id: Number;
  userId: Number; // Add userId to track ownership of offer
  imageUrl: string;
  avatarUrl: string;
  name: string;
  title: string;
  description: string;
}

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [
      {
        id: 1,
        userId: 1, // Add userId to track ownership
        image: "https://picsum.photos/500/300?image=232",
        images: [
          "https://picsum.photos/500/300?image=232",
          "https://picsum.photos/500/300?image=233",
          "https://picsum.photos/500/300?image=235",
        ],
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        title: "Software Engineer",
        status: "open",
        categories: ["Category 1", "Category 3", "Category 2"],
        description:
          "A passionate software engineer with 5+ years of experience.",
        offers: [
          {
            id: 1,
            userId: 1, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=232",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Offer 1",
            title: "Junior Developer",
            description: "An offer description here.",
          },
          {
            id: 2,
            userId: 2, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=123",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Offer 2",
            title: "Junior Developer",
            description: "An offer description here.",
          },
          {
            id: 3,
            userId: 3, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=323",
            avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
            name: "Offer 3",
            title: "Junior Developer",
            description: "An offer description here.",
          },
          {
            id: 4,
            userId: 4, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=444",
            avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
            name: "Offer 4",
            title: "Junior Developer",
            description: "An offer description here.",
          },
        ],
      },
      {
        id: 2,
        userId: 3,
        image: "https://picsum.photos/500/300?image=282",
        images: [
          "https://picsum.photos/500/300?image=232",
          "https://picsum.photos/500/300?image=233",
          "https://picsum.photos/500/300?image=235",
        ],
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Jane Smith",
        title: "Product Manager",
        status: "close",
        description:
          "Experienced product manager leading cross-functional teams.",
        postCategories: ["Category 2", "Category 3", "Category 5"],
        categoriesWant: ["Category 2", "Category 3", "Category 5"],
        offers: [
          {
            id: 1,
            userId: 1, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=232",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Offer 1",
            title: "Junior Developer",
            description: "An offer description here.",
          },
        ],
      },
      {
        image: "https://picsum.photos/500/300?image=233",
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Jane Smith",
        title: "Product Manager",
        status: "close",
        categories: ["Category 4", "Category 5"],
        description:
          "Experienced product manager leading cross-functional teams.",
        offers: [],
      },
      {
        image: "https://picsum.photos/500/300?image=234",
        avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Mark Wilson",
        title: "Data Scientist",
        status: "open",
        description:
          "Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI.",
        offers: [],
      },
      {
        image: "https://picsum.photos/500/300?image=235",
        avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
        name: "Emily Davis",
        title: "UX Designer UX Designer UX Designer",
        status: "open",
        description:
          "Creative UX designer dedicated to crafting intuitive user interfaces.",
        offers: [],
      },
      {
        image: "https://picsum.photos/500/300?image=235",
        avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
        name: "Emily Davis",
        title: "UX Designer",
        status: "open",
        description:
          "Creative UX designer dedicated to crafting intuitive user interfaces.",
        offers: [],
      },
    ],
    myPosts: [
      {
        id: 1,
        userId: 123,
        image: "https://picsum.photos/500/300?image=282",
        images: [
          "https://picsum.photos/500/300?image=232",
          "https://picsum.photos/500/300?image=233",
          "https://picsum.photos/500/300?image=235",
        ],
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Jane Smith",
        title: "Product Manager",
        status: "open",
        pestPlace: "gaza",
        description:
          "Experienced product manager leading cross-functional teams.",
        postCategories: ["Category 2", "Category 3", "Category 5"],
        categoriesWant: ["Category 2", "Category 3", "Category 5"],
        offers: [
          {
            id: 1,
            userId: 1, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=232",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Offer 1",
            title: "Junior Developer",
            description: "An offer description here.",
          },
        ],
      },
      {
        id: 2,
        userId: 123,
        image: "https://picsum.photos/500/300?image=282",
        images: [
          "https://picsum.photos/500/300?image=232",
          "https://picsum.photos/500/300?image=233",
          "https://picsum.photos/500/300?image=235",
        ],
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Jane Smith",
        title: "Product Manager",
        status: "close",
        description:
          "Experienced product manager leading cross-functional teams.",
        pestPlace: "gaza",
        postCategories: ["Category 2", "Category 3", "Category 5"],
        categoriesWant: ["Category 8", "Category 7", "Category 6"],
        offers: [
          {
            id: 1,
            userId: 1, // Add userId to track ownership of offer
            imageUrl: "https://picsum.photos/500/300?image=232",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "Offer 1",
            title: "Junior Developer",
            description: "An offer description here.",
          },
        ],
      },
    ],
  }),

  actions: {
    // Simulate fetching posts from an API
    async fetchPosts() {
      // Simulate a delay and return posts
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return this.posts;
    },
    async fetcMyhPosts(userId) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }
      if (userId !== authStore.user.id) {
        throw new Error("User cannot access this posts");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return this.myPosts;
    },

    async fetchOnePost(postId) {
      // const authStore = useAuthStore();
      // if (!authStore.user) {
      //   throw new Error("User not authenticated");
      // }

      const postIndex = this.posts.findIndex((post) => post.id == postId);

      if (postIndex !== -1) {
        // this.posts[postIndex].userId === authStore.user.id
        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return this.posts[postIndex];
      } else {
        // throw new Error("You are not authorized to delete this post");
      }
    },
    async fetchOneMyPost(postId) {
      // const authStore = useAuthStore();
      // if (!authStore.user) {
      //   throw new Error("User not authenticated");
      // }

      const postIndex = this.myPosts.findIndex((post) => post.id == postId);

      if (postIndex !== -1) {
        // this.posts[postIndex].userId === authStore.user.id
        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return this.myPosts[postIndex];
      } else {
        // throw new Error("You are not authorized to delete this post");
      }
    },
    // Add a new post (Simulate an API request)
    async addPost(post) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const newPost = {
        ...post,
        id: Date.now(),
        userId: authStore.user.id,
        offers: [],
      };
      // Simulate sending the post to the API

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.posts.push(newPost);
      this.myPosts.push(newPost);
    },

    // Edit an existing post (Simulate an API request)
    async editPost(postId, updatedPost) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const postIndex = this.myPosts.findIndex((post) => post.id == postId);
      if (
        postIndex !== -1 &&
        this.myPosts[postIndex].userId == authStore.user.id
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.myPosts[postIndex] = {
          ...this.myPosts[postIndex],
          ...updatedPost,
        };
      } else {
        throw new Error("You are not authorized to edit this post");
      }
    },

    // Delete a post (Simulate an API request)
    async deletePost(postId) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const postIndex = this.myPosts.findIndex((post) => post.id == postId);

      if (
        postIndex !== -1 &&
        this.myPosts[postIndex].userId == authStore.user.id
      ) {
        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.myPosts.splice(postIndex, 1);
        console.log(this.myPosts);
      } else {
        throw new Error("You are not authorized to delete this post");
      }
    },

    // Add an offer to a post (Simulate an API request)
    async addOfferToPost(postId, offer) {
      console.log("add offer");

      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const post = this.posts.find((post) => post.id === postId);
      if (post) {
        const newOffer = {
          ...offer,
          id: Date.now(),
          userId: authStore.user.id,
        };
        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        post.offers.push(newOffer);
        console.log(post);
      }
    },

    // Edit an offer in a post (Simulate an API request)
    async editOffer(postId, offerId, updatedOffer) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const post = this.posts.find((post) => post.id === postId);
      if (post) {
        const offerIndex = post.offers.findIndex(
          (offer) => offer.id === offerId
        );
        if (
          offerIndex !== -1 &&
          post.offers[offerIndex].userId === authStore.user.id
        ) {
          // Simulate API request
          await new Promise((resolve) => setTimeout(resolve, 1000));
          post.offers[offerIndex] = {
            ...post.offers[offerIndex],
            ...updatedOffer,
          };
        } else {
          throw new Error("You are not authorized to edit this offer");
        }
      }
    },

    // Delete an offer from a post (Simulate an API request)
    async deleteOffer(postId, offerId) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error("User not authenticated");
      }

      const post = this.posts.find((post) => post.id === postId);
      if (post) {
        const offerIndex = post.offers.findIndex(
          (offer) => offer.id === offerId
        );
        if (
          offerIndex !== -1 &&
          post.offers[offerIndex].userId === authStore.user.id
        ) {
          // Simulate API request
          await new Promise((resolve) => setTimeout(resolve, 1000));
          post.offers.splice(offerIndex, 1);
        } else {
          throw new Error("You are not authorized to delete this offer");
        }
      }
    },
  },
});

// import { defineStore } from "pinia";

// interface Post {
//   name: string;
//   avatarUrl: FormData;
//   images: FormData;
//   title: String;
//   descripton: String;
//   status: String;
// }

// export const usePostStore = defineStore("post", {
//   state: () => ({
//     post: null as String | null,
//     posts: null as Post[] | null,
//     token: null as string | null,
//   }),

//   actions: {
//     async create(psot: Post): Promise<boolean> {
//       // try {
//       //   const data = await $fetch<{ post: Post; token: string }>("/api/create-post", {
//       //     method: "POST",
//       //     body: post,
//       //   });
//       // navigateTo("/")
//       //   return true;
//       // } catch (error) {
//       //   console.error("Login failed:", error);
//       //   return false;
//       // }

//       this.post = {
//         name: "post",
//         images: "postImageUrl",
//         title: "laptop",
//         descripton: "victus cor i9 , ram 32 , hard 500ssd ",
//         status: "open",
//       };
//       return true;
//     },
//     update(id: String) {
//       console.log(id, "UPDATE");
//       return true;
//     },
//     delete(id: String) {
//       console.log(id, "DELETE");
//       return true;
//     },
//     get(id: String) {
//       console.log(id, "GET");
//       return true;
//     },
//     getAll(id: String) {
//       console.log(id, "ALL POSSTS");
//       this.posts = [
//         {
//           image: "https://picsum.photos/500/300?image=232",
//           avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
//           name: "John Doe",
//           title: "Software Engineer",
//           status: "opne",
//           description:
//             "A passionate software engineer with 5+ years of experience.",
//         },
//         {
//           image: "https://picsum.photos/500/300?image=233",
//           avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//           name: "Jane Smith",
//           title: "Product Manager",
//           status: "close",
//           description:
//             "Experienced product manager leading cross-functional teams.",
//         },
//         {
//           image: "https://picsum.photos/500/300?image=234",
//           avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//           name: "Mark Wilson",
//           title: "Data Scientist",
//           status: "open",
//           description:
//             "Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI.",
//         },
//         {
//           image: "https://picsum.photos/500/300?image=235",
//           avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
//           name: "Emily Davis",
//           title: "UX Designer UX Designer UX Designer",
//           status: "open",
//           description:
//             "Creative UX designer dedicated to crafting intuitive user interfaces.",
//         },
//         {
//           image: "https://picsum.photos/500/300?image=235",
//           avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
//           name: "Emily Davis",
//           title: "UX Designer",
//           status: "open",
//           description:
//             "Creative UX designer dedicated to crafting intuitive user interfaces.",
//         },
//       ];
//       return true;
//     },
//   },
//   persist: true,
// });
