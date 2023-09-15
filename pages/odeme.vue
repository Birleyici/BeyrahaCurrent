<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="lg:grid lg:grid-cols-3 gap-16">
      <div class="col-span-2 my-minimal">
        <div class="text-center lg:text-left">
          <b>Sipariş oluştur</b>
        </div>

        <div class="border rounded-md mt-minimal">
          <div class="bg-tertiary-50 p-minimal rounded-t-md flex items-center">
            <UiFormRadio v-if="true" :checked="true" id="address" name="address">
              <div class="lg:flex items-center space-x-4">
                <div></div>

                <div class="space-y-1">
                  <div class="flex space-x-2">
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
            <div v-else>Henüz kayıtlı adresiniz bulunmuyor.</div>
          </div>

          <div v-if="isOpenOtherAddress" class="p-minimal rounded-t-md flex items-center">
            <UiFormRadio :checked="false">
              <div class="lg:flex items-center space-x-4">
                <div></div>

                <div class="space-y-1">
                  <div class="flex space-x-2">
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
            <div class="flex h-full items-center space-x-2 text-secondary-500 text-sm">
              <button
                @click="isOpen = true"
                class="flex h-full items-center font-semibold p-3"
              >
                Yeni adres
                <Icon name="mdi:plus" class="font-semibold w-4 h-4"></Icon>
              </button>
            </div>
            <div class="flex justify-center space-x-2 flex items-center">
              <button
                @click="isOpenOtherAddress = !isOpenOtherAddress"
                class="text-sm font-medium p-3 h-full"
              >
                Diğer adresleri {{ !isOpenOtherAddress ? "gör" : "kapat" }}
                <Icon
                  v-if="isOpenOtherAddress"
                  name="material-symbols:keyboard-arrow-up"
                  class="font-medium w-5 h-5"
                ></Icon>
                <Icon
                  v-else
                  name="material-symbols:keyboard-arrow-down"
                  class="font-medium w-5 h-5"
                ></Icon>
              </button>
            </div>
          </div>
        </div>
        <div class="my-orta">
          <b>Ödeme yöntemleri</b>
          <div class="my-minimal space-y-4">
            <div
              class="border rounded-md p-minimal"
              :class="selectedPaymentMethod == 'cod' && 'bg-slate-50'"
            >
              <UiFormRadio
                v-model="selectedPaymentMethod"
                value="cod"
                id="cod"
                name="paymentMethod"
              >
                <div class="ml-2">
                  <b>Kapıda ödeme</b>
                  <p>
                    Teslimat anında kuryeye ödeme yapabilirsiniz. Bu seçeneğin +20.00 TL
                    hizmet bedeli mevcuttur.
                  </p>
                </div>
              </UiFormRadio>
            </div>
            <div
              class="border rounded-md p-minimal"
              :class="selectedPaymentMethod == 'bacs' && 'bg-slate-50'"
            >
              <UiFormRadio
                v-model="selectedPaymentMethod"
                value="bacs"
                id="bacs"
                name="paymentMethod"
              >
                <div class="ml-2">
                  <b>Havale / EFT ile ödeme</b>
                  <p>
                    Sipariş onay ekranında verilecek banka bilgilerine sipariş toplam
                    tutarını havale veya EFT yoluyla gönderebilirsiniz.
                  </p>
                </div>
              </UiFormRadio>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="sticky top-4 w-full">
          <div class="bg-tertiary-50 w-full rounded-md p-minimal space-y-3">
            <b>Sipariş özeti</b>

            <div class="flex justify-between">
              <p>Ürün toplam:</p>
              <p class="text-medium text-secondary-500">129.00 TL</p>
            </div>
            <div class="flex justify-between pb-2">
              <p>Kargo ücreti:</p>
              <p class="text-medium text-secondary-500">39.00 TL</p>
            </div>
          </div>
          <div class="mt-minimal">
            <UiFormCheckbox>
              <a href="#" class="text-blue-500">Mesafeli satış sözleşmesi</a>ni okudum
              kabul ediyorum.
            </UiFormCheckbox>
          </div>
          <div
            class="mt-minimal flex justify-between items-center fixed lg:relative bottom-0 right-0 left-0 bottom-0 bg-white px-3 lg:px-0 lg:border-t-0 border-t"
          >
            <div class="flex justify-start space-x-4 text-lg">
              <p>Toplam:</p>
              <p class="text-medium text-secondary-500 font-bold">168.00 TL</p>
            </div>

            <UiButtonsBaseButton color="secondary" class="font-semibold px-8"
              >Siparişi Onayla</UiButtonsBaseButton
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen">
      <div
        class="p-minimal lg:rounded-md space-y-4 fixed top-0 bottom-0 right-0 left-0 h-full lg:h-5/6 w-full mx-auto my-auto bg-white z-10 max-w-[500px] overflow-scroll-y"
      >
        <div class="flex justify-between items-center">
          <b>Yeni adres</b>

          <button @click="isOpen = false">
            <Icon name="mdi:close" class="w-5 h-5"></Icon>
          </button>
        </div>

        <div class="grid gap-4 grid-cols-2">
          <div>
            <label for="" class="text-sm">Ad* </label>
            <UiFormInput></UiFormInput>
          </div>
          <div>
            <label for="" class="text-sm">Soyad*</label>
            <UiFormInput></UiFormInput>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-2">
          <div>
            <label for="" class="text-sm">Telefon* </label>
            <UiFormInput></UiFormInput>
          </div>
          <div>
            <label for="" class="text-sm">İl*</label>
            <UiFormSelect>
              <option value="">İl seçin</option>
            </UiFormSelect>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-2">
          <div>
            <label for="" class="text-sm">İlçe* </label>
            <UiFormSelect>
              <option value="">İlçe seçin</option>
            </UiFormSelect>
          </div>
          <div>
            <label for="" class="text-sm">Mahalle*</label>
            <UiFormSelect>
              <option value="">Mahalle seçin</option>
            </UiFormSelect>
          </div>
        </div>
        <div>
          <label for="" class="text-sm">Adres* </label>
          <UiFormTextarea></UiFormTextarea>
        </div>
        <div>
          <label for="" class="text-sm">Adres başlığı* </label>
          <UiFormInput></UiFormInput>
        </div>

        <UiButtonsBaseButton color="secondary" class="px-6 font-medium"
          >Adresi kaydet</UiButtonsBaseButton
        >
      </div>

      <div
        @click="isOpen = false"
        class="fixed left-0 right-0 bottom-0 left-0 bg-black w-full h-full z-[4] opacity-30"
      ></div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const isOpenOtherAddress = ref(false);
const selectedPaymentMethod = ref("cod");
</script>
