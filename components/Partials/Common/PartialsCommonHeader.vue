<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
    <LazyUiMenuSideBarMenu :status="menuStatus" @change-status="(e) => (menuStatus = e)">
      <PartialsMenuNestedSlideMenu :menu="kategoriler"></PartialsMenuNestedSlideMenu>
    </LazyUiMenuSideBarMenu>
    <UiMenuSideBarMenu
      position="true"
      :status="accountStatus"
      @change-status="(e) => (accountStatus = e)"
    >
      <div class="p-8" v-if="true">
        <PartialsFormLoginRegisterForm />
      </div>
      <div v-else>
        <PartialsMenuNestedSlideMenu :menu="menu"></PartialsMenuNestedSlideMenu>
      </div>
    </UiMenuSideBarMenu>
    <UiMenuSideBarMenu
      position="true"
      :status="cartStatus"
      @change-status="(e) => (cartStatus = e)"
    >
      <PartialsCartList></PartialsCartList>
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
        <NuxtLink href="/">
        <img
          v-if="!useMain().isMobile"
          src="/logo.jpg"
          class="min-w-[100px] max-w-[100px]"
          alt=""
        />
        </NuxtLink>
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
            class="cursor-pointer font-primary text-heading-4  pr-minimal"
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
</template>
<script setup>
const menuStatus = ref(false);

const menu = reactive([
  {
    name: "Hesabım",
    icon: "mdi:account",
    children: [
      {
        name: "Hesap ayarları",
        icon: null,
        children: [{ name: "Şifre değiştir", icon: null }],
      },
      { name: "Adreslerim", icon: null },
    ],
  },
  {
    name: "Siparişlerim",
    icon: "mdi:cart",
  },
]);

const kategoriler = reactive([
  {
    name: "Giyim",
    icon: "mdi:clothes",
    children: [
      {
        name: "Tesettür",
        icon: null,
      },
    ],
  },
  {
    name: "Takı",
    icon: "mdi:gold",
  },
]);

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
