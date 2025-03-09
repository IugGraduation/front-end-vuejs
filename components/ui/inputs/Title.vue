<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <input
        type="text"
        :placeholder="$t('title')"
        :value="modelValue"
        @input="validateInput"
        :class="[{ 'input-error': showError, 'input-focus': !showError }]"
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
          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
          stroke="black"
          stroke-opacity="0.48"
        />
        <path
          d="M8.5 15.5C8.5 15.7761 8.72386 16 9 16C9.27614 16 9.5 15.7761 9.5 15.5H8.5ZM11.6643 8.75249L11.9964 8.37874L11.9964 8.37874L11.6643 8.75249ZM11.5 10.425C11.5 10.7011 11.7239 10.925 12 10.925C12.2761 10.925 12.5 10.7011 12.5 10.425H11.5ZM11.7475 8.83575L12.1213 8.50362L12.1213 8.50362L11.7475 8.83575ZM6.33575 8.75249L6.00362 8.37874L6.00362 8.37874L6.33575 8.75249ZM5.5 10.425C5.5 10.7011 5.72386 10.925 6 10.925C6.27614 10.925 6.5 10.7011 6.5 10.425H5.5ZM6.25249 8.83575L5.87874 8.50362L5.87874 8.50362L6.25249 8.83575ZM7 15C6.72386 15 6.5 15.2239 6.5 15.5C6.5 15.7761 6.72386 16 7 16V15ZM11 16C11.2761 16 11.5 15.7761 11.5 15.5C11.5 15.2239 11.2761 15 11 15V16ZM7.925 9H9V8H7.925V9ZM9 9H10.075V8H9V9ZM9.5 15.5V8.5H8.5V15.5H9.5ZM10.075 9C10.523 9 10.8126 9.00091 11.0275 9.02772C11.2301 9.05299 11.2962 9.09428 11.3321 9.12625L11.9964 8.37874C11.7482 8.15821 11.4547 8.07326 11.1512 8.03541C10.8601 7.99909 10.497 8 10.075 8V9ZM12.5 10.425C12.5 10.003 12.5009 9.63993 12.4646 9.34876C12.4267 9.0453 12.3418 8.75179 12.1213 8.50362L11.3738 9.16787C11.4057 9.20384 11.447 9.26992 11.4723 9.47253C11.4991 9.68743 11.5 9.97697 11.5 10.425H12.5ZM11.3321 9.12624C11.3468 9.13929 11.3607 9.15319 11.3738 9.16788L12.1213 8.50362C12.0821 8.45958 12.0404 8.41788 11.9964 8.37874L11.3321 9.12624ZM7.925 8C7.50296 8 7.13993 7.99909 6.84876 8.03541C6.5453 8.07326 6.25179 8.15821 6.00362 8.37874L6.66787 9.12625C6.70384 9.09428 6.76992 9.05299 6.97253 9.02772C7.18743 9.00091 7.47697 9 7.925 9V8ZM6.5 10.425C6.5 9.97697 6.50091 9.68743 6.52772 9.47253C6.55299 9.26992 6.59428 9.20384 6.62625 9.16787L5.87874 8.50362C5.65821 8.75179 5.57326 9.0453 5.53541 9.34876C5.49909 9.63993 5.5 10.003 5.5 10.425H6.5ZM6.00362 8.37874C5.95958 8.41788 5.91788 8.45958 5.87874 8.50362L6.62625 9.16787C6.63929 9.15319 6.65319 9.13929 6.66787 9.12625L6.00362 8.37874ZM7 16H11V15H7V16Z"
          fill="black"
          fill-opacity="0.48"
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

const fullNamePattern = /^(?=.*[A-Za-z\u0600-\u06FF])[A-Za-z\u0600-\u06FF0-9_\s]{3,}$/;
const { locale } = useI18n(); // Use i18n's locale property
const { isRtl } = useRtl();

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if the value matches the full name pattern
  if (!fullNamePattern.test(value)) {
    showError.value = true;
    errorMessage.value = "Please enter a valid Title";
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
