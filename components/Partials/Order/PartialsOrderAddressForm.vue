<template>
  <div class="space-y-4">

    <UForm :schema="schema" :state="addressObj" class="space-y-4" @submit="saveAddress()">
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Ad" name="name">
            <UInput color="orange" v-model="addressObj.name" type="text" />
          </UFormGroup>

          <UFormGroup label="Soyad" name="last_name">
            <UInput color="orange" v-model="addressObj.last_name" type="text" />
          </UFormGroup>

          <div class="col-span-2">
            <UFormGroup label="Adres" name="address">
              <UInput color="orange" v-model="addressObj.address" type="text" />
            </UFormGroup>
          </div>
          <UFormGroup label="Şehir" name="city">
            <USelectMenu @change="orderState.fetchDistricts(addressObj.city)" color="orange" searchable
              searchable-placeholder="Bir nitelik seçin..." class="w-full" placeholder="Bir nitelik seçin"
              :options="orderState.cities" v-model="addressObj.city" option-attribute="city"
              :search-attributes="['city']" />
          </UFormGroup>
          <UFormGroup label="İlçe" name="district">
            <USelectMenu color="orange" searchable searchable-placeholder="Bir nitelik seçin..." class="w-full"
              placeholder="Bir nitelik seçin" :options="orderState.districts" v-model="addressObj.district"
              option-attribute="district" :search-attributes="['district']" />
          </UFormGroup>

          <UFormGroup label="Telefon" name="phone">
            <UInput color="orange" v-model="addressObj.phone" type="text" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput color="orange" v-model="addressObj.email" type="email" />
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


watch(()=> addressObj.city, () => {

  addressObj.district = null
  console.log(addressObj.district) 

}, {
deep: true
})



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

const saveAddress = async () => {
  if (props.saveFunction) {
    const response = await props.saveFunction(addressObj)
  } else {
    orderState.saveAddress(addressObj)
  }
  emit('isSaved', true)
}

type Schema = InferType<typeof schema>

</script>