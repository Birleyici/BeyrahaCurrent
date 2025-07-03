<template>
    <div>
        <NuxtLayout name="account">
            <!-- Yükleniyor Durumu -->
            <div v-if="!orderLoaded" class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <div
                        class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <UIcon name="i-heroicons-arrow-path"
                            class="w-8 h-8 text-secondary-600 dark:text-secondary-400 animate-spin" />
                    </div>
                    <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Sipariş detayı yükleniyor...
                    </p>
                </div>
            </div>

            <!-- Ana İçerik -->
            <div v-else-if="order">
                <!-- Geri Dön Butonu -->
                <div class="mb-6">


                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1
                                class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                                Sipariş Detayı #000{{ order.sub_orders?.[0]?.id || order.id }}
                            </h1>
                            <div class="flex items-center space-x-4">
                                <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                                    {{ formatDate(order.created_at) }}
                                </p>
                                <UBadge :color="getStatusColor(getOrderStatus())"
                                    :label="getStatusLabel(getOrderStatus())" variant="soft" />
                            </div>
                        </div>

                        <div class="text-right">
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">Toplam Tutar</p>
                            <p class="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                                {{ formatPrice(order.total_with_shipping) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Sipariş İçeriği -->
                <div class="grid gap-6 lg:grid-cols-3">
                    <!-- Sol Taraf - Sipariş Ürünleri -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Sipariş Ürünleri -->
                        <div
                            class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                            <h2
                                class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                                <UIcon name="i-heroicons-shopping-bag"
                                    class="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                                Sipariş Ürünleri
                            </h2>

                            <div class="space-y-4">
                                <div v-for="subOrder in order.sub_orders" :key="subOrder.id" class="space-y-3">
                                    <PartialsOrderSummary v-for="subOrderItem in subOrder.order_items"
                                        :key="subOrderItem.id" :item="subOrderItem" />
                                </div>
                            </div>
                        </div>

                        <!-- Sipariş Özeti -->
                        <div v-if="order.order_summary"
                            class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                            <h2
                                class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                                <UIcon name="i-heroicons-calculator"
                                    class="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" />
                                Sipariş Özeti
                            </h2>

                            <div class="space-y-3">
                                <!-- Ara Toplam -->
                                <div class="flex justify-between">
                                    <span class="text-neutral-600 dark:text-neutral-400">Ara Toplam:</span>
                                    <span class="font-medium text-neutral-900 dark:text-neutral-100">
                                        {{ order.order_summary.formatted.subtotal }}
                                    </span>
                                </div>

                                <!-- Kupon İndirimi -->
                                <div v-if="order.order_summary.has_discount" class="flex justify-between">
                                    <span class="text-neutral-600 dark:text-neutral-400 flex items-center">
                                        <span>Kupon İndirimi</span>
                                        <UBadge v-if="order.order_summary.coupon_code" size="xs" color="green"
                                            variant="soft" class="ml-2">
                                            {{ order.order_summary.coupon_code }}
                                        </UBadge>
                                    </span>
                                    <span class="font-medium text-red-600 dark:text-red-400">
                                        -{{ order.order_summary.formatted.discount_amount }}
                                    </span>
                                </div>

                                <!-- Kargo -->
                                <div class="flex justify-between">
                                    <span class="text-neutral-600 dark:text-neutral-400">Kargo:</span>
                                    <span class="font-medium"
                                        :class="order.order_summary.shipping_cost > 0 ? 'text-neutral-900 dark:text-neutral-100' : 'text-green-600 dark:text-green-400'">
                                        {{ order.order_summary.formatted.shipping_cost }}
                                    </span>
                                </div>

                                <!-- Toplam -->
                                <div
                                    class="flex justify-between pt-3 border-t border-neutral-200 dark:border-neutral-600">
                                    <span class="font-semibold text-neutral-900 dark:text-neutral-100">Toplam:</span>
                                    <span class="font-bold text-lg text-secondary-600 dark:text-secondary-400">
                                        {{ order.order_summary.formatted.total }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sağ Taraf - Adres Bilgileri -->
                    <div class="space-y-6">
                        <!-- Teslimat Adresi -->
                        <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}"
                            :address-options="{ allAction: false }" />

                        <!-- Fatura Adresi -->
                        <PartialsOrderAddressCard title="Fatura Adresi" :address="order.billing_address || {}"
                            :address-options="{ allAction: false }" />
                    </div>
                </div>
            </div>

            <!-- Hata Durumu -->
            <div v-else class="text-center py-12">
                <div
                    class="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 dark:text-red-400" />
                </div>
                <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Sipariş bulunamadı
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400 mb-6">
                    Aradığınız sipariş mevcut değil veya erişim izniniz bulunmuyor.
                </p>
                <UButton to="/hesap/siparislerim" color="secondary" label="Siparişlerime Dön" />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const { siteName } = useSettings()

definePageMeta({
    layout: 'default'
})

useHead({
    title: computed(() => `Sipariş Detayı - ${siteName.value}`)
})

const orderState = useOrderStoreFront()

// Loading state
const orderLoaded = ref(false)
const order = ref(null)

// Sipariş durumunu doğru yerden al
const getOrderStatus = () => {
    // Eğer sub_orders varsa, ilk sub_order'ın durumunu al
    if (order.value?.sub_orders?.length > 0) {
        return order.value.sub_orders[0].status
    }
    // Fallback olarak ana order'ın durumunu al
    return order.value?.status || 'pending'
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

// Siparişi getir
const fetchOrder = async () => {
    try {
        const orderId = route.params.id

        // Önce tüm siparişleri getir (eğer yoksa)
        if (!orderState.orders?.length) {
            await orderState.getOrders()
        }

        // Sipariş ID'sine göre ara
        order.value = orderState.orders?.find(o => {
            const subOrderId = o.sub_orders?.[0]?.id || o.id
            return subOrderId == orderId
        })

        orderLoaded.value = true
    } catch (error) {
        console.error('Sipariş detayı yüklenirken hata:', error)
        orderLoaded.value = true
    }
}

// İlk yükleme
onMounted(() => {
    fetchOrder()
})
</script>