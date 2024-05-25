<template>
  <div class="w-screen h-screen bg-tertiary-500">
    <Icon name="mdi:lock" class="w-72 h-72 opacity-20"></Icon>
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-tertiary-100 p-minimal rounded-md w-11/12 lg:w-[500px]"
    >
      <b>Giriş</b>
      <div class="mt-minimal grid gap-4">
        <UiFormInput
          v-model="form.email"
          placeholder="Kullanıcı adı"
        ></UiFormInput>
        <UiFormPasswordInput
          v-model="form.password"
          placeholder="Şifre"
        ></UiFormPasswordInput>
        <UiButtonsBaseButton
          :loading="loading"
          @click.stop="mySignInHandler({ ...form })"
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
definePageMeta({
  layout: "empty",
});

const form = reactive({
  password: null,
  email: null,
});

const errorStatus = ref(false);
const loading = ref(false);

const mySignInHandler = async ({ password, email }) => {
  loading.value = true;
  await useFetch(
    useBaseUrl() + "auth/login",
    {
      body: {
        ...form,
      },
      method: "POST",
      onResponse({ request, response, options }) {
        const token = useCookie("token");
        const user = useCookie("user");
        token.value = response._data.token
        user.value = response._data.user
         navigateTo('/management/urun/58')

      },
    }
  );
};
</script>
