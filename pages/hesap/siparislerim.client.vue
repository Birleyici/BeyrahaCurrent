<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Siparişlerim</b>
    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 max-w-full">
      <div>
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3 mt-minimal lg:mt-0">
        <div class="space-y-minimal">
          <div v-for="order in orderState.orders">
            <PartialsOrderItem v-for="subOrder, index in order.sub_orders" :item="subOrder" :index="index">
              <div class="grid gap-4 mt-4">
                <PartialsOrderAddressCard class="p-4" title="Teslimat adresi" :actions="false"
                  :address="order.shipping_address || {}" />
                <PartialsOrderAddressCard class="p-4" title="Fatura adresi" :actions="false"
                  :address="order.billing_address || {}" />
              </div>
            </PartialsOrderItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const orderState = useOrderStoreFront()
useAsyncData('siparislerimInit', async () => {
  await orderState.getOrders()
})
</script>
