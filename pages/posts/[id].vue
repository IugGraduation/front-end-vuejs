<template>
  <div>
    <v-container class="position-relative">
      <h1>Post Details</h1>
      <template v-if="imagesLoaded">
        <v-carousel
          height="400"
          hide-delimiter-background
          show-arrows
          v-if="postHasImages"
        >
          <template v-slot:prev="{ props }">
            <v-btn variant="flat" @click="props.onClick"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="16"
                height="16"
              >
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
            </v-btn>
          </template>
          <template v-slot:next="{ props }">
            <v-btn variant="flat" @click="props.onClick" class="rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="16"
                height="16"
              >
                <path
                  d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                />
              </svg>
            </v-btn>
          </template>

          <v-carousel-item v-for="image in post.image" :key="image">
            <v-img
              class="mx-auto"
              max-width="450"
              max-height="700"
              :src="image.attachment"
            />
          </v-carousel-item>
        </v-carousel>

        <v-img
          v-if="!post.image"
          class="mx-auto"
          width="auto"
          height="700"
          :src="post.image"
        />
      </template>
      <div class="card__avatar-data">
        <div class="avatar-section">
          <v-avatar size="44">
            <v-img :alt="post.name" :src="post.avatarUrl"></v-img>
          </v-avatar>
          <h5 class="avatar-name">{{ post.name }}</h5>
        </div>
        <div class="date-section">
          <v-chip>
            <svg
              class="calendar-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_70_806)">
                <path
                  d="M1 6C1 4.11438 1 3.17157 1.58579 2.58579C2.17157 2 3.11438 2 5 2H7C8.88562 2 9.82843 2 10.4142 2.58579C11 3.17157 11 4.11438 11 6V7C11 8.88562 11 9.82843 10.4142 10.4142C9.82843 11 8.88562 11 7 11H5C3.11438 11 2.17157 11 1.58579 10.4142C1 9.82843 1 8.88562 1 7V6Z"
                  stroke="black"
                  stroke-opacity="0.48"
                />
                <path
                  d="M3.5 2V1.25"
                  stroke="black"
                  stroke-opacity="0.48"
                  stroke-linecap="round"
                />
                <path
                  d="M8.5 2V1.25"
                  stroke="black"
                  stroke-opacity="0.48"
                  stroke-linecap="round"
                />
                <path
                  d="M1.25 4.5H10.4999"
                  stroke="black"
                  stroke-opacity="0.48"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_70_806">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {{ post.date }}
          </v-chip>
          <span class="date-text"></span>
        </div>
      </div>
      <div class="offer-container mb-10">
        <!-- Offers and Status Section -->
        <div class="offers-status">
          <div class="offers">
            <h5 class="offers-numbers">
              {{ post.num_offers }}
            </h5>
            <p>Offers</p>
          </div>
          <div class="status">
            <h5>{{ post.status }}</h5>
            <p>Status</p>
          </div>
        </div>

        <!-- Title Section -->
        <div class="title">
          <h3>{{ post.title }}</h3>
        </div>

        <!-- Details Section -->
        <div class="details mx-auto">
          <p>
            {{ post.description }}
          </p>
        </div>

        <!-- Favorite Categories -->
        <div class="favorite-categories">
          <ul>
            <li v-for="category in post.favorite_categories" :key="category">
              <v-chip>{{ category.category_name }}</v-chip>
            </li>
          </ul>
        </div>

        <!-- Offers Section -->
        <v-row class="mb-16">
          <!-- Show Posts based on showAll state -->
          <v-col
            v-if="post.offers"
            v-for="offer in post.offers"
            :key="offer.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
            xl="4"
            class="post-card-wrapper"
          >
            <OfferCard
              :index="offer.uuid"
              :imageUrl="offer.user_image"
              :avatarUrl="offer.avatarUrl"
              :name="offer.user_name"
              :title="offer.title"
              :description="offer.details"
          /></v-col>
        </v-row>
      </div>
      <!-- Add Offer Button -->
      <div class="add-offer-button">
        <NuxtLink :to="`/offer/${post.id}`">
          <PrimaryBtn class="py-3 px-7 w-100">Add Offer</PrimaryBtn>
        </NuxtLink>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import PrimaryBtn from "../../components/ui/buttons/PrimaryBtn.vue";
import OfferCard from "../../components/ui/cards/OfferCard.vue";
import { usePostStore } from "@/stores/posts";
import { useToast } from "vue-toast-notification";

// Access the current route
const route = useRoute();
const postsStore = usePostStore();
const toast = useToast();
const imagesLoaded = ref<boolean>(false);
const postHasImages = ref<boolean>(false);

const post = ref({});
onMounted(async () => {
  imagesLoaded.value = true;
  const postId: string = route.params.id;
  const respons = await postsStore.fetchOnePost(postId);
  postHasImages.value = respons.data.image.length ? true : false;
  if (respons.success) {
    post.value = respons.data;
  } else {
    toast.error("Error");
  }
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

.date-text {
  font-size: 12px;
  color: #666;
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

.offers-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
}

.offers,
.status {
  text-align: center;
}

.offers-numbers,
.status h5 {
  font-size: 2rem;
  font-weight: bold;
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

.favorite-categories ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

/* .favorite-categories li {
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
} */

.offers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.offer-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.add-offer-button {
  text-align: center;
  z-index: 2;
  position: fixed;
  transform: translate(-50%);
  width: 300px;
  bottom: 40px;
  left: 50%;
}

.add-offer-button .py-3 {
  padding: 0.75rem 1.5rem;
}
</style>
