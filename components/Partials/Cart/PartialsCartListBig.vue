<template>
    <div
        class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="lg:grid lg:grid-cols-3 gap-6 items-center">
            <!-- Sol Taraf - Ürün Bilgileri -->
            <div class="lg:col-span-2 flex space-x-4">
                <!-- Ürün Resmi -->
                <div class="flex-shrink-0">
                    <NuxtLink v-if="props.item.image_path" :to="props.item.product_url" class="block">
                        <NuxtImg width="120" height="120" fit="cover"
                            class="w-24 h-24 lg:w-30 lg:h-30 object-cover rounded-lg border border-neutral-200"
                            :src="`cl/${props.item.image_path}`" />
                    </NuxtLink>
                    <div v-else
                        class="w-24 h-24 lg:w-30 lg:h-30 bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-center">
                        <UIcon name="i-heroicons-photo" class="w-8 h-8 text-neutral-400" />
                    </div>
                </div>

                <!-- Ürün Detayları -->
                <div class="flex-1 min-w-0">
                    <!-- Ürün Adı -->
                    <NuxtLink :to="props.item.product_url"
                        class="text-lg font-semibold text-neutral-900 hover:text-secondary-600 transition-colors duration-200 line-clamp-2 mb-3">
                        {{ props.item.product_name }}
                    </NuxtLink>

                    <!-- Varyasyon Özellikleri -->
                    <div v-if="props.item.variation" class="space-y-2 mb-4">
                        <div v-for="(value, key) in props.item.variation.attributes" :key="key"
                            class="flex items-center space-x-2 text-sm">
                            <span class="font-medium text-neutral-600">{{ key }}:</span>
                            <span class="text-neutral-800 bg-neutral-100 px-3 py-1 rounded-full">{{ value }}</span>
                        </div>
                    </div>

                    <!-- Özel Input Değeri -->
                    <div v-if="props.item.input_value?.label" class="mb-4">
                        <div class="flex items-center space-x-2 text-sm">
                            <span class="font-medium text-neutral-600">{{ props.item.input_value.label }}:</span>
                            <span class="text-neutral-800 bg-neutral-100 px-3 py-1 rounded-full">
                                {{ props.item.input_value.value?.length > 20 ? props.item.input_value.value.substring(0,
                                    20) + '...' : props.item.input_value.value }}
                            </span>
                        </div>
                    </div>

                    <!-- Mobilde Fiyat -->
                    <div class="lg:hidden mb-4">
                        <PartialsProductPrice type="card"
                            :sale-price="props.item.variation?.sale_price || props.item.sale_price"
                            :price="props.item.variation?.price || props.item.price" />
                    </div>
                </div>
            </div>

            <!-- Sağ Taraf - Fiyat ve Kontroller -->
            <div
                class="lg:col-span-1 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center space-y-0 lg:space-y-4">
                <!-- Masaüstünde Fiyat -->
                <div class="hidden lg:block">
                    <PartialsProductPrice type="card"
                        :sale-price="props.item.variation?.sale_price || props.item.sale_price"
                        :price="props.item.variation?.price || props.item.price" />
                </div>

                <!-- Miktar Kontrolü -->
                <div class="bg-neutral-50 rounded-full border border-neutral-200 p-1">
                    <PartialsCartItemCounter :cart-item="props.item" />
                </div>

                <!-- Silme Butonu -->
                <UButton :disabled="loading" :loading="loading" @click="deleteHandle()" icon="i-heroicons-trash"
                    size="sm" color="red" variant="ghost" class="hover:bg-red-50" />
            </div>
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

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>