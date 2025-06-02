<template>
  <div class="space-y-6">
    <!-- Form Progress Indicator -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-neutral-900">Adres Bilgileri</h3>
        <div class="flex items-center space-x-2">
          <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-600" />
          <span class="text-sm text-green-600 font-medium">Güvenli</span>
        </div>
      </div>
      <div class="w-full bg-neutral-200 rounded-full h-2">
        <div class="bg-secondary-500 h-2 rounded-full transition-all duration-500" :style="`width: ${formProgress}%`">
        </div>
      </div>
      <p class="text-sm text-neutral-500 mt-2">{{ formProgress }}% tamamlandı</p>
    </div>

    <UForm :schema="schema" :state="addressObj" class="space-y-6" @submit="saveAddress()">
      <!-- Kişisel Bilgiler -->
      <div class="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-user" class="w-4 h-4 text-secondary-600" />
          </div>
          <h4 class="text-base font-semibold text-neutral-900">Kişisel Bilgiler</h4>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Ad*" name="name">
            <UInput color="secondary" v-model="addressObj.name" type="text" placeholder="Adınızı girin"
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>

          <UFormGroup label="Soyad*" name="last_name">
            <UInput color="secondary" v-model="addressObj.last_name" type="text" placeholder="Soyadınızı girin"
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>
        </div>
      </div>

      <!-- İletişim Bilgileri -->
      <div class="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-phone" class="w-4 h-4 text-green-600" />
          </div>
          <h4 class="text-base font-semibold text-neutral-900">İletişim Bilgileri</h4>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Telefon*" name="phone">
            <UInput color="secondary" v-model="addressObj.phone" type="text" placeholder="5XX XXX XX XX"
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>

          <UFormGroup label="Email*" name="email">
            <UInput color="secondary" v-model="addressObj.email" type="email" placeholder="email@example.com"
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>
        </div>
      </div>

      <!-- Adres Bilgileri -->
      <div class="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-blue-600" />
          </div>
          <h4 class="text-base font-semibold text-neutral-900">Adres Detayları</h4>
        </div>

        <div class="space-y-4">
          <!-- Tam Adres -->
          <UFormGroup label="Adres*" name="address"
            description="Mahalle, sokak, cadde, bina no ve diğer adres detaylarını girin">
            <UInput color="secondary" v-model="addressObj.address"
              placeholder="Örn: Yenimahalle, Bağlar Sokak, No: 15/B, Daire: 3"
              :ui="{ base: 'transition-all duration-200' }" />
          </UFormGroup>

          <!-- Şehir ve İlçe -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Şehir*" name="city">
              <USelectMenu :searchable="searchableHandle" @change="orderState.fetchDistricts(addressObj.city)"
                searchable-placeholder="Şehir ara..." class="w-full" placeholder="Şehir seçin"
                :options="orderState.cities" v-model="addressObj.city" option-attribute="city"
                :search-attributes="['city']" :ui="{
                  base: 'transition-all duration-200',
                  trigger: 'focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500'
                }" />
            </UFormGroup>

            <UFormGroup label="İlçe*" name="district">
              <USelectMenu @click="orderState.fetchDistricts(addressObj.city)" searchable-placeholder="İlçe ara..."
                class="w-full" placeholder="İlçe seçin" :options="orderState.districts" v-model="addressObj.district"
                option-attribute="district" :search-attributes="['district']" :disabled="!addressObj.city" :ui="{
                  base: 'transition-all duration-200',
                  trigger: 'focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500'
                }" />
            </UFormGroup>
          </div>
        </div>
      </div>

      <!-- Kaydet Butonu -->
      <div class="bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start space-x-3">
            <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-secondary-600 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-secondary-900">Adres Kaydı</p>
              <p class="text-xs text-secondary-700 mt-1">
                Bu adres hesabınıza kaydedilecek ve gelecekteki siparişlerinizde kullanabileceksiniz.
              </p>
            </div>
          </div>

          <UButton type="submit" color="secondary" size="lg" :disabled="formProgress < 100"
            class="w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
            Adresi Kaydet
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const props = defineProps(['address', 'saveFunction'])
const orderState = useOrderStoreFront()
await orderState.fetchCities()
await orderState.fetchDistricts()


let newAddress = ref(
  {
    name: null,
    last_name: null,
    phone: null,
    address: null,
    city: null,
    district: null,
    email: null,
    isDefault: true
  }
)


const addressObj = props.address ? props.address : newAddress.value

watch(() => addressObj.city, () => {
  addressObj.district = null
})

const emit = defineEmits(['isSaved'])

// Form progress calculator
const formProgress = computed(() => {
  const fields = ['name', 'last_name', 'phone', 'email', 'address', 'city', 'district']
  const filledFields = fields.filter(field => {
    const value = addressObj[field]
    return value !== null && value !== undefined && value !== ''
  })
  return Math.round((filledFields.length / fields.length) * 100)
})

const schema = object({
  name: string()
    .min(3, '3 karakterden az olamaz.')
    .required('Zorunlu'),
  last_name: string()
    .min(2, '2 karakterden az olamaz.')
    .required('Zorunlu'),
  address: string()
    .min(20, 'Adres 20 karakterden kısa olamaz.')
    .required('Zorunlu'),
  email: string().trim().email('Geçersiz email adresi.').required('Zorunlu'),
  phone: string()
    .min(10, 'Cep Telefonu 10 hane olmalıdır.')
    .required('Zorunlu'),
  city: object().required('Zorunlu'),
  district: object().required('Zorunlu'),
})

const saveAddress = async () => {
  if (props.saveFunction) {
    const response = await props.saveFunction(addressObj)
  } else {
    orderState.saveAddress(addressObj)
  }
  emit('isSaved', true)
}

type Schema = InferType<typeof schema>



// onBeforeRouteLeave((to, from, next) => {
//   if (confirm('Bu sayfadan ayrılmak istediğinizden emin misiniz?')) {
//     next() // İzin verir ve sayfadan çıkış yapar
//   } else {
//     next(false) // Geri gitme işlemini durdurur
//   }
// })


function searchableHandle(word: string) {
  return orderState.cities.filter((c: any) => c.city.includes(capitalizeFirstLetterTR(word)))
}

</script>