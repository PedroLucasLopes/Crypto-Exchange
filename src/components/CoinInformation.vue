<template>
  <div class="w-full xl:w-full px-3 pt-4">
    <div class="flex flex-col sm:flex-row w-full justify-center items-center">
      <p class="text-xl font-semibold mb-2 sm:mb-0">💎 Coins Information</p>
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <VaSelect
          v-model="value"
          :options="options"
          placeholder="Select a Cryptocurrency"
          class="mb-2 sm:mb-0 w-full sm:w-auto bg-slate-200 rounded-md font-semibold"
        />
        <VaSelect
          v-model="currency"
          :options="currencyOptions"
          placeholder="Select a Currency"
          class="mb-2 sm:mb-0 w-full sm:w-auto bg-slate-200 rounded-md font-semibold"
        />
      </div>
    </div>
    <Transition>
      <div class="w-full h-auto bg-slate-900 border rounded-lg p-4 shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col justify-center items-center">
            <p class="font-semibold text-2xl text-center mb-4">
              🪙
              {{
                value != "cosmos"
                  ? value.charAt(0).toUpperCase() + value.slice(1)
                  : "Cosmos (ATOM)"
              }}
            </p>
            <LineChart
              v-if="coinInfo"
              :chart-data="chartData"
              :options="chartOptions"
              class="w-full"
            />
            <VaButtonGroup gradient color="rgb(170, 105, 255)" class="mt-6">
              <VaButton @click="fetchDataForPeriod(5)">5 Days</VaButton>
              <VaButton @click="fetchDataForPeriod(15)">15 Days</VaButton>
              <VaButton @click="fetchDataForPeriod(30)">30 Days</VaButton>
              <VaButton @click="fetchDataForPeriod(60)">2 Months</VaButton>
            </VaButtonGroup>
          </div>
          <div class="w-full h-auto mt-6 md:mt-0">
            <div class="mb-10">
              <p class="text-xl mb-2">
                💸 Current Price:
                <span class="font-semibold">
                  {{ currency === "usd" ? "US$" : "R$" }}
                  {{
                    coinData &&
                    coinData.market_data.current_price[currency].toFixed(2)
                  }}
                </span>
              </p>
              <div class="flex flex-col mt-3 mb-10">
                <div class="flex justify-between">
                  <p>
                    🔺 High 24h:
                    <span class="font-semibold text-green-500">
                      {{ currency === "usd" ? "US$" : "R$" }}
                      {{
                        coinData &&
                        coinData.market_data.high_24h[currency].toFixed(2)
                      }}
                    </span>
                  </p>
                  <p>
                    🔻 Low 24h:
                    <span class="font-semibold text-red-500">
                      {{ currency === "usd" ? "US$" : "R$" }}
                      {{
                        coinData &&
                        coinData.market_data.low_24h[currency].toFixed(2)
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="mb-10">
              <p class="font-semibold mb-3 text-xl">📈 Coin Stats</p>
              <div class="flex flex-col md:flex-row md:justify-between">
                <p class="mb-2 md:mb-0">
                  😲 Circulating Supply:
                  <span class="font-semibold">
                    {{ coinData && coinData.market_data.circulating_supply }}
                  </span>
                </p>
                <p>
                  🤯 Total Supply:
                  <span class="font-semibold">
                    {{ coinData && coinData.market_data.total_supply }}
                  </span>
                </p>
              </div>
              <div class="flex flex-col md:flex-row md:justify-between mt-3">
                <p class="mb-2 md:mb-0">
                  🤑 Price Change 24h:
                  <span
                    class="font-semibold"
                    :class="
                      getPercentageChangeClass(
                        coinData &&
                          coinData.market_data.price_change_24h_in_currency[
                            currency
                          ]
                      )
                    "
                  >
                    {{ currency === "usd" ? "US$" : "R$" }}
                    {{
                      coinData &&
                      coinData.market_data.price_change_24h_in_currency[
                        currency
                      ].toFixed(1)
                    }}
                  </span>
                </p>
                <p>
                  📣 Market Cap Rank:
                  <span class="font-semibold">
                    {{ coinData && coinData.market_data.market_cap_rank }}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <p class="font-semibold mb-3 text-xl">💯 Coin Percentages</p>
              <div class="flex flex-col">
                <div class="flex justify-between mb-3">
                  <p>
                    🕒 Price Change 1h (%):
                    <span
                      class="font-semibold"
                      :class="
                        getPercentageChangeClass(
                          coinData &&
                            coinData.market_data
                              .price_change_percentage_1h_in_currency[currency]
                        )
                      "
                    >
                      {{
                        coinData &&
                        coinData.market_data.price_change_percentage_1h_in_currency[
                          currency
                        ].toFixed(1)
                      }}%
                    </span>
                  </p>
                  <p>
                    ⏰ Price Change 24h (%):
                    <span
                      class="font-semibold"
                      :class="
                        getPercentageChangeClass(
                          coinData &&
                            coinData.market_data
                              .price_change_percentage_24h_in_currency[currency]
                        )
                      "
                    >
                      {{
                        coinData &&
                        coinData.market_data.price_change_percentage_24h_in_currency[
                          currency
                        ].toFixed(1)
                      }}%
                    </span>
                  </p>
                </div>
                <div class="flex justify-between mb-3">
                  <p>
                    📅 Price Change 14d (%):
                    <span
                      class="font-semibold"
                      :class="
                        getPercentageChangeClass(
                          coinData &&
                            coinData.market_data
                              .price_change_percentage_14d_in_currency[currency]
                        )
                      "
                    >
                      {{
                        coinData &&
                        coinData.market_data.price_change_percentage_14d_in_currency[
                          currency
                        ].toFixed(1)
                      }}%
                    </span>
                  </p>
                  <p>
                    ⌛ Price Change 30d (%):
                    <span
                      class="font-semibold"
                      :class="
                        getPercentageChangeClass(
                          coinData &&
                            coinData.market_data
                              .price_change_percentage_30d_in_currency[currency]
                        )
                      "
                    >
                      {{
                        coinData &&
                        coinData.market_data.price_change_percentage_30d_in_currency[
                          currency
                        ].toFixed(1)
                      }}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent, Transition } from "vue";
import { VaSelect, VaButtonGroup, VaButton } from "vuestic-ui";
import { useCoinChart } from "../stores/GetCoinChart";
import { useCoinInformation } from "../stores/GetCoinInformation";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "CoinInformation",
  components: { VaSelect, LineChart, Transition },
  data() {
    return {
      value: "bitcoin",
      currency: "usd",
      coinInfo: null,
      coinData: null,
      options: ["bitcoin", "ethereum", "cosmos", "dacxi"],
      currencyOptions: ["usd", "brl"],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Price",
            backgroundColor: "rgb(170, 105, 255)",
            borderColor: "rgb(160, 87, 255)",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(240, 248, 255, 0.3)",
            },
            ticks: {
              color: "rgb(240, 248, 255)",
            },
          },
          x: {
            grid: {
              color: "rgba(240, 248, 255, 0.3)",
            },
            ticks: {
              color: "rgb(240, 248, 255)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgb(240, 248, 255)",
            },
          },
        },
        layout: {
          backgroundColor: "rgb(240, 248, 255)",
        },
      },
    };
  },

  setup() {
    const coinChart = useCoinChart();
    const coinInformation = useCoinInformation();

    return { coinChart, coinInformation };
  },

  mounted() {
    this.updateCoinChart(this.value, this.currency);
    this.updateCoinInformation(this.value);
  },

  watch: {
    value(newValue) {
      this.updateCoinChart(newValue, this.currency);
      this.updateCoinInformation(newValue);
    },
    currency(newCurrency) {
      this.updateCoinChart(this.value, newCurrency);
    },
    coinInfo(newInfo) {
      this.updateChart(newInfo);
    },
  },
  methods: {
    async fetchDataForPeriod(days) {
      try {
        this.selected_days = days;
        await this.coinChart.fetch(
          this.value,
          this.currency,
          this.selected_days
        );
        this.coinInfo = this.coinChart.data;
      } catch (error) {
        console.error("Erro ao buscar informações da moeda:", error);
      }
    },

    async updateCoinChart(coinName, currency) {
      try {
        await this.coinChart.fetch(coinName, currency);
        this.coinInfo = this.coinChart.data;
      } catch (error) {
        console.error("Erro ao buscar informações da moeda:", error);
      }
    },

    async updateCoinInformation(coinName) {
      try {
        await this.coinInformation.fetch(coinName);
        this.coinData = this.coinInformation.data;
      } catch (error) {
        console.error("Erro ao buscar informações da moeda:", error);
      }
    },

    updateChart(newInfo) {
      if (newInfo) {
        const labels = newInfo.total_volumes.map((volumeData) => {
          const timestamp = volumeData[0];
          const date = new Date(timestamp);
          date.setMinutes(Math.floor(date.getMinutes() / 10) * 10);
          date.setSeconds(0);
          date.setMilliseconds(0);

          const hours_and_minutes = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const day_and_month = date.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
          });

          const period_date =
            this.selected_days >= 5 ? day_and_month : hours_and_minutes;
          return period_date;
        });
        const prices = newInfo.prices.map((priceData) => priceData[1]);

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = prices;
      }
    },

    getPercentageChangeClass(percentageChange) {
      return percentageChange >= 0 ? "text-green-500" : "text-red-500";
    },
  },
});
</script>
