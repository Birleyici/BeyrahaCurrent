<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(() => {
  useMain().isLoaded = true;
});

const bitis = useCookie("bitis") || 0;

// Cookie'den alınan değeri sayıya dönüştürün
const bitisTimestamp = parseInt(bitis.value) * 1000;

// Şu anki zamanı alın
const now = new Date().getTime();

// Bitiş zamanı ile şu anki zamanı karşılaştırın
if (bitisTimestamp > now) {
  console.log("Zaman henüz geçmedi");
} else {

  console.log("burda")
  const headers = useRequestHeaders(["cookie"]);
  const { data: token } = await useFetch("/api/token", { headers });
  if (process.server) {
    const counter = useCookie("token");
    const bitis = useCookie("bitis");
    counter.value = token?.value?.jwt || null;
    bitis.value = token?.value?.bitis || null;
  }
}
</script>
