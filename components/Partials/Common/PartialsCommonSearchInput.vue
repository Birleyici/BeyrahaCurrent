<template>
  <div
    v-if="!useMain().isMobile || useMain().isOpenSearch"
    class="min-w-[50px] lg:w-[500px]"
    :class="{
      'absolute right-0 left-0 lg:!w-full lg:px-x-desktop !border-b-transparent': useMain()
        .isOpenSearch,
    }"
  >
    <div class="items-center relative w-11/12 lg:w-full flex mx-auto">
      <input
        ref="searchInput"
        @focus="useMain().isOpenSearch = true"
        @blur="useMain().isOpenSearch = false"
        type="text"
        v-model="searchWord"
        class="focus:p-3 rounded-xl w-full bg-slate-100 focus:bg-white px-4 py-2 focus:outline-0 duration-200 z-[4]"
        placeholder="Ara..."
      />
      <Icon
        v-if="!useMain().isOpenSearch || (useMain().isOpenSearch && !searchWord)"
        name="ph:magnifying-glass"
        class="w-6 h-6 absolute z-[10] right-2"
        color="black"
      />
      <Icon
        v-if="useMain().isOpenSearch && searchWord"
        name="eos-icons:loading"
        class="w-6 h-6 absolute right-2 z-[5]"
        color="black"
      />
    </div>
  </div>
  <div
    class="opacity-40 bg-black absolute bottom-0 top-0 right-0 left-0 w-full z-[3]"
    v-if="useMain().isOpenSearch"
  ></div>
</template>

<script setup>
const status = ref(false);
const searchWord = ref(null);
const searchInput = ref(null);
watch(
  () => useMain().isOpenSearch,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        searchInput.value.focus();
      });
    }
  }
);
</script>
