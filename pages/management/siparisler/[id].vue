<template>
  <div class="grid md:gap-10">
    <UBreadcrumb :links="links" />

    <div class="grid gap-4 ">
      <div class="col-span-1 my-pad-2 lg:my-0">
        <div class="grid md:grid-cols-2 gap-6 ">
          <PartialsOrderAddressCard :address-options="{
            editMode: editingMode
          }" :save-function="orderState.saveAddress" class="p-4" title="Teslimat adresi"
            :address="order.shipping_address || {}" />
          <PartialsOrderAddressCard :address-options="{
            editMode: editingMode
          }" v-if="isAddressesDifferent" :save-function="orderState.saveAddress" class="p-4" title="Fatura adresi"
            :address="order.billing_address || {}" />
          <div class="border rounded-md p-4 ">
            <div class="grid gap-4">
              <div>
                <label class="text-sm">Sipariş durumu: </label>
                <UBadge :ui="{ rounded: 'rounded-full' }" :color="badge.color">{{ badge.text }}</UBadge>
              </div>

              <UNotification v-if="orderState.vendorOrder.shipping_code" :id="7" title="Sürat kargo kodu"
                :description="orderState.vendorOrder.shipping_code" :timeout="0" />

              <div class="flex space-x-2 ">
                <UButton label="Kargo kodu al" color="orange" :loading="orderState.vendorOrder.shippingLoading"
                  v-if="orderState.vendorOrder.status == 'processing'"
                  @click="orderState.getShippingCode(orderState.vendorOrder)" size="xs" />

                <UButton label="Onayla" color="primary" :loading="orderState.vendorOrder.loadingState === 'processing'"
                  v-if="orderState.vendorOrder.status == 'pending'"
                  @click="orderState.updateStatus(orderState.vendorOrder, 'processing')" size="xs" />

                <UButton
                  v-if="orderState.vendorOrder.status == 'processing' || orderState.vendorOrder.status == 'pending'"
                  label="İptal et" color="red" :loading="orderState.vendorOrder.loadingState === 'cancelled'"
                  @click="cancelHandling()" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <p class="font-medium">Sipariş içeriği</p>
        <div class="flex items-center space-x-2">
          <p class="text-xs">Düzenleme modu:</p>
          <UToggle v-model="editingMode" />
        </div>
      </div>
      <PartialsOrderSummary :editing-mode="editingMode" :deletable="true" :item="item"
        v-for="item in orderState.vendorOrder.order_items || []" :key="item.id" />
      <!-- <div v-if="editingMode" class="flex justify-end">
        <UButton @click="isOpenAddProductModal=true" label="Ürün ekle" color="gray" />
       </div> -->
      <div class="my-pad-2 lg:grid lg:grid-cols-3">
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
    <UModal v-model="isOpenAddProductModal">
      <div class="p-4 h-72">
      </div>
    </UModal>
  </div>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  layout: "admin",
});
const orderId = route.params.id
const orderState = useOrderManagementStore();
const editingMode = ref(false)
const isOpenAddProductModal = ref(false)

const badge = computed(() => {
  return orderState.statuses[orderState.vendorOrder.status] || { color: 'gray', text: 'Bilinmeyen' };
});


await useAsyncData('orderInManagement', async () => {
  await orderState.fetchVendorOrder(orderId)
  return true
})

const order = orderState.vendorOrder?.order
const isAddressesDifferent = computed(() => {
  return order.shipping_address.id !== order.billing_address.id
})

const links = [{
  label: 'Siparişler',
  icon: 'i-heroicons-squares-2x2',
  to: '/management/siparisler'
}, {
  label: 'Sipariş #' + orderId,
  icon: 'i-heroicons-squares-plus'
}]

const cancelHandling = async () => {

  if (await useConfirmation("İşlem Onayı", "Siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
    orderState.updateStatus(orderState.vendorOrder, 'cancelled')
  }
}

</script>