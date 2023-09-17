<template>
  <div class="p-minimal relative border max-w-full rounded-md mx-auto lg:max-w-[500px]">
    <p class="text-secondary-500 font-medium">Şifre hatırlatma</p>
    <div class="grid gap-4 py-minimal">
      <div class="grid gap-4">
        <p class="text-sm">E-mail adresinize güvenli bir şifre yenileme bağlantısı göndereceğiz.</p>
        <div>
          <label for="">E-mail</label>
          <UiFormInput placeholder="E-mail adresiniz"></UiFormInput>
        </div>

        <UiButtonsBaseButton color="secondary">Bağlantı gönder</UiButtonsBaseButton>
      </div>
    </div>
  </div>
</template>
