<template>
  <header>
    <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
      <UiMenuSideBarMenu :status="menuStatus" @change-status="(e) => (menuStatus = e)">
        <PartialsMenuNestedSlideMenu></PartialsMenuNestedSlideMenu>
      </UiMenuSideBarMenu>
      <UiMenuSideBarMenu
        position="true"
        :status="accountStatus"
        @change-status="(e) => (accountStatus = e)"
      >
        <div class="p-8">
          <PartialsFormLoginRegisterForm />
        </div>
      </UiMenuSideBarMenu>
      <UiMenuSideBarMenu
        position="true"
        :status="cartStatus"
        @change-status="(e) => (cartStatus = e)"
      >
        <div class="p-4">
          <b>Sepet</b>
          <div class="mt-8 flex space-x-4" v-for="(item, index) in 3">
            <img src="/default-product.jpg" class="w-16 h-24 object-cover rounded-md" />
            <div>
              <div class="flex items-start space-x-2">
                <p class="text-sm font-medium">
                  Bordo Renk Siyah İpli Deri Erkek Bileklik
                </p>
                <button class="text-xs rounded-md bg-slate-100">
                  <Icon
                    name="material-symbols:close-rounded"
                    :key="index"
                    class="w-4 h-4"
                  />
                </button>
              </div>
              <div class="mt-2 flex items-center space-x-2">
                <button class="bg-slate-200 text-md flex items-center px-2 rounded-md">
                  -
                </button>
                <p class="text-sm">1</p>
                <button class="bg-slate-200 text-md flex items-center px-2 rounded-md">
                  +
                </button>
              </div>
            </div>
          </div>
          <div class="mt-minimal flex justify-between">
            <b>Toplam:</b>
            <p class="text-secondary-500">1590.00 TL</p>
          </div>
          <div class="grid">
            <UiButtonsBaseButton color="slate">Sepete Git</UiButtonsBaseButton>
            <UiButtonsBaseButton color="secondary">Ödeme</UiButtonsBaseButton>
          </div>
        </div>
      </UiMenuSideBarMenu>
      <div class="flex justify-between items-center">
        <p class="font-primary text-heading-1 flex items-center space-x-3">
          <Icon
            @click="menuStatus = true"
            v-if="useMain().isMobile"
            name="ph:list"
            class="w-8 h-8"
          />

          <Icon
            v-if="useMain().isMobile"
            @click="useMain().isOpenSearch = true"
            name="ph:magnifying-glass"
            class="w-7 h-7"
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
            <p
              @mouseover="changeAccountStatusFewSecond()"
              @mouseout="mouseOutAccount = true"
              class="cursor-pointer font-primary text-heading-4 border-r border-r pr-minimal"
            >
              HESAP
            </p>
            <p
              @mouseover="changeCartStatusFewSecond()"
              @mouseout="mouseOutCart = true"
              class="cursor-pointer font-primary text-heading-4 px-minimal"
            >
              SEPET
              <span class="text-secondary-500">2</span>
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
    <PartialsCommonFooter></PartialsCommonFooter>
  </footer>
</template>

<script setup>
const menuStatus = ref(false);

const {
  status: accountStatus,
  mouseOut: mouseOutAccount,
  changeStatusFewSecond: changeAccountStatusFewSecond,
} = useDelayedStatusChange(false);

const {
  status: cartStatus,
  mouseOut: mouseOutCart,
  changeStatusFewSecond: changeCartStatusFewSecond,
} = useDelayedStatusChange(false);
</script>
