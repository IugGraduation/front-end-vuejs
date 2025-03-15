<template>
  <v-container class="py-5 position-relative">
    <div class="half-circle"></div>

    <!-- Profile Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="4" class="text-center">
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="onImageChange"
          accept="image/*"
          :disabled="disabled"
        />
        <img
          :src="profileImage"
          class="rounded-circle mx-auto"
          height="200"
          width="200"
          cover
          style="object-fit: cover"
          :class="disabled ? 'cursor-default' : 'cursor-pointer'"
          @click="onImageClick"
        />
      </v-col>
      <v-col
        cols="12"
        md="8"
        class="d-flex flex-column justify-center text-center text-md-left"
      >
        <div class="name">
          <h3>{{ name }}</h3>
        </div>
        <div class="bio">
          <p>{{ bio || "No bio available." }}</p>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex flex-column justify-center mt-7">
        <div class="anala mx-auto d-flex justify-center align-center">
          <div class="analitc">
            <h5>{{ posts }}</h5>
            <p>Posts</p>
          </div>
          <div class="brack"></div>
          <div class="analitc">
            <h5>{{ offers }}</h5>
            <p>Offers</p>
          </div>
          <div class="brack"></div>
          <div class="analitc">
            <h5>{{ exchanges }}</h5>
            <p>Exchanges</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Tabs for Posts, Offers, and Settings -->
    <v-tabs v-model="tab" align-tabs="center" hide-slider>
      <v-tab value="information">Information</v-tab>
      <v-tab value="posts">Posts</v-tab>
      <v-tab value="settings">Settings</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="information">
        <v-card-title>My Information</v-card-title>
        <v-row class="mb-5">
          <v-col cols="12" md="4">
            <full-name v-model="name" :disabled="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <phone-number v-model="mobile" :disabled="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <pest-beter-spo v-model="place" :disabled="disabled" />
          </v-col>
          <v-col cols="12">
            <text-area
              v-model="bio"
              label="Bio"
              :disabled="disabled"
            ></text-area>
          </v-col>
          <v-col cols="12" v-if="!disabled">
            <primary-btn
              color="primary"
              class="mr-4 px-6 py-2 rounded-pill"
              @click="onSaveInformations"
              :disabled="isLoading"
            >
              {{ isLoading ? "Saving..." : "Save" }}
            </primary-btn>
            <out-line-btn @click="onCancelSave" class="px-6 py-2 rounded-pill">
              Cancel
            </out-line-btn>
          </v-col>
        </v-row>
      </v-tabs-window-item>
      <v-tabs-window-item value="posts">
        <MyPosts />
      </v-tabs-window-item>
      <v-tabs-window-item value="settings">
        <v-card-title class="mb-5">Settings</v-card-title>
        <settings />
      </v-tabs-window-item>
    </v-tabs-window>
    <div @click="onEditInformations" v-if="tab === 'information'">
      <svg
        v-if="disabled"
        width="24"
        height="24"
        class="v-icon__svg edit"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        color="black"
      >
        <path
          d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        ></path>
      </svg>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FullName from "../components/ui/inputs/FullName.vue";
import PestBeterSpo from "../components/ui/inputs/PestBeterSpo.vue";
import PhoneNumber from "../components/ui/inputs/PhoneNumber.vue";
import TextArea from "../components/ui/inputs/TextArea.vue";
import MyPosts from "../components/posts/MyPosts.vue";
import Settings from "../components/profile/Settings.vue";
import PrimaryBtn from "../components/ui/buttons/PrimaryBtn.vue";
import OutLineBtn from "@/components/ui/buttons/OutLineBtn.vue";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toast-notification";

const authStore = useAuthStore();
const fileInput = ref(null);
const toast = useToast();

