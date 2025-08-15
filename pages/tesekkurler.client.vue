<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
    <div v-if="orderLoaded">
      <!-- Hero Section - Başarı Mesajı -->
      <section class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div class="container section-spacing">
          <div class="max-w-4xl mx-auto text-center">
            <!-- Başarı İkonu -->
            <div
              class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>

            <!-- Başlık -->
            <h1 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Siparişiniz Başarıyla Alındı!
            </h1>

            <!-- Sipariş Numarası -->
            <div
              class="bg-secondary-50 dark:bg-secondary-900/30 border border-secondary-200 dark:border-secondary-700 rounded-xl p-6 mb-6 inline-block">
              <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Sipariş Numaranız</p>
              <p class="text-2xl font-bold text-secondary-600 dark:text-secondary-400">#000{{ order.sub_orders?.[0]?.id
                || order.id }}</p>
            </div>

            <!-- Açıklama -->
            <p class="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
              <span class="font-semibold text-secondary-600 dark:text-secondary-400">{{
                formatPrice(order.total_with_shipping) }}</span>
              <span v-if="order.payment_method === 'bank_transfer' || order.payment_method === 'bacs'">
                toplam tutarı aşağıdaki banka bilgilerimize, açıklama kısmına sipariş numaranızı yazarak
                gönderdiğinizde siparişiniz onaylanarak işleme alınacaktır.
              </span>
              <span v-else-if="order.payment_method === 'cash_on_delivery' || order.payment_method === 'cod'">
                toplam tutarı siparişiniz kargoya verildiğinde nakit veya kart ile ödeyebilirsiniz.
              </span>
              <span v-else>
                toplam tutarı için ödeme yönteminize göre işlem yapılacaktır.
              </span>
            </p>

            <!-- Durum İndikatörleri -->
            <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500 dark:text-green-400" />
                <span class="font-medium">Sipariş Alındı</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span class="font-medium">Ödeme Bekleniyor</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <UIcon name="i-heroicons-truck" class="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
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
            <div v-if="order.payment_method === 'bank_transfer' || order.payment_method === 'bacs'" class="mb-8">
              <div class="card">
                <div class="card-header">
                  <div class="flex items-center space-x-3 p-4">
                    <div
                      class="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                      <UIcon name="i-heroicons-building-library"
                        class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 !p-0 !m-0">Ödeme Bilgileri
                      </h2>
                      <p class="text-sm text-neutral-600 dark:text-neutral-400">Havale/EFT ile ödeme yapabilirsiniz</p>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <PartialsOrderBankInfo />
                </div>
              </div>
            </div>

            <!-- Kapıda Ödeme Bilgileri -->
            <div v-else-if="order.payment_method === 'cash_on_delivery' || order.payment_method === 'cod'" class="mb-8">
              <div class="card">
                <div class="card-header">
                  <div class="flex items-center space-x-3 p-4">
                    <div
                      class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <UIcon name="i-heroicons-truck" class="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 !p-0 !m-0">Kapıda Ödeme
                      </h2>
                      <p class="text-sm text-neutral-600 dark:text-neutral-400">Siparişiniz teslim edilirken ödeme yapın
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div
                    class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div class="flex items-start space-x-3">
                      <UIcon name="i-heroicons-information-circle"
                        class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Kapıda Ödeme Bilgileri</h4>
                        <div class="text-sm text-green-700 dark:text-green-300 space-y-2">
                          <p class="leading-relaxed">
                            Siparişiniz hazırlanıp kargo firmasına teslim edildiğinde,
                            teslimat anında kargo görevlisine <strong>{{ formatPrice(order.total_with_shipping)
                              }}</strong>
                            tutarını nakit veya kart ile ödeyebilirsiniz.
                          </p>


                        </div>
                      </div>
                    </div>
                  </div>
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
                    <div class="flex items-center space-x-3 p-4">
                      <div
                        class="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-shopping-bag"
                          class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Sipariş İçeriği</h2>
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
                    <div class="flex items-center space-x-3 p-4">
                      <div
                        class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-calculator" class="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Sipariş Özeti</h2>
                    </div>
                  </div>
                  <div class="card-body">
                    <PartialsOrderExtre :total="order?.total" :shipping-cost="order?.shipping_cost"
                      :coupon-usage="order?.coupon_usage" :cash-on-delivery-cost="order?.cash_on_delivery_cost"
                      :payment-method="order?.payment_method" />
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
                    <div
                      class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <UIcon name="i-heroicons-chat-bubble-left-right"
                        class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Yardıma mı ihtiyacınız var?
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                      Sipariş sürecinizle ilgili sorularınız için bizimle iletişime geçin
                    </p>
                    <div class="flex flex-col gap-2">
                      <a v-if="settings.contactPhone" :href="`tel:${settings.contactPhone}`"
                        class="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-white hover:!text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        <UIcon name="i-heroicons-phone" class="w-4 h-4" />
                        <span>Bizi Arayın</span>
                      </a>
                      <a v-if="settings.whatsappNumber" :href="`https://wa.me/${settings.whatsappNumber}`"
                        class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white hover:!text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alt Bilgi -->
            <div class="mt-8">
              <UAlert color="error" class="border border-red-200 dark:border-red-800" variant="soft"
                icon="i-heroicons-exclamation-triangle" title="Önemli Bilgi"
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
          class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <UIcon name="i-heroicons-arrow-path"
            class="w-8 h-8 text-secondary-600 dark:text-secondary-400 animate-spin" />
        </div>
        <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Sipariş bilgileriniz yükleniyor...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from '~/composables/useSettings'

const { siteName, settings } = useSettings()

useHead({
  title: computed(() => `Siparişiniz alındı - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'Siparişiniz başarıyla alındı. Ödeme bilgileri ve sipariş detayları.' }
  ],
})

const route = useRoute();
const order = ref({});
const orderLoaded = ref(false);

// Ödeme yöntemi adlarını Türkçe'ye çevir
const paymentMethodNames = {
  'bank_transfer': 'Havale/EFT',
  'bacs': 'Havale/EFT',
  'credit_card': 'Kredi Kartı',
  'cash_on_delivery': 'Kapıda Ödeme',
  'cod': 'Kapıda Ödeme',
  'digital_wallet': 'Dijital Cüzdan',
  'installment': 'Taksitli Ödeme'
}

const paymentMethodName = computed(() => {
  return paymentMethodNames[order.value?.payment_method] || 'Belirtilmemiş'
})

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
