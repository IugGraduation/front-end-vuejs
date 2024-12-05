import { defineStore } from "pinia";

interface User {
  name: string;
  phoneNumber: string;
}

interface Credentials {
  phoneNumber: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  phoneNumber: string;
  password: string;
  pestBarterSpo: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async login(credentials: Credentials): Promise<boolean> {
      // try {
      //   const data = await $fetch<{ user: User; token: string }>("/api/login", {
      //     method: "POST",
      //     body: credentials,
      //   });
      //   this.user = data.user;
      //   this.token = data.token;
      //   return true;
      // } catch (error) {
      //   console.error("Login failed:", error);
      //   return false;
      // }

      this.user = { ...credentials, name: "test" };
      this.token = "face-token";
      return true;
    },
    async register(data: RegisterData): Promise<boolean> {
      // try {
      //   await $fetch("/api/register", {
      //     method: "POST",
      //     body: data,
      //   });
      //   return true;
      // } catch (error) {
      //   console.error("Registration failed:", error);
      //   return false;
      // }
      this.user = {
        phone: "055675478454",
        name: "xyz",
        pestplace: "gaza",
      };
      this.token = "face-token";
      return true;
    },
    logout() {
      this.user = null;
      this.token = null;
      navigateTo("/login");
      localStorage.removeItem("auth");
    },
  },
  persist: true,
});
