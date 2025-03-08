<template>
  <v-container>
    <h1>Add Posts</h1>

    <!-- Drag and Drop Area -->
    <div
      class="drag-drop-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <p v-if="images.length === 0">
        Drag and drop images here or click to upload
      </p>
      <div v-if="images.length > 0" class="image-preview">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
        >
          <img :src="image.url" :alt="'Image ' + (index + 1)" />
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
        :items="categories"
        v-model="postCategories"
        label="Categories Of Your Post"
        chips
        variant="outlined"
        item-title="name"
        item-value="id"
      ></v-select>

      <v-select
        :items="categories"
        v-model="categoriesWant"
        label="Categories You Like"
        chips
        multiple
        variant="outlined"
        item-title="name"
        item-value="id"
      ></v-select>
      <div class="w-full text-center">
        <PrimaryBtn @click="submitForm" class="px-7 py-3">Add Post</PrimaryBtn>
      </div>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import Title from "../../components/ui/inputs/Title.vue";
import TextArea from "../../components/ui/inputs/TextArea.vue";
import PestBeterSpo from "../../components/ui/inputs/PestBeterSpo.vue";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import { useCategoryStore } from "@/stores/categories";
import { usePostStore } from "@/stores/posts";

// Access the current route
const route = useRoute();
const toast = useToast();
const categoryStore = useCategoryStore();
const postStore = usePostStore();

// Reactive Data
const title = ref<string>("");
const titleError = ref<string>("");
const description = ref<string>("");
const descriptionError = ref<string>("");
const place = ref<string>("");
const placeError = ref<string>("");
const categories = ref([]);
const postCategories = ref([]);
const categoriesWant = ref([]);
const images = ref<{ file: File; url: string }[]>([]);
const valid = ref(false); // Form validation state

// Validation Errors
const validationErrors = ref<string[]>([]);

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
    Array.from(event.dataTransfer.files).forEach((file) => addImage(file));
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    Array.from(input.files).forEach((file) => addImage(file));
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
  event.stopPropagation(); // Prevent triggering file input when clicking on remove button
  images.value.splice(index, 1);
  resetFileInput(); // Reset the file input after image removal
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
const addPost = async () => {
  // Reset previous errors
  validationErrors.value = [];

  // Validate title
  if (!title.value.trim()) {
    validationErrors.value.push("Title is required.");
  }
  if (!place.value.trim()) {
    validationErrors.value.push("Place is required.");
  }

  // Validate description
  if (!description.value.trim()) {
    validationErrors.value.push("Description is required.");
  }

  // Validate images
  if (images.value.length === 0) {
    validationErrors.value.push("At least one image is required.");
  }

  // Log errors or success
  if (validationErrors.value.length > 0) {
    console.error("Validation Errors:", validationErrors.value);
    toast.error("Some inputs are required.");
  } else {
    try {
      // Prepare FormData for the API request
      const formData = new FormData();

      // Append text fields
      formData.append("name", title.value);
      formData.append("place", place.value);
      formData.append("details", description.value);
      formData.append("category_uuid", postCategories.value); // Assuming single category for now
      categories.value.forEach((cat, index) => {
        formData.append(`fcategory[${index}]`, cat.id); // Assuming single favorite category for now
      });

      // // Append images
      images.value.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file);
      });

      // Call the store action to add the post
      const response = await postStore.addPost(formData);

      if (response.success) {
        toast.success("Post added successfully!");
        navigateTo("/"); // Redirect to profile or another page
      } else {
        toast.error(response.message || "Failed to add post.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("An error occurred while adding the post.");
    }
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
