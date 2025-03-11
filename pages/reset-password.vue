<template>
  <v-container class="reset-password">
    <v-card class="pa-6 rounded-xl" width="500" elevation="1">
      <v-card-title class="text-h5 text-center mb-4">
        {{ $t("reset_password.title") }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-6">
        {{ $t("reset_password.subtitle") }}
      </v-card-subtitle>

      <v-form ref="form">
        <Password
          v-model="currentPassword"
          :label="$t('reset_password.current_password')"
          :rules="[requiredRule]"
          :disabled="isLoading"
        />

        <Password
          v-model="newPassword"
          :label="$t('reset_password.new_password')"
          :rules="passwordRules"
          :showStrength="true"
          :disabled="isLoading"
        />

        <Password
          v-model="confirmPassword"
          :label="$t('reset_password.confirm_new_password')"
          :rules="[confirmPasswordRule]"
          :disabled="isLoading"
        />

        <div class="d-flex justify-space-between ga-4 mt-4">
          <PrimaryBtn
            class="py-4 px-7 w-100"
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            @click="submitForm"
          >
            {{ $t("reset_password.submit") }}
          </PrimaryBtn>
          <OutLineBtn
            class="py-4 px-7 w-100"
            @click="onCancel"
            :disabled="isLoading"
          >
            {{ $t("reset_password.cancel") }}
          </OutLineBtn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "@/stores/auth"; // Import the Pinia store
import Password from "@/components/ui/inputs/Password.vue";
import PrimaryBtn from "@/components/ui/buttons/PrimaryBtn.vue";
import OutLineBtn from "@/components/ui/buttons/OutLineBtn.vue";
import { useRouter } from "vue-router"; // Use vue-router for navigation

const { t } = useI18n();
const toast = useToast();
const router = useRouter(); // Initialize the router
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const form = ref();
const isLoading = ref(false); // Loading state for form submission

const authStore = useAuthStore();

// Password validation rules
const requiredRule = (value: string) => !!value || t("validation.required");
const passwordRules = [
  requiredRule,
  (value: string) => value.length >= 8 || t("validation.password_min_length"),
];
const confirmPasswordRule = (value: string) =>
  value === newPassword.value || t("validation.password_mismatch");

// Form submission handler
const submitForm = async () => {
  if (!form.value?.validate()) return; // Exit if form is invalid

  isLoading.value = true;
  toast.info(t("reset_password.loading_message"));

  try {
    const payload = {
      current_password: currentPassword.value,
      password: newPassword.value,
      confirm_password: confirmPassword.value,
    };

    const result = await authStore.updatePassword(payload);

    if (result.success) {
      toast.success(result.message);
      // Reset form or redirect user
      form.value.reset();
      router.push("/profile"); // Use router.push for navigation without refresh
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error(t("reset_password.error_message"));
  } finally {
    isLoading.value = false;
  }
};

// Cancel button handler
const onCancel = () => {
  router.go(-1); // Navigate back without refreshing the page
};
</script>
<style scoped>
.reset-password {
  display: flex;
  justify-content: center;
  margin-top: 45px;
}

.v-card {
  max-width: 100%;
  width: 500px;
}

.v-form {
  width: 100%;
}
</style>
