<template>
  <div class="standart-section-spacing">
    <div v-if="orderLoaded" class="space-y-section-mobile md:space-y-section-desktop">
      <div>
        <p class="mb-pad-2 font-bold">Siparişiniz alındı ✓</p>
        <UNotification description="This is a notification." :id="2" color="red"
          :close-button="{ icon: null, variant: 'soft' }" icon="i-heroicons-information-circle" :timeout="0"
          title="Notification">
          <template #title>
            <span class="text-secondary-500">#000{{ order.id }}</span> Numaralı sipariniz başarıyla
            oluşturuldu.
          </template>
          <template #description>
            <span class="text-secondary-500">{{ formatPrice(order.total_with_shipping) }}</span> toplam tutarı
            aşağıdaki banka bilgilerimize, açıklama kısmına sipariş numaranızı yazarak
            gönderdiğinizde siparişiniz onaylanarak işleme alınacaktır.
          </template>
        </UNotification>
      </div>

      <PartialsOrderBankInfo></PartialsOrderBankInfo>

      <div>
        <div class="lg:grid lg:grid-cols-3 gap-10">
          <div class="col-span-2 space-y-section-mobile">
            <div class="grid gap-4">
              <b>Sipariş içeriği</b>
              <div class="grid gap-4" v-for="sub_order in order.sub_orders ">
                <PartialsOrderSummary :item="item" v-for="item in sub_order.order_items || []" :key="item.id" />
              </div>
            </div>
            <PartialsOrderExtre :total="order?.total" :shipping-cost="order?.shipping_cost" />
          </div>
          <div class="col-span-1 my-pad-2 lg:my-0">
            <div class="grid gap-6 ">
              <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}" :addressOptions="{
                allAction: false
              }" />
              <PartialsOrderAddressCard title="Fatura Adresi" :addressOptions="{
                allAction: false
              }" :address="order.billing_address || {}" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Yükleniyor...
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Siparişiniz alındı - Beyraha',

})

const route = useRoute();
const order = ref({});
const orderLoaded = ref(false);

const getOrder = async () => {
  const response = await useBaseOFetchWithAuth(`order`, {
    query: {
      identifier: route.query.order,
    },
  });

  order.value = response;
  orderLoaded.value = true;
};

onMounted(async () => {
  await getOrder();
});

</script>
