<template>
  <v-container>
    <h1>Add Posts</h1>
    <div
      class="drag-drop-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <p v-if="!images.length">Drag and drop images here or click to upload</p>
      <div v-if="images.length" class="image-preview">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
        >
          <img :src="image.url" :alt="`Image ${index + 1}`" />
          <button @click="removeImage(index, $event)" class="remove-btn">
            x
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      class="hidden-input"
      accept="image/*"
      multiple
      required
      @change="handleFileChange"
    />

    <!-- Form Inputs -->
    <v-form @submit.prevent="addPost">
      <Title v-model="title" @validationError="handleTitleError" />
      <TextArea
        v-model="description"
        @validationError="handleDescriptionError"
      />
      <PestBeterSpo v-model="place" @validationError="handlePlaceError" />

      <v-select
        :items="categoriesComputed"
        v-model="postCategories"
        label="Categories Of Your Post"
        chips
        variant="outlined"
        item-title="name"
        item-value="id"
        bg-color="white"
      />

      <v-select
        :items="categoriesComputed"
        v-model="categoriesWant"
        label="Categories You Like"
        chips
        multiple
        variant="outlined"
        item-title="name"
        item-value="id"
        bg-color="white"
      />

      <div class="w-full text-center">
        <PrimaryBtn
          :disabled="isSubmitting"
          @click="submitForm"
          class="px-7 py-3"
        >
          {{ isSubmitting ? "Submitting..." : "Add Post" }}
        </PrimaryBtn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import { useCategoryStore } from "@/stores/categories";
import { usePostStore } from "@/stores/posts";
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import Title from "../../components/ui/inputs/Title.vue";
import TextArea from "../../components/ui/inputs/TextArea.vue";
import PestBeterSpo from "../../components/ui/inputs/PestBeterSpo.vue";

// Stores
const categoryStore = useCategoryStore();
const postStore = usePostStore();

// Toast
const toast = useToast();

// Reactive Data
const title = ref("");
const description = ref("");
const place = ref("");
const categories = ref([]);
const postCategories = ref([]);
const categoriesWant = ref([]);
const images = ref<{ file: File; url: string }[]>([]);
const validationErrors = ref<string[]>([]);
const isSubmitting = ref(false); // Track submission state

const categoriesComputed = computed(() => {
  return postStore.categories.map((cat) => ({
    name: cat.name,
    id: cat.uuid,
  }));
});
// Fetch categories on mount
onMounted(() => {
  categories.value = postStore.categories.map((cat) => ({
    name: cat.name,
    id: cat.uuid,
  }));
});

// File Handling
const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    Array.from(event.dataTransfer.files).forEach(addImage);
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    Array.from(input.files).forEach(addImage);
  }
};

const addImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    images.value.push({ file, url: reader.result as string });
  };
  reader.readAsDataURL(file);
};

const removeImage = (index: number, event: MouseEvent) => {
  event.stopPropagation();
  images.value.splice(index, 1);
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

// Form Submission
const addPost = async () => {
  if (isSubmitting.value) return; // Prevent multiple submissions

  isSubmitting.value = true; // Disable the button
  validationErrors.value = [];

  if (!title.value.trim()) validationErrors.value.push("Title is required.");
  if (!place.value.trim()) validationErrors.value.push("Place is required.");
  if (!description.value.trim())
    validationErrors.value.push("Description is required.");
  if (!images.value.length)
    validationErrors.value.push("At least one image is required.");

  if (validationErrors.value.length) {
    console.error("Validation Errors:", validationErrors.value);
    toast.error("Some inputs are required.");
    isSubmitting.value = false; // Re-enable the button
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", title.value);
    formData.append("place", place.value);
    formData.append("details", description.value);
    formData.append("category_uuid", postCategories.value);

    categories.value.forEach((cat, index) => {
      formData.append(`fcategory[${index}]`, cat.id);
    });

    images.value.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });

    const response = await postStore.addPost(formData);

    if (response.success) {
      toast.success("Post added successfully!");
      navigateTo("/"); // Redirect to the next page
      // Prevent going back to this page
      window.history.replaceState(null, "", "/");
    } else {
      toast.error(response.message || "Failed to add post.");
      isSubmitting.value = false; // Re-enable the button
    }
  } catch (error) {
    console.error("Error adding post:", error);
    toast.error("An error occurred while adding the post.");
    isSubmitting.value = false; // Re-enable the button
  }
};
</script>
<style scoped>
.drag-drop-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 16px;
}

.hidden-input {
  display: none;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.image-container {
  position: relative;
  width: 100px;
  height: 100px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #f44336;
  border: none;
  border-radius: 50%;
  color: white;
  width: 24px;
  height: 24px;
  font-size: 14px;
  cursor: pointer;
}

v-form > * {
  margin-bottom: 16px;
}
</style>
