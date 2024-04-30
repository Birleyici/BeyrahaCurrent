<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const {
  status,
  data,
  token,
  lastRefreshedAt,
  getSession,
  signUp,
  signIn,
  signOut,
  refresh,
  refreshToken
} = useAuth()

onMounted(() => {
  useMain().isLoaded = true;
});


console.log(await token)

</script>
