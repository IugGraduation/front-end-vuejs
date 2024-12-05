<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <input
        type="text"
        :placeholder="$t('phoneNumber')"
        :value="modelValue"
        @input="validateInput"
        :class="{ 'input-error': showError, 'input-focus': !showError }"
      />
      <svg
        class="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <span v-if="showError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

// Props definition
const props = defineProps<{
  modelValue: string;
}>();

// Emits definition
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "validationError", errorMessage: string): void;
}>();

const showError = ref(false);
const errorMessage = ref("");

// Regular expression for phone number validation
const phoneNumberPattern = /^(?:\+)?(972|970)(59|56)\d{7}$/;

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if the value matches the phone number pattern
  if (!phoneNumberPattern.test(value)) {
    showError.value = true;
    errorMessage.value =
      "Please enter a valid phone number, including the country code (+972 or +970)";
    emit("validationError", errorMessage.value);
  } else {
    showError.value = false;
    errorMessage.value = "";
    emit("validationError", "");
  }

  emit("update:modelValue", value);
};

// Use `useI18n` to determine the current locale
const { locale } = useI18n();

// Check if the current direction is RTL
const isRtl = computed(() => {
  const rtlLanguages = ["ar", "he", "fa", "ur", "sy"];
  return rtlLanguages.includes(locale.value);
});
</script>
<style scoped>
svg path {
  stroke: rgb(var(--v-theme-blackTeriary));
}
</style>
