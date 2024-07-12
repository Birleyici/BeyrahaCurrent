<template>
    <div class="flex space-x-2">
        <!-- {{ productState.featured_infos }} -->
        <UTextarea class="w-full" autoresize placeholder="Search..." v-model="form.content" />
        <div>
            <UButton @click="addFeature()" size="sm" color="primary" variant="solid" label="Ekle" trailing />
        </div>

        <div class="my-minimal">
            deneme
        </div>
    </div>
</template>

<script setup>
import { useNewProductStore } from "~/store/newProduct.js";

const form = ref({
    content: null,
    type: 'featured_info'
})

const productState = useNewProductStore()

const addFeature = async () => {

    const { data, error } = await useBaseFetch(`product/productMeta/${productState.id}`, {
        method: 'POST',
        body: JSON.stringify(form.value)
    })

    if (data.value && !error.value) {

        productState.featured_infos.push(data.value)
    }
}

</script>