<template>
  <div class="overflow-hidden">
    <div class="flex justify-between">
      <b :class="!type ? 'text-secondary' : ''" @click="type = false">
        <button>Giriş yap</button>
      </b>
      <p class="border-r-2 border-dotted"></p>
      <b
        ><button :class="type ? 'text-secondary' : ''" @click="type = true">
          Kaydol
        </button></b
      >
    </div>
    <div class="flex duration-300" :class="!type ? '' : '-translate-x-full'">
      <div class="mt-12 space-y-4 min-w-full duration-300">
        <div>
          <label class="text-sm">E-mail / Kullanıcı adı</label>
          <UiFormInput />
        </div>
        <label class="text-sm" for="">Şifre</label>

        <UiFormPasswordInput />
        <button
          class="rounded-md bg-secondary hover:bg-orange-400 text-white duration-300 px-3 py-2"
        >
          Giriş Yap
        </button>
      </div>
      <div class="mt-12 space-y-4 min-w-full">
        <div>
          <label class="text-sm">E-mail </label>
          <UiFormInput />
        </div>

        <div>
          <label class="text-sm" for="">Şifre</label>

          <UiFormPasswordInput />
        </div>
        <div>
          <label class="text-sm" for="">Şifre tekrar</label>

          <UiFormPasswordInput />
        </div>
        <button
          class="rounded-md bg-secondary hover:bg-orange-400 text-white duration-300 px-3 py-2"
        >
          Kaydol
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const type = ref(false);
</script>
