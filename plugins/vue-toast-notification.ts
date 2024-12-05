import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css"; // You can choose a different theme

export default defineNuxtPlugin((nuxtApp) => {
  // Install Vue Toast Notification globally
  nuxtApp.vueApp.use(VueToast, {
    position: "bottom-right", // or 'top-left', 'bottom-left', 'bottom-right'
    duration: 3000, // duration in milliseconds
    dismissible: true, // whether the toast can be dismissed
  });
});
