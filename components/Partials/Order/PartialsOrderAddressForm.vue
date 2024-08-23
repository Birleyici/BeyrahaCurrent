<template>
  <div class="space-y-4">

    <UForm :schema="schema" :state="orderState.newAddress" class="space-y-4" @submit="saveAddress()">
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Ad" name="name">
            <UInput color="orange" v-model="orderState.newAddress.name" type="text" />
          </UFormGroup>

          <UFormGroup label="Soyad" name="last_name">
            <UInput color="orange" v-model="orderState.newAddress.last_name" type="text" />
          </UFormGroup>

          <div class="col-span-2">
            <UFormGroup label="Adres" name="address">
              <UInput color="orange" v-model="orderState.newAddress.address" type="text" />
            </UFormGroup>
          </div>
          <UFormGroup label="Şehir" name="city">
            <USelectMenu @change="orderState.fetchDistricts()" color="orange" searchable searchable-placeholder="Bir nitelik seçin..." class="w-full"
              placeholder="Bir nitelik seçin" :options="orderState.cities" v-model="orderState.newAddress.city"
              option-attribute="city" :search-attributes="['city']" />
          </UFormGroup>
          <UFormGroup label="İlçe" name="district">
            <USelectMenu color="orange" searchable searchable-placeholder="Bir nitelik seçin..." class="w-full"
              placeholder="Bir nitelik seçin" :options="orderState.districts" v-model="orderState.newAddress.district"
              option-attribute="district" :search-attributes="['district']" />
          </UFormGroup>

          <UFormGroup label="Telefon" name="phone">
            <UInput color="orange" v-model="orderState.newAddress.phone" type="text" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput color="orange" v-model="orderState.newAddress.email" type="email" />
          </UFormGroup>

        </div>

        <UButton type="submit" class="flex justify-center mt-4" color="orange" size="md">
          Adresi Kaydet
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
const { useOrderState } = useStateIndex()
const orderState = useOrderState()

await orderState.fetchCities()

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const emit = defineEmits(['isSaved'])
const schema = object({
  name: string()
    .min(3, '3 karakterden az olamaz.')
    .required('Zorunlu'),
  last_name: string()
    .min(3, '3 karakterden az olamaz.')
    .required('Zorunlu'),
  address: string()
    .min(20, 'Adres 20 karakterden kısa olamaz.')
    .required('Zorunlu'),
  email: string().email('Geçersiz email adresi.').required('Zorunlu'),
  phone: string()
    .min(10, 'Cep Telefonu 10 hane olmalıdır.')
    .required('Zorunlu'),
  city: object().required('Zorunlu'),
  district: object().required('Zorunlu'),

})
const saveAddress = () => {
  orderState.saveAddress(orderState.newAddress)
  orderState.newAddress = orderState.copyNewAddress
  emit('isSaved', true)
}

type Schema = InferType<typeof schema>



</script>