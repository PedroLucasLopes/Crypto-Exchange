<template>
  <div class="w-full xl:w-1/3 px-3 mr-3 ml-3 pt-4">
    <p class="text-xl font-semibold mb-2">
      🪙 Principal Companies Holdings (Bitcoin)
    </p>
    <div class="w-full h-72 bg-slate-900 border rounded-lg p-4 mb-8 xl:mb-0">
      <Carousel itemsToShow="1" :autoplay="2800" :wrap-around="true">
        <Slide
          class="flex flex-col"
          v-for="companyHolding in company.companies"
          :key="companyHolding.total_holdings"
        >
          <div class="flex justify-center items-center">
            <p class="font-bold">{{ companyHolding.name }}</p>
          </div>
          <div class="flex flex-col justify-center items-center mt-16">
            <div class="flex justify-center items-start">
              <div class="flex flex-col items-start justify-center">
                <p class="mb-1">
                  🌎 Country:
                  <span class="font-semibold">{{
                    companyHolding.country
                  }}</span>
                </p>
                <p class="mb-1">
                  ⚡ Total Holdings:
                  <span class="font-semibold">{{
                    companyHolding.total_holdings
                  }}</span>
                </p>
                <p class="mb-1">
                  💲 Total Supply:
                  <span class="font-semibold"
                    >US${{ companyHolding.percentage_of_total_supply }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <p class="text-center mt-16">
        💸 Total Holdings:
        <span class="font-semibold">{{
          company && company.total_holdings
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { useCompanyHoldings } from "../stores/GetCompanyHoldings";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "CompanyHoldings",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const companies = useCompanyHoldings();
    const company = ref({});
    const updateInterval = 10 * 60 * 1000;
    let intervalId = null;

    const fetchData = async () => {
      try {
        await companies.fetch();
        company.value = companies.data;
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
      company,
      loading: companies.loading,
      error: companies.error,
    };
  },
});
</script>
