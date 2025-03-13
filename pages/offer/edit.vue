<template>
  <v-container>
    <h1>Update Offer</h1>

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

    <input
      type="file"
      ref="fileInput"
      class="hidden-input"
      accept="image/*"
      required
      @change="handleFileChange"
    />

    <v-form class="mt-5" @submit.prevent>
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
        variant="outlined"
        selection-type="checkbox"
        item-title="name"
        item-value="uuid"
      ></v-select>

      <div class="w-full text-center">
        <PrimaryBtn type="button" class="px-7 py-3 mx-3" @click="updateOffer">
          Update Offer
        </PrimaryBtn>
        <RedBtn type="button" class="px-7 py-3 mx-3" @click="onDeleteOffer">
          Delete Offer
        </RedBtn>
        <OutLineBtn type="button" class="px-7 py-3 mx-3" @click="goBack">
          Cancel
        </OutLineBtn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import { usePostStore } from "@/stores/posts";
import { useOfferStore } from "@/stores/offers";
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import RedBtn from "@/components/ui/buttons/RedBtn.vue";
import OutLineBtn from "@/components/ui/buttons/OutLineBtn.vue";
import Title from "../../components/ui/inputs/Title.vue";
import TextArea from "../../components/ui/inputs/TextArea.vue";
import PestBeterSpo from "../../components/ui/inputs/PestBeterSpo.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const offerStore = useOfferStore();
const postStore = usePostStore();

const title = ref<string>("");
const titleError = ref<string>("");
const description = ref<string>("");
const descriptionError = ref<string>("");
const place = ref<string>("");
const placeError = ref<string>("");
const selectedCategory = ref();
const image = ref<{ file: File; url: string } | null>(null);
const validationErrors = ref<string[]>([]);

const offerId = route.query.offerId as string;
const postId = route.query.postId as string;

const categories = computed(() => {
  return postStore.categories;
});

onMounted(async () => {
  try {
    const response = await offerStore.fetchOfferById(offerId);

    if (response.success && response.data) {
      const offer = response.data;
      title.value = offer.title;
      description.value = offer.details;
      place.value = offer.place;
      selectedCategory.value = offer.category_uuid;
      if (offer.image) {
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

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    addImage(file);
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    addImage(file);
  }
};

const addImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    image.value = { file, url: reader.result as string };
  };
  reader.readAsDataURL(file);
};

const removeImage = (event: MouseEvent) => {
  event.stopPropagation();
  image.value = null;
  resetFileInput();
};

const triggerFileInput = () => {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fileInput?.click();
};

const resetFileInput = () => {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fileInput.value = "";
};

const updateOffer = async () => {
  validationErrors.value = [];

  if (!title.value.trim()) {
    validationErrors.value.push("Title is required.");
  }
  if (!place.value.trim()) {
    validationErrors.value.push("Place is required.");
  }
  if (!description.value.trim()) {
    validationErrors.value.push("Description is required.");
  }

  if (validationErrors.value.length > 0) {
    toast.error("Please fill in all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("place", place.value);
  formData.append("details", description.value);
  formData.append("category_uuid", selectedCategory.value);
  formData.append("offer_uuid", offerId);

  if (image.value && image.value.file) {
    formData.append("image", image.value.file);
  }

  try {
    const result = await offerStore.updateOffer(formData);

    if (result.success) {
      toast.success("Offer updated successfully!");
      navigateTo(`/posts/${postId}`);
    } else {
      toast.error(result.message || "Failed to update offer.");
    }
  } catch (error) {
    console.error("Error updating offer:", error);
    toast.error("An error occurred while updating the offer.");
  }
};

const onDeleteOffer = async () => {
  try {
    const respons = await offerStore.deleteOffer(offerId);

    if (respons.success) {
      toast.success("Offer deleted successfully!");
      navigateTo(`/posts/${postId}`);
    } else {
      toast.error(respons.message || "Failed to delete offer.");
    }
  } catch (error) {
    console.error("Error deleting offer:", error);
    toast.error("An error occurred while deleting the offer.");
  }
};

const goBack = () => {
  router.back();
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