// Profile Data
const profileImage = ref(
  "https://swapwise.shop/dashboard/app-assets/images/4367.jpg"
);
const imageFile = ref(null); // Store the file object here
const name = ref("user name");
const bio = ref(null);
const place = ref(null);
const mobile = ref("05999999999");
const posts = ref(0);
const offers = ref(0);
const exchanges = ref(0);
const disabled = ref(true);

// Tab Management
const tab = ref("posts");

// Edit and Save Functions
const onEditInformations = () => {
  disabled.value = !disabled.value;
};

const isLoading = ref(false);

const onSaveInformations = async () => {
  if (!disabled.value) {
    isLoading.value = true; // Start loading

    try {
      // Validate required fields
      if (!name.value || !mobile.value) {
        toast.error("Name and mobile number are required.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("bio", bio.value);
      formData.append("place", place.value);
      formData.append("mobile", mobile.value);

      // Append the image file if it exists
      if (imageFile.value) {
        formData.append("image", imageFile.value);
      }

      const response = await authStore.updateProfile(formData);

      if (response.success) {
        toast.success("Profile updated successfully!");
        disabled.value = true; // Disable editing after saving
      } else {
        toast.error(`Failed to update profile: ${response.message}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      isLoading.value = false; // Stop loading
    }
  }
};

const onCancelSave = () => {
  disabled.value = true;
};

// Fetch User Profile
const fetchUserProfile = async () => {
  const userUuid = authStore.user.uuid;
  const response = await authStore.fetchProfile(userUuid);

  if (response.success) {
    const profileData = response.data; // Handle empty data array
    name.value = profileData.name || "User";
    bio.value = profileData.bio || "I am new User";
    place.value = profileData.place || "Gaza";
    mobile.value = profileData.mobile || "059*********";
    posts.value = profileData.posts || 0;
    offers.value = profileData.offers || 0;
    profileImage.value =
      profileData.image ||
      "https://swapwise.shop/dashboard/app-assets/images/4367.jpg";
  } else {
    console.error("Failed to fetch profile:", response.message);
  }
};

// Image Change Handling
const onImageClick = () => {
  fileInput.value.click();
};

const onImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    // Read the file and set it as the profile image
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // Set the image URL for preview
    };
    reader.readAsDataURL(file);

    // Store the file object for FormData
    imageFile.value = file;
  }
};

// Fetch profile data on component mount
onMounted(() => {
  fetchUserProfile();
});
</script>
<style scoped>
.v-tabs {
  margin-top: 20px;
}
.half-circle {
  z-index: -1;
  width: 100vw;
  height: 250px;
  background: linear-gradient(45deg, #8e02ff, #0065ff);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%);
}
/* Media query for medium screens (md) */
@media (max-width: 960px) {
  .half-circle {
    width: 100%; /* Adjust width for medium screens */
    height: 325px; /* Reduce height for medium screens */
  }
}
.image {
  background: white;
  min-height: 200px;
}
.name {
  color: white;
  font-size: 24px;
}
@media (min-width: 400) {
  .name {
    background: red;
  }
}
.bio p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}
.anala {
  gap: 25px;
  align-items: center;
}
.anala .analitc {
  text-align: center;
}
.anala .analitc h5 {
  text-align: center;
}
.anala .analitc p {
  text-align: center;
}
.brack {
  width: 3px;
  height: 25px;
  border-radius: 2px;
  background: rgba(var(--v-theme-blackTeriary), 0.48);
}

.edit {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 7px;
}
.edit svg {
  color: rgb(var(--v-theme-primary));
}
.v-tab {
  background-color: white; /* Light blue background */
  color: rgba(var(--v-theme-primary)); /* Dark blue text */
  padding: 10px;
  border-radius: 25px;
  margin-right: 5px;
  margin-right: 5px;
}
.v-tab.v-tab.v-btn {
  border-radius: 30px;
}
.v-tab:hover {
  background: white;
}

.v-tabs .v-tab--selected {
  background-color: rgba(
    var(--v-theme-primary)
  ); /* Dark blue for selected tab */
  color: white;
}
</style>
