<template>
  <div class="my-minimal px-x-mobil lg:px-x-desktop">
    <div v-if="orderLoaded">
      <b>Siparişiniz alındı</b>

      <div class="my-minimal">
        <UiNotificationBar type="info">
          <span class="text-secondary-500">#000{{ order.id }}</span> Numaralı sipariniz başarıyla
          
          oluşturuldu. <span class="text-secondary-500">{{ formatPrice(order.total) }}</span> toplam tutarı
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

            <div class="my-orta flex justify-between w-[300px]">
              <div>
                <p class="font-medium">Ödeme yöntemi </p>
                <p class="font-medium">Kargo </p>
                <p class="font-medium">Genel toplam </p>

              </div>
              <div>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div>
                <p class="text-secondary-500">Havale / EFT</p>
                <p class="text-secondary-500">Ücretsiz</p>
                <b class="text-secondary-500 border-b-4 border-secondary-200">{{ formatPrice(order.total) }}</b>

              </div>
            </div>
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
    <pre>
    <!-- {{ order.order_items[0].variation.terms }} -->
   </pre>
  </div>

</template>

<script setup>
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
