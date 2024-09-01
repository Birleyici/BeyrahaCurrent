<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Siparişlerim</b>
    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 max-w-full">
      <div>
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3 mt-minimal lg:mt-0">
        <div class="space-y-minimal">
          <div v-for="order, index in orderState.orders">
            <PartialsOrderItem v-for="subOrder in order.sub_orders" :item="subOrder" :key="subOrder.id" :index="index">
              <div class="grid gap-4 mt-4">
                <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}"
                  :addressOptions="{
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
  </div>
</template>

<script setup>

const orderState = useOrderStoreFront()
useAsyncData('siparislerimInit', async () => {
  await orderState.getOrders()
})
</script>
