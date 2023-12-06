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
        <UiButtonsBaseButton
          :loading="loading"
          @click.stop="mySignInHandler({ ...form })"
          color="secondary"
          >Giriş</UiButtonsBaseButton
        >
        <p v-if="errorStatus" class="text-red-500 text-sm">Giriş bilgileri hatalı</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "empty",
  auth: {
    unauthenticatedOnly: true,
  },
});
const { status, data, signIn, signOut, lastRefreshedAt } = useAuth();


const form = reactive({
  password: null,
  email: null,
});

const errorStatus = ref(false);
const loading = ref(false);

const mySignInHandler = async ({ email, password }) => {
  loading.value = true;

  const { error, url } = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: "/management/urun/58",
  });

  loading.value = false;

  console.log(error)

  if (error) {
    errorStatus.value = true;
  } else {
    errorStatus.value = false;

    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true });
  }
};

// const loading = ref(false);
// const login = async () => {
//   loading.value = true;
//   const { data, pending, refresh, error } = await useJsonPlaceholderData("admin-login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//     cache: false,
//   });
//   loading.value = pending;
//   if (error.value == null) {
//     await navigateTo("/management/dashboard");
//   }
// };
</script>
