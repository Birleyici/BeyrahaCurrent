<template>
  <header>
    <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
      <UiMenuSideBarMenu :status="menuStatus" @change-status="(e) => (menuStatus = e)">
        <PartialsMenuNestedSlideMenu></PartialsMenuNestedSlideMenu>
      </UiMenuSideBarMenu>
      <UiMenuSideBarMenu :status="true" @change-status="(e) => (accountStatus = e)">
        <div class="p-8">
          <div class="flex justify-between">
            <b>Giriş yap</b>
            <p class="border-r-2 border-dotted"></p>
            <b><a href="#" class="text-secondary">Kaydol</a></b>
          </div>
          <div class="mt-12 space-y-4">
            <div>
              <label class="text-sm" for="">E-mail / Kullanıcı adı</label>
              <input
                type="text"
                class="bg-slate-50 text-sm focus:bg-white duration-300 p-3 focus:!outline-0 focus:border-secondary w-full rounded-md border"
              />
            </div>

            <FormUiFormPasswordInput></FormUiFormPasswordInput>
            <button
              class="rounded-md bg-secondary hover:bg-orange-400 text-white duration-300 px-3 py-2"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </UiMenuSideBarMenu>
      <UiMenuSideBarMenu :status="cartStatus" @change-status="(e) => (cartStatus = e)">
        Sepet İçerik...
      </UiMenuSideBarMenu>
      <div class="flex justify-between items-center">
        <p class="font-primary text-heading-1 flex items-center space-x-3">
          <Icon
            @click="menuStatus = true"
            v-if="useMain().isMobile"
            name="ph:list"
            class="w-8 h-8"
            color="black"
          />

          <Icon
            v-if="useMain().isMobile"
            @click="useMain().isOpenSearch = true"
            name="ph:magnifying-glass"
            class="w-7 h-7"
            color="black"
          />
          <img
            v-if="!useMain().isMobile"
            src="/logo.jpg"
            class="min-w-[100px] max-w-[100px]"
            alt=""
          />
        </p>

        <img
          v-if="useMain().isMobile"
          src="/logo.jpg"
          class="mx-auto min-w-[100px] max-w-[100px]"
          alt=""
        />

        <PartialsCommonSearchInput></PartialsCommonSearchInput>

        <div>
          <div v-if="!useMain().isMobile" class="flex items-center font-medium">
            <p class="font-primary text-heading-4 border-r border-r pr-minimal">HESAP</p>
            <p class="font-primary text-heading-4 px-minimal">
              SEPET
              <span class="text-secondary">2</span>
            </p>
          </div>
          <div class="flex items-center space-x-4 font-medium" v-else>
            <Icon @click="accountStatus = true" name="ph:user" class="w-8 h-8"></Icon>
            <Icon @click="cartStatus = true" name="ph:bag-simple" class="w-8 h-8"></Icon>
          </div>
        </div>
      </div>
      <PartialsCommonMegaMenu></PartialsCommonMegaMenu>
    </div>
  </header>
  <NuxtPage></NuxtPage>
  <footer>
    <div
      class="mx-x-mobil lg:mx-x-desktop py-minimal mt-section-desktop border-t border-primary"
    >
      footer
    </div>
  </footer>
</template>

<script setup>
const menuStatus = ref(false);
const accountStatus = ref(false);
const cartStatus = ref(false);
</script>
