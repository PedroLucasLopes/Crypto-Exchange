<template>
  <footer
    class="w-full bg-transparent border-t-2 px-8 py-6 lg:flex justify-between items-center mt-10 pr-3 pl-3 pt-4"
  >
    <p class="mb-2 lg:mb-0">© Copyright {{ currentYear }}</p>

    <div class="flex">
      <a href="#" class="mr-6 hover:text-gray-900"
        >Crypto Exchange Dashboard Test</a
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    const actual = new Date();
    return {
      currentYear: actual.getFullYear(),
    };
  },
};
</script>
