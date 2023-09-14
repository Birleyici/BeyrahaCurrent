<template>
    <div>
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
          <div class="grid gap-2 mt-2">
            <UiButtonsBaseButton color="slate">Sepete Git</UiButtonsBaseButton>
            <UiButtonsBaseButton color="secondary">Ödeme</UiButtonsBaseButton>
          </div>
        </div>     
    </div>
</template>