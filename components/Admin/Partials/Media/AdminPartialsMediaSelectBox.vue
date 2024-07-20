<template>

    <div class="bg-tertiary-100 rounded-md p-minimal border space-y-4 my-minimal">
        <div class="flex flex-auto flex-wrap gap-4">
          <div class="relative" v-for="(item, index) in props.selectedImages" :key="index">
            <NuxtImg :class="{
              'border-2 border-secondary-500':
                item.id == coverImageId,
            }" class="w-16 h-16 object-cover rounded-md cursor-pointer" @click="coverImageId = item.id"
              :src="'aws' + item.path">
            </NuxtImg>

            <span v-if="item.id == coverImageId"
              class="absolute w-full bg-secondary-500 text-[10px] bottom-0 rounded-b-md text-white px-1 text-center">Kapak</span>
          </div>
        </div>

        <button @click="isOpenModal = true"
          class="w-full border-2 border-tertiary-300 p-minimal relative text-center overflow-hidden rounded-md border-dashed text-sm">
          <Icon name="mdi:image" class="absolute left-0 opacity-30 w-20 h-20 -top-2">
          </Icon>

          Ürün görsellerini seç
        </button>
      </div>
</template>

<script setup>
const isOpenModal = defineModel('isOpenModal')
const coverImageId = defineModel('coverImageId')
const props = defineProps(['selectedImages'])
</script>