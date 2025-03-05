<template>
  <v-container class="reset-password">
    <v-card class="pa-6 rounded-xl" width="500" elevation="1">
      <v-card-title class="text-h5 text-center mb-4">
        {{ $t("reset_password.title") }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-6">
        {{ $t("reset_password.subtitle") }}
      </v-card-subtitle>

      <v-form ref="form" @submit.prevent="submitForm">
        <Password
          v-model="currentPassword"
          :label="$t('reset_password.current_password')"
          :rules="[requiredRule]"
        />

        <Password
          v-model="newPassword"
          :label="$t('reset_password.new_password')"
          :rules="passwordRules"
          :showStrength="true"
        />

        <Password
          v-model="confirmPassword"
          :label="$t('reset_password.confirm_new_password')"
          :rules="[confirmPasswordRule]"
        />

        <PrimaryBtn class="mt-4 py-4 px-7 w-100">
          {{ $t("reset_password.submit") }}
        </PrimaryBtn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Password from "@/components/ui/inputs/Password.vue";
import PrimaryBtn from "@/components/ui/buttons/PrimaryBtn.vue";
const { t } = useI18n();
import { useToast } from "vue-toast-notification";

const toast = useToast();
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const form = ref();

// const requiredRule = (v: string) => !!v || t("reset_password.required");

// const passwordRules = [
//   (v: string) => !!v || t("reset_password.required"),
//   (v: string) => (v && v.length >= 6) || t("reset_password.min_length"),
//   (v: string) => /[0-9]/.test(v) || t("reset_password.number_required"),
//   (v: string) =>
//     /[!@#$%^&*]/.test(v) || t("reset_password.special_character_required"),
// ];

// const confirmPasswordRule = (v: string) =>
//   v === newPassword.value || t("reset_password.passwords_do_not_match");

const submitForm = () => {
  toast.info("Loading...");
  if (form.value?.validate()) {
    // alert(t("reset_password.success"));
    // Here you can call your API
  }
};
</script>

<style scoped>
.reset-password {
  display: flex;
  justify-content: center;
  margin-top: 45px;
}
</style>
