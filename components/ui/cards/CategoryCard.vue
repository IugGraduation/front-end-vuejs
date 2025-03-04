<template>
  <NuxtLink :to="`/search?category=${index}`">
    <div class="card">
      <v-img :src="image" alt="Card Image" class="card_image" />
      <span class="card_title">{{ title }} </span>
      <div class="card_overlay"></div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card {
  background: white;
  min-width: 200px;
  min-height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.card_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  transition: background 0.3s ease-in-out;
  z-index: 1;
}

.card:hover .card_overlay {
  background: rgba(var(--v-theme-primary), 0.3);
}

.card_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Send Flowers", sans-serif;
  font-size: 28px;
  font-weight: bold;
  color: white;
  max-width: 60%;
  text-align: center;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);
  z-index: 2;
  transition: color 0.3s ease-in-out;
}

.card:hover .card_title {
  color: rgb(var(--v-theme-white));
  text-shadow: none;
}
</style>
