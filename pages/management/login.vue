<template>
  <div class="w-screen h-screen bg-tertiary-500">
    <Icon name="mdi:lock" class="w-72 h-72 opacity-20"></Icon>
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-tertiary-100 p-minimal rounded-md w-11/12 lg:w-[500px]"
    >
      <b>Giriş</b>
      <div class="mt-minimal grid gap-4">
        <UiFormInput v-model="form.email" placeholder="Kullanıcı adı"></UiFormInput>
        <UiFormPasswordInput
          v-model="form.password"
          placeholder="Şifre"
        ></UiFormPasswordInput>
        <UiButtonsBaseButton :loading="loading" @click.stop="login" color="secondary"
          >Giriş</UiButtonsBaseButton
        >
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

const loading = ref(false)

const login = async () => {
  const { data, pending, refresh, error } = await useJsonPlaceholderData("admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (error.value == null) {
    await navigateTo("/management/dashboard");
  }
};
</script>
