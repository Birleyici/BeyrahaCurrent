<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
    <USlideover v-model="menuStatus">
      <PartialsMenuNestedSlideMenu
        :menu="kategoriler"
      ></PartialsMenuNestedSlideMenu>
    </USlideover>

    <USlideover v-model="accountStatus">
      <div class="p-8">
        <PartialsFormLoginRegisterForm />
      </div>
    </USlideover>

    <USlideover v-model="cartStatus">
      <PartialsCartList></PartialsCartList>
    </USlideover>
    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <Icon
          @click="menuStatus = true"
          v-if="$device.isMobile"
          name="ph:list"
          class="w-8 h-8"
        />

        <Icon
          v-if="$device.isMobile"
          @click=" $changeMainState({ isOpenSearch: true })"
          name="ph:magnifying-glass"
          class="w-7 h-7"
        />
        <NuxtLink href="/">
          <img
            v-if="!$device.isMobile"
            src="/logo.jpg"
            class="min-w-[100px] max-w-[100px]"
            alt=""
          />
        </NuxtLink>
      </p>

      <img
        v-if="$device.isMobile"
        src="/logo.jpg"
        class="mx-auto min-w-[100px] max-w-[100px]"
        alt=""
      />

      <PartialsCommonSearchInput></PartialsCommonSearchInput>

      <div>
        <div v-if="!$device.isMobile" class="flex items-center font-medium">
          <p
            @click="accountStatus = true"
            class="cursor-pointer font-primary text-heading-4 pr-4"
          >
            HESAP
          </p>
          <p
            @click="cartStatus = true"
            class="cursor-pointer font-primary text-heading-4 px-4"
          >
            SEPET
            <span class="text-secondary-500">2</span>
          </p>
        </div>
        <div class="flex items-center space-x-4 font-medium" v-else>
          <Icon
            @click="accountStatus = true"
            name="ph:user"
            class="w-8 h-8"
          ></Icon>
          <Icon
            @click="cartStatus = true"
            name="ph:bag-simple"
            class="w-8 h-8"
          ></Icon>
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
        children: [
          {
            name: "alt alt",
            icon: null,
            children: [
              {
                name: "alt alt alt",
                icon: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Takı",
    icon: "mdi:gold",
  },
]);

const accountStatus = ref(false)
const cartStatus = ref(false)
</script>
