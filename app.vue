<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(() => {
  useMain().isLoaded = true;
});



const headers = useRequestHeaders(["cookie"]);
const { data: token } = await useFetch("/api/token", { headers });

if (process.server) {
  const counter = useCookie("token");
  counter.value = token?.value || null;
}
</script>
