<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <p class="text-center font-semibold lg:text-left">Sepet</p>
    <div class="lg:grid lg:grid-cols-3 gap-10">
      <div class="col-span-2">
        <div
          v-for="item in 5"
          :class="item % 2 != 0 && 'bg-slate-50'"
          class="grid lg:grid-cols-2 gap-4 items-center my-minimal border p-2 rounded-md"
        >
          <div class="h-full flex space-x-4">
            <div class="flex space-x-4">
              <img src="/default-product.jpg" class="w-16 rounded-md" />

              <div>
                <p class="font-medium">Bordo Renk Siyah İpli Deri Erkek Bileklik</p>
                <div class="flex space-x-2 text-sm">
                  <p class="font-medium">Beden:</p>
                  <p>XL</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div><UiFormCounter class="bg-white"></UiFormCounter></div>
            <p class="text-secondary-500 font-medium">129.00 TL</p>
            <UiButtonsBaseButton color="slate">Sil</UiButtonsBaseButton>
          </div>
        </div>
      </div>
      <div class="lg:col-span-1 w-full lg:grid gap-2">
        <div class="w-full">
          <div class="sticky top-4 w-full">
            <div class="bg-tertiary-50 w-full rounded-md p-minimal space-y-3">
              <b>Sipariş özeti</b>

              <div class="flex justify-between">
                <p>Ürün toplam:</p>
                <p class="text-medium text-secondary-500">129.00 TL</p>
              </div>
              <div class="flex justify-between pb-2">
                <p>Kargo ücreti:</p>
                <p class="text-medium text-secondary-500">39.00 TL</p>
              </div>
            </div>
            <div
              class="mt-minimal flex justify-between items-center fixed lg:relative bottom-0 right-0 left-0 bottom-0 bg-white py-3 px-3 lg:px-0 lg:border-t-0 border-t"
            >
              <div class="flex justify-start space-x-4 text-lg">
                <p>Genel toplam:</p>
                <p class="text-medium text-secondary-500 font-bold">39.00 TL</p>
              </div>

              <UiButtonsBaseButton color="secondary" class="font-semibold px-8"
                >Ödeme</UiButtonsBaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
