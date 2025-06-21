<template>
    <div class="container mx-auto p-8 space-y-8">
        <h1 class="text-3xl font-bold text-center">Native Back Button Test</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Modal Test -->
            <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl border">
                <h2 class="text-xl font-semibold mb-4">Modal Test</h2>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Modal'ı aç ve geri tuşuna bas. Modal kapanmalı, önceki sayfaya gitmemeli.
                </p>
                <UButton @click="isModalOpen = true" color="secondary">
                    Modal Aç
                </UButton>
            </div>

            <!-- Slideover Test -->
            <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl border">
                <h2 class="text-xl font-semibold mb-4">Slideover Test</h2>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Slideover'ı aç ve geri tuşuna bas. Slideover kapanmalı.
                </p>
                <UButton @click="isSlideoverOpen = true" color="primary">
                    Slideover Aç
                </UButton>
            </div>

            <!-- Search Test -->
            <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl border">
                <h2 class="text-xl font-semibold mb-4">Search Test</h2>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Arama overlay'ını aç ve geri tuşuna bas. Arama kapanmalı.
                </p>
                <UButton @click="isSearchOpen = true" color="green">
                    Arama Aç
                </UButton>
            </div>
        </div>

        <!-- Back Handler Stack Info -->
        <div class="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-4">Aktif Back Handler'lar</h3>
            <div v-if="backHandlerStack.length === 0" class="text-neutral-600 dark:text-neutral-400">
                Hiç aktif handler yok
            </div>
            <div v-else class="space-y-2">
                <div v-for="handler in backHandlerStack" :key="handler.id"
                    class="flex items-center justify-between bg-white dark:bg-neutral-800 p-3 rounded-lg">
                    <div>
                        <div class="font-medium">{{ handler.id }}</div>
                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                            Öncelik: {{ handler.priority }}
                        </div>
                    </div>
                    <UBadge :color="handler.priority >= 100 ? 'red' : handler.priority >= 50 ? 'orange' : 'blue'">
                        {{ handler.priority >= 100 ? 'MODAL' : handler.priority >= 50 ? 'SLIDEOVER' : 'SEARCH' }}
                    </UBadge>
                </div>
            </div>

            <!-- Manuel Test Butonu -->
            <div class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <UButton @click="testBackButton" color="red" variant="outline" size="sm" class="w-full">
                    Manuel Back Button Test
                </UButton>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Bu buton manuel olarak back button handler'ını çalıştırır
                </p>
            </div>
        </div>

        <!-- Test Modal -->
        <UModal v-model="isModalOpen" :prevent-close="true">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold">Test Modal</h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isModalOpen = false" />
                    </div>
                </template>

                <div class="p-4">
                    <p class="mb-4">Bu bir test modal'ıdır. Geri tuşuna basarak kapatmayı deneyin!</p>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        Öncelik: {{ BACK_HANDLER_PRIORITIES.MODAL }}
                    </p>
                </div>
            </UCard>
        </UModal>

        <!-- Test Slideover -->
        <USlideover v-model="isSlideoverOpen">
            <UCard class="flex flex-col flex-1">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold">Test Slideover</h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isSlideoverOpen = false" />
                    </div>
                </template>

                <div class="p-4">
                    <p class="mb-4">Bu bir test slideover'ıdır. Geri tuşuna basarak kapatmayı deneyin!</p>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        Öncelik: {{ BACK_HANDLER_PRIORITIES.SLIDEOVER }}
                    </p>
                </div>
            </UCard>
        </USlideover>

        <!-- Test Search Overlay -->
        <div v-if="isSearchOpen" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">Test Search</h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isSearchOpen = false" />
                </div>
                <p class="mb-4">Bu bir test arama overlay'ıdır. Geri tuşuna basarak kapatmayı deneyin!</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    Öncelik: {{ BACK_HANDLER_PRIORITIES.SEARCH }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSettings } from '~/composables/useSettings'

const { siteName } = useSettings()

useHead({
    title: computed(() => `Native Back Button Test - ${siteName.value}`)
})

// Native back button handler
const { BACK_HANDLER_PRIORITIES, useBackHandler, useNativeBackHandler } = await import('~/composables/useNativeBackHandler.js')
const { backHandlerStack } = useNativeBackHandler()

// Test states
const isModalOpen = ref(false)
const isSlideoverOpen = ref(false)
const isSearchOpen = ref(false)

// Back handlers - TEK SATIRLAR!
useBackHandler(isModalOpen, BACK_HANDLER_PRIORITIES.MODAL)
useBackHandler(isSlideoverOpen, BACK_HANDLER_PRIORITIES.SLIDEOVER)
useBackHandler(isSearchOpen, BACK_HANDLER_PRIORITIES.SEARCH)

// Manuel Test Butonu
const testBackButton = () => {
    // Simüle popstate event
    const event = new PopStateEvent('popstate', {
        state: { isBackHandlerActive: true }
    })

    window.dispatchEvent(event)
}
</script>