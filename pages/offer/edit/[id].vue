<template>
  <v-container>
    <h1>Update Offer</h1>

    <!-- Drag and Drop Area -->
    <div
      class="drag-drop-area py-10 mt-5"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <p v-if="!image">Drag and drop an image here or click to upload</p>
      <div v-if="image" class="image-preview">
        <div class="image-container">
          <img :src="image.url" alt="Uploaded Image" />
          <button @click="removeImage($event)" class="remove-btn">x</button>
        </div>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      class="hidden-input"
      accept="image/*"
      required
      @change="handleFileChange"
    />

    <!-- Form Inputs -->
    <v-form class="mt-5">
      <Title v-model="title" @validationError="handleTitleError" />
      <TextArea
        v-model="description"
        @validationError="handleDescriptionError"
      />
      <PestBeterSpo v-model="place" @validationError="handlePlaceError" />
      <v-select
        :items="categories"
        v-model="selectedCategory"
        label="Categories"
        chips
        multiple
        variant="outlined"
        selection-type="checkbox"
        item-title="name"
        item-value="uuid"
      ></v-select>

      <div class="w-full text-center">
        <PrimaryBtn class="px-7 py-3 mx-3" @click="updateOffer"
          >Update Offer</PrimaryBtn
        >
        <RedBtn class="px-7 py-3 mx-3" @click="onDeleteOffer">
          Delete Offer
        </RedBtn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import { usePostStore } from "@/stores/posts"; // Import the offers store
import { useOfferStore } from "@/stores/offers"; // Import the offers store
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import RedBtn from "@/components/ui/buttons/RedBtn.vue";

import Title from "../../components/ui/inputs/Title.vue";
import TextArea from "../../components/ui/inputs/TextArea.vue";
import PestBeterSpo from "../../components/ui/inputs/PestBeterSpo.vue";

// Access the current route
const route = useRoute();
const toast = useToast();
const offerStore = useOfferStore(); // Initialize the offers store
const postStore = usePostStore();

// Reactive Data
const title = ref<string>("");
const titleError = ref<string>("");
const description = ref<string>("");
const descriptionError = ref<string>("");
const place = ref<string>("");
const placeError = ref<string>("");
const categories = ref([]);
const selectedCategory = ref<string>();
const image = ref<{ file: File; url: string } | null>(null); // Single image
const validationErrors = ref<string[]>([]);

onMounted(() => {
  categories.value = postStore.categories;
});
// Fetch the existing offer data when the page loads
onMounted(async () => {
  const offerId = route.params.id as string; // Get the offer ID from the route
  console.log(offerId);

  try {
    const response = await offerStore.fetchOfferById(offerId); // Fetch the offer data
    console.log(response);

    if (response.success && response.data) {
      const offer = response.data;
      title.value = offer.title;
      description.value = offer.details;
      place.value = offer.place;
      selectedCategory.value = offer.category_uuid || [];
      if (offer.image) {
        // If the offer has an existing image, pre-fill it
        image.value = { file: new File([], ""), url: offer.image };
      }
    } else {
      toast.error("Failed to fetch offer data.");
    }
  } catch (error) {
    console.error("Error fetching offer:", error);
    toast.error("An error occurred while fetching the offer.");
  }
});

// File Handling
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0]; // Take the first file only
    addImage(file);
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0]; // Take the first file only
    addImage(file);
  }
};

const addImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    image.value = { file, url: reader.result as string }; // Store the single image
  };
  reader.readAsDataURL(file);
};

const removeImage = (event: MouseEvent) => {
  event.stopPropagation(); // Prevent triggering file input when clicking on remove button
  image.value = null; // Clear the image
  resetFileInput(); // Reset the file input
};

// Trigger the file input click when the drag-and-drop area is clicked
const triggerFileInput = () => {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fileInput?.click();
};

// Reset the file input to allow re-uploading the same file
const resetFileInput = () => {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fileInput.value = ""; // Reset the value of the input to allow selecting the same file again
};

// Form Submission
const updateOffer = async () => {
  // Reset previous errors
  validationErrors.value = [];

  // Validate inputs
  if (!title.value.trim()) {
    validationErrors.value.push("Title is required.");
  }
  if (!place.value.trim()) {
    validationErrors.value.push("Place is required.");
  }
  if (!description.value.trim()) {
    validationErrors.value.push("Description is required.");
  }

  // If there are validation errors, show a toast and return
  if (validationErrors.value.length > 0) {
    toast.error("Please fill in all required fields.");
    return;
  }

  // Prepare FormData for the API request
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("place", place.value);
  formData.append("details", description.value);
  formData.append("category_uuid", selectedCategory.value[0].uuid); // Assuming categories are sent as a comma-separated string
  formData.append("post_uuid", route.params.id as string); // Add the post ID from the route

  // Append the single image file to FormData (if a new image is uploaded)
  if (image.value && image.value.file) {
    formData.append("image", image.value.file);
  }

  try {
    const offerId = route.params.offerId as string; // Get the offer ID from the route
    // Call the updateOffer action from the store
    const result = await offerStore.updateOffer(offerId, formData);

    if (result.success) {
      toast.success("Offer updated successfully!");
      navigateTo(`/posts/${route.params.id}`); // Navigate back to the post details page
    } else {
      toast.error(result.message || "Failed to update offer.");
    }
  } catch (error) {
    console.error("Error updating offer:", error);
    toast.error("An error occurred while updating the offer.");
  }
};

const onDeleteOffer = () => {
  try {
    const offerId = route.params.offerId as string; // Get the offer ID from the route
    // Call the updateOffer action from the store
    const respons = offerStore.deleteOffer(offerId);

    if (respons.success) {
      toast.success("Offer updated successfully!");
      navigateTo(`/posts/${route.params.id}`); // Navigate back to the post details page
    } else {
      toast.error(respons.message || "Failed to update offer.");
    }
  } catch (error) {
    console.error("Error updating offer:", error);
    toast.error("An error occurred while updating the offer.");
  }
};
</script>

<style scoped>
.drag-drop-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.hidden-input {
  display: none;
}
</style>
