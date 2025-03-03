<template>
  <v-container class="otp-container text-center">
    <!-- OTP Image -->
    <v-img
      src="../assets/images/otp.png"
      class="otp-image mx-auto mb-4"
      width="300"
      alt="OTP Illustration"
    />

    <!-- OTP Title -->
    <h1 class="otp-title mb-4">Enter OTP</h1>

    <!-- OTP Form -->
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="submitOtp">
          <!-- OTP Input -->
          <v-otp-input
            v-model="otp"
            :length="4"
            variant="outlined"
            label="Enter OTP"
            required
            class="otp"
            bg-color="success"
          />

          <!-- Submit Button -->
          <primary-btn
            class="px-7 py-4 mt-4"
            :disabled="otp.length !== 4"
            type="submit"
          >
            Confirm
          </primary-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import PrimaryBtn from "@/components/ui/buttons/PrimaryBtn.vue";
import { useAuthStore } from "../stores/auth";
definePageMeta({
  layout: "blank",
});

const toast = useToast();
const authStore = useAuthStore();

const otp = ref(""); // Store the OTP entered by the user
const snackbar = ref(false); // Control Snackbar visibility
const mobileNumber = ref<string>();

if (authStore.mobile) {
  mobileNumber.value = authStore.mobile;
}
// Submit OTP
const submitOtp = async () => {
  try {
    toast.info("Loading...");

    const success = await authStore.verifyCode({
      mobile: mobileNumber.value,
      code: otp.value,
      fcm_token: "966-123421242",
      fcm_device: "android",
    });
    console.log("success in verify", success);

    if (success) {
      toast.success("Redirecting...");
      navigateTo("/");
      console.log("OTP submitted:", otp.value);
    } else {
      toast.error("Verify Code Is wrong");
    }
  } catch (error) {
    console.error("Error submitting OTP:", error);
    toast.error("An error occurred. Please try again later.");
  } finally {
    snackbar.value = true;
  }
};
</script>

<style scoped>
.otp-container {
  max-width: 600px;
  margin: 0 auto;
}

.otp-image {
  max-width: 100%;
  height: auto;
}

.otp-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--v-theme-primary);
}

.v-otp-input.otp input {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  border: 1px solid rgb(var(--v-theme-blackTeriary));
  outline: 1px solid rgb(var(--v-theme-secondary));
  background-color: rgb(var(--v-theme-white)) !important;
  transition: border-color 0.3s ease, outline 0.3s ease;
}

.v-otp-input.otp input:focus {
  border-color: rgb(var(--v-theme-secondary));
  outline-color: rgb(var(--v-theme-secondary));
}

.primary-btn {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}
</style>
