<template>
  <div class="border rounded-md max-w-[250px]">
    <div class="relative overflow-hidden cursor-pointer">
      <NuxtLink :to="props.product.product_url">
        <NuxtImg
          v-if="props.product.coverImage"
          :src="`aws/${props.product.coverImage}`"
          format="webp"
          quality="90"
          :loading="imgLoadingType"
          :preload ="imgPreload"
          width="400"
          height="600"
          fit="cover"
          class="rounded-t-md duration-200 w-full hover:scale-110"
        />
        <img
          v-else
          :src="img_placeholder"
          class="rounded-t-sm duration-200 h-[250px] md:h-[350px] w-[250px] object-cover hover:scale-110"
          alt="Ürün görseli yer tutucusu"
        />
      </NuxtLink>
    </div>
    <div class="p-4">
      <div class="text-sm text-center font-medium">
        <NuxtLink :to="props.product.product_url">
          {{ props.product.name }}
        </NuxtLink>
      </div>
      <div class="flex justify-center">
        <PartialsProductPrice type="card" :sale-price="props.product.sale_price" :price="props.product.price" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product', 'index'])
const img_placeholder = '/img-placeholder.jpg'
 
 const imgLoadingType = computed(()=>{
 return  props.index === 0 || props.index === 1 ? '' : 'lazy'
 })
 const imgPreload = computed(()=>{
  return props.index === 0 || props.index === 1 ? true : false
 })
</script>
