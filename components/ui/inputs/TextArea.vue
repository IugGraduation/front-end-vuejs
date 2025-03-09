<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <textarea
        type="text"
        :placeholder="$t('description')"
        :value="modelValue"
        @input="validateInput"
        :class="[{ 'input-error': showError, 'input-focus': !showError }]"
        :disabled="disabled"
      ></textarea>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4.00659C18.175 4.0187 19.3529 4.11515 20.1213 4.88353C21 5.76221 21 7.17643 21 10.0049V16.0049C21 18.8333 21 20.2475 20.1213 21.1262C19.2426 22.0049 17.8284 22.0049 15 22.0049H9C6.17157 22.0049 4.75736 22.0049 3.87868 21.1262C3 20.2475 3 18.8333 3 16.0049V10.0049C3 7.17643 3 5.76221 3.87868 4.88353C4.64706 4.11515 5.82497 4.0187 8 4.00659"
          stroke="black"
          stroke-opacity="0.48"
        />
        <path
          d="M10.5 14.0049L17 14.0049"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M7 14.0049H7.5"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M7 10.5049H7.5"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M7 17.5049H7.5"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M10.5 10.5049H17"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M10.5 17.5049H17"
          stroke="black"
          stroke-opacity="0.48"
          stroke-linecap="round"
        />
        <path
          d="M8 3.50488C8 2.67646 8.67157 2.00488 9.5 2.00488H14.5C15.3284 2.00488 16 2.67646 16 3.50488V4.50488C16 5.33331 15.3284 6.00488 14.5 6.00488H9.5C8.67157 6.00488 8 5.33331 8 4.50488V3.50488Z"
          stroke="black"
          stroke-opacity="0.48"
        />
      </svg>
    </div>
    <span v-show="showError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n"; // Import useI18n
import { useRtl } from "../composables/useRtl"; // Import the composable

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

const fullNamePattern =
  /^(?=.*[A-Za-z\u0600-\u06FF])[A-Za-z\u0600-\u06FF0-9_\s]{3,}$/;
const { locale } = useI18n(); // Use i18n's locale property
const { isRtl } = useRtl();

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if the value matches the full name pattern
  if (!fullNamePattern.test(value)) {
    showError.value = true;
    errorMessage.value = "Please enter a valid Description";
    emit("validationError", errorMessage.value); // Emit error to parent
  } else {
    showError.value = false;
    errorMessage.value = "";
    emit("validationError", ""); // Emit error to parent
  }

  emit("update:modelValue", value);
};
</script>

<style scoped>
svg circle,
svg ellipse {
  stroke: rgb(var(--v-theme-blackTeriary));
}
</style>
