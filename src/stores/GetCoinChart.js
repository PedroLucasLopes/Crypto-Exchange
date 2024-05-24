import { defineStore } from "pinia";
import { instance } from "../api/instance";

export const useCoinChart = defineStore("coinChart", {
  state: () => ({
    data: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetch(coin = "bitcoin", currency = "usd", past_days = 1) {
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;
      const date = new Date();
      const today = date.valueOf();
      const timestamp_to = Math.floor(today / 1000);
      const selected_date = date.setDate(date.getDate() - past_days);
      const from_timestamp = Math.floor(selected_date / 1000);
      this.loading = true;
      this.error = null;

      try {
        const response = await instance.get(
          `/coins/${coin}/market_chart/range?vs_currency=${currency}&from=${from_timestamp}&to=${timestamp_to}`
        );
        this.data = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
