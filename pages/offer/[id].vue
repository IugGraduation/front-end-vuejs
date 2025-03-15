<template>
  <div>
    <v-container class="position-relative">
      <h1>Offer Details</h1>

      <!-- Single Image Display -->
      <template v-if="imagesLoaded">
        <v-img
          class="mx-auto"
          max-width="450"
          max-height="700"
          :src="offer.image"
          v-if="offer.image"
        />
      </template>

      <!-- Offer Details Section -->
      <div class="offer-container ">
        <!-- Title Section -->
        <div class="title mt-5">
          <h3>{{ offer.title }}</h3>
        </div>

        <!-- Details Section -->
        <div class="details mx-auto">
          <p>{{ offer.details }}</p>
        </div>

        <!-- Category Section -->
        <div class="favorite-categories" v-if="category">
          <v-chip>{{ category.name }}</v-chip>
        </div>
        <!-- Category Section -->
        <div class="favorite-categories">
          {{ offer.place }}
        </div>
      </div>

    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toast-notification";
import { navigateTo } from "nuxt/app";
import { useOfferStore } from "../../stores/offers";
import { usePostStore } from "../../stores/posts";
// Access the current route
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();
const imagesLoaded = ref<boolean>(false);
const offer = ref<any>({});
const offerId = ref<string>();
const offerStore = useOfferStore();
const postStore = usePostStore();
onMounted(async () => {
  imagesLoaded.value = true;
  offerId.value = route.params.id as string;

  try {
    const response = await offerStore.fetchOfferById(offerId.value);

    if (response.success) {
      offer.value = response.data;
    } else {
      toast.error("Error fetching offer details.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch offer details.");
  }
});

const goToEditOffer = () => {
  navigateTo({
    path: `/offer/${offerId.value}/edit`,
  });
};
const category = computed(() => {
  return postStore.categories.find((cat) => cat.uuid === offer.value.category_uuid);
});
</script>

<style scoped>
.card__avatar-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.avatar-section {
  display: flex;
  align-items: center;
}

.calendar-icon {
  margin-right: 4px;
}

.avatar-name {
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
}

.date-section {
  display: flex;
  align-items: center;
}

.offer-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.details {
  padding: 1rem;
  font-size: 1rem;
  color: #555;
  text-align: center;
  max-width: 80%;
}

.favorite-categories {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

</style>
