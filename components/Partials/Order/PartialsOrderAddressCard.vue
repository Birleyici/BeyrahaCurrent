<template>
    <div class="lg:flex items-center space-x-4 w-full border rounded-md py-4 px-1">
        <div></div>
        <div class="space-y-1 w-full">
            <b>{{props.title}}</b>
            <div class="flex space-x-2">
                <span class="font-medium !bg-transparent">İsim:</span>
                <p>{{ props.address.name }}</p>
            </div>
            <div class="flex space-x-2">
                <span class="font-medium !bg-transparent">Soyisim:</span>
                <p>{{ props.address.last_name }}</p>
            </div>
            <div class="flex space-x-2">
                
                <span class="font-medium !bg-transparent">Adres:</span>
                <p>
                    {{
                        `${props.address.address}, ${props.address.city?.city} / ${props.address.district?.district}`
                    }}
                </p>
            </div>
            <div class="flex space-x-2">
                <span class="font-medium !bg-transparent">Telefon:</span>
                <p>{{ props.address.phone }}</p>
            </div>

            <PartialsUiModalConfirmation @is-confirm="(e) => e && orderState.deleteAddress(props.address.id)"
                message="Adresi silmek istediğinize emin misiniz?" v-model:is-open="isOpenDeleteModal" />

            <div v-if="props.actions" class="flex space-x-4">
                <UButton @click="orderState.editAddress(props.address.id)" color="orange" class="p-0" variant="link">Düzenle
                </UButton>
                <UButton @click="isOpenDeleteModal = true" color="red" class="p-0" variant="link">Sil</UButton>
               
            </div>
        </div>
    </div>
</template>

<script setup>
const { useOrderState } = useStateIndex();
const orderState = useOrderState();
const props = defineProps(["address", "deleteAddress", "actions", 'title']);
const isOpenDeleteModal = ref(false);


</script>
