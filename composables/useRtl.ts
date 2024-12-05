// composables/useRtl.ts
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useRtl = () => {
  const { locale } = useI18n();

  // RTL languages list
  const rtlLanguages = ["ar", "he", "fa", "ur", "sy"];

  // Computed property to check if the current language is RTL
  const isRtl = computed(() => rtlLanguages.includes(locale.value));

  return {
    isRtl,
  };
};
