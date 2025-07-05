<template>
  <div
    class="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-100 dark:from-neutral-900 dark:via-primary-900/20 dark:to-neutral-800 flex items-center justify-center p-4 transition-colors duration-300">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-primary-200/20 dark:bg-primary-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
      <div
        class="absolute top-40 right-20 w-48 h-48 bg-secondary-200/15 dark:bg-secondary-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
      <div
        class="absolute bottom-32 left-1/4 w-24 h-24 bg-primary-300/25 dark:bg-primary-600/15 rounded-full blur-2xl transition-colors duration-300">
      </div>
      <div
        class="absolute bottom-20 right-1/3 w-36 h-36 bg-accent-200/20 dark:bg-accent-600/10 rounded-full blur-3xl transition-colors duration-300">
      </div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-3xl mb-6 shadow-xl transition-colors duration-300">
          <UIcon name="i-heroicons-shield-check" class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 transition-colors duration-300">
          Admin Paneli
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 text-lg transition-colors duration-300">
          Yönetim paneline giriş yapın
        </p>
      </div>

      <!-- Login Form Card -->
      <div
        class="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-8 transition-colors duration-300">
        <!-- Wrong Panel Warning -->
        <div v-if="wrongPanelMessage"
          class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div class="flex items-start space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                Yanlış Giriş Paneli
              </p>
              <p class="text-sm text-amber-700 dark:text-amber-300">
                {{ wrongPanelMessage }}
              </p>
            </div>
          </div>
        </div>

        <form @submit.prevent="loginHandler" class="space-y-6">
          <!-- Email Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              E-posta Adresi
            </label>
            <UInput v-model="authStore.user.email" type="email" placeholder="admin@beyraha.com" size="lg"
              :disabled="loading" class="transition-all duration-200" :ui="{
                rounded: 'rounded-xl',
                padding: { lg: 'px-4 py-3' }
              }" />
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Şifre
            </label>
            <UInput v-model="authStore.user.password" type="password" placeholder="••••••••" size="lg"
              :disabled="loading" class="transition-all duration-200" :ui="{
                rounded: 'rounded-xl',
                padding: { lg: 'px-4 py-3' }
              }" />
          </div>

          <!-- Login Button -->
          <UButton type="submit" :loading="loading" size="lg" block
            class="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            :ui="{
              rounded: 'rounded-xl',
              padding: { lg: 'px-6 py-4' }
            }">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
            Giriş Yap
          </UButton>

          <!-- Error Message -->
          <div v-if="errorMessage"
            class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div class="flex items-start space-x-3">
              <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p class="text-sm text-red-700 dark:text-red-300">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </form>

        <!-- Footer Links -->
        <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center justify-between text-sm">
            <NuxtLink to="/"
              class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </NuxtLink>

            <button @click="toggleDarkMode"
              class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const { isDark, toggleDarkMode } = useDarkMode()
const route = useRoute()

definePageMeta({
  layout: "empty",
});

const loading = ref(false)
const errorMessage = ref('')
const wrongPanelMessage = ref('')

// URL parametrelerinden yanlış panel mesajını oku
onMounted(() => {
  if (route.query.wrongPanel === 'user' && route.query.message) {
    wrongPanelMessage.value = decodeURIComponent(route.query.message)

    // URL'den query parametrelerini temizle
    const router = useRouter()
    router.replace({ path: route.path, query: { ...route.query, wrongPanel: undefined, message: undefined } })
  }
})

const loginHandler = async () => {
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''
  wrongPanelMessage.value = ''

  try {
    const response = await authStore.login('admin') // Admin login type

    if (response.success) {
      await navigateTo('/management')
    } else if (response.wrongPanel) {
      // Hemen doğru panele yönlendir
      if (response.redirectTo === 'user_login') {
        await navigateTo(`/auth?wrongPanel=admin&message=${encodeURIComponent(response.message)}`)
      }
    } else {
      errorMessage.value = authStore.apiError.login[0] || 'Giriş bilgileri hatalı'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Bir hata oluştu. Lütfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}

// Eğer zaten giriş yapılmışsa yönlendir
onMounted(() => {
  if (authStore.token && authStore.currentUser) {
    const userRole = authStore.currentUser?.role || authStore.currentUser?.role
    if (userRole === 'admin' || userRole === 'vendor') {
      navigateTo('/management')
    }
  }
})
</script>
