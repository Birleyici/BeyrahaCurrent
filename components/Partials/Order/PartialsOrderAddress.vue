<template>
    <div class="w-full">
        <!-- Adres Bilgileri -->
        <div class="space-y-4">
            <!-- Ad Soyad -->
            <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-0.5 flex-shrink-0">
                    <UIcon name="i-heroicons-user" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                        Ad Soyad</p>
                    <p class="text-neutral-900 dark:text-neutral-100 font-semibold">
                        {{ props.address.name }} {{ props.address.last_name }}
                    </p>
                </div>
            </div>

            <!-- Adres -->
            <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-0.5 flex-shrink-0">
                    <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                        Adres</p>
                    <p class="text-neutral-900 dark:text-neutral-100 leading-relaxed">
                        {{ props.address.address }}
                    </p>
                    <p class="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        {{ props.address.city?.city }} / {{ props.address.district?.district }}
                    </p>
                </div>
            </div>

            <!-- Telefon -->
            <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-0.5 flex-shrink-0">
                    <UIcon name="i-heroicons-phone" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                        Telefon</p>
                    <p class="text-neutral-900 dark:text-neutral-100 font-medium">{{ props.address.phone }}</p>
                </div>
            </div>

            <!-- Varsayılan Adres Badge -->
            <div v-if="props.address.isDefault" class="flex items-center gap-2">
                <div
                    class="bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <UIcon name="i-heroicons-star-solid" class="w-3 h-3" />
                    Varsayılan Adres
                </div>
            </div>
        </div>

        <!-- Aksiyonlar -->
        <div v-if="isActiveEditingButton || isActiveSetDefaultButton"
            class="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div class="flex flex-wrap gap-2">
                <UButton v-if="isActiveEditingButton" @click="isOpenEditModal = true" color="secondary" variant="soft"
                    size="sm" icon="i-heroicons-pencil-square">
                    Düzenle
                </UButton>
                <UButton v-if="isActiveSetDefaultButton" :loading="props.address.loading"
                    @click="orderState.setDefaultAddress(props.address)" color="green" variant="soft" size="sm"
                    icon="i-heroicons-star">
                    Varsayılan Yap
                </UButton>
            </div>
        </div>

        <!-- Silme Onay Modalı -->
        <PartialsUiModalConfirmation @is-confirm="(e) => e && orderState.deleteAddress(props.address.id)"
            message="Adresi silmek istediğinize emin misiniz?" v-model:is-open="isOpenDeleteModal" />

        <!-- Düzenleme Modalı -->
        <UModal v-model="isOpenEditModal" :fullscreen="isMobile">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            Adres Düzenle
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isOpenEditModal = false" />
                    </div>
                </template>
                <PartialsOrderAddressForm :address="props.address" @is-saved="e => e && (isOpenEditModal = false)"
                    :save-function="props.saveFunction" />
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import { useDevice } from 'use-device';

const props = defineProps(["address", 'saveFunction', 'addressOptions']);
const orderState = useOrderStoreFront();
const isOpenDeleteModal = ref(false);
const isOpenEditModal = ref(false)

// Device detection
const { isMobile } = useDevice()

const isActiveEditingButton = computed(() => {
    return props.addressOptions?.editMode || props.addressOptions?.edit || props.addressOptions?.allAction;
})

const isActiveSetDefaultButton = computed(() => {
    return (props.addressOptions?.editMode && props.address.isDefault) ||
        ((props.addressOptions?.setDefault || props.addressOptions?.allAction) && !props.address.isDefault);
})
</script>