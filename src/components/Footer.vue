<template>
  <footer
    class="w-full bg-transparent border-t-2 px-8 py-6 flex flex-col items-center lg:flex-row lg:justify-between mt-10 pr-3 pl-3 pt-4"
  >
    <p class="mb-2 lg:mb-0 lg:text-left text-end pl-5">
      © Copyright {{ currentYear }}
    </p>

    <div class="flex justify-center lg:justify-end text-end pr-5">
      <a href="#" class="hover:text-gray-900">Crypto Exchange Dashboard Test</a>
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
