<template>
  <div>
    <NuxtLayout name="account">
      <!-- Yükleniyor Durumu -->
      <div v-if="!addressesLoaded" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <UIcon name="i-heroicons-arrow-path"
              class="w-8 h-8 text-secondary-600 dark:text-secondary-400 animate-spin" />
          </div>
          <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Adresleriniz yükleniyor...</p>
        </div>
      </div>

      <!-- Ana İçerik -->
      <div v-else>
        <!-- Sayfa Başlığı -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Adreslerim
            </h1>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Teslimat ve fatura adreslerinizi yönetin.
            </p>
          </div>
          <UButton @click="openAddressModal" color="secondary" size="lg" icon="i-heroicons-plus" label="Yeni Adres" />
        </div>

        <!-- Adresler -->
        <div v-if="orderState.addresses?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PartialsOrderAddressCard v-for="address in orderState.addresses" :key="address.id" :address="address"
            :address-options="{ allAction: true }" @edit="editAddress" @delete="deleteAddress" />
        </div>

        <!-- Boş Durum -->
        <div v-else class="text-center py-12">
          <div
            class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
            <UIcon name="i-heroicons-home" class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
          </div>
          <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
            Henüz adres eklemediniz
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-6 transition-colors duration-300">
            İlk adresinizi eklemek için aşağıdaki butonu kullanın.
          </p>
          <UButton @click="openAddressModal" color="secondary" size="lg" icon="i-heroicons-plus"
            label="İlk Adresimi Ekle" />
        </div>

        <!-- Adres Formu Modal -->
        <UModal v-model="isModalOpen" :ui="{ width: 'w-full sm:max-w-2xl' }">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {{ modalMode === 'add' ? 'Yeni Adres Ekle' : 'Adresi Düzenle' }}
              </h3>
              <UButton @click="closeModal" color="gray" variant="ghost" icon="i-heroicons-x-mark" />
            </div>
            <PartialsOrderAddressForm :form-data="formData" :mode="modalMode" @submit="handleFormSubmit"
              @cancel="closeModal" />
          </div>
        </UModal>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
// Nuxt dokümantasyonuna göre: layout: false kullanıp manuel kontrol
definePageMeta({
  layout: 'default'
})

const { siteName } = useSettings()

useHead({
  title: computed(() => `Adreslerim - ${siteName.value}`)
})

// Store'u kullan - order store'unda address fonksiyonları var
const orderState = useOrderStoreFront()

// Loading state
const addressesLoaded = ref(false)

// Modal state
const isModalOpen = ref(false)
const modalMode = ref('add') // 'add' | 'edit'
const formData = ref({})

const openAddressModal = () => {
  modalMode.value = 'add'
  formData.value = {}
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  formData.value = {}
}

const editAddress = (address) => {
  modalMode.value = 'edit'
  formData.value = { ...address }
  isModalOpen.value = true
}

const deleteAddress = async (address) => {
  if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
    try {
      await orderState.deleteAddress(address.id)
      await fetchAddresses() // Refresh list
    } catch (error) {
      console.error('Adres silinirken hata:', error)
    }
  }
}

const handleFormSubmit = async (formData) => {
  try {
    await orderState.saveAddress(formData)
    await fetchAddresses() // Refresh list
    closeModal()
  } catch (error) {
    console.error('Adres kaydedilirken hata:', error)
  }
}

// Adresleri getir
const fetchAddresses = async () => {
  try {
    await orderState.fetchAddresses()
    addressesLoaded.value = true
  } catch (error) {
    console.error('Adresler yüklenirken hata:', error)
    addressesLoaded.value = true
  }
}

// İlk yükleme
onMounted(() => {
  fetchAddresses()
})
</script>
