<script lang="ts" setup>
import PhoneNumber from "../components/ui/inputs/PhoneNumber.vue";
import Password from "../components/ui/inputs/Password.vue";
import PrimaryBtn from "../components/ui/buttons/PrimaryBtn.vue";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { navigateTo } from "nuxt/app";
import { useToast } from "vue-toast-notification";
import { useI18n } from "vue-i18n";

definePageMeta({
  layout: "blank",
});

const toast = useToast();
const { t } = useI18n();

const authStore = useAuthStore();
const phone = ref<string>("");
const password = ref<string>("");

const phoneError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

const handleValidationErrorPhone = (errorMessage: string) => {
  phoneError.value = errorMessage;
};
const handleValidationErrorPassword = (errorMessage: string) => {
  passwordError.value = errorMessage;
};

const handleLogin = async (): Promise<void> => {
  if (!phone.value || !password.value) {
    toast.error("Please fill in all required fields.");
    return;
  }

  if (phoneError.value || passwordError.value) {
    toast.error(`${phoneError.value} , ${passwordError.value}`);
    toast.error("Please fix the errors before logging in.");
    return;
  }

  try {
    toast.info("Loading...");

    const success: boolean = await authStore.login({
      mobile: phone.value,
      password: password.value,
      fcm_device: "android",
      fcm_token: "ewqewqe",
    });
    if (success) {
      navigateTo("/");
      toast.success("Login success.");
    } else {
      toast.error("Mobile Number or passwrod are wrong.");
    }
  } catch (error) {
    toast.error("An error occurred during login. Please try again.");
    console.error(error);
  }
};

const goToSignUp = () => {
  navigateTo("/signup");
};
</script>

<template>
  <div class="auth-container d-flex">
    <div class="left-side">
      <img src="../assets/images/login.png" alt="login" />
    </div>
    <div class="right-side">
      <form @submit.prevent="handleLogin">
        <h2>Login</h2>
        <PhoneNumber
          v-model="phone"
          @validationError="handleValidationErrorPhone"
        />
        <Password
          v-model="password"
          :label="$t('password')"
          @validationError="handleValidationErrorPassword"
        />
        <PrimaryBtn type="submit">login</PrimaryBtn>
      </form>
      <div class="sign-up" @click="goToSignUp">
        <p>Don’t have an account? <span color="primary">Sign up</span></p>
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

function definePageMeta(arg0: { layout: string; }) { throw new Error("Function
not implemented."); }
