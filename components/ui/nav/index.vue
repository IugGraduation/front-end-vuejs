<template>
  <v-app-bar app dense :elevation="2">
    <!-- Logo on the left -->
    <NuxtLink to="/">
      <div class="logo px-4">SwapWise</div>
    </NuxtLink>

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
      <!-- <v-btn text class="mx-2" @click="goToHome" v-if="!isRtl">Home</v-btn>
      <v-btn text class="mx-2" @click="goToProfile" v-if="!isRtl"
        >Profile</v-btn
      >
      <v-btn text class="mx-2" @click="goToHome" v-if="isRtl"
        >الصفحة الرئيسية</v-btn
      >
      <v-btn text class="mx-2" @click="goToProfile" v-if="isRtl"
        >الملف الشخصي</v-btn
      > -->
    </div>

    <!-- Spacer to push the items to the right side -->
    <v-spacer></v-spacer>
    <NuxtLink :to="`/search`">
      <v-btn>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1 3.25C7.26748 3.25 3.34998 7.16751 3.34998 12C3.34998 16.8325 7.26748 20.75 12.1 20.75C16.9325 20.75 20.85 16.8325 20.85 12C20.85 7.16751 16.9325 3.25 12.1 3.25ZM1.84998 12C1.84998 6.33908 6.43906 1.75 12.1 1.75C17.7609 1.75 22.35 6.33908 22.35 12C22.35 14.5605 21.4111 16.9017 19.8588 18.6982L23.1303 21.9697C23.4232 22.2626 23.4232 22.7374 23.1303 23.0303C22.8374 23.3232 22.3625 23.3232 22.0696 23.0303L18.7982 19.7589C17.0017 21.3111 14.6605 22.25 12.1 22.25C6.43906 22.25 1.84998 17.6609 1.84998 12Z"
            fill="black"
            fill-opacity="0.48"
          />
        </svg>
      </v-btn>
    </NuxtLink>
    <!-- User, Dark/Light, and Language Toggle -->
    <div class="d-flex align-center gap-3">
      <div class="d-flex align-center gap-3">
        <!-- Username Button with Dropdown -->
        <v-menu
          v-if="username"
          :model-value="menu"
          @update:model-value="menu = $event"
          offset-y
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              style="font-size: 16px; font-weight: bold"
              class="d-flex align-center"
            >
              <v-avatar size="32" color="red">
                <span>{{ username.slice(0, 2).toUpperCase() }}</span>
              </v-avatar>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16"
                height="16"
                class="ml-2"
              >
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
        <svg
          v-if="isDark"
          fill="white"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13"
          ></path>
        </svg>
        <svg
          v-if="!isDark"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
          ></path>
        </svg>
      </v-btn>

      <!-- Language Toggle -->
      <v-btn
        text
        @click="toggleLanguage"
        class="language-btn rounded"
        style="font-size: 14px; font-weight: bold"
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
  if (newTheme === "light") {
    isDark.value = false;
  } else {
    isDark.value = true;
  }

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
.v-app-bar[data-theme="dark"] svg {
}
.v-app-bar[data-theme="light"] {
  background-color: #ffffff;
}

</style>
