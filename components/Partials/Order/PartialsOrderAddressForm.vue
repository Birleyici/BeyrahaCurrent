<template>
  <div class="space-y-6">
    <!-- Modern Progress Indicator -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Hızlı Adres Ekleme</h3>
        <div class="flex items-center space-x-2">
          <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
        </div>
      </div>

      <!-- Step Indicator -->
      <div class="flex items-center space-x-2 mb-4">
        <div v-for="(step, index) in steps" :key="index" class="flex items-center">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300"
            :class="currentStep > index ? 'bg-secondary-500 text-white' :
              currentStep === index ? 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 ring-2 ring-secondary-500' :
                'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'">
            <UIcon v-if="currentStep > index" name="i-heroicons-check" class="w-4 h-4" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div v-if="index < steps.length - 1" class="w-8 h-0.5 mx-2 transition-all duration-300"
            :class="currentStep > index ? 'bg-secondary-500' : 'bg-neutral-200 dark:bg-neutral-700'"></div>
        </div>
      </div>

      <p class="text-sm text-neutral-600 dark:text-neutral-400">
        {{ steps[currentStep]?.description }}
      </p>
    </div>

    <UForm :schema="currentSchema" :state="addressObj" class="space-y-6" @submit="handleSubmit">
      <!-- Step 1: Kişisel Bilgiler -->
      <div v-if="currentStep === 0" class="space-y-6">
        <div
          class="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/50 dark:to-secondary-800/50 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-secondary-500 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-user" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Kimlik Bilgileri</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Adınız ve soyadınız</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Ad*" name="name">
              <UInput color="secondary" v-model="addressObj.name" type="text" placeholder="Adınızı girin" size="lg"
                :ui="{ base: 'transition-all duration-200' }" />
            </UFormGroup>

            <UFormGroup label="Soyad*" name="last_name">
              <UInput color="secondary" v-model="addressObj.last_name" type="text" placeholder="Soyadınızı girin"
                size="lg" :ui="{ base: 'transition-all duration-200' }" />
            </UFormGroup>
          </div>
        </div>
      </div>

      <!-- Step 2: İletişim Bilgileri -->
      <div v-if="currentStep === 1" class="space-y-6">
        <div
          class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl p-6 border border-green-200 dark:border-green-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-phone" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">İletişim Bilgileri</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ isLoggedIn ? 'Telefon numaranız' : 'Telefon ve e-posta adresiniz' }}
              </p>
            </div>
          </div>

          <!-- Telefon her zaman gösterilir -->
          <div class="space-y-6">
            <UFormGroup label="Telefon*" name="phone">
              <UInput color="secondary" v-model="addressObj.phone" type="text" placeholder="5XX XXX XX XX" size="lg"
                :ui="{ base: 'transition-all duration-200' }" />
            </UFormGroup>

            <!-- Email sadece giriş yapmamış kullanıcılar için -->
            <div v-if="!isLoggedIn">
              <UFormGroup label="Email*" name="email">
                <UInput color="secondary" v-model="addressObj.email" type="email" placeholder="email@example.com"
                  size="lg" :ui="{ base: 'transition-all duration-200' }" />
              </UFormGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Konum Seçimi -->
      <div v-if="currentStep === 2" class="space-y-6">
        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Konum Seçimi</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Şehir ve ilçe seçin</p>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Şehir Seçimi -->
            <UFormGroup label="Şehir*" name="city">
              <USelectMenu searchable @change="handleCityChange" searchable-placeholder="Şehir ara..." class="w-full"
                placeholder="Şehir seçin" :options="orderState.cities" v-model="addressObj.city" option-attribute="city"
                :search-attributes="['city']" size="lg" :ui="{
                  base: 'transition-all duration-200',
                  trigger: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }" />
            </UFormGroup>

            <!-- İlçe Seçimi - Şehir seçildikten sonra görünür -->
            <div v-if="addressObj.city" class="animate-in slide-in-from-top-2 duration-300">
              <UFormGroup label="İlçe*" name="district">
                <USelectMenu searchable searchable-placeholder="İlçe ara..." class="w-full" placeholder="İlçe seçin"
                  :options="orderState.districts" v-model="addressObj.district" option-attribute="district"
                  :search-attributes="['district']" size="lg" :ui="{
                    base: 'transition-all duration-200',
                    trigger: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  }" />
              </UFormGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Adres Detayları -->
      <div v-if="currentStep === 3" class="space-y-6">
        <div
          class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-home" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Adres Detayları</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Tam adres bilgileriniz</p>
            </div>
          </div>

          <UFormGroup label="Tam Adres*" name="address"
            description="Mahalle, sokak, cadde, bina no ve diğer detayları girin">
            <UTextarea color="secondary" v-model="addressObj.address"
              placeholder="Örn: Yenimahalle, Bağlar Sokak, No: 15/B, Daire: 3" :rows="4" resize
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center pt-6">
        <UButton v-if="currentStep > 0" @click="previousStep" color="gray" variant="outline" size="lg" class="px-6">
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          Geri
        </UButton>
        <div v-else></div>

        <UButton v-if="currentStep < steps.length - 1" @click="nextStep" color="secondary" size="lg"
          :disabled="!canProceed" class="px-6">
          İleri
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
        </UButton>

        <UButton v-else type="submit" color="secondary" size="lg" :disabled="!canProceed"
          class="px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
          Adresi Kaydet
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps(['address', 'saveFunction'])
const orderState = useOrderStoreFront()
const authStore = useAuthStore()
const emit = defineEmits(['isSaved'])

