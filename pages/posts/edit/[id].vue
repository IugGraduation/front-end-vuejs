<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h1>Edit Posts</h1>
      <div class="status">
        <v-switch color="primary" v-model="status"></v-switch>
      </div>
    </div>

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
    <v-form @submit.prevent>
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
        item-title="name_translate"
        item-value="uuid"
      ></v-select>
      <v-select
        :items="categories"
        v-model="categoriesWant"
        label="Categories You Like"
        chips
        multiple
        variant="outlined"
        item-title="name_translate"
        item-value="uuid"
      ></v-select>
      <div class="w-full text-center d-flex gap-3 justify-space-around">
        <PrimaryBtn
          @click="savePost"
          class="px-4 py-3 w-25"
          :disabled="isSubmitting"
        >
          Save
        </PrimaryBtn>
        <OutLineBtn @click="onCansel" class="px-4 py-3 w-25">
          Cansel
        </OutLineBtn>
        <RedBtn @click="onDeletePost" class="px-4 py-3 w-25">
          Delete Post
        </RedBtn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PrimaryBtn from "@/components/ui/buttons/PrimaryBtn.vue";

import OutLineBtn from "@/components/ui/buttons/OutLineBtn.vue";
import RedBtn from "@/components/ui/buttons/RedBtn.vue";
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
const postsStore = usePostStore();

// Reactive Data
const loading = ref<boolean>(true); // Loading state
const status = ref<boolean>(true);
const title = ref<string>("");
const description = ref<string>("");
const place = ref<string>("");
const categories = ref<string[]>([]);
const postCategories = ref<string>();
const categoriesWant = ref<string[]>([]);
const images = ref<{ file: File; url: string }[]>([]);
const postData = ref<any>({});
const isSubmitting = ref<boolean>(false); // Track submission state

// Fetch categories on mounted
onMounted(() => {
  categories.value = categoryStore.categories;
});

// Fetch post data on mounted
onMounted(async () => {
  try {
    // Fetch categories

    // Fetch post data
    const postId = useRoute().params.id as string;
    const { success, data } = await usePostStore().fetchPostById(postId);

    if (success && data) {
      postData.value = data.item;
      categories.value = data.categories;

      // Map post data to reactive variables
      title.value = data.item.name;
      description.value = data.item.details;
      place.value = data.item.place || "";
      status.value = data.item.status === "Active"; // Convert status to boolean
      images.value = data.item.images.map((img: any) => ({
        file: null, // Placeholder for file object
        url: img.attachment,
      }));
      postCategories.value = data.item.category.category_uuid;
      categoriesWant.value = data.item.fav_categories.map(
        (cat: any) => cat.category_uuid
      );
    } else {
      useToast().error("Failed to fetch post data.");
    }
  } catch (error) {
    useToast().error("An error occurred while fetching data.");
  } finally {
    loading.value = false; // Stop loading spinner
  }
});

// File Handling
const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    Array.from(event.dataTransfer.files).forEach((file) => editImage(file));
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    Array.from(input.files).forEach((file) => editImage(file));
  }
};

const editImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    images.value.push({ file, url: reader.result as string });
  };
  reader.readAsDataURL(file);
};

const removeImage = (index: number, event: MouseEvent) => {
  event.stopPropagation();
  images.value.splice(index, 1);
};

const triggerFileInput = () => {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fileInput?.click();
};
const savePost = async () => {
  isSubmitting.value = true; // Disable the button

  const formData = new FormData();

  // Append text fields
  formData.append("name", title.value || ""); // Ensure name is not undefined
  formData.append("details", description.value || ""); // Ensure details is not undefined
  formData.append("place", place.value || ""); // Ensure place is not undefined
  formData.append("status", status.value ? "1" : "0"); // Ensure status is either "1" or "0"
  formData.append("post_uuid", postData.value.uuid || ""); // Ensure post_uuid is not undefined
  formData.append("category_uuid", postCategories.value || ""); // Ensure category_uuid is not undefined

  // Append images
  images.value.forEach((image, index) => {
    if (image.file) {
      formData.append(`images[${index}]`, image.file); // Append image files
    }
  });

  // Append categories (fcategory)
  categoriesWant.value.forEach((category, index) => {
    formData.append(`fcategory[${index}]`, category || ""); // Ensure category is not undefined
  });



  // Update post
  const { success, message } = await postsStore.updatePost(formData);
  if (success) {
    toast.success(message || "Post updated successfully.");
    navigateTo("/profile", { replace: true }); // Redirect and replace history
  } else {
    toast.error(message || "Failed to update post.");
  }

  isSubmitting.value = false; // Re-enable the button
};
// Delete Post
const onDeletePost = async () => {
  const postId = route.params.id as string; // Get the post ID from the route
  const { success, message } = await postsStore.deletePost(postId);

  if (success) {
    toast.success(message || "Post deleted successfully.");
    navigateTo("/profile", { replace: true }); // Redirect and replace history
  } else {
    toast.error(message || "Failed to delete post.");
  }
};

// Cancel Post
const onCansel = async () => {
  navigateTo("/profile", { replace: true }); // Redirect and replace history
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
