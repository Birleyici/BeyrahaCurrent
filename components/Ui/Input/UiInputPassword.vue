<template>
    <UFormGroup :label="props.label" name="password">
        <div class="flex w-full">
            <UInput :ui="{ rounded: 'rounded-r-none', wrapper: 'w-full' }" v-model="model" :type="type" />
            <UButton color="gray" @click="isShow = !isShow" :ui="{ rounded: '!rounded-l-none' }" :icon="icon" />
        </div>
    </UFormGroup>

</template>
<script setup>
const model = defineModel()
const props = defineProps(['label'])
const isShow = ref(false)
const type = computed(() => {
    return isShow.value ? 'text' : 'password'
})
const icon = computed(() => {
    return isShow.value ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
})
</script>