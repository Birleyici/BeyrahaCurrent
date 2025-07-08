<template>
    <div class="relative">
        <UInput ref="input" :model-value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" @keydown.escape="$emit('escape')"
            @keydown.enter.prevent="$emit('submit')" type="text" :placeholder="placeholder" variant="outline" :ui="{
                icon: { trailing: { pointer: '' } },

            }">
            <template #trailing>
                <div class="relative w-4 h-4">
                    <!-- Büyüteç İkonu -->
                    <Transition name="search-icon" mode="out-in">
                        <UIcon v-if="!modelValue && !isSearching && !isTyping" key="search"
                            name="i-heroicons-magnifying-glass" data-icon="search"
                            class="absolute inset-0 w-4 h-4 text-neutral-400 dark:text-neutral-500 transition-colors duration-300" />

                        <!-- Typing İkonu -->
                        <div v-else-if="isTyping && !isSearching" key="typing" data-icon="typing"
                            class="absolute inset-0 w-4 h-4 flex items-center justify-center">
                            <div class="typing-dots">
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                            </div>
                        </div>

                        <!-- Loading İkonu -->
                        <UIcon v-else-if="isSearching" key="loading" name="i-heroicons-arrow-path" data-icon="loading"
                            class="absolute inset-0 w-4 h-4 text-secondary-500 dark:text-secondary-400 search-loading" />

                        <!-- Temizleme Butonu -->
                        <UButton v-else-if="modelValue && !isSearching && !isTyping" key="clear" @click="clearSearch"
                            color="gray" variant="link" icon="i-heroicons-x-mark" :padded="false" size="2xs"
                            data-icon="clear"
                            class="absolute inset-0 w-4 h-4 text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200" />
                    </Transition>
                </div>
            </template>
        </UInput>

        <!-- Search Suggestions/Shortcuts -->
        <div v-if="!modelValue && showSuggestions"
            class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200/80 dark:border-neutral-700/80 p-4 z-50 backdrop-blur-sm transition-colors duration-300">
            <div class="space-y-3">
                <h4 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 flex items-center">
                    <UIcon name="i-heroicons-fire" class="w-4 h-4 text-secondary-400 mr-2" />
                    Popüler Aramalar
                </h4>
                <div class="flex flex-wrap gap-2">
                    <button v-for="suggestion in popularSearches" :key="suggestion"
                        @click="selectSuggestion(suggestion)" type="button"
                        class="px-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-700 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 text-neutral-600 dark:text-neutral-300 hover:text-secondary-600 dark:hover:text-secondary-400 rounded-md transition-colors duration-150 border border-neutral-200/60 dark:border-neutral-600/60 hover:border-secondary-200 dark:hover:border-secondary-600 font-medium">
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Ara...'
    },
    isSearching: {
        type: Boolean,
        default: false
    },
    isTyping: {
        type: Boolean,
        default: false
    },
    showSuggestions: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'update:modelValue',
    'submit',
    'focus',
    'blur',
    'escape',
    'clear'
])

const input = ref(null)

// Popüler kategoriler için composable kullan
const { popularCategories, fetchPopularCategories } = useCategoriesPopular()

// Gerçek verilerle popüler aramalar
const popularSearches = computed(() => {
    const fallback = [
        'Tesettür Elbise',
        'Başörtüsü',
        'Tunik',
        'Pantolon',
        'Etek',
        'Kap',
        'Şal',
        'Ayakkabı'
    ]

    if (popularCategories.value.length > 0) {
        return [
            ...popularCategories.value.map(cat => cat.name),
            ...fallback.filter(item => !popularCategories.value.some(cat => cat.name.includes(item)))
        ].slice(0, 8)
    }

    return fallback
})

// Component mount olduğunda popüler kategorileri getir
onMounted(() => {
    fetchPopularCategories(4)
})

function clearSearch() {
    emit('update:modelValue', '')
    emit('clear')
    input.value?.$refs?.input?.focus()
}

function selectSuggestion(suggestion) {
    emit('update:modelValue', suggestion)
    emit('submit')
}

defineExpose({
    $refs: computed(() => input.value?.$refs || {}),
    focus: () => input.value?.$refs?.input?.focus(),
    blur: () => input.value?.$refs?.input?.blur()
})
</script>

<style scoped>
/* Smart Icon Transitions */
.search-icon-enter-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-icon-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

/* Default state - fade in with subtle scale */
.search-icon-enter-from {
    opacity: 0;
    transform: scale(0.85) rotate(-15deg);
}

.search-icon-leave-to {
    opacity: 0;
    transform: scale(0.95) rotate(15deg);
}

/* Loading icon - enters with spin effect */
.search-icon-enter-from[data-icon="loading"] {
    opacity: 0;
    transform: scale(0.6) rotate(-180deg);
}

.search-icon-leave-to[data-icon="loading"] {
    opacity: 0;
    transform: scale(0.8) rotate(180deg);
}

/* Clear button - enters with bounce */
.search-icon-enter-from[data-icon="clear"] {
    opacity: 0;
    transform: scale(0.5) rotate(-90deg);
}

.search-icon-leave-to[data-icon="clear"] {
    opacity: 0;
    transform: scale(0.7) rotate(90deg);
}

/* Search icon - gentle fade and scale */
.search-icon-enter-from[data-icon="search"] {
    opacity: 0;
    transform: scale(0.9) translateY(2px);
}

.search-icon-leave-to[data-icon="search"] {
    opacity: 0;
    transform: scale(1.1) translateY(-2px);
}

/* Enhanced hover effects */
.search-icon-enter-active button {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-icon-enter-active button:hover {
    transform: scale(1.1);
}

/* Custom loading animation */
@keyframes search-loading {
    0% {
        transform: rotate(0deg) scale(1);
    }

    25% {
        transform: rotate(90deg) scale(1.05);
    }

    50% {
        transform: rotate(180deg) scale(1);
    }

    75% {
        transform: rotate(270deg) scale(1.05);
    }

    100% {
        transform: rotate(360deg) scale(1);
    }
}

.search-loading {
    animation: search-loading 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Subtle pulse when loading enters */
.search-icon-enter-active [data-icon="loading"] {
    animation: search-loading 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Modern Typing Dots Animation */
.typing-dots {
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
}

.typing-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f59e0b, #ef4444);
    animation: typing-bounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-dot:nth-child(2) {
    animation-delay: -0.16s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0s;
}

@keyframes typing-bounce {

    0%,
    80%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    40% {
        transform: scale(1.2);
        opacity: 1;
    }
}

/* Dark mode typing dots */
.dark .typing-dot {
    background: linear-gradient(45deg, #fbbf24, #f87171);
}

/* Typing container specific transitions */
.search-icon-enter-from[data-icon="typing"] {
    opacity: 0;
    transform: scale(0.6) translateY(-4px);
}

.search-icon-leave-to[data-icon="typing"] {
    opacity: 0;
    transform: scale(0.8) translateY(4px);
}
</style>
