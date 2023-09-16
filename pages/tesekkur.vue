<template>
  <div class="my-minimal px-x-mobil lg:px-x-desktop">
    <b>Siparişiniz alındı</b>

    <div class="my-minimal">
      <UiNotificationBar type="success">
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
          <div
            v-for="item in 4"
            class="lg:flex lg:justify-between items-center mt-minimal p-2 border rounded-md lg:!rounded-l-full"
          >
            <div class="flex space-x-8">
              <img
                src="/default-product.jpg"
                class="w-20 h-20 object-cover rounded-md lg:rounded-full"
                alt=""
              />
              <div>
                <p class="font-medium">Bordo Renk Siyah İpli Deri Erkek Bileklik</p>
                <div class="flex space-x-2 text-sm">
                  <p class="font-medium">Beden:</p>
                  <p>XL</p>
                </div>
                <div class="flex space-x-2 text-sm">
                  <p class="font-medium">Renk:</p>
                  <p>Kahverengi</p>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between lg:space-x-12 border-t mt-2 pt-2 lg:p-0 lg:m-0 lg:border-none"
            >
              <div>
                <p class="text-sm">Birim fiyat</p>
                <div class="flex space-x-2">
                  <p class="text-secondary-500">129.00 TL</p>
                  <p>x 5</p>
                </div>
              </div>
              <div>
                <p class="text-sm">Toplam</p>
                <p class="font-medium text-secondary-500">645.00 TL</p>
              </div>
            </div>
          </div>

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
                <b class="text-secondary-500 border-b-4 border-secondary-200"
                  >8,450.00 TL</b
                >
              </div>
            </div>
          </div>
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
