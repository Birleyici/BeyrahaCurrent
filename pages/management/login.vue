<template>
  <div class="w-screen h-screen bg-tertiary-500">
    <Icon name="mdi:lock" class="w-72 h-72 opacity-20"></Icon>
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-tertiary-100 p-pad-2 rounded-md w-11/12 lg:w-[500px]">
      <b>Giriş</b>
      <div class="mt-pad-2 grid gap-4">
        <div class="space-y-4">
          <UInput v-model="authStore.user.email" placeholder="Kullanıcı adı" size="lg" />
          <UInput v-model="authStore.user.password" placeholder="Şifre" type="password" size="lg" />
        </div>
        <UiButtonsBaseButton :loading="loading" @click.stop="loginHandler()" color="secondary">Giriş
        </UiButtonsBaseButton>
        <p v-if="errorStatus" class="text-red-500 text-sm">
          Giriş bilgileri hatalı
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
definePageMeta({
  layout: "empty",
});

const errorStatus = ref(false);
const loading = ref(false);

const loginHandler = async () => {

  const response = await authStore.login()

  if (response) {
    navigateTo('/management/urunler')
  }

}

</script>
