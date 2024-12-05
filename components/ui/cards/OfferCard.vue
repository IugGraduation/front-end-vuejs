<template>
  <div
    class="card"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img :src="imageUrl" alt="Card Image" class="card_image" />
    <div class="card__avatar-status">
      <div class="avtar">
        <v-avatar size="18">
          <v-img alt="John" :src="avatarUrl"></v-img>
        </v-avatar>
        <h5 class="avtar_name">{{ name }}</h5>
      </div>
    </div>
    <div class="card__details pa-2">
      <div class="card__details-header">
        <h3 class="card__title">
          {{ titleFirstThreeWords }}
        </h3>

      </div>
      <p class="description_offer mt-2">{{ descriptionFirstEightWords }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

// Define props to receive data from the parent component
const props = defineProps<{
  imageUrl: string;
  avatarUrl: string;
  name: string;
  title: string;
  description: string;
  index: number;
}>();

// Computed property to get the first 3 words of the title
const titleFirstThreeWords = computed(() => {
  if (props.title.split(" ").length > 3) {
    return props.title.split(" ").slice(0, 3).join(" ") + "...";
  }
  return props.title;
});

// Computed property to get the first 8 words of the description
const descriptionFirstEightWords = computed(() => {
  if (props.description.split(" ").length > 10) {
    return props.description.split(" ").slice(0, 10).join(" ") + "...";
  }
  return props.description;
});

const isHovered = ref(false);
</script>

<style scoped>
.card {
  min-width: 200px;
  min-height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: rgb(var(--v-theme-white));
  transition: transform 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
.card img {
  max-height: 150px;
  min-height: 150px;
  background: white;
  width: 100%;
  object-fit: cover;
}
.card .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--v-theme-primary), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 1;
}
.card .overlay .create_offer {
  padding: 10px 20px;
  color: #0065ff;
  background: none;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
/* .card .create_offer:hover {
    background: #0065ff;
    color: #ffffff;
  } */
.card .overlay .create_offer span {
  padding: 10px 20px;
  background: rgb(var(--v-theme-white));
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.card .overlay .create_offer:hover span {
  /* background: rgb(var(--v-theme-primary)); */
  /* color: rgb(var(--v-theme-white)); */
}
.card-skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 16px;
}
@keyframes loading {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
.card .card__avatar-status {
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card .avtar {
  display: flex;
  align-items: center;
  gap: 6px;
}
.card .avtar .avtar_image {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
}
.card .avtar .avtar_name {
  font-size: 14px;
  color: white;
}
.card .status {
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 16px;
  background: #8fe3007a;
}
.card .status span {
  color: #8fe300;
  font-size: 14px;
  color: white;
}

.card .card__details {
  margin-top: 8px;
  overflow: hidden;
}

.card .card__details .card__details-header {
  display: flex;
  justify-content: space-between;
}
.card .card__details-header .card__title {
  max-height: 30px;
  max-width: 70%;
  overflow: hidden;
}
.card .offers {
  padding: 2px 6px;
  background: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-blackSecondary));
  display: flex;
  gap: 4px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.card .offers svg path,
.card .offers svg rect {
  stroke: rgb(var(--v-theme-blackSecondary));
}
.card .offers .offers_number {
  font-size: 12px;
  color: rgb(var(--v-theme-blackSecondary));
}
.card .description_offer {
  color: rgb(var(--v-theme-blackTeriary));
  max-height: 50px;
}
.card .create_offer {
  width: 100%;
  /* background: rgb(var(--v-theme-overlayPrimary)); */
  background: #0065ff33;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding: 4px 8px;
}
.card .create_offer span {
  font-size: 12px;
  color: rgb(var(--v-theme-primary));
}
</style>
