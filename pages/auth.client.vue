<template>
  <div class="standart-section-spacing">
    <div>
      <div class="mb-pad-2 font-medium text-center mb-pad-2">Oturum seçenekleri</div>
      <PartialsFormAuthForm></PartialsFormAuthForm>
      <div v-if="route.query?.callback == '/odeme'" class="mt-4 flex justify-center">
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
