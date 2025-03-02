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
      <div class="status" :class="status == 'open' ? 'open' : 'close'">
        <span>{{ status }}</span>
      </div>
    </div>
    <div class="card__details pa-2">
      <div class="card__details-header">
        <h3 class="card__title">
          {{ titleFirstThreeWords }}
        </h3>
        <div class="offers">
          <div class="offers_icon">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.93063 2.18168C6.18396 1.72723 6.31063 1.5 6.5 1.5C6.68937 1.5 6.81604 1.72722 7.06937 2.18167L7.13491 2.29925C7.2069 2.42839 7.24289 2.49296 7.29901 2.53556C7.35513 2.57817 7.42503 2.59398 7.56482 2.62561L7.69209 2.65441C8.18403 2.76571 8.43 2.82136 8.48852 3.00955C8.54704 3.19773 8.37935 3.39381 8.04398 3.78598L7.95722 3.88744C7.86191 3.99889 7.81426 4.05461 7.79283 4.12354C7.77139 4.19248 7.77859 4.26682 7.793 4.41551L7.80612 4.55088C7.85682 5.07412 7.88218 5.33574 7.72897 5.45204C7.57576 5.56835 7.34547 5.46231 6.88487 5.25023L6.7657 5.19537C6.63481 5.1351 6.56937 5.10497 6.5 5.10497C6.43063 5.10497 6.36519 5.1351 6.2343 5.19537L6.11513 5.25023C5.65454 5.46231 5.42424 5.56835 5.27103 5.45204C5.11782 5.33574 5.14318 5.07412 5.19388 4.55088L5.207 4.41551C5.22141 4.26682 5.22861 4.19248 5.20717 4.12354C5.18574 4.05461 5.13809 3.99889 5.04278 3.88744L4.95602 3.78599C4.62065 3.39381 4.45296 3.19773 4.51148 3.00955C4.57 2.82136 4.81597 2.76571 5.30791 2.65441L5.43518 2.62561C5.57497 2.59398 5.64487 2.57817 5.70099 2.53556C5.75711 2.49296 5.79311 2.42839 5.86509 2.29925L5.93063 2.18168Z"
                stroke="black"
                stroke-opacity="0.68"
                stroke-width="0.5"
              />
              <path
                d="M10.2153 4.34084C10.342 4.11361 10.4053 4 10.5 4C10.5947 4 10.658 4.11361 10.7847 4.34084L10.8175 4.39962C10.8534 4.46419 10.8714 4.49648 10.8995 4.51778C10.9276 4.53908 10.9625 4.54699 11.0324 4.5628L11.096 4.5772C11.342 4.63286 11.465 4.66068 11.4943 4.75477C11.5235 4.84886 11.4397 4.94691 11.272 5.14299L11.2286 5.19372C11.181 5.24944 11.1571 5.2773 11.1464 5.31177C11.1357 5.34624 11.1393 5.38341 11.1465 5.45776L11.1531 5.52544C11.1784 5.78706 11.1911 5.91787 11.1145 5.97602C11.0379 6.03417 10.9227 5.98115 10.6924 5.87512L10.6329 5.84768C10.5674 5.81755 10.5347 5.80248 10.5 5.80248C10.4653 5.80248 10.4326 5.81755 10.3671 5.84768L10.3076 5.87512C10.0773 5.98115 9.96212 6.03417 9.88551 5.97602C9.80891 5.91787 9.82159 5.78706 9.84694 5.52544L9.8535 5.45776C9.8607 5.38341 9.8643 5.34624 9.85359 5.31177C9.84287 5.2773 9.81904 5.24944 9.77139 5.19372L9.72801 5.14299C9.56032 4.94691 9.47648 4.84886 9.50574 4.75477C9.535 4.66068 9.65799 4.63286 9.90395 4.5772L9.96759 4.5628C10.0375 4.54699 10.0724 4.53908 10.1005 4.51778C10.1286 4.49648 10.1466 4.46419 10.1825 4.39962L10.2153 4.34084Z"
                stroke="black"
                stroke-opacity="0.68"
                stroke-width="0.5"
              />
              <path
                d="M2.21532 4.34084C2.34198 4.11361 2.40531 4 2.5 4C2.59469 4 2.65802 4.11361 2.78468 4.34084L2.81745 4.39962C2.85345 4.46419 2.87144 4.49648 2.89951 4.51778C2.92757 4.53908 2.96251 4.54699 3.03241 4.5628L3.09605 4.5772C3.34201 4.63286 3.465 4.66068 3.49426 4.75477C3.52352 4.84886 3.43968 4.94691 3.27199 5.14299L3.22861 5.19372C3.18096 5.24944 3.15713 5.2773 3.14641 5.31177C3.1357 5.34624 3.1393 5.38341 3.1465 5.45776L3.15306 5.52544C3.17841 5.78706 3.19109 5.91787 3.11449 5.97602C3.03788 6.03417 2.92273 5.98115 2.69243 5.87512L2.63285 5.84768C2.56741 5.81755 2.53469 5.80248 2.5 5.80248C2.46531 5.80248 2.43259 5.81755 2.36715 5.84768L2.30757 5.87512C2.07727 5.98115 1.96212 6.03417 1.88551 5.97602C1.80891 5.91787 1.82159 5.78706 1.84694 5.52544L1.8535 5.45776C1.8607 5.38341 1.8643 5.34624 1.85359 5.31177C1.84287 5.2773 1.81904 5.24944 1.77139 5.19372L1.72801 5.14299C1.56032 4.94691 1.47648 4.84886 1.50574 4.75477C1.535 4.66068 1.65799 4.63286 1.90395 4.5772L1.96759 4.5628C2.03749 4.54699 2.07243 4.53908 2.10049 4.51778C2.12856 4.49648 2.14655 4.46419 2.18255 4.39962L2.21532 4.34084Z"
                stroke="black"
                stroke-opacity="0.68"
                stroke-width="0.5"
              />
              <path
                d="M3 10.6942H4.12997C4.6354 10.6942 5.14627 10.7468 5.63816 10.8482C6.50828 11.0275 7.42442 11.0492 8.30347 10.9069C8.7369 10.8367 9.16302 10.7294 9.54874 10.5433C9.89694 10.3752 10.3235 10.1383 10.61 9.87296C10.896 9.60799 11.194 9.17434 11.4055 8.83537C11.5868 8.54471 11.4991 8.1881 11.2123 7.97152C10.8937 7.73095 10.4209 7.73099 10.1023 7.97163L9.19871 8.65421C8.84852 8.91876 8.46599 9.16227 8.01029 9.23496C7.9555 9.24369 7.89808 9.25166 7.83818 9.2586M7.83818 9.2586C7.82015 9.26069 7.80189 9.26268 7.78341 9.26458M7.83818 9.2586C7.91108 9.24298 7.98347 9.19802 8.05138 9.13875C8.37298 8.85805 8.39332 8.385 8.11427 8.07156C8.04953 7.99884 7.97377 7.93819 7.88953 7.88795C6.49086 7.05372 4.31471 7.6891 3 8.62146M7.83818 9.2586C7.81993 9.26251 7.80165 9.26458 7.78341 9.26458M7.78341 9.26458C7.52172 9.29145 7.21558 9.29839 6.87588 9.26632"
                stroke="black"
                stroke-opacity="0.68"
                stroke-width="0.5"
                stroke-linecap="round"
              />
              <rect
                x="1.5"
                y="7.5"
                width="1.5"
                height="4"
                rx="0.75"
                stroke="black"
                stroke-opacity="0.68"
                stroke-width="0.5"
              />
            </svg>
          </div>
          <span class="offers_number">{{ offers }} Offers</span>
        </div>
      </div>
      <p class="description_offer mt-2">{{ descriptionFirstEightWords }}</p>
    </div>
    <NuxtLink :to="`/posts/${index}`">
      <button class="create_offer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_68_368)">
            <path
              d="M7.24082 2.24215C7.5786 1.63622 7.74748 1.33325 7.99998 1.33325C8.25248 1.33325 8.42136 1.63622 8.75914 2.24215L8.84652 2.39891C8.94251 2.5711 8.9905 2.6572 9.06533 2.714C9.14016 2.77081 9.23335 2.79189 9.41974 2.83406L9.58944 2.87246C10.2454 3.02087 10.5733 3.09507 10.6513 3.34598C10.7294 3.59689 10.5058 3.85834 10.0586 4.38123L9.94293 4.51651C9.81587 4.6651 9.75233 4.7394 9.72375 4.83131C9.69517 4.92322 9.70477 5.02235 9.72398 5.2206L9.74147 5.40109C9.80908 6.09875 9.84288 6.44757 9.63861 6.60264C9.43433 6.75771 9.12727 6.61633 8.51313 6.33356L8.35425 6.26041C8.17973 6.18006 8.09247 6.13988 7.99998 6.13988C7.90749 6.13988 7.82023 6.18006 7.64571 6.26041L7.48683 6.33356C6.87269 6.61633 6.56563 6.75771 6.36135 6.60264C6.15708 6.44757 6.19088 6.09875 6.25849 5.40109L6.27598 5.2206C6.29519 5.02235 6.30479 4.92322 6.27621 4.83131C6.24763 4.7394 6.18409 4.6651 6.05702 4.51651L5.94134 4.38123C5.49418 3.85834 5.2706 3.59689 5.34863 3.34598C5.42665 3.09507 5.75461 3.02087 6.41052 2.87246L6.58022 2.83407C6.76661 2.79189 6.8598 2.77081 6.93463 2.714C7.00946 2.6572 7.05745 2.5711 7.15344 2.39891L7.24082 2.24215Z"
              stroke="#0065FF"
            />
            <path
              d="M12.9538 5.1212C13.1226 4.81823 13.2071 4.66675 13.3333 4.66675C13.4596 4.66675 13.544 4.81823 13.7129 5.1212L13.7566 5.19958C13.8046 5.28567 13.8286 5.32872 13.866 5.35712C13.9034 5.38553 13.95 5.39607 14.0432 5.41715L14.1281 5.43635C14.456 5.51056 14.62 5.54766 14.659 5.67311C14.698 5.79857 14.5862 5.92929 14.3627 6.19074L14.3048 6.25838C14.2413 6.33267 14.2095 6.36982 14.1952 6.41578C14.1809 6.46173 14.1857 6.5113 14.1953 6.61042L14.2041 6.70067C14.2379 7.04949 14.2548 7.22391 14.1526 7.30144C14.0505 7.37898 13.897 7.30829 13.5899 7.1669L13.5105 7.13033C13.4232 7.09015 13.3796 7.07006 13.3333 7.07006C13.2871 7.07006 13.2435 7.09015 13.1562 7.13033L13.0768 7.1669C12.7697 7.30829 12.6162 7.37898 12.514 7.30144C12.4119 7.22391 12.4288 7.04949 12.4626 6.70067L12.4713 6.61042C12.4809 6.5113 12.4857 6.46173 12.4714 6.41578C12.4572 6.36982 12.4254 6.33267 12.3619 6.25838L12.304 6.19074C12.0804 5.92929 11.9686 5.79857 12.0077 5.67311C12.0467 5.54766 12.2106 5.51056 12.5386 5.43635L12.6235 5.41715C12.7166 5.39607 12.7632 5.38553 12.8007 5.35712C12.8381 5.32872 12.8621 5.28567 12.9101 5.19958L12.9538 5.1212Z"
              stroke="#0065FF"
            />
            <path
              d="M2.28707 5.1212C2.45595 4.81823 2.5404 4.66675 2.66665 4.66675C2.79289 4.66675 2.87734 4.81823 3.04622 5.1212L3.08992 5.19958C3.13791 5.28567 3.16191 5.32872 3.19932 5.35712C3.23674 5.38553 3.28333 5.39607 3.37653 5.41715L3.46137 5.43635C3.78933 5.51056 3.95331 5.54766 3.99232 5.67311C4.03134 5.79857 3.91955 5.92929 3.69597 6.19074L3.63812 6.25838C3.57459 6.33267 3.54282 6.36982 3.52853 6.41578C3.51424 6.46173 3.51904 6.5113 3.52865 6.61042L3.53739 6.70067C3.5712 7.04949 3.5881 7.22391 3.48596 7.30144C3.38382 7.37898 3.23029 7.30829 2.92322 7.1669L2.84378 7.13033C2.75652 7.09015 2.71289 7.07006 2.66665 7.07006C2.6204 7.07006 2.57677 7.09015 2.48951 7.13033L2.41007 7.1669C2.103 7.30829 1.94947 7.37898 1.84733 7.30144C1.7452 7.22391 1.7621 7.04949 1.7959 6.70067L1.80464 6.61042C1.81425 6.5113 1.81905 6.46173 1.80476 6.41578C1.79047 6.36982 1.7587 6.33267 1.69517 6.25838L1.63733 6.19074C1.41375 5.92929 1.30196 5.79857 1.34097 5.67311C1.37998 5.54766 1.54396 5.51056 1.87192 5.43635L1.95676 5.41715C2.04996 5.39607 2.09656 5.38553 2.13397 5.35712C2.17139 5.32872 2.19538 5.28567 2.24338 5.19958L2.28707 5.1212Z"
              stroke="#0065FF"
            />
            <path
              d="M3.33331 13.5922H4.83994C5.51384 13.5922 6.195 13.6624 6.85086 13.7975C8.01102 14.0365 9.23254 14.0655 10.4046 13.8758C10.9825 13.7822 11.5507 13.6392 12.065 13.3909C12.5292 13.1668 13.0979 12.851 13.4799 12.4972C13.8614 12.1439 14.2586 11.5657 14.5406 11.1137C14.7824 10.7262 14.6654 10.2507 14.283 9.96195C13.8582 9.64118 13.2278 9.64124 12.8031 9.96209L11.5983 10.8722C11.1313 11.2249 10.6213 11.5496 10.0137 11.6465C9.94065 11.6582 9.86409 11.6688 9.78422 11.678M9.78422 11.678C9.76017 11.6808 9.73583 11.6835 9.71119 11.686M9.78422 11.678C9.88142 11.6572 9.97794 11.5973 10.0685 11.5183C10.4973 11.144 10.5244 10.5133 10.1523 10.0953C10.066 9.99837 9.96501 9.91751 9.85269 9.85052C7.9878 8.73822 5.08626 9.58539 3.33331 10.8285M9.78422 11.678C9.75989 11.6833 9.73552 11.686 9.71119 11.686M9.71119 11.686C9.36228 11.7218 8.95409 11.7311 8.50116 11.6883"
              stroke="#0065FF"
              stroke-linecap="round"
            />
            <rect
              x="1.33331"
              y="9.33325"
              width="2"
              height="5.33333"
              rx="1"
              stroke="#0065FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_68_368">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span> Make Your Offer </span>
      </button>
    </NuxtLink>
    <template v-if="!isMyPost">
      <div v-if="isHovered" class="overlay">
        <NuxtLink :to="`/posts/${index}`">
          <button class="create_offer">
            <span> Add Your Offer </span>
          </button>
        </NuxtLink>
      </div>
    </template>
    <template v-else>
      <div v-if="isHovered" class="overlay">
        <NuxtLink :to="`/posts/edit/${index}`">
          <button class="create_offer">
            <span> Edit My Post </span>
          </button>
        </NuxtLink>
      </div>
    </template>
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
  status: string;
  description: string;
  index: number;
  offers: string;
  isMyPost: boolean;
}>();

// Computed property to get the first 3 words of the title
const titleFirstThreeWords = computed(() => {
  if (!props.title) {
    return;
  }
  if (props.title.split(" ").length > 3) {
    return props.title.split(" ").slice(0, 3).join(" ") + "...";
  }
  return props.title;
});

// Computed property to get the first 8 words of the description
const descriptionFirstEightWords = computed(() => {
  if (!props.description) {
    return;
  }
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
}
.card .status span {
  font-size: 14px;
}
.card .status.open {
  background: #8fe3007a;
}
.card .status.open span {
  color: white;
}
.card .status.close {
  background: #ff05057a;
}
.card .status.close span {
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
