<template>
  <div
    class="py-12 bg-gradient-to-br from-neutral-50 via-secondary-50/30 to-neutral-100 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-secondary-200/20 rounded-full blur-3xl"></div>
      <div class="absolute top-40 right-20 w-48 h-48 bg-primary-200/15 rounded-full blur-3xl"></div>
      <div class="absolute bottom-32 left-1/4 w-24 h-24 bg-secondary-300/25 rounded-full blur-2xl"></div>
      <div class="absolute bottom-20 right-1/3 w-36 h-36 bg-accent-200/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-2xl">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl mb-6 shadow-xl">
          <UIcon name="i-heroicons-user-circle" class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 mb-3">Hoş Geldiniz</h1>
        <p class="text-neutral-600 text-lg max-w-md mx-auto">Beyraha ailesine katılın ve özel fırsatlardan yararlanın
        </p>
      </div>

      <!-- Auth Form -->
      <PartialsFormAuthForm />

      <!-- Additional Options -->
      <div v-if="route.query?.callback == '/odeme'" class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-6 bg-gradient-to-br from-neutral-50 via-secondary-50/30 to-neutral-100 text-neutral-500 font-medium">veya</span>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <UButton to="/odeme?type=withoutMembership" size="lg" variant="outline" color="orange"
            class="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm"
            :ui="{
              rounded: 'rounded-2xl',
              padding: { lg: 'px-6 py-4' }
            }">
            <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 mr-3" />
            Üye olmadan devam et
          </UButton>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const route = useRoute()

// SEO Meta
useHead({
  title: 'Giriş Yap | Beyraha Tesettür Giyim',
  meta: [
    { name: 'description', content: 'Beyraha hesabınıza giriş yapın veya yeni hesap oluşturun. Güvenli ve hızlı alışveriş deneyimi için hemen üye olun.' }
  ]
})

// Redirect if already logged in
if (authStore.token) {
  if (route.query?.callback) {
    navigateTo(route.query.callback)
  } else {
    navigateTo('/')
  }
}
</script>

<style scoped>
/* Custom background pattern */
.auth-pattern {
  background-image: radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
}
</style>
