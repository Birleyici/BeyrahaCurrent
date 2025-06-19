<template>
    <div>
        <UModal v-model="isOpenMediaModal" fullscreen>
            <div class="h-full bg-white dark:bg-gray-900 flex flex-col">
                <!-- Modal Header -->
                <div
                    class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ term.term_name }} için Medya Seç
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpenMediaModal = false" />
                </div>

                <!-- Modal Content -->
                <div class="flex-1 overflow-y-auto">
                    <AdminPartialsMedia v-model="term.term_images" />
                </div>
            </div>
        </UModal>

        <div class="w-full mb-2">
            <div class="flex">
                <UButton variant="soft" color="gray" :ui="{ rounded: 'rounded-b-none rounded-r-none' }"
                    class="border border-b-0">
                    {{ term.term_name }}
                </UButton>

                <UButton :loading="term.loading" @click="showDeleteTermConfirmation(term)" icon="i-heroicons-x-mark"
                    variant="soft" color="red" class="border border-b-0 border-l-0" size="2xs"
                    :ui="{ rounded: 'rounded-l-none rounded-b-none' }" />
            </div>

            <div class="bg-tertiary-50 w-full border p-2 rounded-md rounded-tl-none flex space-x-2 items-center">
                <img @click="isOpenMediaModal = true" :src="placeholderImg" alt=""
                    class="cursor-pointer w-16 rounded-md" />

                <p v-if="!hasImages" class="text-sm text-center">
                    Görsel seçilmedi...
                </p>

                <div v-else class="flex space-x-2">
                    <NuxtImg v-if="term.image" :src="'cl/' + term.image.path" width="42px" class="rounded-md"
                        :alt="term.term_name" />

                    <NuxtImg v-else v-for="img in term.term_images" :key="img.id" :src="'cl/' + img?.path" width="42px"
                        class="rounded-md" :alt="term.term_name" />
                </div>
            </div>
        </div>

        <!-- Delete Term Confirmation Modal -->
        <UModal v-model="showDeleteTermModal" :ui="{ width: 'sm:max-w-md' }">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                            Renk Terimini Sil
                        </h3>
                    </div>
                </template>

                <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                        <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
                        <div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                "{{ termToDelete?.term_name }}" rengini silmek istediğinizden emin misiniz?
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Bu işlem geri alınamaz ve renk ile ilişkili tüm veriler silinir.
                            </p>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <UButton color="gray" variant="outline" @click="hideDeleteTermModal">
                            İptal
                        </UButton>
                        <UButton color="red" :loading="termToDelete?.loading" @click="confirmDeleteTerm">
                            Evet, Sil
                        </UButton>
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
const { term, terms } = defineProps(['term', 'terms'])
const {
    removeTerm
} = useAttributes()

const isOpenMediaModal = ref(false)
const placeholderImg = '/img-placeholder.jpg'

// Delete confirmation states
const showDeleteTermModal = ref(false)
const termToDelete = ref(null)

// Delete confirmation modal functions
const showDeleteTermConfirmation = (term) => {
    termToDelete.value = term
    showDeleteTermModal.value = true
}

const hideDeleteTermModal = () => {
    showDeleteTermModal.value = false
    termToDelete.value = null
}

const confirmDeleteTerm = async () => {
    if (!termToDelete.value) return

    try {
        await removeTerm(termToDelete.value, terms)
    } catch (error) {
        console.error('Renk terimi silme hatası:', error)
    } finally {
        hideDeleteTermModal()
    }
}

// Görsel var mı kontrolü - hem image hem term_images formatını destekler
const hasImages = computed(() => {
    return term.image || (term.term_images && term.term_images.length > 0)
})
</script>
