<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <input
        :type="showPassword ? 'text' : 'password'"
        :placeholder="label"
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
          d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
          stroke="black"
          stroke-opacity="0.48"
          stroke-width="1"
        />
        <path
          d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
          stroke="black"
          stroke-opacity="0.48"
          stroke-width="1"
          stroke-linecap="round"
        />
      </svg>
      <svg
        class="showpassword"
        @click="togglePasswordVisibility"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
          stroke="black"
          stroke-opacity="0.38"
          stroke-width="1"
        />
        <path
          d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
          stroke="black"
          stroke-opacity="0.38"
          stroke-width="1"
        />
      </svg>
    </div>
    <span v-if="showError" class="error-message" aria-live="assertive">{{
      errorMessage
    }}</span>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

// Props definition
defineProps<{
  modelValue: string;
  label?: string;
  isConfirmPassword?: boolean;
  password?: string; // Receive the main password value from parent if isConfirmPassword is true
  disabled?: Boolean;

}>();

// Emits definition
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "validationError", errorMessage: string): void;
}>();

const showError = ref(false);
const errorMessage = ref("");
const showPassword = ref(false); // Toggle password visibility

const { locale } = useI18n();

// Password validation: Ensure it is at least 7 characters long
const passwordPattern = /^.{8,}$/;

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if it's a confirm password field
  // if (props.isConfirmPassword) {
  // if (value !== props.password) {
  //   showError.value = true;
  //   errorMessage.value = "Passwords do not match";
  //   emit("validationError", errorMessage.value); // Emit error to parent
  // } else {
  //   showError.value = false;
  //   errorMessage.value = "";
  //   emit("validationError", ""); // Clear error in parent
  // }
  // } else {
  // Check for password length validation
  if (!passwordPattern.test(value)) {
    showError.value = true;
    errorMessage.value = "Password must be at least 8 characters long";
    emit("validationError", errorMessage.value); // Emit error to parent
  } else {
    showError.value = false;
    errorMessage.value = "";
    emit("validationError", ""); // Clear error in parent
  }
  // }

  emit("update:modelValue", value);
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

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
svg.showpassword {
  left: auto;
  right: 12px;
  cursor: pointer;
}
</style>
