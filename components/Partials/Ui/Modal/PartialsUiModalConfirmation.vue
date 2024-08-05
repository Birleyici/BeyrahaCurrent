<template>
    <UModal v-model="isOpen" :transition="false" :ui="{ overlay: {background: '!bg-gray-200/35'}}">
        <div class="p-4 grid gap-4">
            <p>{{props.message}}</p>
            <div class="flex space-x-3">
                <UButton @click="$emit('isConfirm', true)" size="sm" color="red" variant="solid" label="Onayla"
                    :trailing="false" />
                <UButton @click="isOpen = false" size="sm" color="gray" variant="solid" label="Vazgeç"
                    :trailing="false" />
            </div>
        </div>
    </UModal>
</template>

<script setup>
const isOpen = defineModel('isOpen')
const props = defineProps(['message'])
</script>