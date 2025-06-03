<template>
    <div class="relative">
        <UInput ref="input" :model-value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" @keydown.escape="$emit('escape')"
            @keydown.enter.prevent="$emit('submit')" type="text" :placeholder="placeholder" variant="outline" :ui="{
                icon: { trailing: { pointer: '' } },

            }">
            <template #trailing>
                <Transition enter-active-class="transition duration-150 ease-out"
                    enter-from-class="transform scale-0 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-0 opacity-0">
                    <UButton v-if="modelValue && !isSearching" @click="clearSearch" color="gray" variant="link"
                        icon="i-heroicons-x-mark" :padded="false" size="2xs" />
                    <UIcon v-else-if="isSearching" name="i-heroicons-arrow-path" class="animate-spin w-4 h-4" />
                    <UIcon v-else name="i-heroicons-magnifying-glass" class="w-4 h-4 text-neutral-400" />
                </Transition>
            </template>
        </UInput>

        <!-- Search Suggestions/Shortcuts -->
        <div v-if="!modelValue && showSuggestions"
            class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200/80 p-4 z-50 backdrop-blur-sm">
            <div class="space-y-3">
                <h4 class="text-sm font-medium text-neutral-700 mb-3 flex items-center">
                    <UIcon name="i-heroicons-fire" class="w-4 h-4 text-orange-400 mr-2" />
                    Popüler Aramalar
                </h4>
                <div class="flex flex-wrap gap-2">
                    <button v-for="suggestion in popularSearches" :key="suggestion"
                        @click="selectSuggestion(suggestion)" type="button"
                        class="px-3 py-1.5 text-xs bg-neutral-50 hover:bg-secondary-50 text-neutral-600 hover:text-secondary-600 rounded-md transition-colors duration-150 border border-neutral-200/60 hover:border-secondary-200 font-medium">
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

const popularSearches = [
    'Tesettür Elbise',
    'Başörtüsü',
    'Tunik',
    'Pantolon',
    'Etek',
    'Kap',
    'Şal',
    'Ayakkabı'
]

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