await orderState.fetchCities()
await orderState.fetchDistricts()

// Kullanıcının giriş durumunu kontrol et
const isLoggedIn = computed(() => {
  return !!(authStore.token && authStore.currentUser)
})

let newAddress = ref({
  name: null,
  last_name: null,
  phone: null,
  address: null,
  city: null,
  district: null,
  email: null,
  isDefault: true
})

const addressObj = props.address ? props.address : newAddress.value

// Giriş yapmış kullanıcı için email'i otomatik doldur
if (isLoggedIn.value && authStore.currentUser?.email && !(addressObj as any).email) {
  (addressObj as any).email = authStore.currentUser.email
}

// Step management
const currentStep = ref(0)
const steps = ref([
  {
    title: 'Kimlik',
    description: 'Adınızı ve soyadınızı girin',
    fields: ['name', 'last_name']
  },
  {
    title: 'İletişim',
    description: isLoggedIn.value ? 'Telefon numaranızı girin' : 'Telefon ve e-posta bilgilerinizi girin',
    fields: isLoggedIn.value ? ['phone'] : ['phone', 'email']
  },
  {
    title: 'Konum',
    description: 'Şehir ve ilçe seçin',
    fields: ['city', 'district']
  },
  {
    title: 'Adres',
    description: 'Tam adres bilgilerinizi girin',
    fields: ['address']
  }
])

// Schema definitions for each step
const step1Schema = object({
  name: string()
    .min(3, '3 karakterden az olamaz.')
    .required('Zorunlu'),
  last_name: string()
    .min(2, '2 karakterden az olamaz.')
    .required('Zorunlu'),
})

const step2Schema = computed(() => {
  const baseSchema: any = {
    phone: string()
      .min(10, 'Cep Telefonu 10 hane olmalıdır.')
      .required('Zorunlu'),
  }

  // Giriş yapmamış kullanıcılar için email alanı ekle
  if (!isLoggedIn.value) {
    baseSchema.email = string().trim().email('Geçersiz email adresi.').required('Zorunlu')
  }

  return object(baseSchema)
})

const step3Schema = object({
  city: object().required('Zorunlu'),
  district: object().required('Zorunlu'),
})

const step4Schema = object({
  address: string()
    .min(20, 'Adres 20 karakterden kısa olamaz.')
    .required('Zorunlu'),
})

// Current schema based on step
const currentSchema = computed(() => {
  switch (currentStep.value) {
    case 0: return step1Schema
    case 1: return step2Schema.value
    case 2: return step3Schema
    case 3: return step4Schema
    default: return step1Schema
  }
})

// Check if current step can proceed
const canProceed = computed(() => {
  const currentFields = steps.value[currentStep.value]?.fields || []
  return currentFields.every(field => {
    const value = addressObj[field]
    return value !== null && value !== undefined && value !== ''
  })
})

// Navigation functions
const nextStep = () => {
  if (currentStep.value < steps.value.length - 1 && canProceed.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Handle city change
const handleCityChange = async (city: any) => {
  addressObj.district = null
  if (city) {
    await orderState.fetchDistricts(city)
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (currentStep.value === steps.value.length - 1) {
    await saveAddress()
  }
}

// Save address function
const saveAddress = async () => {
  if (props.saveFunction) {
    const response = await props.saveFunction(addressObj)
  } else {
    orderState.saveAddress(addressObj)
  }
  emit('isSaved', true)
}

// Watch city changes
watch(() => addressObj.city, () => {
  addressObj.district = null
})

type Schema = InferType<typeof step1Schema>

function searchableHandle(word: string) {
  return orderState.cities.filter((c: any) => c.city.includes(capitalizeFirstLetterTR(word)))
}
</script>