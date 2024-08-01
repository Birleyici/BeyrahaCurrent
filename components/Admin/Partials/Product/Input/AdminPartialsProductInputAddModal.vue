<template>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Özel alan ekle
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>
            <div class="grid gap-6">
                <div class="grid grid-cols-2 gap-4">
                    <UInput id="label" color="orange" variant="outline" placeholder="Label"
                        v-model="inputInstance.label" />
                    <UInput id="label" color="orange" variant="outline" placeholder="Placeholder"
                        v-model="inputInstance.placeholder" />
                    <UInput color="orange" variant="outline" placeholder="Açıklama"
                        v-model="inputInstance.description" />
                    <UCheckbox color="orange" label="Gerekli" v-model="isRequired" />
                </div>

                <div>
                    <UDivider label="Önizleme" />
                </div>
                <div class="grid gap-1">
                    <div class="flex space-x-2 items-center">
                        <label class="text-sm" for="input">{{ inputInstance.label || 'Label' }}</label>
                        <span v-if="inputInstance.isRequired" class="text-xs text-red-500">(Gerekli)</span>
                    </div>
                    <UInput id="input" color="gray" disabled variant="outline" placeholder="Placeholder"
                        v-model="inputInstance.placeholder" />
                    <p class="text-sm text-gray-400">{{ inputInstance.description || 'Açıklama' }}</p>
                </div>

                <div class="mt-4">
                    <UButton color="orange" @click="saveInput()" variant="solid">Özel alanı kaydet</UButton>
                </div>
            </div>
        </UCard>
    </UModal>
</template>


<script setup>
const props = defineProps(['input', 'product'])
const isOpen = defineModel()

const inputInstance = ref({
    label: null,
    placeholder: null,
    description: null,
    isRequired: 0,
    pivot: {
        product_id: 58,
    },
});

const isRequired = computed({
    get() {
        return inputInstance.value.isRequired === 1;
    },
    set(value) {
        inputInstance.value.isRequired = value ? 1 : 0;
    }
});


const saveInput = async () => {
    try {
        const response = await useBaseOFetchWithAuth("input", {
            method: "POST",
            body: inputInstance.value
        });

        props.product.vendor_inputs.push(response)
        props.product.selectedInput = response

    } catch (error) {

        console.log(error.response, 'trycatch')

    };

}

</script>