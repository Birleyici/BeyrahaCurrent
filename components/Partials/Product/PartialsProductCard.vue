<template>

  <div class="border rounded-md">
    <div class="relative overflow-hidden cursor-pointer ">
      <NuxtLink :to="`/urun/${product.slug}`">

        <NuxtImg v-if="product.coverImage" :src="`aws/${product.coverImage}`" format="webp" quality="90" loading="lazy" width="200"
          class="rounded-t-sm duration-200 h-[350px] object-cover w-full hover:scale-110" />
        <img :src="img_placeholder" v-else
          class="rounded-t-sm duration-200 h-[350px] w-[250px] object-cover  hover:scale-110"
          alt="Ürün görseli yer tutucusu">

      </NuxtLink>
    </div>
    <div class="text-center py-4  w-64">
      <p class="text-sm px-2 py-2 font-medium">
        <NuxtLink :to="'/urun/' + product.slug">
          <b>Beyraha</b> {{ product.name }}
        </NuxtLink>
      </p>
      <div class="md:flex justify-center space-x-2 items-center">
        <del class="text-sm text-slate-400">450.00 TL</del>
        <p class="text-secondary-500 font-medium">345.00 TL</p>
      </div>
    </div>
    <pre>

  </pre>
  </div>
</template>

<script setup>
const { product } = defineProps(['product'])
const img_placeholder = '/img-placeholder.jpg' 
</script>
