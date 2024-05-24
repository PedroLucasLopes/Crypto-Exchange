<template>
  <div class="h-screen" id="home">
    <!-- <Header /> -->
    <div class="flex justify-center items-center w-44 m-auto">
      <img src="../assets/crypto_exhange_logo.png" alt="Crypto Exchange Logo" />
    </div>
    <main class="flex flex-wrap -mx-3">
      <TrendingCoins />
      <!-- <CompanyHoldings />
      <CoinCategory /> -->
    </main>
    <CoinInformation />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Footer from "../components/Footer.vue";
import TrendingCoins from "../components/TrendingCoins.vue";
import CompanyHoldings from "../components/CompanyHoldings.vue";
import CoinCategory from "../components/CoinCategory.vue";
import Header from "../components/Header.vue";
import CoinInformation from "../components/CoinInformation.vue";

export default defineComponent({
  name: "DashboardHome",
  components: {
    Header,
    TrendingCoins,
    CompanyHoldings,
    CoinCategory,
    CoinInformation,
    Footer,
  },
});
</script>
