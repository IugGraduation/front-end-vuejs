<script lang="ts" setup>
import FullName from "../components/ui/inputs/FullName.vue";
import PhoneNumber from "../components/ui/inputs/PhoneNumber.vue";
import Password from "../components/ui/inputs/Password.vue";
import PestBeterSpo from "../components/ui/inputs/PestBeterSpo.vue";
import PrimaryBtn from "../components/ui/buttons/PrimaryBtn.vue";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { navigateTo } from "nuxt/app";
import { useToast } from "vue-toast-notification";

definePageMeta({
  layout: "blank",
});

const toast = useToast();

const authStore = useAuthStore();
const fullName = ref<string>("");
const phone = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const pestBarterSpo = ref<string>("");

const fullNameError = ref<string | null>(null);
const phoneError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const pestBarterSpoError = ref<string | null>(null);

// Handle validation error emitted from child component
const handleValidationErrorFullNmae = (errorMessage: string) => {
  fullNameError.value = errorMessage;
};
const handleValidationErrorPhoneNumber = (errorMessage: string) => {
  phoneError.value = errorMessage;
};
const handleValidationErrorPassword = (errorMessage: string) => {
  passwordError.value = errorMessage;
};
const handleValidationErrorPestBarterSpoError = (errorMessage: string) => {
  pestBarterSpoError.value = errorMessage;
};
const handleSignUp = async (): Promise<void> => {
  // التحقق من الحقول الفارغة
  if (
    !fullName.value ||
    !phone.value ||
    !password.value ||
    !confirmPassword.value ||
    !pestBarterSpo.value
  ) {
    toast.error("Please fill in all required fields.");
    return;
  }

  // التحقق من الأخطاء
  if (
    fullNameError.value ||
    phoneError.value ||
    passwordError.value ||
    pestBarterSpoError.value
  ) {
    toast.error("Please fix the errors before signing up.");
    return;
  }

  // التحقق من تطابق كلمة المرور مع التأكيد
  if (password.value !== confirmPassword.value) {
    toast.error("Passwords do not match.");
    passwordError.value = "Passwords do not match.";
    return;
  }
  toast.info("Loading...");

  try {
    // تنفيذ عملية التسجيل
    const success = await authStore.register({
      name: fullName.value,
      mobile: phone.value,
      password: password.value,
      confirm_password: confirmPassword.value,
      pestBarterSpo: pestBarterSpo.value,
    });
    if (success) {
      toast.success("Sign up success.");
      navigateTo("/verify_code");
    } else {
      toast.error("Invalid SignUp credentials. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred during SignUp. Please try again.");
    console.error(error);
  }
};

const goToLogin = () => {
  navigateTo("/login");
};
</script>

<template>
  <div class="auth-container d-flex">
    <div class="left-side">
      <img src="../assets/images/signup.png" alt="SignUp" />
    </div>
    <div class="right-side">
      <form @submit.prevent="handleSignUp">
        <h2>Sign Up</h2>
        <FullName
          v-model="fullName"
          @validationError="handleValidationErrorFullNmae"
        />
        <PhoneNumber
          v-model="phone"
          @validationError="handleValidationErrorPhoneNumber"
        />
        <Password
          v-model="password"
          :label="$t('password')"
          @validationError="handleValidationErrorPassword"
        />
        <Password
          v-model="confirmPassword"
          :label="$t('confirmPassword')"
          :password="password"
          :isConfirmPassword="true"
          @validationError="handleConfirmPasswordError"
        />
        <PestBeterSpo
          v-model="pestBarterSpo"
          @validationError="handleValidationErrorPestBarterSpoError"
        />
        <PrimaryBtn type="submit">Sign Up</PrimaryBtn>
      </form>
      <div class="sign-up" @click="goToLogin">
        <p>I already have an account <span color="primary">Login</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 80px;
}

.left-side,
.right-side {
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}
.left-side img {
  width: 400px;
}
.right-side h2 {
  margin-bottom: 46px;
  font-size: 28px;
}
.right-side button {
  padding: 18px 0;
  text-align: center;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
  border-radius: 16px;
}
form {
  display: flex;
  flex-direction: column;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

img {
  max-width: 100%;
  height: auto;
}
.sign-up {
  font-size: 14px;
  color: rgba(var(--v-theme-blackTeriary));
  text-align: center;
  margin-top: 46px;
}
.sign-up span {
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
}
</style>
