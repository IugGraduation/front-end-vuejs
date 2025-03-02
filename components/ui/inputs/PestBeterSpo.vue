<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <input
        type="text"
        :placeholder="$t('pestBarterSpo')"
        :value="modelValue"
        @input="validateInput"
        :class="{ 'input-error': showError, 'input-focus': !showError }"
        class="cutome-input"
        :disabled="disabled"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
          stroke="black"
          stroke-opacity="0.48"
        />
        <path
          d="M11.0429 11.5215L10.7403 11.9196H10.7403L11.0429 11.5215ZM12 7.71604L11.6479 8.07107C11.8428 8.26437 12.1572 8.26437 12.3521 8.07107L12 7.71604ZM12.9571 11.5215L13.2597 11.9196L12.9571 11.5215ZM12 12L12 11.5H12L12 12ZM11.3454 11.1234C10.9205 10.8006 10.4428 10.3904 10.076 9.95109C9.69751 9.49785 9.5 9.08814 9.5 8.75734H8.5C8.5 9.44612 8.88492 10.0849 9.30838 10.592C9.74347 11.1131 10.2872 11.5752 10.7403 11.9196L11.3454 11.1234ZM9.5 8.75734C9.5 8.05367 9.82208 7.67906 10.1644 7.55477C10.5165 7.42692 11.0705 7.49847 11.6479 8.07107L12.3521 7.36102C11.5795 6.59488 10.6335 6.32058 9.82313 6.61481C9.00294 6.9126 8.5 7.728 8.5 8.75734H9.5ZM13.2597 11.9196C13.7128 11.5752 14.2565 11.1131 14.6916 10.592C15.1151 10.0849 15.5 9.44612 15.5 8.75733H14.5C14.5 9.08815 14.3025 9.49786 13.924 9.9511C13.5572 10.3904 13.0795 10.8006 12.6546 11.1234L13.2597 11.9196ZM15.5 8.75733C15.5 7.72799 14.9971 6.9126 14.1769 6.61481C13.3665 6.32058 12.4205 6.59488 11.6479 7.36102L12.3521 8.07107C12.9295 7.49847 13.4835 7.42692 13.8356 7.55477C14.1779 7.67906 14.5 8.05367 14.5 8.75733H15.5ZM10.7403 11.9196C11.1239 12.2111 11.4725 12.5 12 12.5L12 11.5C11.8725 11.5 11.8014 11.4699 11.3454 11.1234L10.7403 11.9196ZM12.6546 11.1234C12.1986 11.4699 12.1275 11.5 12 11.5L12 12.5C12.5275 12.5 12.8761 12.2111 13.2597 11.9196L12.6546 11.1234Z"
          fill="black"
          fill-opacity="0.48"
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
defineProps<{
  modelValue: string;
  disabled: Boolean;
}>();

// Emits definition
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "validationError", errorMessage: string): void;
}>();

const showError = ref(false);
const errorMessage = ref("");

// Validation: Ensure the input is at least 7 characters long

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if the value matches the validation pattern
  if (value.length < 3) {
    showError.value = true;
    errorMessage.value = "Best places should be at least 3 characters long";
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
svg path:first-child {
  stroke: rgb(var(--v-theme-blackTeriary));
}
svg path:last-child {
  fill: rgb(var(--v-theme-blackTeriary));
}
</style>
