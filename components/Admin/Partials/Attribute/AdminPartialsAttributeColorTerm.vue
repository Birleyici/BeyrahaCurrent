<template>
    <div>

        <UModal v-model="isOpenMediaModal" fullscreen>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Media
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenMediaModal = false" />
                    </div>
                </template>
                <AdminPartialsMedia v-model="term.term_images" />
            </UCard>
        </UModal>


        <div class="grid ">
            <div class="flex space-y-2 items-center">
                <div class="w-full mb-2">
                    <div class="flex">
                        <UButton variant="soft" color="gray" :ui="{ rounded: 'rounded-b-none rounded-r-none' }"
                            class="border border-b-0">
                            {{ term.term_name }}
                        </UButton>
                        
                        <UButton :loading="term.loading" @click="removeTerm(term, terms)" icon="i-heroicons-x-mark"
                            variant="soft" color="red" class="border border-b-0 border-l-0" size="2xs"
                            :ui="{ rounded: 'rounded-l-none rounded-b-none' }" />

                    </div>
                    <div
                        class="bg-tertiary-50 w-full border p-2 rounded-md rounded-tl-none flex space-x-2 items-center">

                        <img @click="isOpenMediaModal = true" :src="placeholderImg" alt=""
                            class="cursor-pointer w-16 rounded-md" />
                        <p v-if="!term.term_images" class="text-sm text-center">
                            Görsel seçilmedi...
                        </p>

                        <div v-else class="flex space-x-2">
                            <NuxtImg v-for="img in term.term_images" :src="'aws/' + img?.path" width="42px"
                                class="rounded-md" />

                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
const { term, terms } = defineProps(['term', 'terms'])
const {
    removeTerm

} = useAttributes()
const isOpenMediaModal = ref(false)
const placeholderImg = '/img-placeholder.jpg'

</script>
