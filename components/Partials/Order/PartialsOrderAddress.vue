<template>
    <div class="grid gap-2 w-full relative py-3">
        <table>
            <tr>
                <td class="font-medium !bg-transparent">Ad</td>
                <td class="px-4">:</td>
                <td>{{ props.address.name }}</td>
            </tr>
            <tr>
                <td class="font-medium !bg-transparent">Soyad</td>
                <td class="px-4">:</td>
                <td>{{ props.address.last_name }}</td>
            </tr>
            <tr>
                <td class="font-medium !bg-transparent ">Adres</td>
                <td class="px-4">:</td>
                <td>
                    {{
                        `${props.address.address}, ${props.address.city?.city} / ${props.address.district?.district}`
                    }}
                </td>
            </tr>
            <tr>
                <td class="font-medium !bg-transparent">Telefon</td>
                <td class="px-4">:</td>
                <td>{{ props.address.phone }}</td>
            </tr>
        </table>


        <PartialsUiModalConfirmation @is-confirm="(e) => e && orderState.deleteAddress(props.address.id)"
            message="Adresi silmek istediğinize emin misiniz?" v-model:is-open="isOpenDeleteModal" />

        <div v-if="isActiveEditingButton || isActiveSetDefaultButton" class="flex space-x-4 ">

            <UButton v-if="isActiveEditingButton" @click="isOpenEditModal = true" color="orange" class="p-0"
                variant="link">
                Düzenle
            </UButton>
            <UButton v-if="isActiveSetDefaultButton" :loading="props.address.loading" @click="orderState.setDefaultAddress(props.address)"
                color="orange" class="p-0" variant="link">
                Varsayılan yap
            </UButton>
            <!-- <UButton @click="isOpenDeleteModal = true" color="red" class="p-0" variant="link">Sil</UButton> -->
        </div>
        <UModal v-model="isOpenEditModal" :fullscreen="$device.isMobile">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Adres
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenEditModal = false" />
                    </div>
                </template>
                <PartialsOrderAddressForm :address="props.address" @is-saved="e => e && (isOpenEditModal = false)"
                    :save-function="props.saveFunction"></PartialsOrderAddressForm>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
const props = defineProps(["address",  'saveFunction', 'addressOptions']);
const orderState = useOrderStoreFront();
const isOpenDeleteModal = ref(false);
const isOpenEditModal = ref(false)
const isActiveEditingButton = computed(() => {
    return props.addressOptions?.editMode || props.addressOptions?.edit || props.addressOptions?.allAction;
})
const isActiveSetDefaultButton = computed(() => {
    return (props.addressOptions?.editMode && props.address.isDefault) || ((props.addressOptions?.setDefault || props.addressOptions?.allAction) && !props.address.isDefault);
})
</script>