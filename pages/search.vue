<template>
  <v-container>
    <div class="">
      <div class="search d-flex align-center justify-space-between">
        <div class="w-50">
          <input type="text" v-model="serchText" placeholder="search" />
        </div>
        <div class="serach_filters w-25 mt-5">
          <v-select
            :items="filters"
            v-model="selectedFilter"
            label="filter"
            chips
            multiple
            variant="solo"
          ></v-select>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
const serchText = ref<String>("");
const filters = ref<String[]>(["date", "date1", "date2", "date3 "]);
const selectedFilter = ref([]);
</script>

<style scoped>
.search_input input {
  width: 800px;
}
</style>
