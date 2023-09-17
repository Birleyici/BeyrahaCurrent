<template>
  <div class="my-minimal px-x-mobil lg:px-x-desktop">
    <b>Siparişiniz alındı</b>

    <div class="my-minimal">
      <UiNotificationBar type="info">
        <span class="text-secondary-500">#24274</span> Numaralı sipariniz başarıyla
        oluşturuldu. <span class="text-secondary-500">8,450.00 TL</span> toplam tutarı
        aşağıdaki banka bilgilerimize açıklama kısmına sipariş numaranızı yazarak
        gönderebilirsiniz.
      </UiNotificationBar>
    </div>

    <div class="my-orta lg:my-maximal">
      <div class="mb-orta lg:mb-maximal">
        <PartialsOrderBankInfo></PartialsOrderBankInfo>
      </div>
      <div class="lg:grid lg:grid-cols-3 gap-10">
        <div class="col-span-2">
          <b>Sipariş içeriği</b>
          <PartialsOrderSummary></PartialsOrderSummary>
        </div>
        <div class="col-span-1 my-orta lg:my-0">
          <b>Adres detayları</b>
          <div class="my-minimal space-y-2 border rounded-md p-minimal">
            <p class="text-secondary-500">Ev adresi</p>
            <div>
              <p><span class="font-medium">Ad soyad:</span> Muhammet Çağrı Yılmaz</p>
            </div>
            <div>
              <p>
                <span class="font-medium">Adres:</span> Yaylapınar cd. Mükerrem sk.
                NO:23/2 Meram / Konya
              </p>
            </div>
            <div>
              <p><span class="font-medium">Telefon:</span> (546) 602 48 12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
