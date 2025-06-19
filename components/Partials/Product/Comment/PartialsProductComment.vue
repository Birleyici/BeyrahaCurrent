<template>
  <div class="px-6 lg:px-0 mt-pad-2 lg:mt-pad-3">
    <p class="mb-2 font-bold">Yorum yap</p>

    <UiNotificationBar type="info">Ürüne yalnızca ürünü satın alan oturum açmış kullanıcılar yorum yapabilir.
    </UiNotificationBar>

    <UTextarea class="h-60 my-pad-2" placeholder="Yorumunuz" resize />

    <div class="flex space-x-4">
      <UInput type="file" accept="image/*" size="md" />
      <USelect class="!w-full lg:!w-72" size="md">
        <option value="1">1 - Çok kötü</option>
        <option value="2">2 - Kötü</option>
        <option value="3">3 - Orta</option>
        <option value="4">4 - İyi</option>
        <option value="5">5 - Mükemmel</option>
      </USelect>
    </div>
    <UiButtonsBaseButton color="secondary">Yorumu gönder</UiButtonsBaseButton>
  </div>

  <div class="px-6 lg:px-0 mt-pad-2 lg:mt-pad-3">
    <div class="mb-2 font-bold flex items-end space-x-2">
      <p>Yorumlar</p>
    </div>
    <div class="text-xl my-pad-2 font-medium flex space-x-2">
      <p class="text-secondary-500">3.8</p>
      <p>(253 değerlendirme)</p>
    </div>

    <div class="grid gap-4 border-b border-dotted pb-3">
      <PartialsCommentItem></PartialsCommentItem>
    </div>
  </div>
</template>
