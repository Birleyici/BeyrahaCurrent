<template>
  <div v-if="isOpen">
    <div
      class="p-minimal rounded-md fixed right-0 left-0 top-1/2 transform -translate-y-1/2 h-auto w-full max-w-[95%] lg:max-w-[800px] mx-auto bg-white z-10"
    >
      <div class="flex items-center justify-between">
        <b>{{ header }}</b>
        <button @click="$emit('status-change', false)">
          <Icon name="mdi:close" class="w-5 h-5"></Icon>
        </button>
      </div>
      <div class="my-minimal overflow-y-auto" :class="className">
        <slot></slot>
      </div>
      
    <div v-if="okButton"  class="flex justify-end">
      <UiButtonsBaseButton
        @click="$emit('status-change', false)"
        color="secondary"
        class="text-sm"
        >Tamam</UiButtonsBaseButton
      >
      </div>
    </div>

    <div
      @click="$emit('status-change', false)"
      class="fixed left-0 right-0 bottom-0 left-0 bg-black w-full h-full z-[4] opacity-30"
    ></div>
  </div>
</template>

<script setup>
const { header, isOpen, className, okButton } = defineProps(["isOpen", "className", "header", "okButton"]);
</script>
