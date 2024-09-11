<template>
  <div>
    <UDivider type="dashed" class="mt-section-desktop" />

    <div class="mx-x-mobil grid sm:grid-cols-2 gap-10 lg:grid-cols-4 lg:mx-x-desktop py-8  ">

      <div class="grid gap-1">
        <b class="text-lg">Kişisel</b>
        <NuxtLink to="/hesap/siparislerim">Siparişlerim</NuxtLink>
        <NuxtLink to="/hesap/adreslerim">Adreslerim</NuxtLink>
        <NuxtLink to="/sepet">Sepet</NuxtLink>
        <!-- <a href="#">Son baktıklarım</a> -->
      </div>
      <div class="grid gap-1">
        <div>
          <b class="text-lg">Kurumsal</b>
          <div class="mt-2">
            <NuxtLink to="/menu/iade-ve-degisim">İade ve Değişim</NuxtLink>
            <!-- <a href="#">Mesafeli satış sözleşmesi</a> -->
            <!-- <a href="#">Üyelik şartları</a> -->
            <!-- <a href="#">Hakkımızda</a>  -->

          </div>
        </div>
      </div>
      <div>
        <div class="grid gap-1">
          <b class="text-lg">İletişim / Destek</b>
          <a href="https://wa.me/05436024821" target="_blank" class="flex items-center space-x-2">
            <UIcon name="i-heroicons-phone" class="w-6 h-6" />  
              <span>WhatsApp Destek Hattı</span>
            </a>
            <a href="mailto:destek@beyraha.com" class="flex items-center space-x-2">
              <UIcon name="i-heroicons-envelope" class="w-6 h-6" />  
                <span>destek@beyraha.com</span>
              </a>
        </div>
      </div>
      <div>
        <div class="grid gap-1">
          <b class="text-lg">Sosyal medya</b>
          <a href="https://instagram.com/beyrahaislamigiyim" target="_blank" class="flex items-center space-x-2">
            <Icon name="mdi:instagram" class="w-6 h-6"></Icon>
            <p>beyrahaislamigiyim</p>
          </a>
          <a href="https://www.facebook.com/beyraha.marketplace" target="_blank" class="flex items-center space-x-2">
            <Icon name="mdi:facebook" class="w-6 h-6"></Icon>
            <p>Beyraha</p>
          </a>
          <!-- <a href="https://instagram.com/beyrahaislamigiyim" target="_blank" class="flex items-center space-x-2">
            <Icon name="mdi:youtube" class="w-6 h-6"></Icon>
            <p>beyrahaislamigiyim</p>
          </a> -->
          
       
        </div>
      </div>
    </div>
    <div class="bg-slate-100 text-center text-sm py-2 font-medium">© Beyraha | 2017 - 2024</div>
  </div>
</template>
