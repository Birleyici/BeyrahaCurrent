<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
    </div>
    <div class="grid gap-4 grid-cols-2">
      <div>
        <label for="" class="text-sm">Ad* </label>
        <UiFormInput></UiFormInput>
      </div>
      <div>
        <label for="" class="text-sm">Soyad*</label>
        <UiFormInput></UiFormInput>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-2">
      <div>
        <label for="" class="text-sm">Telefon* </label>
        <UiFormInput></UiFormInput>
      </div>
      <div>
        <label for="" class="text-sm">İl*</label>
        <UiFormSelect>
          <option value="">İl seçin</option>
        </UiFormSelect>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-2">
      <div>
        <label for="" class="text-sm">İlçe* </label>
        <UiFormSelect>
          <option value="">İlçe seçin</option>
        </UiFormSelect>
      </div>
      <div>
        <label for="" class="text-sm">Mahalle*</label>
        <UiFormSelect>
          <option value="">Mahalle seçin</option>
        </UiFormSelect>
      </div>
    </div>
    <div>
      <label for="" class="text-sm">Adres* </label>
      <UiFormTextarea></UiFormTextarea>
    </div>
    <div>
      <label for="" class="text-sm">Adres başlığı* </label>
      <UiFormInput></UiFormInput>
    </div>

    <UiButtonsBaseButton color="secondary" class="px-6 font-medium"
      >Adresi kaydet</UiButtonsBaseButton
    >
  </div>
</template>
