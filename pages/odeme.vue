<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="grid lg:grid-cols-3 gap-16">
      <div class="col-span-2">
        <b>Sipariş oluştur</b>

        <div class="border rounded-md mt-minimal">
          <div class="bg-slate-50 p-minimal rounded-t-md flex items-center">
            <UiFormRadio :checked="true">
              <div class="lg:flex items-center space-x-4">
                <div></div>

                <div class="space-y-1">
                  <div class="flex space-x-2 ">
                    <p>
                      <span class="font-medium !bg-transparent">İsim:</span> Muhammet
                      Çağrı Yılmaz
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <p>
                      <span class="font-medium !bg-transparent">Adres:</span> Yaylapınar
                      mh. Mükerrem sk. No 13A/2 Meram Konya
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <p>
                      <span class="font-medium !bg-transparent">Telefon:</span>
                      (546) 602 48 12
                    </p>
                  </div>
                </div>
              </div>
            </UiFormRadio>
          </div>

          <div class="flex justify-between border-t">
            <div class="p-3 flex items-center space-x-2 text-secondary-500 text-sm">
              <p class="font-medium">Yeni adres</p>
              <Icon name="mdi:plus" class="font-medium"></Icon>
            </div>
            <div class="flex justify-center space-x-2 p-3  flex items-center">
              <p class="text-sm font-medium">Diğer adresleri gör</p>
              <Icon name="material-symbols:keyboard-arrow-down" class="font-medium"></Icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">1</div>
    </div>
  </div>
</template>
