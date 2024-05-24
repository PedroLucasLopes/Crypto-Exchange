<template>
  <header class="flex flex-wrap -mx-3 pb-3 mr-2 ml-2 pt-4">
    <div class="w-1/2 xl:w-1/4 px-3">
      <div
        class="w-full bg-slate-900 border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
      >
        <Crypto />
        <div class="text-gray-700">
          <p class="font-semibold text-3xl">
            {{
              (global.data && global.data.active_cryptocurrencies) ||
              "Loading..."
            }}
          </p>
          <p>Active Cryptocurrencies</p>
        </div>
      </div>
    </div>

    <div class="w-1/2 xl:w-1/4 px-3">
      <div
        class="w-full bg-slate-900 border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
      >
        <Markets />
        <div class="text-gray-700">
          <p class="font-semibold text-3xl">
            {{ (global.data && global.data.markets) || "Loading..." }}
          </p>
          <p>Markets</p>
        </div>
      </div>
    </div>

    <div class="w-1/2 xl:w-1/4 px-3">
      <div
        class="w-full bg-slate-900 border text-blue-400 rounded-lg flex items-center p-6"
      >
        <MarketCap />
        <div class="text-gray-700">
          <p class="font-semibold text-3xl">
            {{
              (global.data &&
                global.data.market_cap_change_percentage_24h_usd.toFixed(2) +
                  "%") ||
              "Loading..."
            }}
          </p>
          <p>Market Cap Percentage</p>
        </div>
      </div>
    </div>

    <div class="w-1/2 xl:w-1/4 px-3">
      <div
        class="w-full bg-slate-900 border text-blue-400 rounded-lg flex items-center p-6"
      >
        <OngoingIcos />
        <div class="text-gray-700">
          <p class="font-semibold text-3xl">
            {{ (global.data && global.data.ongoing_icos) || "Loading..." }}
          </p>
          <p>Ongoing Icos</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useGlobalCurrency } from "../stores/GetGlobalCurrency";
import Crypto from "../assets/Crypto.vue";
import Markets from "../assets/Markets.vue";
import MarketCap from "../assets/MarketCap.vue";
import OngoingIcos from "../assets/OngoingIcos.vue";

export default defineComponent({
  name: "Header",
  components: {
    Crypto,
    Markets,
    MarketCap,
    OngoingIcos,
  },
  setup() {
    const globalCurrency = useGlobalCurrency();
    const global = ref(globalCurrency.data);
    const updateInterval = 10 * 60 * 1000;
    let intervalId = null;

    const fetchData = async () => {
      try {
        await globalCurrency.fetch();
        global.value = globalCurrency.data;
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
      global,
      loading: globalCurrency.loading,
      error: globalCurrency.error,
    };
  },
});
</script>
