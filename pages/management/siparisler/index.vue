<template>
    <div class="py-10">
        <UTable sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
            :sort-button="{
                icon: 'i-heroicons-sparkles-20-solid',
                color: 'primary',
                variant: 'outline',
                size: '2xs',
                square: false,
                ui: { rounded: 'rounded-full' },
            }" class="w-full" :columns="orderState.orderListColumns" :rows="orders">
            <template #full_name-data="{ row }">
                <NuxtLink :href="'/management/siparisler/' + row.id" class="text-blue-500 font-bold">{{
                    row.full_name }}
                </NuxtLink>
            </template>

            <template #total-data="{ row }">
                {{ formatPrice(row.total) }}
            </template>
            <template #created_at-data="{ row }">
                {{ timeAgo(row.created_at) }}
            </template>
            <template #status-data="{ row }">
               <div class="flex space-x-2">
                <UBadge :ui="{ rounded: 'rounded-full' }" :color="orderState.statuses[row.status].color">
                    {{ orderState.statuses[row.status].text }}
                </UBadge>
                <UBadge :ui="{ rounded: 'rounded-full' }" color="orange" v-if="row.shipping_code" >
                    {{ row.shipping_code }}
                </UBadge>
               </div>
            </template>
            <template #actions-data="{ row }">
                <div class="my-auto h-full flex space-x-2">
                    <UButton @click="deleteHandling(row.id)" icon="i-heroicons-trash" size="2xs" color="red"
                        variant="solid" :trailing="false" />
                        <UButton icon="i-heroicons-qr-code" color="orange" v-if="row.status == 'processing'"
                        :loading="row.shippingLoading" @click="orderState.getShippingCode(row)" size="2xs" />
                </div>
            </template>
        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="orderState.vendorOrders?.length" />
        </div>

    </div>
</template>

<script setup>

definePageMeta({
    layout: "admin",
});
const orderState = useOrderManagementStore();
const page = ref(1);
const pageCount = 5;

await useAsyncData('orderListInManagement', async () => {

    await orderState.fetchVendorOrders()
    return true
})

const orders = computed(() => {
    return orderState.vendorOrders.slice((page.value - 1) * pageCount, page.value * pageCount);
});

async function deleteHandling(orderId) {
    if (await useConfirmation("İşlem Onayı", "Siparişi silmek istediğinize emin misiniz?")) {
        await orderState.deleteOrder(orderId)
    }
}

</script>