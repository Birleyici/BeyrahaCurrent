<template>
  <div class="my-minimal px-8 ">
    <div>
      <div class="mb-orta font-medium text-center ">Oturum seçenekleri</div>
      <PartialsFormAuthForm></PartialsFormAuthForm>
      <div v-if="route.query?.callback=='/odeme'" class="mt-4 flex justify-center">
        <div class="flex items-center space-x-2">
          <UButton to="/odeme?type=withoutMembership" size="md" variant="soft" color="orange"
            label="Üye olmadan devam et" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const authStore = useAuthStore()
const route = useRoute()
if (authStore.token) {
  if (route.query?.callback) {
    navigateTo(route.query.callback)
  }
}
</script>
