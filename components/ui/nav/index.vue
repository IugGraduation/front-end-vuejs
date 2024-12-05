<template>
  <v-app-bar app dense :elevation="2">
    <!-- Logo on the left -->
    <div class="logo px-4">SwapWise</div>

    <!-- Centered Links -->
    <div
      class="nav-links"
      style="
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <v-btn text class="mx-2" @click="goToHome" v-if="!isRtl">Home</v-btn>
      <v-btn text class="mx-2" @click="goToProfile" v-if="!isRtl"
        >Profile</v-btn
      >
      <v-btn text class="mx-2" @click="logout" v-if="!isRtl">Logout</v-btn>
      <v-btn text class="mx-2" @click="search" v-if="!isRtl">search</v-btn>
      <v-btn text class="mx-2" @click="goToHome" v-if="isRtl"
        >الصفحة الرئيسية</v-btn
      >
      <v-btn text class="mx-2" @click="goToProfile" v-if="isRtl"
        >الملف الشخصي</v-btn
      >
      <v-btn text class="mx-2" @click="logout" v-if="isRtl">تسجيل الخروج</v-btn>
    </div>

    <!-- Spacer to push the items to the right side -->
    <v-spacer></v-spacer>

    <!-- User, Dark/Light, and Language Toggle -->
    <div class="d-flex align-center gap-3">
      <div class="d-flex align-center gap-3">
        <!-- Username Button with Dropdown -->
        <v-menu v-if="username" v-model="menu" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              style="font-size: 16px; font-weight: bold"
            >
              {{ username }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                />
              </svg>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="search">
              <v-list-item-title>search</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Dark/Light Mode Toggle -->
      <v-btn
        @click="toggleTheme"
        class="theme-btn"
        style="font-size: 14px; font-weight: bold; color: #1976d2"
      >
        {{ isDark ? "Dark" : "Light" }}
      </v-btn>

      <!-- Language Toggle -->
      <v-btn
        text
        @click="toggleLanguage"
        class="language-btn"
        style="font-size: 14px; font-weight: bold; color: #1976d2"
      >
        {{ isRtl ? "AR" : "EN" }}
      </v-btn>
    </div>
  </v-app-bar>
</template>
<script setup>
import { navigateTo } from "nuxt/app";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useAuthStore } from "../../../stores/auth";

// Reactive state for dark mode and language
const theme = useTheme();
const isDark = ref(false);
const authStore = useAuthStore();
const username = ref(authStore.user.name);
const menu = ref(false); // This will control the dropdown menu

// Use I18n for locale management
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar"); // RTL if the language is Arabic

// Navigation methods
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const goToProfile = () => {
  router.push("/profile");
};

const toggleTheme = () => {
  const newTheme = theme.global.name.value === "light" ? "dark" : "light";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme);
};

// Toggle language between Arabic and English
const toggleLanguage = () => {
  const newLang = locale.value === "ar" ? "en" : "ar";
  locale.value = newLang;
};

const search = () => {
  navigateTo("/search");
};

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
/* Optional: Custom CSS for RTL/LTR layout adjustments */
.v-app-bar {
  transition: all 0.3s ease;
}

.v-app-bar[data-theme="dark"] {
  background-color: #121212;
}

.v-app-bar[data-theme="light"] {
  background-color: #ffffff;
}
.logo {
  font-family: "Send Flowers", sans-serif;
  font-weight: bold;
  font-size: 40px;
  color: rgb(var(--v-theme-primary));
}
</style>
