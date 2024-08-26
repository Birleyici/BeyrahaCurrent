<template>
    <div :class="{ 'animate-pulse': loading }, [props.class]"
        class="grid w-full border rounded-md relative overflow-hidden">
        <div class="grid gap-2 w-full">
            <b>{{ props.title }}</b>
            <div class="grid grid-cols-6">
                <span class="col-span-2  font-medium !bg-transparent ">İsim :</span>
                <p class="col-span-4">{{ props.address.name }}</p>
            </div>
            <div class="grid grid-cols-6">
                <span class="col-span-2 font-medium !bg-transparent ">Soyisim :</span>
                <p class="col-span-4">{{ props.address.last_name }}</p>
            </div>
            <div class="grid grid-cols-6">

                <span class="col-span-2 font-medium !bg-transparent ">Adres :</span>
                <p class="col-span-4">
                    {{
                        `${props.address.address}, ${props.address.city?.city} / ${props.address.district?.district}`
                    }}
                </p>
            </div>
            <div class="grid grid-cols-6">
                <span class="col-span-2 font-medium !bg-transparent ">Telefon :</span>
                <p class="col-span-4">{{ props.address.phone }}</p>
            </div>

            <PartialsUiModalConfirmation @is-confirm="(e) => e && orderState.deleteAddress(props.address.id)"
                message="Adresi silmek istediğinize emin misiniz?" v-model:is-open="isOpenDeleteModal" />
            <div class="flex space-x-4 ">

                <UButton v-if="isActiveEditingButton" @click="editAddress(props.address)" color="orange" class="p-0"
                    variant="link">
                    Düzenle
                </UButton>
                <UButton v-if="isActiveSetDefaultButton" :disabled="loading" @click="setDefaultAddressHandle()"
                    color="orange" class="p-0" variant="link">
                    Varsayılan yap
                    <UIcon v-if="loading" name="i-heroicons-arrow-path-20-solid animate-spin"></UIcon>
                </UButton>
                <!-- <UButton @click="isOpenDeleteModal = true" color="red" class="p-0" variant="link">Sil</UButton> -->
            </div>
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
const orderState = useOrderStoreFront();
const props = defineProps(["address", "class", "actions", "actionEdit", "actionSetDefault", 'title', 'saveFunction', 'editingMode']);
const isOpenDeleteModal = ref(false);
const isOpenEditModal = ref(false)
const loading = ref(false)
const emit = defineEmits(['editedAddress'])

const setDefaultAddressHandle = async () => {
    loading.value = true
    await orderState.setDefaultAddress(props.address.id)
    loading.value = false
}

const editAddress = async (address) => {
    isOpenEditModal.value = true
}


const isActiveEditingButton = computed(() => {
    return props.editingMode || props.actionEdit || props.actions;
})
const isActiveSetDefaultButton = computed(() => {
    return (props.editingMode && props.address.isDefault) || ((props.actionSetDefault || props.actions) && !props.address.isDefault);
})

</script>
