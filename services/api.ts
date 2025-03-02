export const useApi = () => {
  const baseURL = process.env.API_BASE_URL;

  return {
    async get(endpoint: string) {
      return await $fetch(`${baseURL}${endpoint}`);
    },
    async post(endpoint: string, body: any) {
      return await $fetch(`${baseURL}${endpoint}`, {
        method: "POST",
        body,
      });
    },
    async delete(endpoint: string) {
      return await $fetch(`${baseURL}${endpoint}`, {
        method: "DELETE",
      });
    },
  };
};
