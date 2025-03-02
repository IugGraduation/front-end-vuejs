import { defineStore } from "pinia";
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app'; // Import useNuxtApp

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

interface AuthState {
  user: User | null;
  authToken: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    authToken: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.authToken,
  },
  actions: {
    async login(credentials: Credentials): Promise<void> {
      const { $fetch } = useNuxtApp(); // Use $fetch instead of $axios
      const router = useRouter();

      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch("/auth/login", {
          method: "POST",
          body: credentials,
        });

        this.authToken = response.token; // Access token directly
        this.user = response.user; // Access user directly

        router.push("/otp");
      } catch (err: any) {
        this.error = err.data?.message || "Login failed. Please try again.";
        console.error("Login error:", err);
      } finally {
        this.loading = false;
      }
    },
    async register(payload: RegisterData): Promise<boolean> {
      const { $fetch } = useNuxtApp(); // Use $fetch instead of $axios
      const router = useRouter();

      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch("/auth/register", {
          method: "POST",
          body: payload,
        });

        this.authToken = response.token; // Access token directly
        this.user = response.user; // Access user directly

        console.log("Registration response:", response);

        router.push("/");
        return true;
      } catch (err: any) {
        this.error = err.data?.message || "Registration failed. Please try again.";
        console.error("Registration error:", err);
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout(): void {
      this.user = null;
      this.authToken = null;
      localStorage.removeItem("auth");
      window.location.href = "/login";
    },
  },
  persist: true,
});