<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Ayarlar</b>

    <div
      class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 space-y-minimal lg:space-y-0"
    >
      <div class="col-span-1">
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3 lg:grid lg:grid-cols-2 gap-10">
        <div class="p-minimal relative border rounded-md">
          <p class="text-secondary-500 font-medium">Hesap bilgileri</p>
          <div class="grid gap-4 py-minimal">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="">Ad </label>
                <UiFormInput value="Muhammet Çağrı"></UiFormInput>
              </div>

              <div>
                <label for="">Soyad</label>
                <UiFormInput value="Yılmaz"></UiFormInput>
              </div>
            </div>
            <div>
              <label for="">E-mail</label>
              <UiFormInput value="davudtevhid@gmail.com"></UiFormInput>
            </div>
            <div>
              <label for="">Telefon</label>
              <UiFormInput></UiFormInput>
            </div>

            <div class="flex space-x-4">
              <label for="">Cinsiyet:</label>

              <UiFormRadio v-model="cinsiyet" id="erkek" name="erkek" value="erkek"
                >Erkek</UiFormRadio
              >
              <UiFormRadio v-model="cinsiyet" id="kadin" name="kadin" value="kadin"
                >Kadın</UiFormRadio
              >
            </div>
            <div class="grid grid-cols-3 gap-5">
              <div>
                <label for="">Gün</label>
                <UiFormSelect>
                  <option value="">28</option>
                </UiFormSelect>
              </div>

              <div>
                <label for="">Ay</label>
                <UiFormSelect>
                  <option value="">07</option>
                </UiFormSelect>
              </div>

              <div>
                <label for="">Yıl</label>
                <UiFormSelect>
                  <option value="">1993</option>
                </UiFormSelect>
              </div>
            </div>
            <UiButtonsBaseButton color="secondary" class="mt-minimal"
              >Kaydet</UiButtonsBaseButton
            >
          </div>
        </div>
        <div class="p-minimal relative border rounded-md my-minimal lg:my-0">
          <p class="text-secondary-500 font-medium">Şifre değiştirme</p>

          <div class="grid gap-4 py-minimal">
            <div>
              <label for="">Eski şifre</label>

              <UiFormPasswordInput></UiFormPasswordInput>
              <NuxtLink to="/sifremi-unuttum"
                ><p class="font-medium text-sm mt-1">Şifremi unuttum</p></NuxtLink
              >
            </div>

            <div>
              <label for="">Yeni şifre</label>
              <UiFormPasswordInput></UiFormPasswordInput>
            </div>
            <div>
              <label for="">Yeni şifre tekrar</label>
              <UiFormPasswordInput></UiFormPasswordInput>
            </div>

            <UiButtonsBaseButton color="secondary" class="mt-minimal"
              >Güncelle</UiButtonsBaseButton
            >
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cinsiyet = ref(null);
const onayla = ref(false);
const confirmDefaultModal = ref(false);
const newAddressModal = ref(false);
const isOpen = ref(false);
</script>
