<template>
  <div class="w-screen h-screen bg-tertiary-500">
    <Icon name="mdi:lock" class="w-72 h-72 opacity-20"></Icon>
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-tertiary-100 p-minimal rounded-md w-11/12 lg:w-[500px]"
    >
      <b>Giriş</b>
      <div class="mt-minimal grid gap-4">
        <UiFormInput
          v-model="email"
          placeholder="Kullanıcı adı"
        ></UiFormInput>
        <UiFormPasswordInput
          v-model="password"
          placeholder="Şifre"
        ></UiFormPasswordInput>
        <UiButtonsBaseButton
          :loading="loading"
          @click.stop="login()"
          color="secondary"
          >Giriş</UiButtonsBaseButton
        >
        <p v-if="errorStatus" class="text-red-500 text-sm">
          Giriş bilgileri hatalı
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/store';

definePageMeta({
  layout: "empty",
});

const email = ref('')
const password = ref('')
const authService = useAuthService()
const store = useStore()
const router = useRouter()
async function login() {
    try {
        const res = await authService.login(email.value, password.value)
        const user = await authService.getUser()
        console.log(res)
        store.setUser(user)
        router.push('/')
    } catch (e) {
        console.log(e)
    }
}
</script>
