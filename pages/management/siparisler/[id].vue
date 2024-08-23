<template>
  <div class="grid gap-10">
    <UBreadcrumb :links="links" />
    <div class="grid gap-4 ">
      <div class="col-span-1 my-orta lg:my-0">
        <div class="grid md:grid-cols-2 gap-6 ">
          <PartialsOrderAddressCard class="p-4" @editedAddress="e => orderState.vendorOrder.order.shipping_address = e"
            :action-edit="true" title="Teslimat adresi" 
            :address="orderState.vendorOrder.order.shipping_address || {}" />
          <PartialsOrderAddressCard class="p-4" :action-edit="true" title="Fatura adresi" 
            @editedAddress="e => orderState.vendorOrder.order.billing_address = e"
            :address="orderState.vendorOrder.order.billing_address || {}" />
        </div>
      </div>
      <p class="font-medium">Sipariş içeriği</p>
      <PartialsOrderSummary :item="item" v-for="item in orderState.vendorOrder.order_items || []" :key="item.id" />
      <div class="my-orta lg:grid lg:grid-cols-3">
        <div class="col-span-2"></div>
        <div class="col-span-1 gap-2 grid">
          <div class="flex justify-between">
            <p class="font-medium">Ödeme yöntemi :</p>
            <p class="text-secondary-500">Havale / EFT</p>
          </div>
          <div class="flex justify-between">
            <p class="font-medium">Kargo :</p>
            <p class="text-secondary-500">Ücretsiz</p>
          </div>
          <div class="flex justify-between">
            <p class="font-medium">Genel toplam :</p>

            <b class="text-secondary-500 border-b-4 border-secondary-200">{{
              formatPrice(orderState.vendorOrder.subtotal) }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  layout: "admin",
});
const orderId = route.params.id
const orderState = useOrderManagementStore();

await useAsyncData('orderInManagement', async () => {
  await orderState.fetchVendorOrder(orderId)
  return true
})

const links = [{
  label: 'Siparişler',
  icon: 'i-heroicons-squares-2x2',
  to: '/management/siparisler'
}, {
  label: 'Sipariş #' + orderId,
  icon: 'i-heroicons-squares-plus'
}]

</script>