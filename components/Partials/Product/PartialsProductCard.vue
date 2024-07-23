<template>
  <div class="border rounded-md max-w-[250px]">
    <div class="relative overflow-hidden cursor-pointer">
      <NuxtLink :to="`/urun/${productState.product.slug}`">
        <NuxtImg
          v-if="productState.product.coverImage"
          :src="`aws/${productState.product.coverImage}`"
          format="webp"
          quality="90"
          loading="lazy"
          width="200"
          class="rounded-t-sm duration-200 h-[350px] object-cover w-full hover:scale-110"
        />
        <img
          v-else
          :src="img_placeholder"
          class="rounded-t-sm duration-200 h-[350px] w-[250px] object-cover hover:scale-110"
          alt="Ürün görseli yer tutucusu"
        />
      </NuxtLink>
    </div>
    <div class="p-4">
      <div class="text-sm text-center font-medium">
        <NuxtLink :to="'/urun/' + productState.product.slug">
          {{ productState.product.name }}
        </NuxtLink>
      </div>
      <div class="md:flex justify-center md:space-x-2 items-center text-center">
        <del v-if="productState.product.sale_price" class="text-sm text-slate-400">{{ productState.product.price }} TL</del>
        <p :class="{'text-secondary-500 font-medium': productState.product.sale_price, 'text-primary-500': !productState.product.sale_price}">
          {{ productState.product.sale_price || productState.product.price }} TL
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const productState = defineProps(['product'])
const img_placeholder = '/img-placeholder.jpg' 
</script>
