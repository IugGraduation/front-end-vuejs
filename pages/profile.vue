<template>
  <v-container class="py-5 position-relative">
    <div class="half-circle"></div>

    <!-- Profile Section -->
    <v-row justify="center " class="mb-8">
      <v-col cols="12" md="4">
        <v-img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          class="rounded-circle mx-auto image"
          height="200px"
          width="200px"
          contain
        ></v-img>
      </v-col>
      <v-col cols="12" md="8" class="d-flex flex-column justify-center">
        <div class="name">
          <h3>{{ name }}</h3>
        </div>
        <div class="bio">
          <p>
            {{ bio }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex flex-column justify-center mt-7">
        <div class="anala mx-auto d-flex justify-center align-center">
          <div class="analitc">
            <h5>93</h5>
            <p>posts</p>
          </div>
          <div class="brack"></div>
          <div class="analitc">
            <h5>22</h5>
            <p>Offers</p>
          </div>
          <div class="brack"></div>

          <div class="analitc">
            <h5>5</h5>
            <p>Exchanges</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Tabs for Posts, Offers, and Settings -->
    <v-tabs v-model="tab" align-tabs="center" hide-slider>
      <v-tab value="information">information</v-tab>
      <v-tab value="posts">Posts</v-tab>
      <v-tab value="settings">Settings</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="information">
        <v-card-title>My information</v-card-title>
        <v-row class="mb-5">
          <v-col cols="12" md="4">
            <full-name v-model="name" :disabled="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <phone-number v-model="phome" :disabled="disabled" />
          </v-col>
          <v-col cols="12" md="4">
            <pest-beter-spo v-model="favoritePlace" :disabled="disabled" />
          </v-col>
          <v-col cols="12">
            <TextArea v-model="bio" label="Bio" :disabled="disabled"></TextArea>
          </v-col>
          <v-col cols="12" v-if="!disabled">
            <primary-btn
              color="primary"
              class="mr-4 px-6 py-2 rounded-pill"
              @click="onSaveInformations"
            >
              save</primary-btn
            >
            <OutLineBtn @click="onCancelSave" class="px-6 py-2 rounded-pill"> Cancel</OutLineBtn>
          </v-col>
        </v-row>
      </v-tabs-window-item>
      <v-tabs-window-item value="posts">
        <MyPosts />
      </v-tabs-window-item>

      <v-tabs-window-item value="settings">
        <v-card-title class="mb-5">Settings</v-card-title>
        <Settings />
      </v-tabs-window-item>
    </v-tabs-window>
    <div class="edit" @click="onEditInformations" v-if="tab == 'information'">
      <svg
        width="24"
        height="24"
        class="v-icon__svg"
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
import { ref } from "vue";
import FullName from "../components/ui/inputs/FullName.vue";
import PestBeterSpo from "../components/ui/inputs/PestBeterSpo.vue";
import PhoneNumber from "../components/ui/inputs/PhoneNumber.vue";
import TextArea from "../components/ui/inputs/TextArea.vue";
import MyPosts from "../components/posts/MyPosts.vue";
import Settings from "../components/profile/Settings.vue";
import PrimaryBtn from "../components/ui/buttons/PrimaryBtn.vue";
import OutLineBtn from "@/components/ui/buttons/OutLineBtn.vue";
({
  layout: "default",
  // Remove middleware temporarily to debug
});

// Profile Data
const profileImage = "/path/to/profile-image.jpg"; // Replace with actual image path
const name = ref("John Doe");
const bio = ref(
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora  voluptatem sed aspernatur unde dolorem sunt, ea quae commodi ab laudantium provident, molestias similique odit quasi doloribus eaque perferendis? Amet.`
);
const favoritePlace = ref("Paris");
const phome = ref("972599934662");
const disabled = ref(true);

// Posts and Offers Data
const posts = ref([
  { id: 1, title: "My First Post", content: "This is my first post content." },
  {
    id: 2,
    title: "My Second Post",
    content: "This is my second post content.",
  },
]);

const offers = ref([
  { id: 1, title: "Special Discount", details: "Get 50% off on all items." },
  {
    id: 2,
    title: "Free Shipping",
    details: "Free shipping on all orders above $100.",
  },
]);

// Tab Management
const tab = ref("posts");

// Save Settings function
const saveSettings = () => {
  alert("Settings saved!");
};
const onEditInformations = () => {
  disabled.value = !disabled.value;
};
const onSaveInformations = () => {
  if (!disabled.value) {
    disabled.value = !disabled.value;
  }
};
const onCancelSave = () => {
  disabled.value = true;
};
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
