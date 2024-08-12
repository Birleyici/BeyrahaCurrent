<template>
    <div :class="{'animate-pulse': loading}" class="grid  w-full border rounded-md relative overflow-hidden">
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

            <div v-if="props.actions !== false " class="flex space-x-4 ">
                <UButton @click="orderState.editAddress(props.address.id)" color="orange" class="p-0" variant="link">
                    Düzenle
                </UButton>
                <UButton :disabled="loading" @click="setDefaultAddressHandle()" v-if="!props.address.isDefault" color="orange" class="p-0"
                    variant="link">Varsayılan yap
                <UIcon v-if="loading" name="i-heroicons-arrow-path-20-solid animate-spin"></UIcon>
                </UButton>

                <!-- <UButton @click="isOpenDeleteModal = true" color="red" class="p-0" variant="link">Sil</UButton> -->

            </div>


            
        </div>
    </div>
</template>

<script setup>
const { useOrderState } = useStateIndex();
const orderState = useOrderState();
const props = defineProps(["address", "deleteAddress", "actions", 'title']);
const isOpenDeleteModal = ref(false);
const loading = ref(false)

const setDefaultAddressHandle = async () => {
    loading.value = true
    await orderState.setDefaultAddress(props.address.id)
    loading.value = false
}

</script>
