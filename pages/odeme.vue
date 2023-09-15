<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="grid lg:grid-cols-3 gap-16">
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
            <div class="border rounded-md p-minimal bg-slate-50">
              <UiFormRadio id="cod" name="paymentMethod">
                <div class="ml-2">
                  <b>Kapıda ödeme</b>
                  <p v-if="true">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                    molestiae, perspiciatis corporis ipsam eius facere quisquam ullam
                    assumenda sed a quasi rem eveniet aperiam, officiis nisi est sit
                    labore voluptatem!
                  </p>
                </div>
              </UiFormRadio>
            </div>
            <div class="border rounded-md p-minimal">
              <UiFormRadio  id="bacs" name="paymentMethod">
                <div class="ml-2">
                  <b>Havale / EFT ile ödeme</b>
                  <p v-if="true">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                    molestiae, perspiciatis corporis ipsam eius facere quisquam ullam
                    assumenda sed a quasi rem eveniet aperiam, officiis nisi est sit
                    labore voluptatem!
                  </p>
                </div>
              </UiFormRadio>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">1</div>
    </div>

    <div v-if="isOpen">
      <div
        class="p-minimal lg:rounded-md space-y-4 fixed top-0 bottom-0 right-0 left-0 h-full lg:h-5/6 w-full mx-auto my-auto bg-white z-10 max-w-[500px] overflow-scroll-y"
      >
        <b>Yeni adres</b>

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
      <button class="fixed right-0 top-0 z-[10]" @click="isOpen = false">
        <Icon name="mdi:close" class="text-tertiary-50 w-20 h-20"></Icon>
      </button>
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
</script>
