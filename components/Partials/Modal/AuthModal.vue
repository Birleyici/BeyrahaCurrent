<template>
    <UModal v-model="isOpen" :ui="{ width: 'w-full sm:max-w-lg' }">
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-center mb-6">

                <UButton @click="closeModal" color="neutral" variant="ghost" icon="i-heroicons-x-mark" size="sm" />
            </div>

            <!-- Auth Form -->
            <PartialsFormAuthForm :redirect="false" @login-success="handleAuthSuccess"
                @register-success="handleAuthSuccess" />
        </div>
    </UModal>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:show', 'auth-success'])

// Local state
const isOpen = computed({
    get: () => props.show,
    set: (value) => emit('update:show', value)
})

// Methods
const closeModal = () => {
    isOpen.value = false
}

const handleAuthSuccess = () => {
    emit('auth-success')
    closeModal()
}
</script>