<template>
    <div :class="props.index % 2 != 0 && 'bg-slate-50'"
        class="grid lg:grid-cols-2 gap-4 items-center my-minimal border p-2 rounded-md">
        <div class="h-full flex space-x-4">
            <div class="flex space-x-4">
                <NuxtImg width="70" class="object-cover rounded-md" :src="`aws/${props.item.product_thumb.path}`">
                </NuxtImg>
                <div>
                    <p class="font-medium">{{ props.item.product_name }}</p>
                    <div v-for="(value, key) in props.item.variation.attributes">

                        <div class="flex space-x-2 items-center">
                            <b>{{ key }} :</b>
                            <p>{{ value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <div class="rounded-full border p-1">
                <PartialsCartItemCounter :cart-item="props.item" />
            </div>
            <div>
                <div v-if="props.item.variation && props.item.variation.sale_price">
                  <del class="font-medium">{{ formatPrice(props.item.variation.price) }}</del>
                  <p class="text-orange-500 font-medium">{{ formatPrice(props.item.variation.sale_price) }}</p>
                </div>
                <div v-else>
                  <p class="font-medium">{{ formatPrice(props.item.variation ? props.item.variation.price : props.item.price) }}</p>
                </div>
              </div>
            <UButton @click="props.deleteCartItem(props.item)" icon="i-heroicons-x-mark" size="xs" color="red" square
                :ui="{ rounded: 'rounded-full' }" variant="soft" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['item', 'index', 'deleteCartItem'])
</script>