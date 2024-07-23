<template>
    <div class="flex space-x-2">
        <!-- {{ productState.product.featured_infos }} -->
        <UTextarea class="w-full" autoresize placeholder="Öne çıkan bilgi..." v-model="form.content" />
        <div>
            <UButton @click="addFeature()" size="sm" color="primary" variant="solid" label="Ekle" trailing />
        </div>
    </div>
    <p class="text-xs text-gray-500">Max. 5 adet öne çıkan bilgi ekleyebilirsiniz.</p>

    <div class="my-minimal" >
        <div class="flex items-center mb-2 space-x-2" v-for="feature in productState.product.featured_infos" :key="feature.id">
            <p class="px-2 py-1 rounded-md bg-gray-100 w-full">{{feature.content}}</p>
           <div>
            <UButton @click="deleteFeature(feature.id)" icon="i-heroicons-trash" size="2xs" color="red" variant="solid"
            :trailing="false" />
           </div>
        </div>
        
    </div>
</template>

<script setup>
import { useProductState } from "~/store/frontend/product.js";

const form = ref({
    content: null,
    type: 'featured_info'
})

const productState = useProductState()

const addFeature = async () => {

    const { data, error } = await useBaseFetch(`product/productMeta/${productState.product.id}`, {
        method: 'POST',
        body: JSON.stringify(form.value)
    })

    if (data.value && !error.value) {

        productState.product.featured_infos.push(data.value)
        form.value.content = null
    }
}

const deleteFeature = async (featureId) => {

const { data, error } = await useBaseFetch(`product/productMeta/${featureId}`, {
    method: 'DELETE',
})

if (data.value && !error.value) {
     productState.product.featured_infos = productState.product.featured_infos.filter(feature => feature.id != featureId)
}
}

</script>