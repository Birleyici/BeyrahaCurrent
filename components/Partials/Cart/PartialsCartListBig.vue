<template>
    <div :class="props.index % 2 != 0 && 'bg-slate-50'"
        class="grid lg:grid-cols-2 gap-4 items-center my-minimal border p-2 rounded-md">
        <div class="h-full flex space-x-4">
            <div class="flex space-x-4">
                <NuxtImg v-if="props.item.image_path" width="70" class="object-cover rounded-md"
                    :src="`aws/${props.item.image_path}`" />
                <img class="w-[70px] h-[70px] rounded-md" src="/img-placeholder.jpg" v-else>
                <div>
                    <p class="font-medium">{{ props.item.product_name }}</p>

                    <!-- Display Variation Attributes -->
                    <div v-if="props.item.variation">
                        <div v-for="(value, key) in props.item.variation.attributes" :key="key"
                            class="text-sm flex space-x-2 items-center">
                            <p class="font-medium">{{ key }} :</p>
                            <p>{{ value }}</p>
                        </div>
                    </div>

                    <template v-if="props.item.input_value?.label">
                        <div class="flex space-x-2 items-center text-sm">
                            <p class="font-medium">{{ props.item.input_value.label }}:</p>
                            <p>{{ props.item.input_value.value?.length > 10 ? props.item.input_value.value.substring(0,
                                10) + '...' : props.item.input_value.value }}</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <div class="rounded-full border p-1 bg-white overflow-hidden">
                <PartialsCartItemCounter :cart-item="props.item" />
            </div>
            <div>
                <PartialsProductPrice type="card"
                    :sale-price="props.item.variation?.sale_price || props.item.sale_price"
                    :price="props.item.variation?.price || props.item.price" />
            </div>

            <UButton :disabled="loading" :loading="loading" @click="deleteHandle()" icon="i-heroicons-x-mark" size="xs"
                color="red" square :ui="{ rounded: 'rounded-full' }" variant="soft" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['item', 'index', 'deleteCartItem'])
const loading = ref(false)



const deleteHandle = async () => {
    loading.value = true
    await props.deleteCartItem(props.item)
    loading.value = false
}
</script>