import { defineStore } from "pinia";

interface Post {
  name: string;
  avatarUrl: FormData;
  images: FormData;
  title: String;
  descripton: String;
  status: String;
}

export const usePostStore = defineStore("post", {
  state: () => ({
    post: null as String | null,
    posts: null as Post[] | null,
    token: null as string | null,
  }),

  actions: {
    async create(psot: Post): Promise<boolean> {
      // try {
      //   const data = await $fetch<{ post: Post; token: string }>("/api/create-post", {
      //     method: "POST",
      //     body: post,
      //   });
      // navigateTo("/")
      //   return true;
      // } catch (error) {
      //   console.error("Login failed:", error);
      //   return false;
      // }

      this.post = {
        name: "post",
        images: "postImageUrl",
        title: "laptop",
        descripton: "victus cor i9 , ram 32 , hard 500ssd ",
        status: "open",
      };
      return true;
    },
    update(id: String) {
      console.log(id, "UPDATE");
      return true;
    },
    delete(id: String) {
      console.log(id, "DELETE");
      return true;
    },
    get(id: String) {
      console.log(id, "GET");
      return true;
    },
    getAll(id: String) {
      console.log(id, "ALL POSSTS");
      this.posts = [
        {
          image: "https://picsum.photos/500/300?image=232",
          avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          name: "John Doe",
          title: "Software Engineer",
          status: "opne",
          description:
            "A passionate software engineer with 5+ years of experience.",
        },
        {
          image: "https://picsum.photos/500/300?image=233",
          avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          name: "Jane Smith",
          title: "Product Manager",
          status: "close",
          description:
            "Experienced product manager leading cross-functional teams.",
        },
        {
          image: "https://picsum.photos/500/300?image=234",
          avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          name: "Mark Wilson",
          title: "Data Scientist",
          status: "open",
          description:
            "Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI. Data scientist focused on machine learning and AI.",
        },
        {
          image: "https://picsum.photos/500/300?image=235",
          avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
          name: "Emily Davis",
          title: "UX Designer UX Designer UX Designer",
          status: "open",
          description:
            "Creative UX designer dedicated to crafting intuitive user interfaces.",
        },
        {
          image: "https://picsum.photos/500/300?image=235",
          avatarUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
          name: "Emily Davis",
          title: "UX Designer",
          status: "open",
          description:
            "Creative UX designer dedicated to crafting intuitive user interfaces.",
        },
      ];
      return true;
    },
  },
  persist: true,
});
