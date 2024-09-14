<template>
  <UTabs :items="items" class="w-full md:w-[400px] mx-auto" :ui="{
    list: {
      marker: {
        background: '!bg-orange-500'
      },
      tab: {
        active: 'text-white'
      }
    },
  }">
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

        <div v-if="item.key === 'login'" class="space-y-3 ">
          <UForm :schema="schemaLogin" :state="authStore.user" class="space-y-4" @submit="onLogin">
            <UFormGroup label="Email" name="email">
              <UInput v-model="authStore.user.email" />
            </UFormGroup>

            <!-- <UFormGroup label="Password" name="password">
              <UInput :ui="{ icon: { trailing: { pointer: '' } } }" v-model="authStore.user.password"
                :type="isShowPassword ? 'text' : 'password'">
                <template #trailing>
                  <UIcon @click="isShowPassword = !isShowPassword"
                    :name="isShowPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    class="w-5 h-5 cursor-pointer" />
                </template>
              </UInput>
            </UFormGroup> -->

            <UiInputPassword label="Şifre" v-model="authStore.user.password" />
            <div>
              <ULink class="font-medium text-sm" to="/sifremi-unuttum">Şifremi unuttum</ULink>
            </div>

            <UButton :loading="authStore.loading.login" color="orange" size="md" type="submit"> Giriş </UButton>

            <ul class="list-disc p-4 text-red-500">
              <li v-for="error in authStore.apiError.login">
                {{ error[0] }}
              </li>
            </ul>

          </UForm>
        </div>
        <div v-else-if="item.key === 'register'">
          <UForm :schema="schemaRegister" :state="authStore.register" class="space-y-4" @submit="onRegister">
            <UFormGroup label="Email" name="email">
              <UInput v-model="authStore.register.email" />
            </UFormGroup>

            <UiInputPassword label="Şifre" v-model="authStore.register.password" />

            <UiInputPassword label="Şifre tekrar" v-model="authStore.register.password_confirmation" />

            <UButton :loading="authStore.loading.register" color="orange" size="md" type="submit"> Kaydol </UButton>

            <ul class="list-disc p-4 text-red-500">
              <li v-for="error in authStore.apiError.register">
                {{ error[0] }}
              </li>
            </ul>

          </UForm>
        </div>
      </UCard>
    </template>
  </UTabs>

</template>

<script setup lang="ts">
const props = defineProps({
  redirect: {
    type: Boolean,
    default: true
  }
})
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const router = useRouter()
const authStore = useAuthStore()
const schemaLogin = object({
  email: string().trim().email('Geçersiz email').required('Zorunlu'),
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu')
});

type LoginSchema = InferType<typeof schemaLogin>;

const schemaRegister = object({
  email: string().trim().email('Geçersiz email').required('Zorunlu'),
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu'),
  password_confirmation: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu')
});

type RegisterSchema = InferType<typeof schemaRegister>;


async function onLogin(event: FormSubmitEvent<LoginSchema>) {
  // Do something with event.data
  const response = await authStore.login()
  if (response && props.redirect) {
    navigateTo(router.currentRoute.value.query.callback || '/')
  }
}

async function onRegister(event: FormSubmitEvent<RegisterSchema>) {

  const response = await authStore.registerUser()

  if (response && props.redirect) {
    navigateTo(router.currentRoute.value.query.callback || '/')
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
