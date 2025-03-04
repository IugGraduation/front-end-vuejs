<template>
  <div class="custom-dropdown" ref="dropdownRef">
    <!-- Dropdown Toggle Button -->
    <div class="dropdown-toggle" @click="toggleDropdown">
      <div class="selected-items">
        <span v-if="selectedOptions.length === 0" class="placeholder">
          {{ placeholder }}
        </span>
        <span v-else class="selected-tags">
          <span
            v-for="(option, index) in selectedOptions"
            :key="index"
            class="tag"
            @click.stop="removeOption(index)"
          >
            {{ option }}
            <span class="remove-tag">×</span>
          </span>
        </span>
      </div>
      <span
        v-if="selectedOptions.length > 0"
        class="clear-all"
        @click.stop="clearAll"
      >
        ×
      </span>
    </div>

    <!-- Dropdown Menu -->
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="toggleOption(option)"
        :class="{ selected: selectedOptions.includes(option) }"
        class="dropdown-item"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
});

const emit = defineEmits(["update:modelValue", "select"]);

const isOpen = ref(false);
const selectedOptions = ref([...props.modelValue]); // Initialize with prop data
const dropdownRef = ref(null);

// Watch for changes in prop and update selectedOptions
watch(
  () => props.modelValue,
  (newValue) => {
    console.log('custome drop down menu new value watch',newValue);
    
    selectedOptions.value = [...newValue];
  },
  { immediate: true }
);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Toggle selection of an option
const toggleOption = (option) => {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter(
      (item) => item !== option
    );
  } else {
    selectedOptions.value.push(option);
  }
  emit("update:modelValue", selectedOptions.value);
  emit("select", selectedOptions.value);
};

// Remove a single selected option
const removeOption = (index) => {
  selectedOptions.value.splice(index, 1);
  emit("update:modelValue", selectedOptions.value);
  emit("select", selectedOptions.value);
};

// Clear all selected options
const clearAll = () => {
  selectedOptions.value = [];
  emit("update:modelValue", selectedOptions.value);
  emit("select", selectedOptions.value);
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Attach click outside listener
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Cleanup listener
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.custom-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-toggle {
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 22px !important;
  border-radius: 16px !important;
  width: 100%;
  padding: 18px;
  max-height: 58px;
  /* padding-left: 44px; */
  outline: none rgb(var(--v-theme-secondary));
  background-color: rgb(var(--v-theme-inputBackground)) !important;
  transition: border-color 0.3s ease, outline 0.3s ease;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-toggle.default-value {
  font-weight: 100 !important;
  color: rgb(var(--v-theme-blackTeriary)) !important;
}

.dropdown-toggle:focus {
  outline: 2px solid rgb(var(--v-theme-secondary));
}

.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 80%;
  max-height: 30px;
  overflow: hidden;
}

.placeholder {
  color: rgb(var(--v-theme-blackTeriary));
  font-weight: 100;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: rgba(var(--v-theme-secondary), 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.remove-tag {
  font-size: 12px;
  color: rgb(var(--v-theme-blackTeriary));
}

.remove-tag:hover {
  color: rgb(var(--v-theme-secondary));
}

.clear-all {
  cursor: pointer;
  font-size: 16px;
  color: rgb(var(--v-theme-blackTeriary));
  padding: 4px;
  margin-left: 20px;
}

.clear-all:hover {
  color: rgb(var(--v-theme-secondary));
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgb(var(--v-theme-inputBackground)) !important;
  border-radius: 16px !important;
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-item {
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 22px !important;
  padding: 18px;
  /* padding-left: 44px; */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-item.selected {
  background-color: rgba(var(--v-theme-secondary), 0.1);
}

.dropdown-item:hover {
  background-color: rgba(var(--v-theme-secondary), 0.2);
}
</style>
