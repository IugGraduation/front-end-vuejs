<template>
  <!-- layout
  <v-btn @click="changeLanguage('ar')">Ar</v-btn>
  <v-btn @click="changeLanguage('en')">En</v-btn>
  <v-btn @click="toggleTheme">dark</v-btn>
  <v-btn @click="logout">logout</v-btn>
  <br />
  {{ $t("welcome") }} -->
  <v-layout class="d-block">
    <mainNav />
    <v-main style="min-height: calc(100vh - 60px)">
      <NuxtPage />
    </v-main>
    <mainFooter />
  </v-layout>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { onBeforeMount } from "vue";
import { useAuthStore } from "../stores/auth";
import mainNav from "../components/ui/nav/index.vue";
import mainFooter from "@/components/ui/footer/index.vue";

import { onMounted } from "vue";
import { usePostStore } from "@/stores/posts";
const postStore = usePostStore();
onMounted(async () => {
  await postStore.fetchHomeData();
});
// Set up vuetify theme and i18n
const theme = useTheme();
const i18n = useI18n();
const authStore = useAuthStore();

// Component import
defineProps({
  components: { mainNav },
});

// Language and Theme Change Functions
const changeLanguage = (language) => {
  i18n.locale.value = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  localStorage.setItem("lang", language);
};

const toggleTheme = () => {
  const newTheme = theme.global.name.value === "light" ? "dark" : "light";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme);
};

// Logout Function
const logout = () => {
  authStore.logout();
};

// On page mount, set saved theme and language
onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  theme.global.name.value = savedTheme;

  const savedLang = localStorage.getItem("lang") || "en";
  changeLanguage(savedLang);
});

// Log user authentication status
if (authStore.isAuthenticated) {
  console.log("User is logged in:", authStore.user);
} else {
  console.log("User is not logged in");
}
</script>
