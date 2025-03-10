import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRuntimeConfig } from "#imports";

interface Offer {
  id: string; // Unique identifier for the offer
  postId: string; // ID of the post this offer belongs to
  image: File[]; // Array of files (e.g., images)
  title: string; // Title of the offer
  place: string; // Location of the offer
  details: string; // Description of the offer
  category_uuid: string; // Category ID for the offer
  post_uuid: string; // Post ID for the offer
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const useOfferStore = defineStore("offers", {
  state: () => ({
    offers: [] as Offer[], // Array to store offers
  }),

  actions: {
    /**
     * Add a new offer.
     * @param formData - FormData containing the offer details.
     */
    async addOffer(formData: FormData): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/offer/store`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          return { success: true, message: "Offer added successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to add offer.",
          };
        }
      } catch (error) {
        console.error("Add Offer Error:", error);
        return { success: false, message: "Failed to add offer." };
      }
    },

    /**
     * Delete an offer by its ID.
     * @param offerId - ID of the offer to delete.
     */
    async deleteOffer(offerId: string): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(
          `${config.public.API_BASE_URL}/offer/${offerId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.status) {
          return { success: true, message: "Offer deleted successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to delete offer.",
          };
        }
      } catch (error) {
        console.error("Delete Offer Error:", error);
        return { success: false, message: "Failed to delete offer." };
      }
    },
    /**
     * Fetch an offer by its ID.
     * @param offerId - ID of the offer to fetch.
     */
    async fetchOfferById(offerId: string): Promise<ApiResponse<Offer>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response = await $fetch<ApiResponse<Offer>>(
          `${config.public.API_BASE_URL}/offer/${offerId}/edit`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );
        console.log(response);
        
        if (response.status) {
          return { success: true, data: response.data.item };
        } else {
          return {
            success: false,
            message: response.message || "Failed to fetch offer.",
          };
        }
      } catch (error) {
        console.error("Fetch Offer Error:", error);
        return { success: false, message: "Failed to fetch offer." };
      }
    },

    /**
     * Update an existing offer.
     * @param offerId - ID of the offer to update.
     * @param formData - FormData containing the updated offer details.
     */
    async updateOffer(
      offerId: string,
      formData: FormData
    ): Promise<ApiResponse<void>> {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();

      try {
        const response = await $fetch<ApiResponse<void>>(
          `${config.public.API_BASE_URL}/offer/${offerId}/update`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${authStore.authToken}`,
            },
          }
        );

        if (response.success) {
          return { success: true, message: "Offer updated successfully." };
        } else {
          return {
            success: false,
            message: response.message || "Failed to update offer.",
          };
        }
      } catch (error) {
        console.error("Update Offer Error:", error);
        return { success: false, message: "Failed to update offer." };
      }
    },
  },

  persist: true, // Enable persistence if needed
});
