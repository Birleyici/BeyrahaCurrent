<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <div class="container mx-auto px-4 py-6">
            <!-- Sayfa Başlığı -->
            <div class="mb-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                            Sipariş Yönetimi
                        </h1>
                        <p class="text-neutral-600 dark:text-neutral-400">
                            Tüm siparişlerinizi görüntüleyin ve yönetin
                        </p>
                    </div>

                    <!-- İstatistik Kartları -->
                    <div class="flex gap-3">
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                            <div class="flex items-center space-x-2">
                                <div
                                    class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                    <UIcon name="i-heroicons-shopping-bag"
                                        class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Toplam</p>
                                    <p class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{
                                        orderState.vendorOrders?.length || 0 }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Masaüstü Görünüm - Tablo -->
            <div class="hidden lg:block">
                <div
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
                    <!-- Tablo Başlığı -->
                    <div
                        class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                                <UIcon name="i-heroicons-list-bullet"
                                    class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sipariş Listesi
                            </h3>
                        </div>
                    </div>

                    <!-- Tablo İçeriği -->
                    <div class="p-6">
                        <UTable sort-asc-icon="i-heroicons-arrow-up-20-solid"
                            sort-desc-icon="i-heroicons-arrow-down-20-solid" :sort-button="{
                                icon: 'i-heroicons-sparkles-20-solid',
                                color: 'primary',
                                variant: 'outline',
                                size: '2xs',
                                square: false,
                                ui: { rounded: 'rounded-full' },
                            }" class="w-full" :columns="orderState.orderListColumns" :rows="orders" :ui="{
                                th: {
                                    base: 'text-left rtl:text-right',
                                    padding: 'px-4 py-3.5',
                                    color: 'text-neutral-500 dark:text-neutral-400',
                                    font: 'font-semibold',
                                    size: 'text-sm'
                                },
                                td: {
                                    base: 'whitespace-nowrap',
                                    padding: 'px-4 py-4',
                                    color: 'text-neutral-900 dark:text-neutral-200',
                                    font: '',
                                    size: 'text-sm'
                                }
                            }">
                            <template #full_name-data="{ row }">
                                <NuxtLink :href="'/management/siparisler/' + row.id"
                                    class="font-semibold text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors duration-200">
                                    {{ row.full_name }}
                                </NuxtLink>
                            </template>

                            <template #total-data="{ row }">
                                <span class="font-semibold text-green-600 dark:text-green-400">
                                    {{ formatPrice(row.total) }}
                                </span>
                            </template>

                            <template #created_at-data="{ row }">
                                <span class="text-neutral-600 dark:text-neutral-400">
                                    {{ timeAgo(row.created_at) }}
                                </span>
                            </template>

                            <template #status-data="{ row }">
                                <div class="flex space-x-2">
                                    <UBadge :ui="{ rounded: 'rounded-full' }"
                                        :color="orderState.statuses[row.status].color">
                                        {{ orderState.statuses[row.status].text }}
                                    </UBadge>
                                    <UBadge :ui="{ rounded: 'rounded-full' }" color="secondary"
                                        v-if="row.shipping_code">
                                        {{ row.shipping_code }}
                                    </UBadge>
                                </div>
                            </template>

                            <template #actions-data="{ row }">
                                <div class="flex space-x-2">
                                    <UButton @click="deleteHandling(row.id)" icon="i-heroicons-trash" size="sm"
                                        color="red" variant="soft" class="hover:bg-red-100 dark:hover:bg-red-900/30" />
                                    <UButton v-if="row.status == 'processing'" icon="i-heroicons-qr-code"
                                        color="secondary" variant="soft" :loading="row.shippingLoading"
                                        @click="orderState.getShippingCode(row)" size="sm" />
                                </div>
                            </template>
                        </UTable>
                    </div>

                    <!-- Pagination -->
                    <div
                        class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                            <div class="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                                {{ (page - 1) * pageCount + 1 }}-{{ Math.min(page * pageCount,
                                    orderState.vendorOrders?.length || 0) }} / {{
                                    orderState.vendorOrders?.length || 0 }} sipariş
                            </div>
                            <UPagination v-model="page" :page-count="pageCount" :total="orderState.vendorOrders?.length"
                                :max="5" :ui="{
                                    wrapper: 'flex items-center gap-1',
                                    rounded: '!rounded-md',
                                    default: {
                                        size: 'sm'
                                    }
                                }" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobil Görünüm - Kart Listesi -->
            <div class="lg:hidden space-y-4">
                <div v-for="order in orders" :key="order.id"
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300">

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
                                    <NuxtLink :href="'/management/siparisler/' + order.id"
                                        class="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200">
                                        {{ order.full_name }}
                                    </NuxtLink>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-400">
                                        {{ timeAgo(order.created_at) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Tutar -->
                            <div class="text-right">
                                <p class="text-lg font-bold text-green-600 dark:text-green-400">
                                    {{ formatPrice(order.total) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Kart İçerik -->
                    <div class="p-4">
                        <div class="flex items-center justify-between">
                            <!-- Durum Badges -->
                            <div class="flex flex-wrap gap-2">
                                <UBadge :ui="{ rounded: 'rounded-full' }"
                                    :color="orderState.statuses[order.status].color">
                                    {{ orderState.statuses[order.status].text }}
                                </UBadge>
                                <UBadge :ui="{ rounded: 'rounded-full' }" color="secondary" v-if="order.shipping_code">
                                    {{ order.shipping_code }}
                                </UBadge>
                            </div>

                            <!-- Aksiyonlar -->
                            <div class="flex space-x-2">
                                <UButton @click="deleteHandling(order.id)" icon="i-heroicons-trash" size="sm"
                                    color="red" variant="soft" />
                                <UButton v-if="order.status == 'processing'" icon="i-heroicons-qr-code"
                                    color="secondary" variant="soft" :loading="order.shippingLoading"
                                    @click="orderState.getShippingCode(order)" size="sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobil Pagination -->
                <div v-if="orderState.vendorOrders?.length > pageCount"
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm">
                    <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <div class="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                            {{ (page - 1) * pageCount + 1 }}-{{ Math.min(page * pageCount,
                                orderState.vendorOrders?.length || 0) }}
                            / {{ orderState.vendorOrders?.length || 0 }} sipariş
                        </div>
                        <UPagination v-model="page" :page-count="pageCount" :total="orderState.vendorOrders?.length"
                            :max="5" :ui="{
                                wrapper: 'flex items-center gap-1',
                                rounded: '!rounded-md',
                                default: {
                                    size: 'sm'
                                }
                            }" />
                    </div>
                </div>
            </div>

            <!-- Boş Durum -->
            <div v-if="!orderState.vendorOrders?.length" class="text-center py-12">
                <div
                    class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
                </div>
                <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Henüz sipariş yok
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                    Siparişler gelmeye başladığında burada görünecek.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "admin",
});
const orderState = useOrderManagementStore();
const page = ref(1);
const pageCount = 10;

await useAsyncData('orderListInManagement', async () => {

    await orderState.fetchVendorOrders()
    return true
})

const orders = computed(() => {
    return orderState.vendorOrders.slice((page.value - 1) * pageCount, page.value * pageCount);
});

async function deleteHandling(subOrderId) {
    if (await useConfirmation("İşlem Onayı", "Siparişi silmek istediğinize emin misiniz?")) {
        await orderState.deleteSubOrder(subOrderId)
    }
}

</script>