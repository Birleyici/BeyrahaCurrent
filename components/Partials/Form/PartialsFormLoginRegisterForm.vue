<template>
  <div class="overflow-hidden">
    <div class="flex justify-between">
      <b :class="!type ? 'text-secondary-500' : ''" @click="type = false">
        <button>Giriş yap</button>
      </b>
      <p class="border-r-2 border-dotted"></p>
      <b
        ><button :class="type ? 'text-secondary-500' : ''" @click="type = true">
          Kaydol
        </button></b
      >
    </div>
    <div class="flex duration-300" :class="!type ? '' : '-translate-x-full'">
      <div class="mt-12 space-y-4 min-w-full duration-300">
        <div>
          <label class="text-sm">E-mail / Kullanıcı adı</label>
          <UiFormInput />
          <NuxtLink to="/sifremi-unuttum"
                ><p class="font-medium text-sm mt-1">Şifremi unuttum</p></NuxtLink
              >
        </div>
        <div>
          <label class="text-sm" for="">Şifre</label>
          <UiFormPasswordInput />
        </div>
        <div class="flex justify-between !mt-orta">
          <UiButtonsBaseButton color="secondary">Giriş yap</UiButtonsBaseButton>
          <div v-if="nextNotRegister" class="flex items-center space-x-2">
            <a href="#">Üye olmadan devam et</a>
            <Icon name="material-symbols:keyboard-arrow-right"></Icon>
          </div></div>
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
        <div class="flex justify-between !mt-orta">
          <UiButtonsBaseButton color="secondary">Kaydol</UiButtonsBaseButton>
          <div v-if="nextNotRegister" class="flex items-center space-x-2">
            <a href="#">Üye olmadan devam et</a>
            <Icon name="material-symbols:keyboard-arrow-right"></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const type = ref(false);
</script>
