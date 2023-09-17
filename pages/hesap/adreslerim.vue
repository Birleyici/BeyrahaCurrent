<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Adreslerim</b>
    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 space-y-minimal">
      <div class="col-span-1">
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3">
        <div class="grid lg:grid-cols-2 gap-10">
          <div
            v-for="item in 4"
            :class="{ 'border-2 border-secondary-500': item == 1 }"
            class="bg-slate-100 p-minimal rounded-md"
          >
            <b
              >Ev Adresi
              <span class="text-sm text-secondary-500">
                {{ item == 1 ? "(Varsayılan)" : "" }}
              </span></b
            >

            <div class="lg:flex items-center mt-minimal">
              <div></div>

              <div class="space-y-1">
                <div class="flex space-x-2">
                  <p>
                    <span class="font-medium !bg-transparent">İsim:</span> Muhammet Çağrı
                    Yılmaz
                  </p>
                </div>
                <div class="flex space-x-2">
                  <p>
                    <span class="font-medium !bg-transparent">Adres:</span> Yaylapınar mh.
                    Mükerrem sk. No 13A/2 Meram Konya
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

            <div class="flex space-x-4 mt-minimal">
              <button @click="onayla = true" class="text-red-500 font-bold">Sil</button>
              <button @click="isOpen = true" class="text-tertiary-500 font-bold">
                Düzenle
              </button>
              <button
                @click="confirmDefaultModal = true"
                v-if="item != 1"
                class="text-secondary-500 font-bold"
              >
                Varsayılan yap
              </button>
            </div>
          </div>
          <UiModal :isOpen="isOpen" @status-change="(e) => (isOpen = e)">
            <b>Adresi düzenle</b>
            <PartialsFormAddressForm></PartialsFormAddressForm>
          </UiModal>

          <UiModal :isOpen="onayla" @status-change="(e) => (onayla = e)">
            <p class="font-bold">Silmeyi onayla</p>
            <p>Silmek istediğinize eminmisiniz?</p>
            <div class="space-x-4 mt-minimal flex items-end">
              <UiButtonsBaseButton color="red">Onayla</UiButtonsBaseButton>
              <UiButtonsBaseButton @click="onayla = false" color="slate"
                >Vazgeç</UiButtonsBaseButton
              >
            </div>
          </UiModal>

          <UiModal
            :isOpen="confirmDefaultModal"
            @status-change="(e) => (confirmDefaultModal = e)"
          >
            <p class="font-bold">Varsayılan yap</p>
            <p>Adresi varsayılan adres yapmak istediğinize eminmisiniz?</p>
            <div class="space-x-4 mt-minimal flex items-end">
              <UiButtonsBaseButton color="red">Onayla</UiButtonsBaseButton>
              <UiButtonsBaseButton color="slate">Vazgeç</UiButtonsBaseButton>
            </div>
          </UiModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const onayla = ref(false);
const confirmDefaultModal = ref(false);
const isOpen = ref(false);
</script>
