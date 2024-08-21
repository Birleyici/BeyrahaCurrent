<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal flex items-center justify-center">
    <div>
      <div class="mb-orta font-medium text-center ">Oturum seçenekleri</div>
      <PartialsFormLoginRegisterForm></PartialsFormLoginRegisterForm>

      <div class="mt-4 flex justify-end">
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
