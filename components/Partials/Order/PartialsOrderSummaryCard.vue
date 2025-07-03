<template>
    <div class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
        @click="navigateToDetail">

        <!-- Kart Header -->
        <div
            class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 rounded-t-xl p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div
                        class="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-shopping-bag"
                            class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">
                            #000{{ props.item.sub_orders?.[0]?.id || props.item.id }}
                        </h3>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400">
                            {{ formatDate(props.item.created_at) }}
                        </p>
                    </div>
                </div>

                <!-- Tutar -->
                <div class="text-right">
                    <p class="text-lg font-bold text-secondary-600 dark:text-secondary-400">
                        {{ formatPrice(props.item.total_with_shipping) }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Kart İçerik -->
        <div class="p-4">
            <div class="flex items-center justify-between">
                <!-- Sol Taraf - Ürün Bilgileri ve Durum -->
                <div class="flex items-center space-x-3">
                    <!-- Ürün Resimleri -->
                    <div class="flex -space-x-1">
                        <div v-for="(product, index) in displayedProducts" :key="index"
                            class="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm overflow-hidden bg-neutral-100 dark:bg-neutral-700"
                            :style="{ zIndex: 10 - index }">
                            <NuxtImg v-if="product.image?.path" :src="'cl/' + product.image.path" :alt="product.name"
                                class="w-full h-full object-cover" format="webp" quality="80" :width="32" :height="32"
                                fit="cover" />
                            <img v-else class="w-full h-full object-cover" src="/img-placeholder.jpg"
                                :alt="product.name">
                        </div>
                        <div v-if="remainingProductCount > 0"
                            class="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm bg-secondary-500 dark:bg-secondary-600 flex items-center justify-center"
                            style="z-index: 7">
                            <span class="text-xs font-medium text-white">+{{ remainingProductCount }}</span>
                        </div>
                    </div>

                    <!-- Ürün Sayısı ve Durum -->
                    <div>
                        <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {{ totalProductCount }} ürün
                        </p>
                        <UBadge :color="getStatusColor(getOrderStatus())" :label="getStatusLabel(getOrderStatus())"
                            size="xs" variant="soft" :ui="{ rounded: 'rounded-full' }" />
                    </div>
                </div>

                <!-- Sağ Taraf - Detay İkonu -->
                <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['item'])

// Siparişteki tüm ürünleri topla
const allProducts = computed(() => {
    if (!props.item?.sub_orders) {
        return []
    }

    const products = []
    props.item.sub_orders.forEach(subOrder => {
        if (subOrder.order_items) {
            subOrder.order_items.forEach(orderItem => {
                const product = {
                    id: orderItem.product_id || orderItem.id,
                    name: orderItem.product_name,
                    image: orderItem.image
                }
                products.push(product)
            })
        }
    })

    return products
})

// Toplam ürün sayısı
const totalProductCount = computed(() => {
    return allProducts.value.length
})

// Gösterilecek ürün resimleri (en fazla 3 tane)
const displayedProducts = computed(() => {
    const maxDisplay = 3
    return allProducts.value.slice(0, maxDisplay)
})

// Kalan ürün sayısı
const remainingProductCount = computed(() => {
    const maxDisplay = 3
    const remaining = totalProductCount.value - maxDisplay
    return remaining > 0 ? remaining : 0
})

// Sipariş durumunu doğru yerden al
const getOrderStatus = () => {
    // Eğer sub_orders varsa, ilk sub_order'ın durumunu al
    if (props.item?.sub_orders?.length > 0) {
        return props.item.sub_orders[0].status
    }
    // Fallback olarak ana order'ın durumunu al
    return props.item.status || 'pending'
}

// Durum rengini getir
const getStatusColor = (status) => {
    const statusColors = {
        'pending': 'yellow',
        'processing': 'blue',
        'prepared': 'orange',
        'shipped': 'green',
        'in_transit': 'yellow',
        'delivered': 'emerald',
        'cancelled': 'red',
        'returned': 'purple',
        'failed': 'red'
    }
    return statusColors[status] || 'gray'
}

// Durum etiketini getir
const getStatusLabel = (status) => {
    const statusLabels = {
        'pending': 'Beklemede',
        'processing': 'İşleme Alındı',
        'prepared': 'Hazırlandı',
        'shipped': 'Kargoya Verildi',
        'in_transit': 'Yolda',
        'delivered': 'Teslim Edildi',
        'cancelled': 'İptal Edildi',
        'returned': 'İade Edildi',
        'failed': 'Başarısız'
    }
    return statusLabels[status] || 'Bilinmiyor'
}

// Detay sayfasına git
const navigateToDetail = () => {
    const orderId = props.item.sub_orders?.[0]?.id || props.item.id
    navigateTo(`/hesap/siparislerim/${orderId}`)
}
</script>