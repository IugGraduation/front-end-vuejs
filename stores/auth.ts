import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useApi } from "../services/api";
import { navigateTo, useRuntimeConfig } from "nuxt/app";
import { useToast } from "vue-toast-notification";

interface User {
  name: string;
  uuid: string;
  image: string;
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
  isAuthenticated: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    authToken: null,
    loading: false,
    error: null,
    mobile: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    // Initialize state from localStorage
    initializeStore() {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const { user, authToken, isAuthenticated } = JSON.parse(storedAuth);
        this.user = user;
        this.authToken = authToken;
        this.isAuthenticated = isAuthenticated;
      }
    },

    // Save state to localStorage
    saveToLocalStorage() {
      const authState = {
        user: this.user,
        authToken: this.authToken,
        isAuthenticated: this.isAuthenticated,
      };
      localStorage.setItem("auth", JSON.stringify(authState));
    },

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
          this.authToken = response.data.token;
          this.user = response.data;
          this.isAuthenticated = true;
          this.saveToLocalStorage(); // Save to localStorage after login
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

        if (response.status) {
          this.authToken = response.data.token;
          this.user = response.data;
          this.isAuthenticated = true;
          this.saveToLocalStorage(); // Save to localStorage after verification
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
    async fetchProfile(userUuid: string): Promise<ApiResponse<User>> {
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/profile/${userUuid}`,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
            },
          }
        );

        if (response.status) {
          return {
            success: true,
            message: "Profile fetched successfully.",
            data: response.data.item,
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch profile.",
          };
        }
      } catch (error) {
        console.error("Fetch Profile Error:", error);
        return { success: false, message: "Failed to fetch profile." };
      }
    },

    async updateProfile(formData) {
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/profile/update`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.authToken}`,
            },
            body: formData,
          }
        );

        console.log("update profile response", response);

        if (response.status) {
          return {
            success: true,
            message: "Profile updated successfully.",
            data: response.data,
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to update profile.",
          };
        }
      } catch (error) {
        console.error("Update Profile Error:", error);
        return { success: false, message: "Failed to update profile." };
      }
    },
    async updatePassword(payload: any): Promise<ApiResponse<any>> {
      const config = useRuntimeConfig();
      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/profile/update/password`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.status) {
          return {
            success: true,
            message: "Password updated successfully.",
            data: response.data,
          };
        } else {
          return {
            success: false,
            message: response.message || "Failed to update password.",
          };
        }
      } catch (error) {
        console.error("Update Password Error:", error);
        return { success: false, message: "Failed to update password." };
      }
    },
  },
  persist: true,
});
