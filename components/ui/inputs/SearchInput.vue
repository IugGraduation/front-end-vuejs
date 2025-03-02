<template>
  <v-container>
    <div class="input-wrap">
      <div
        class="input-container"
        :class="[{ rtl: isRtl, 'mb-5': !showError }]"
      >
        <input
          type="text"
          :placeholder="$t('search')"
          :value="modelValue"
          @input="validateInput"
          :class="[{ 'input-error': showError, 'input-focus': !showError }]"
          class="cutome-input"
          :disabled="disabled"
        />
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1 3.25C7.26748 3.25 3.34998 7.16751 3.34998 12C3.34998 16.8325 7.26748 20.75 12.1 20.75C16.9325 20.75 20.85 16.8325 20.85 12C20.85 7.16751 16.9325 3.25 12.1 3.25ZM1.84998 12C1.84998 6.33908 6.43906 1.75 12.1 1.75C17.7609 1.75 22.35 6.33908 22.35 12C22.35 14.5605 21.4111 16.9017 19.8588 18.6982L23.1303 21.9697C23.4232 22.2626 23.4232 22.7374 23.1303 23.0303C22.8374 23.3232 22.3625 23.3232 22.0696 23.0303L18.7982 19.7589C17.0017 21.3111 14.6605 22.25 12.1 22.25C6.43906 22.25 1.84998 17.6609 1.84998 12Z"
            fill="black"
            fill-opacity="0.48"
          />
        </svg>
      </div>
      <span v-show="showError" class="error-message">{{ errorMessage }}</span>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
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

const { isRtl } = useRtl();

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value || "";

  emit("update:modelValue", value);
};
</script>

<style scoped>
svg circle,
svg ellipse {
  stroke: rgb(var(--v-theme-blackTeriary));
}
</style>
