<template>
  <div class="standart-section-spacing">
    <div class="container">
      <UiCommonBreadcrumb class="mb-6" :links="links" />

      <div class="lg:grid lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <PartialsAccountMenu />
        </div>

        <div class="lg:col-span-3 mt-8 lg:mt-0">
          <!-- Sayfa Başlığı -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">Hesap Ayarları</h1>
            <p class="text-neutral-600">Hesap bilgilerinizi ve şifrenizi güncelleyebilirsiniz.</p>
          </div>

          <div class="lg:grid lg:grid-cols-2 gap-8">
            <div class="p-6 relative border rounded-md">
              <p class="text-secondary-500 font-medium mb-4">Hesap bilgileri</p>
              <div class="grid gap-4">
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

                  <UiFormRadio v-model="cinsiyet" id="erkek" name="erkek" value="erkek">Erkek</UiFormRadio>
                  <UiFormRadio v-model="cinsiyet" id="kadin" name="kadin" value="kadin">Kadın</UiFormRadio>
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
                <UiButtonsBaseButton color="secondary" class="mt-4">Kaydet</UiButtonsBaseButton>
              </div>
            </div>

            <div class="p-6 relative border rounded-md mt-8 lg:mt-0">
              <p class="text-secondary-500 font-medium mb-4">Şifre değiştirme</p>

              <div class="grid gap-4">
                <div>
                  <label for="">Eski şifre</label>

                  <UiFormPasswordInput></UiFormPasswordInput>
                  <NuxtLink to="/sifremi-unuttum">
                    <p class="font-medium text-sm mt-1">Şifremi unuttum</p>
                  </NuxtLink>
                </div>

                <div>
                  <label for="">Yeni şifre</label>
                  <UiFormPasswordInput></UiFormPasswordInput>
                </div>
                <div>
                  <label for="">Yeni şifre tekrar</label>
                  <UiFormPasswordInput></UiFormPasswordInput>
                </div>

                <UiButtonsBaseButton color="secondary" class="mt-4">Güncelle</UiButtonsBaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Hesap Ayarları - Beyraha',
})

const cinsiyet = ref(null);
const onayla = ref(false);
const confirmDefaultModal = ref(false);
const newAddressModal = ref(false);
const isOpen = ref(false);

const links = [{
  label: 'Ana Sayfa',
  to: '/'
}, {
  label: 'Hesabım',
  to: '/hesap'
}, {
  label: 'Ayarlar'
}]
</script>
