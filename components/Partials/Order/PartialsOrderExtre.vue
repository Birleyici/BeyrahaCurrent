<template>
  <div class="my-orta flex justify-between w-[300px]">
    <div>
      <p class="font-medium">Ödeme yöntemi </p>
      <p class="font-medium">Kargo </p>
      <p class="font-medium">Genel toplam </p>
    </div>
    <div>
      <p>:</p>
      <p>:</p>
      <p>:</p>
    </div>
    <div>
      <p class="text-secondary-500">Havale / EFT</p>
      <p class="text-secondary-500">{{ props.shippingCost ? formatPrice(props.shippingCost) : Ücretsiz }}</p>
      <b class="text-secondary-500 border-b-4 border-secondary-200">{{ formatPrice(props.total + props.shippingCost)
        }}</b>

    </div>
  </div>
</template>
<script setup>
const props = defineProps(['total', 'shippingCost'])
</script>