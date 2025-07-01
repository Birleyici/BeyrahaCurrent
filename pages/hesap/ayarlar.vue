<template>
  <div>
    <NuxtLayout name="account">
      <!-- Sayfa Başlığı -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
          Hesap Ayarları
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
          Hesap bilgilerinizi ve şifrenizi güncelleyebilirsiniz.
        </p>
      </div>

      <div class="lg:grid lg:grid-cols-2 gap-8">
        <!-- Hesap Bilgileri -->
        <div
          class="p-6 relative border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 transition-colors duration-300">
          <p class="text-secondary-500 dark:text-secondary-400 font-medium mb-4">Hesap bilgileri</p>
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

        <!-- Şifre Değiştirme -->
        <div
          class="p-6 relative border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 mt-8 lg:mt-0 transition-colors duration-300">
          <p class="text-secondary-500 dark:text-secondary-400 font-medium mb-4">Şifre değiştirme</p>

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
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yeni şifre tekrar</label>
              <UInput type="password" size="md" />
            </div>

            <UButton color="orange" class="mt-4" size="md">Güncelle</UButton>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

import { useSettings } from '~/composables/useSettings'

const { siteName } = useSettings()

useHead({
  title: computed(() => `Hesap Ayarları - ${siteName.value}`)
})

const cinsiyet = ref('erkek')
</script>
