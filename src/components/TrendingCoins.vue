<template>
  <div class="xl:w-1/3 px-3 mb-12 mr-3 ml-3 pt-4">
    <p
      class="text-xl font-semibold mb-2 text-center md:text-start xl:text-start"
    >
      🔥Top 15 Trending Coins List
    </p>
    <Transition>
      <div
        class="w-full h-auto bg-slate-900 border rounded-lg p-4 mb-8 xl:mb-0 shadow-[0_20px_50px_rgba(227,_230,_228,_0.1)]"
      >
        <Carousel
          :autoplay="2500"
          :wrap-around="true"
          :breakpoints="breakpoints"
        >
          <Slide class="flex flex-col" v-for="coin in coins" :key="coin.id">
            <div class="flex flex-col justify-center">
              <div class="flex justify-center items-center mb-3">
                <img :src="coin.item.small" alt="" class="pr-3" />
                <p class="font-bold">{{ coin.item.name }}</p>
              </div>
              <p>
                💲 Price:
                <span class="font-semibold"
                  >US${{ coin.item.data.price.toFixed(3) }}</span
                >
              </p>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="grid grid-cols-2 w-auto mt-2">
                <div class="flex flex-wrap flex-col items-start justify-center">
                  <p>
                    💼 Market Cap:
                    <span class="font-semibold">{{
                      coin.item.data.market_cap
                    }}</span>
                  </p>
                  <p>
                    📈 Total Volume:
                    <span class="font-semibold">{{
                      coin.item.data.total_volume
                    }}</span>
                  </p>
                </div>
                <div class="text-start ml-6">
                  <p class="font-semibold">📊 Price Change in 24h:</p>
                  <ul>
                    <li>
                      BRL:
                      <span
                        :class="
                          getPercentageChangeClass(
                            coin.item.data.price_change_percentage_24h.brl
                          )
                        "
                        class="font-semibold"
                      >
                        R${{
                          coin.item.data.price_change_percentage_24h.brl.toFixed(
                            2
                          )
                        }}
                      </span>
                    </li>
                    <li>
                      USD:
                      <span
                        :class="
                          getPercentageChangeClass(
                            coin.item.data.price_change_percentage_24h.usd
                          )
                        "
                        class="font-semibold"
                      >
                        US${{
                          coin.item.data.price_change_percentage_24h.usd.toFixed(
                            2
                          )
                        }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <img :src="coin.item.data.sparkline" class="mt-2 w-60" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUnmounted, Transition } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { useCurrencyCoin } from "../stores/GetCurrencyCoin";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "TrendingCoins",
  components: {
    Carousel,
    Slide,
    Navigation,
    Transition,
  },
  data: () => ({
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    breakpoints: {
      640: {
        itemsToShow: 1,
        snapAlign: "start",
      },
      700: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      1024: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      1280: {
        itemsToShow: 3,
        snapAlign: "start",
      },
    },
  }),
  setup() {
    const coinStore = useCurrencyCoin();
    const coins = ref([]);
    const updateInterval = 10 * 60 * 1000;
    let intervalId = null;

    const fetchData = async () => {
      try {
        await coinStore.fetch();
        coins.value = coinStore.data;
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

    const getPercentageChangeClass = (percentageChange) => {
      return percentageChange >= 0 ? "text-green-500" : "text-red-500";
    };

    return {
      coins,
      getPercentageChangeClass,
      loading: coinStore.loading,
      error: coinStore.error,
    };
  },
});
</script>
