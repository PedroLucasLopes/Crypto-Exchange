import { defineStore } from "pinia";
import { instance } from "../api/instance";

export const useCurrencyCoin = defineStore("coin", {
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
        const response = await instance.get("/search/trending");
        this.data = response.data.coins;
        this.lastFetched = now;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
