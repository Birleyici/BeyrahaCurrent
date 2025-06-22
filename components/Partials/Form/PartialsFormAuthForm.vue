<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Tab Navigation -->
    <div class="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl mb-8 shadow-inner transition-colors duration-300">
      <div class="grid grid-cols-2 gap-1">
        <button @click="activeTab = 'login'" :class="[
          'py-3 px-4 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out',
          activeTab === 'login'
            ? 'bg-white dark:bg-neutral-700 text-secondary-600 dark:text-secondary-400 shadow-md transform scale-[1.02]'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
        ]">
          Giriş Yap
        </button>
        <button @click="activeTab = 'register'" :class="[
          'py-3 px-4 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out',
          activeTab === 'register'
            ? 'bg-white dark:bg-neutral-700 text-secondary-600 dark:text-secondary-400 shadow-md transform scale-[1.02]'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
        ]">
          Kaydol
        </button>
      </div>
    </div>

    <!-- Form Container -->
    <div
      class="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-700 overflow-hidden transition-colors duration-300">
      <div class="p-8">
        <!-- Login Form -->
        <div v-if="activeTab === 'login'" class="space-y-6">
          <div class="text-center mb-6">
            <h2
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1 transition-colors duration-300">
              Hesabınıza Giriş Yapın</h2>
            <p class="text-neutral-500 dark:text-neutral-400 text-sm transition-colors duration-300">Alışverişe devam
              etmek için giriş yapın</p>
          </div>

          <UForm :schema="schemaLogin" :state="authStore.user" class="space-y-5" @submit="onLogin">
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-300">E-posta
                Adresi</label>
              <UFormGroup name="email">
                <UInput v-model="authStore.user.email" type="email" placeholder="E-posta adresinizi girin"
                  icon="i-heroicons-envelope" />
              </UFormGroup>
            </div>

            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-300">Şifre</label>
              <UFormGroup name="password">
                <div class="relative">
                  <UInput v-model="authStore.user.password" :type="showPassword ? 'text' : 'password'"
                    placeholder="Şifrenizi girin" />
                  <button type="button" @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-5 h-5" />
                  </button>
                </div>
              </UFormGroup>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 rounded">
                <label for="remember-me"
                  class="ml-2 block text-sm text-neutral-700 dark:text-neutral-300 transition-colors duration-300">Beni
                  hatırla</label>
              </div>
              <ULink to="/sifremi-unuttum"
                class="text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-500 dark:hover:text-secondary-300 transition-colors">
                Şifremi unuttum
              </ULink>
            </div>

            <!-- Error Messages -->
            <div v-if="authStore.apiError.login?.length"
              class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 transition-colors duration-300">
              <div class="flex">
                <UIcon name="i-heroicons-exclamation-triangle"
                  class="w-5 h-5 text-red-400 dark:text-red-300 mr-2 mt-0.5" />
                <div class="text-sm text-red-700 dark:text-red-300">
                  <ul class="space-y-1">
                    <li v-for="error in authStore.apiError.login" :key="error">{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <UButton :loading="authStore.loading.login" type="submit" size="lg" block color="orange" :ui="{
              base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold',
              rounded: 'rounded-xl',
              padding: { lg: 'px-4 py-3.5' },
              color: { orange: { solid: 'shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 transform hover:scale-[1.02] transition-all duration-200' } }
            }">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
              Giriş Yap
            </UButton>
          </UForm>
        </div>

        <!-- Register Form -->
        <div v-else class="space-y-6">
          <div class="text-center mb-6">
            <h2
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1 transition-colors duration-300">
              Yeni Hesap Oluşturun</h2>
            <p class="text-neutral-500 dark:text-neutral-400 text-sm transition-colors duration-300">Beyraha ailesine
              katılın ve özel fırsatlardan yararlanın</p>
          </div>

          <UForm :schema="schemaRegister" :state="authStore.register" class="space-y-5" @submit="onRegister">
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-300">E-posta
                Adresi</label>
              <UFormGroup name="email">
                <UInput v-model="authStore.register.email" type="email" placeholder="ornek@email.com"
                  icon="i-heroicons-envelope" />
              </UFormGroup>
            </div>

            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-300">Şifre</label>
              <UFormGroup name="password">
                <div class="relative">
                  <UInput v-model="authStore.register.password" :type="showRegisterPassword ? 'text' : 'password'"
                    placeholder="Güçlü bir şifre oluşturun" />
                  <button type="button" @click="showRegisterPassword = !showRegisterPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    <UIcon :name="showRegisterPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-5 h-5" />
                  </button>
                </div>
              </UFormGroup>
            </div>

            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-300">Şifre
                Tekrar</label>
              <UFormGroup name="password_confirmation">
                <div class="relative">
                  <UInput v-model="authStore.register.password_confirmation"
                    :type="showConfirmPassword ? 'text' : 'password'" placeholder="Şifrenizi tekrar girin" />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    <UIcon :name="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-5 h-5" />
                  </button>
                </div>
              </UFormGroup>
            </div>

            <!-- Error Messages -->
            <div v-if="authStore.apiError.register?.length"
              class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 transition-colors duration-300">
              <div class="flex">
                <UIcon name="i-heroicons-exclamation-triangle"
                  class="w-5 h-5 text-red-400 dark:text-red-300 mr-2 mt-0.5" />
                <div class="text-sm text-red-700 dark:text-red-300">
                  <ul class="space-y-1">
                    <li v-for="error in authStore.apiError.register" :key="error">{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <UButton :loading="authStore.loading.register" type="submit" size="lg" block color="orange" :ui="{
              base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold',
              rounded: 'rounded-xl',
              padding: { lg: 'px-4 py-3.5' },
              color: { orange: { solid: 'shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 transform hover:scale-[1.02] transition-all duration-200' } }
            }">
              <UIcon name="i-heroicons-user-plus" class="w-5 h-5 mr-2" />
              Hesap Oluştur
            </UButton>
          </UForm>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="bg-neutral-50 dark:bg-neutral-800/50 px-8 py-6 border-t border-neutral-100 dark:border-neutral-700 transition-colors duration-300">
        <div class="text-center">
          <p class="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
            Güvenli alışveriş için SSL sertifikası ile korunmaktayız
          </p>
          <div class="flex items-center justify-center mt-2 space-x-4">
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-500 dark:text-green-400" />
            <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-green-500 dark:text-green-400" />
            <UIcon name="i-heroicons-check-badge" class="w-4 h-4 text-green-500 dark:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  redirect: {
    type: Boolean,
    default: true
  }
})

