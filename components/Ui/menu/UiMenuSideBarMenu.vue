<template>
  <div>
    <div
      class="fixed bottom-0 top-0 flex z-[11] duration-300"
      :class="{
        '-translate-x-full': !status && !position,
        'translate-x-full': !status && position,
        'left-0': !position,
        'right-0 flex-row-reverse': position,
      }"
    >
      <div class="bg-white w-full lg:w-[400px] h-full">
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
        <button class="overflow-hidden">
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
const { status, position } = defineProps(["status", "position"]);
</script>
