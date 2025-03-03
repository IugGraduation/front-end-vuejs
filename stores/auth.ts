import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useApi } from "../services/api";
import { navigateTo, useRuntimeConfig } from "nuxt/app";
import { useToast } from "vue-toast-notification";
interface User {
  name: string;
}

interface LoginData {
  mobile: string;
  password: string;
  fcm_device: string;
  fcm_token: string;
}

interface RegisterData {
  name: string;
  mobile: string;
  password: string;
  confirm_password: string;
  pestBarterSpo?: string;
}

interface VerifyCodeData {
  mobile: string;
  code: string;
  fcm_token: string;
  fcm_device: string;
}

interface AuthState {
  user: User | null;
  authToken: string | null;
  loading: boolean;
  error: string | null;
  mobile: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    authToken: null,
    loading: false,
    error: null,
    mobile: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.authToken,
  },
  actions: {
    async login(payload: LoginData): Promise<boolean> {
      const config = useRuntimeConfig();
      this.mobile = payload.mobile;
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );

        if (response.status) {
          this.user = response.data.name;
          return true;
        }
      } catch (err: any) {
        console.log(err.data?.message || "Login failed. Please try again.");
      }
      return false;
    },
    async register(payload: RegisterData): Promise<boolean> {
      const config = useRuntimeConfig();
      this.mobile = payload.mobile;

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/auth/register`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        if (response.status) {
          this.user = response.data.name;
          return true;
        }
      } catch (err: any) {
        this.error =
          err.data?.message || "Registration failed. Please try again.";
        console.error("Registration error:", err);
      }
      return false;
    },
    async verifyCode(payload: VerifyCodeData): Promise<boolean> {
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/auth/verify_code`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        console.log(response);

        if (response.status) {
          this.authToken = response.data.token;
          this.user = response.data.name;
          return true;
        }
      } catch (err: any) {
        this.error =
          err.data?.message || "Verification failed. Please try again.";
        console.error("Verify Code error:", err);
      }
      return false;
    },
    logout(): void {
      this.user = null;
      this.authToken = null;
      this.mobile = null;
      localStorage.removeItem("auth");
      window.location.href = "/login";
    },
  },
  persist: true,
});
