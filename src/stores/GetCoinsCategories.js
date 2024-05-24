import { defineStore } from "pinia";
import { instance } from "../api/instance";

export const useCoinsCategories = defineStore("coinCategory", {
  state: () => ({
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  }),
  actions: {
    async fetch() {
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;

      if (this.lastFetched && now - this.lastFetched < tenMinutes) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      try {
        const response = await instance.get("/coins/categories");
        this.data = response.data;
        this.lastFetched = now;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
