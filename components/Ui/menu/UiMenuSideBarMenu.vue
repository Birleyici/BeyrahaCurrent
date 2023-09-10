<template>
  <div v-if="status">
    <div
      class="fixed left-0 bottom-0 top-0 flex z-10 duration-300"
      :class="status ? '' : '-translate-x-full'"
    >
      <div class="bg-white w-72 h-full">
        <slot></slot>
      </div>
      <div
        class="z-10"
        @click="
          () => {
            $emit('change-status', false);
          }
        "
      >
        <button>
          <Icon
            v-if="status"
            name="ion:ios-close-empty"
            class="w-24 h-24 lg:w-[500px] lg:h-[500px] lg:-m-32 !text-slate-50"
          />
        </button>
      </div>
    </div>
    <div
      v-if="status"
      @click="
        () => {
          $emit('change-status', false);
        }
      "
      class="bg-black w-full fixed right-0 left top-0 bottom-0 z-[9] opacity-20"
    ></div>
  </div>
</template>

<script setup>
const { status } = defineProps(["status"]);
</script>
