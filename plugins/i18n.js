import { createI18n } from "vue-i18n";
import en from "../assets/i18n/en.js";
import ar from "../assets/i18n/ar.js";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: "en", // Default locale
    messages: {
      en,
      ar,
    },
  });

  // Use i18n in the app
  nuxtApp.vueApp.use(i18n);
});
