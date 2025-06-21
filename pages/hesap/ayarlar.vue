<template>
  <div class="standart-section-spacing">
    <div class="container">
      <UiCommonBreadcrumb class="mb-3 md:mb-6" :links="links" />

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
            <div class="p-6 relative border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
              <p class="text-secondary-500 font-medium mb-4">Hesap bilgileri</p>
              <div class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad</label>
                    <UInput value="Muhammet Çağrı" size="md" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soyad</label>
                    <UInput value="Yılmaz" size="md" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                  <UInput value="davudtevhid@gmail.com" size="md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefon</label>
                  <UInput size="md" />
                </div>

                <div class="flex space-x-4 items-center">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cinsiyet:</label>
                  <URadio v-model="cinsiyet" value="erkek" label="Erkek" />
                  <URadio v-model="cinsiyet" value="kadin" label="Kadın" />
                </div>

                <div class="grid grid-cols-3 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gün</label>
                    <USelect size="md">
                      <option value="">28</option>
                    </USelect>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ay</label>
                    <USelect size="md">
                      <option value="">07</option>
                    </USelect>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yıl</label>
                    <USelect size="md">
                      <option value="">1993</option>
                    </USelect>
                  </div>
                </div>
                <UButton color="orange" class="mt-4" size="md">Kaydet</UButton>
              </div>
            </div>

            <div
              class="p-6 relative border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 mt-8 lg:mt-0">
              <p class="text-secondary-500 font-medium mb-4">Şifre değiştirme</p>

              <div class="grid gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eski şifre</label>
                  <UInput type="password" size="md" />
                  <NuxtLink to="/sifremi-unuttum">
                    <p class="font-medium text-sm mt-1 text-orange-600 hover:text-orange-700">Şifremi unuttum</p>
                  </NuxtLink>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yeni şifre</label>
                  <UInput type="password" size="md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yeni şifre
                    tekrar</label>
                  <UInput type="password" size="md" />
                </div>

                <UButton color="orange" class="mt-4" size="md">Güncelle</UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from '~/composables/useSettings'

const { siteName } = useSettings()

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: computed(() => `Hesap Ayarları - ${siteName.value}`)
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
