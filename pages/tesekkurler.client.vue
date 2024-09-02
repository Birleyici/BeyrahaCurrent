<template>
  <div class="my-minimal px-x-mobil lg:px-x-desktop">
    <div v-if="orderLoaded">
      <b>Siparişiniz alındı</b>

      <div class="my-minimal">
        <UiNotificationBar type="info">
          <span class="text-secondary-500">#000{{ order.id }}</span> Numaralı sipariniz başarıyla
          
          oluşturuldu. <span class="text-secondary-500">{{ formatPrice(order.total_with_shipping) }}</span> toplam tutarı
          aşağıdaki banka bilgilerimize açıklama kısmına sipariş numaranızı yazarak
          gönderdiğinizde siparişiniz onaylanarak işleme alınacaktır.
        </UiNotificationBar>
      </div>

      <div class="my-orta lg:my-maximal">
        <div class="mb-orta lg:mb-maximal">
          <PartialsOrderBankInfo></PartialsOrderBankInfo>
        </div>
        <div class="lg:grid lg:grid-cols-3 gap-10">
          <div class="col-span-2">

            <div class="grid gap-4">
              <b>Sipariş içeriği</b>
              <div class="grid gap-4" v-for="sub_order in order.sub_orders ">
                <PartialsOrderSummary :item="item" v-for="item in sub_order.order_items || []" :key="item.id" />
              </div>
            </div>
            
            <PartialsOrderExtre :total="order?.total" :shipping-cost="order?.shipping_cost" />
          </div>

          <div class="col-span-1 my-orta lg:my-0">
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
  const response = await useBaseOFetch(`order`, {
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
