<template>
  <div
    class="py-12 bg-gradient-to-br from-neutral-50 via-secondary-50/30 to-neutral-100 dark:from-neutral-900 dark:via-secondary-900/20 dark:to-neutral-800 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-secondary-200/20 dark:bg-secondary-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
      <div
        class="absolute top-40 right-20 w-48 h-48 bg-primary-200/15 dark:bg-primary-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
      <div
        class="absolute bottom-32 left-1/4 w-24 h-24 bg-secondary-300/25 dark:bg-secondary-600/15 rounded-full blur-2xl transition-colors duration-300">
      </div>
      <div
        class="absolute bottom-20 right-1/3 w-36 h-36 bg-accent-200/20 dark:bg-accent-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-lg">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 dark:from-secondary-600 dark:to-secondary-700 rounded-3xl mb-6 shadow-xl transition-colors duration-300">
          <UIcon name="i-heroicons-key" class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 transition-colors duration-300">
          {{ pageTitle }}
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 text-lg max-w-md mx-auto transition-colors duration-300">
          {{ pageDescription }}
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-700/50 p-8 transition-colors duration-300">
        <!-- Email Hatırlatma Formu -->
        <div v-if="!route.query.token">
          <UForm :schema="schemaRemind" :state="form" class="space-y-6" @submit="onRemind">
            <UFormGroup label="Email Adresiniz" name="email">
              <UInput v-model="form.email" placeholder="ornek@email.com" icon="i-heroicons-envelope" />
              <div v-if="remindFormErrors?.email" class="mt-2">
                <p v-for="(err, index) in remindFormErrors.email" :key="index"
                  class="text-red-500 dark:text-red-400 text-sm transition-colors duration-300">
                  {{ err }}
                </p>
              </div>
            </UFormGroup>

            <UButton :loading="authStore.loading.remind" color="orange" size="lg" type="submit" class="w-full" :ui="{
              rounded: 'rounded-2xl',
              padding: { lg: 'px-6 py-4' }
            }">
              Şifre Yenileme Bağlantısı Gönder
            </UButton>

            <UNotification v-if="remindNotification" id="remind_notification" :timeout="0" color="green"
              title="Başarılı!" description="Şifre yenileme bağlantısı e-mail adresinize gönderildi."
              @close="remindNotification = false" />
          </UForm>
        </div>

        <!-- Şifre Değiştirme Formu -->
        <div v-else>
          <UForm :schema="schemaChange" :state="changeForm" class="space-y-6" @submit="onChange">
            <UFormGroup label="Yeni Şifre" name="password">
              <UInput v-model="changeForm.password" type="password" color="orange" placeholder="Yeni şifrenizi girin"
                icon="i-heroicons-lock-closed" />
            </UFormGroup>

            <UFormGroup label="Şifre Tekrarı" name="password_confirmation">
              <UInput v-model="changeForm.password_confirmation" type="password" color="orange"
                placeholder="Şifrenizi tekrar girin" icon="i-heroicons-lock-closed" />
            </UFormGroup>

            <UButton :loading="authStore.loading.remind" color="orange" size="lg" type="submit" class="w-full">
              Şifreyi Değiştir
            </UButton>

            <UNotification v-if="resetNotification" id="reset_notification" :timeout="0" color="green" title="Başarılı!"
              description="Şifre yenileme başarılı, giriş sayfasına yönlendiriliyorsunuz."
              @close="resetNotification = false" />
          </UForm>
        </div>

        <!-- Hata Mesajları -->
        <div v-if="errorObject.length > 0" class="mt-6">
          <div v-for="(err, index) in errorObject" :key="index"
            class="text-red-500 dark:text-red-400 text-sm mb-2 transition-colors duration-300">
            {{ err }}
          </div>
        </div>

        <!-- Geri Dön Linki -->
        <div class="mt-6 text-center">
          <NuxtLink to="/auth"
            class="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 text-sm transition-colors duration-200">
            ← Giriş sayfasına dön
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const authStore = useAuthStore()
const route = useRoute()
const remindNotification = ref(false)
const resetNotification = ref(false)
const { siteName } = useSettings()

const form = ref({
  email: ''
})

const changeForm = ref({
  password: '',
  password_confirmation: '',
  email: route.query.email,
  token: route.query.token
})

// Computed properties for dynamic content
const pageTitle = computed(() => {
  return route.query.token ? 'Yeni Şifre Oluştur' : 'Şifremi Unuttum'
})

const pageDescription = computed(() => {
  return route.query.token
    ? 'Lütfen yeni şifrenizi oluşturun'
    : 'Kayıtlı email adresinize şifre yenileme bağlantısı göndereceğiz'
})

type RemindSchema = InferType<typeof schemaRemind>;
type ChangeSchema = InferType<typeof schemaChange>;

const schemaRemind = object({
  email: string().trim().email('Geçersiz email').required('Zorunlu'),
});

const schemaChange = object({
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu'),
  password_confirmation: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu')
});

const remindFormErrors = ref<any>({});
const changeFormErrors = ref<any>({});

async function onRemind(event: FormSubmitEvent<RemindSchema>) {
  try {
    await authStore.remind(form.value.email);
    remindNotification.value = true;
    remindFormErrors.value = {}
    form.value.email = '';
  } catch (error) {
    remindNotification.value = false;
    const parsedError = parseError(error);
    if (parsedError.errorType) {
      remindFormErrors.value = parsedError.errors || {};
    }
  }
}

async function onChange(event: FormSubmitEvent<ChangeSchema>) {
  try {
    await authStore.changePassword(changeForm.value);
    resetNotification.value = true;
    changeFormErrors.value = {}
    setTimeout(() => {
      navigateTo('/auth');
    }, 2000);
  } catch (error) {
    resetNotification.value = false;
    const parsedError = parseError(error);
    if (parsedError.errorType) {
      changeFormErrors.value = parsedError.errors || {};
    }
  }
}

const errorObject = computed(() => {
  if (Object.keys(changeFormErrors.value).length > 0) {
    return Object.values(changeFormErrors.value).flat();
  }
  if (Object.keys(remindFormErrors.value).length > 0) {
    return Object.values(remindFormErrors.value).flat();
  }
  return [];
});

// SEO Meta
useHead({
  title: computed(() => `${pageTitle.value} - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'Şifrenizi mi unuttunuz? E-posta adresinizi girerek yeni şifre oluşturabilirsiniz.' }
  ]
})
</script>