// Emit tanımlamaları
const emit = defineEmits(['login-success', 'register-success'])

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const router = useRouter()
const authStore = useAuthStore()

// Reactive states
const activeTab = ref('login')
const showPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation schemas
const schemaLogin = object({
  email: string().trim().email('Geçersiz email').required('Email adresi zorunludur'),
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır')
    .required('Şifre zorunludur')
});

const schemaRegister = object({
  email: string().trim().email('Geçersiz email').required('Email adresi zorunludur'),
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır')
    .required('Şifre zorunludur'),
  password_confirmation: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır')
    .required('Şifre tekrarı zorunludur')
});

type LoginSchema = InferType<typeof schemaLogin>;
type RegisterSchema = InferType<typeof schemaRegister>;

// Form handlers
async function onLogin(event: FormSubmitEvent<LoginSchema>) {
  const response = await authStore.login()
  if (response) {
    // Emit success event
    emit('login-success')

    // Redirect sadece props.redirect true ise
    if (props.redirect) {
      const callback = router.currentRoute.value.query.callback
      navigateTo(typeof callback === 'string' ? callback : '/')
    }
  }
}

async function onRegister(event: FormSubmitEvent<RegisterSchema>) {
  const response = await authStore.registerUser()
  if (response) {
    // Emit success event
    emit('register-success')

    // Redirect sadece props.redirect true ise
    if (props.redirect) {
      const callback = router.currentRoute.value.query.callback
      navigateTo(typeof callback === 'string' ? callback : '/')
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Debug: Force icon visibility in slideover */
:deep(.relative .absolute) {
  z-index: 999999999 !important;
}

:deep([data-headlessui-state]) .relative .absolute {
  z-index: 999999999 !important;
}
</style>
