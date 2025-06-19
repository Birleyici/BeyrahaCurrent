<template>
  <div class="bg-neutral-50 min-h-screen">
    <div v-if="orderLoaded">
      <!-- Hero Section - Başarı Mesajı -->
      <section class="bg-white border-b border-neutral-200">
        <div class="container section-spacing">
          <div class="max-w-4xl mx-auto text-center">
            <!-- Başarı İkonu -->
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-green-600" />
            </div>

            <!-- Başlık -->
            <h1 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Siparişiniz Başarıyla Alındı!
            </h1>

            <!-- Sipariş Numarası -->
            <div class="bg-secondary-50 border border-secondary-200 rounded-xl p-6 mb-6 inline-block">
              <p class="text-sm text-neutral-600 mb-1">Sipariş Numaranız</p>
              <p class="text-2xl font-bold text-secondary-600">#000{{ order.id }}</p>
            </div>

            <!-- Açıklama -->
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              <span class="font-semibold text-secondary-600">{{ formatPrice(order.total_with_shipping) }}</span>
              toplam tutarı aşağıdaki banka bilgilerimize, açıklama kısmına sipariş numaranızı yazarak
              gönderdiğinizde siparişiniz onaylanarak işleme alınacaktır.
            </p>

            <!-- Durum İndikatörleri -->
            <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500" />
                <span class="font-medium">Sipariş Alındı</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-amber-500" />
                <span class="font-medium">Ödeme Bekleniyor</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <UIcon name="i-heroicons-truck" class="w-4 h-4 text-neutral-400" />
                <span class="font-medium">Kargo Hazırlanacak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Ana İçerik -->
      <section class="section-spacing">
        <div class="container">
          <div class="max-w-6xl mx-auto">

            <!-- Banka Bilgileri -->
            <div class="mb-8">
              <div class="card">
                <div class="card-header">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                      <UIcon name="i-heroicons-building-library" class="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold text-neutral-900 !p-0 !m-0">Ödeme Bilgileri</h2>
                      <p class="text-sm text-neutral-600">Havale/EFT ile ödeme yapabilirsiniz</p>

                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <PartialsOrderBankInfo />
                </div>
              </div>
            </div>

            <!-- Sipariş Detayları -->
            <div class="lg:grid lg:grid-cols-3 gap-8">

              <!-- Sol Taraf - Sipariş İçeriği -->
              <div class="lg:col-span-2 space-y-6">

                <!-- Sipariş İçeriği -->
                <div class="card">
                  <div class="card-header">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 class="text-xl font-semibold text-neutral-900">Sipariş İçeriği</h2>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="space-y-4" v-for="sub_order in order.sub_orders" :key="sub_order.id">
                      <PartialsOrderSummary :item="item" v-for="item in sub_order.order_items || []" :key="item.id" />
                    </div>
                  </div>
                </div>

                <!-- Sipariş Özeti -->
                <div class="card">
                  <div class="card-header">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-calculator" class="w-5 h-5 text-green-600" />
                      </div>
                      <h2 class="text-xl font-semibold text-neutral-900">Sipariş Özeti</h2>
                    </div>
                  </div>
                  <div class="card-body">
                    <PartialsOrderExtre :total="order?.total" :shipping-cost="order?.shipping_cost" />
                  </div>
                </div>
              </div>

              <!-- Sağ Taraf - Adres Bilgileri -->
              <div class="lg:col-span-1 space-y-6 mt-6 lg:mt-0">

                <!-- Teslimat Adresi -->
                <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}"
                  :addressOptions="{ allAction: false }" />

                <!-- Fatura Adresi -->
                <PartialsOrderAddressCard title="Fatura Adresi" :address="order.billing_address || {}"
                  :addressOptions="{ allAction: false }" />

                <!-- Yardım ve Destek -->
                <div class="card">
                  <div class="card-body text-center">
                    <div class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6 text-secondary-600" />
                    </div>
                    <h3 class="text-lg font-semibold text-neutral-900 mb-2">
                      Yardıma mı ihtiyacınız var?
                    </h3>
                    <p class="text-neutral-600 text-sm mb-4">
                      Sipariş sürecinizle ilgili sorularınız için bizimle iletişime geçin
                    </p>
                    <div class="flex flex-col gap-2">
                      <a href="tel:+905436024821"
                        class="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white hover:!text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        <UIcon name="i-heroicons-phone" class="w-4 h-4" />
                        <span>Bizi Arayın</span>
                      </a>
                      <a href="https://wa.me/905436024821"
                        class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white hover:!text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alt Bilgi -->
            <div class="mt-8 ">
              <UAlert color="error" class="border border-red-200" variant="soft" icon="i-heroicons-exclamation-triangle"
                title="Önemli Bilgi"
                description="Ödemenizi yaptıktan sonra özel dikim ürünleriniz 10 gün, hazır ürünleriniz 2 gün içerisinde hazırlanarak kargoya verilecektir. Kargo takip numaranız SMS ile tarafınıza iletilecektir." />
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Yükleniyor Durumu -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-secondary-600 animate-spin" />
        </div>
        <p class="text-lg font-medium text-neutral-600">Sipariş bilgileriniz yükleniyor...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Siparişiniz alındı - Beyraha',
  meta: [
    { name: 'description', content: 'Siparişiniz başarıyla alındı. Ödeme bilgileri ve sipariş detayları.' }
  ],
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
  console.log('Order verisi:', order.value);
  console.log('Shipping address:', order.value.shipping_address);
  console.log('Billing address:', order.value.billing_address);
});
</script>
