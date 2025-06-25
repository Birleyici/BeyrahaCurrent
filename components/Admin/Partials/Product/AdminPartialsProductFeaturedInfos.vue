<template>
    <div class="flex space-x-2">
        <!-- {{ productState.product.featured_infos }} -->
        <UTextarea class="w-full" autoresize placeholder="Öne çıkan bilgi..." v-model="form.content" />
        <div>
            <UButton @click="addFeature()" size="sm" color="primary" variant="solid" label="Ekle" trailing />
        </div>
    </div>
    <p class="text-xs text-neutral-500 dark:text-neutral-400">Max. 5 adet öne çıkan bilgi ekleyebilirsiniz.</p>

    <div class="my-pad-2">
        <div class="flex items-center mb-2 space-x-2" v-for="feature in productState.product.featured_infos"
            :key="feature.id">
            <p class="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white w-full">
                {{ feature.content }}</p>
            <div>
                <UButton :loading="feature.loading" @click="deleteFeature(feature)" icon="i-heroicons-trash" size="2xs"
                    color="red" variant="solid" :trailing="false" />
            </div>
        </div>

    </div>
</template>

<script setup>
const form = ref({
    content: null,
    type: 'featured_info'
})
const productState = useProductState()

const addFeature = async () => {

    const response = await useBaseOFetchWithAuth(`product/productMeta/${productState.product.id}`, {
        method: 'POST',
        body: JSON.stringify(form.value)
    })

    if (!response.error) {
        productState.product.featured_infos.push(response)
        form.value.content = null
    }
}

const deleteFeature = async (feature) => {
    feature.loading = true
    const response = await useBaseOFetchWithAuth(`product/productMeta/${feature.id}`, {
        method: 'DELETE',
    }).finally(() => {
        feature.loading = false
    })

    if (!response.error) {
        productState.product.featured_infos = productState.product.featured_infos.filter(f => f.id != feature.id)
    }
}

</script>