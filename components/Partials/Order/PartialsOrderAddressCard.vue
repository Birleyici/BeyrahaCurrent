<template>
    <div :class="{ 'animate-pulse': loading }, [props.class]"
        class="grid w-full border rounded-md relative bg-white overflow-hidden">
        <div class="w-full bg-slate-50 absolute px-4 py-2 font-medium border-b overflow-hidden">
            <UIcon class="absolute top-0 right-0 w-10 h-10 opacity-5"  name="i-heroicons-map-pin" />
            {{ props.title }}
        </div>
        
        <div class="mt-8 p-4">
            <PartialsOrderAddress
        :address-options="props.addressOptions"
        :address="props.address"
        :save-function="props.saveFunction" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["address", "class",  'title', 'addressOptions', 'saveFunction']);
const loading = ref(false)
</script>
