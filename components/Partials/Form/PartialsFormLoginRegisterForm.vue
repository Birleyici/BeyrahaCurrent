<template>
  <UTabs
    :items="items"
    class="w-full"
    :ui="{
      list: { 
        marker: { 
          background: '!bg-orange-500' 
        },
        tab:{
          active: 'text-white'
        } 
      },
    }"
  >
    <template #item="{ item }">
      <UCard>
        <template #header>
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>

        <div v-if="item.key === 'login'" class="space-y-3 w-[400px] max-w-full">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton color="orange" size="md" type="submit"> Giriş </UButton>
          </UForm>
        </div>
        <div v-else-if="item.key === 'register'" class="w-[400px] max-w-full">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Şifre" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UFormGroup label="Şifre tekrar" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton color="orange" size="md" type="submit"> Kaydol </UButton>
          </UForm>
        </div>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const { useAuthStore } = useStateIndex()
const authStore = useAuthStore()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  const response = await authStore.login()

  if (response) {
    navigateTo('/management/urunler')
  }


}

const items = [{
  key: 'login',
  label: 'Giriş',
  description: 'Mevcut hesabınıza giriş yapın'
}, {
  key: 'register',
  label: 'Kaydol',
  description: 'Yeni bir hesap oluşturun'
}]
</script>
