<template>
  <div class="space-y-3 w-full md:w-[400px] px-6 md:mx-auto">
    <UCard>
      <template #header>
        <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ route.query.token ? 'Yeni şifre oluşturma' : 'Şifre hatırlatma' }}
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ route.query.token ? `Lütfen yeni şifrenizi oluşturun` : `Kayıtlı olduğunuz email adresinize bir şifre
          yenileme bağlantısı göndereceğiz.` }}
        </p>
      </template>
      <div v-if="!route.query.token">
        <UForm :schema="schemaRemind" :state="form" class="space-y-4" @submit="onRemind">
          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" color="orange" />
            <ul v-for="err in remindFormErrors?.email" class="text-red-500 text-sm my-1 w-full">
              <li>{{ err }}</li>
            </ul>
          </UFormGroup>

          <!-- <UiInputPassword label="Şifre" v-model="authStore.user.password" /> -->
          <UButton :loading="authStore.loading.remind" color="orange" size="md" type="submit"> Gönder </UButton>
          <UNotification :timeout="0" color="green"
            description="Şifre yenileme bağlantısı e-mail adresinize gönderildi." id="reset_notification"
            v-if="remindNotification" @close="remindNotification = false" />


        </UForm>
      </div>
      <div v-else>
        <UForm :schema="schemaChange" :state="changeForm" class="space-y-4" @submit="onChange">
          <UFormGroup label="Şifre" name="password">
            <UInput v-model="changeForm.password" color="orange" />
          </UFormGroup>

          <UFormGroup label="Şifre tekrarı" name="password_confirmation">
            <UInput v-model="changeForm.password_confirmation" color="orange" />
          </UFormGroup>

          <!-- <UiInputPassword label="Şifre" v-model="authStore.user.password" /> -->
          <UButton :loading="authStore.loading.remind" color="orange" size="md" type="submit"> Değiştir </UButton>
          <UNotification :timeout="0" color="green" description="Şifre yenileme başarılı girişe yönlendiriliyorsunuz."
            id="reset_notification2" v-if="resetNotification" @close="resetNotification = false" />
        </UForm>
      </div>
      <div class="mt-4">
        <ul v-for="err in errorObject" class="text-red-500 text-sm my-1 w-full">
          <li>{{ err }}</li>
        </ul>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()
const remindNotification = ref(false)
const resetNotification = ref(false)
const form = ref({
  email: ''
})
const changeForm = ref({
  password: '',
  password_confirmation: '',
  email: route.query.email,
  token: route.query.token
})



type RemindSchema = InferType<typeof schemaRemind>;
type ChangeSchema = InferType<typeof schemaChange>;

const schemaRemind = object({
  email: string().trim().email('Geçersiz email').required('Zorunlu'),
});

const schemaChange = object({
  password: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu'),
  password_confirmation: string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .required('Zorunlu')
});

const remindFormErrors = ref([]);
async function onRemind(event: FormSubmitEvent<RemindSchema>) {
  try {
    await authStore.remind(form.value.email);
    remindNotification.value = true;
    remindFormErrors.value = []
    form.value.email = '';
  } catch (error) {
    remindNotification.value = false;

    // parseError fonksiyonunu kullanarak hatayı işleyelim
    const parsedError = parseError(error);
    console.log(parsedError)

    if (parsedError.errorType) {
      remindFormErrors.value = parsedError.errors; // Eğer başka bir hata türü geldiyse
    }
  }
}


const changeFormErrors = ref([]);
async function onChange(event: FormSubmitEvent<ChangeSchema>) {
  try {
    await authStore.changePassword(changeForm.value);
    resetNotification.value = true;
    changeFormErrors.value = []
    setTimeout(() => {
      navigateTo('/auth');
    }, 2000);
  } catch (error) {


    resetNotification.value = false;
    // parseError fonksiyonunu kullanarak hatayı işleyelim
    const parsedError = parseError(error);
    if (parsedError.errorType) {
      changeFormErrors.value = parsedError.errors; // Eğer başka bir hata türü geldiyse
    }
  }
}


const errorObject = computed(() => {
  if (Object.keys(changeFormErrors.value).length > 0) {
    return Object.values(changeFormErrors.value).flat();
  }
  if (Object.keys(remindFormErrors.value).length > 0) {
    return Object.values(remindFormErrors.value).flat();
  }
  return [];
});

</script>
