<template>
  <div class="w-full xl:w-1/3 px-3 mr-3 ml-3 pt-4">
    <p class="text-xl font-semibold mb-2">🚀 Coin Categories</p>
    <div
      class="w-full h-72 bg-slate-900 border rounded-lg p-4 overflow-scroll scroll-smooth"
    >
      <div
        class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-2 sm:mb-5"
        v-for="category in coinCategory"
        :key="category.market_cap"
      >
        <div>
          <p class="font-semibold">{{ category.name }}</p>
          <p>
            💼 Market Cap:
            {{
              category.market_cap !== null
                ? category.market_cap.toFixed(2)
                : "Doesn't have a Market Cap Registered"
            }}
          </p>
        </div>
        <div class="flex" v-for="coins in category.top_3_coins">
          <img :src="coins" class="pr-3 w-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import { useCoinsCategories } from "../stores/GetCoinsCategories";

export default defineComponent({
  name: "CoinCategory",
  setup() {
    const coinCategories = useCoinsCategories();
    const coinCategory = ref([]);
    const updateInterval = 10 * 60 * 1000;
    let intervalId = null;

    const fetchData = async () => {
      try {
        await coinCategories.fetch();
        coinCategory.value = coinCategories.data;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    onMounted(() => {
      fetchData();
      intervalId = setInterval(fetchData, updateInterval);
    });

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    return {
      coinCategory,
      loading: coinCategories.loading,
      error: coinCategories.error,
    };
  },
});
</script>
