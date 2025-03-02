export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as { image: string; title: string }[],
  }),

  actions: {
    async fetchCategories() {
      if (this.categories.length) return; // Avoid re-fetching

      const categories = [
        {
          image: "https://picsum.photos/500/300?image=232",
          title: "Category 1",
        },
        {
          image: "https://picsum.photos/500/300?image=233",
          title: "Category 2",
        },
        {
          image: "https://picsum.photos/500/300?image=234",
          title: "Category 3",
        },
        {
          image: "https://picsum.photos/500/300?image=235",
          title: "Category 4",
        },
        {
          image: "https://picsum.photos/500/300?image=236",
          title: "Category 5",
        },
        {
          image: "https://picsum.photos/500/300?image=237",
          title: "Category 6",
        },
        {
          image: "https://picsum.photos/500/300?image=238",
          title: "Category 7",
        },
        {
          image: "https://picsum.photos/500/300?image=239",
          title: "Category 8",
        },
        {
          image: "https://picsum.photos/500/300?image=240",
          title: "Category 9",
        },
        {
          image: "https://picsum.photos/500/300?image=241",
          title: "Category 10",
        },
        {
          image: "https://picsum.photos/500/300?image=242",
          title: "Category 11",
        },
        {
          image: "https://picsum.photos/500/300?image=243",
          title: "Category 12",
        },
      ];

      this.categories = categories;
    },
  },
});
