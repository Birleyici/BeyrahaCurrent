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
            <b>Sipariş içeriği</b>

            <PartialsOrderSummary :item="item" v-for="item in order.order_items || []" :key="item.id" />

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
                  <b class="text-secondary-500 border-b-4 border-secondary-200">{{ formatPrice(order.total) }}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1 my-orta lg:my-0">
            <div class="grid gap-6 ">
              <PartialsOrderAddressCard title="Teslimat adresi" :actions="false"
                :address="order.shipping_address || {}" />
              <PartialsOrderAddressCard title="Fatura adresi" :actions="false" :address="order.billing_address || {}" />
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
  const response = await useBaseOFetch(`order/anonymous`, {
    query: {
      order_token: route.query.order,
    },
  });

  order.value = response;
  orderLoaded.value = true;
};

onMounted(async () => {
  await getOrder();
});
</script>
