<template>
  <div class="input-wrap">
    <div class="input-container" :class="[{ rtl: isRtl, 'mb-5': !showError }]">
      <textarea
        type="text"
        :placeholder="$t('description')"
        :value="modelValue"
        @input="validateInput"
        :class="[{ 'input-error': showError, 'input-focus': !showError }]"
      ></textarea>
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
}>();

// Emits definition
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "validationError", errorMessage: string): void;
}>();

const showError = ref(false);
const errorMessage = ref("");

const fullNamePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
const { locale } = useI18n(); // Use i18n's locale property
const { isRtl } = useRtl();

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  // Check if the value matches the full name pattern
  if (!fullNamePattern.test(value)) {
    showError.value = true;
    errorMessage.value = "Please enter a valid full name";
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
