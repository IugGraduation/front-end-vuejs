import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (process.client) {
    authStore.initializeStore(); // Only initialize store on the client side
  }

  if (!authStore.isAuthenticated) {
    authStore.isAuthenticated = false;
    return navigateTo("/login"); // Redirect to login if not authenticated
  }
});
