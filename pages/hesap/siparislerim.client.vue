<template>
  <div class="standart-section-spacing">
    <UBreadcrumb class="mb-4" :links="links" />

    <div class="lg:grid lg:grid-cols-4 mt-pad-2 gap-10 max-w-full">
      <div>
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3 mt-section-mobile lg:mt-0">
        <div class="space-y-pad-2">
          <PartialsOrderItem v-for="order, index in orderState.orders" :item="order" :key="order.id" :index="index">
            <div class="grid gap-4 mt-4">
              <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}" :addressOptions="{
                allAction: false
              }" />
              <PartialsOrderAddressCard title="Fatura Adresi" :addressOptions="{
                allAction: false
              }" :address="order.billing_address || {}" />
            </div>
          </PartialsOrderItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Siparişlerim - Beyraha',
})
const orderState = useOrderStoreFront()
useAsyncData('siparislerimInit', async () => {
  await orderState.getOrders()
})

const links = [{
  label: 'Hesabım',
  // icon: 'i-heroicons-squares-2x2',
  // to: '/management/urunler'
}, {
  label: 'Siparişlerim',
  // icon: 'i-heroicons-squares-plus'
}]
</script>
