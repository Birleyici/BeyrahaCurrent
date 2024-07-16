<template>
  <div>

    <AdminPartialsMediaUploadButton @uploaded-images="imgs => addNewPathsToImages(imgs)" />
    <div>
      <div class="flex flex-auto gap-4 flex-wrap mt-4 relative">
        <div v-if="loading"
          class="absolute right-0 flex items-center justify-center left-0 w-full h-full bg-slate-100 opacity-40 z-[2]">
          <Icon name="mdi:loading" class="w-12 h-12 animate-spin"></Icon>
        </div>

        <div class="w-32 h-32 border rounded-md overflow-hidden" :key="img.id" v-for="img in images.data">

          <div>
            <UiFormImageCheckbox v-model="model" :id="img.id" :value="{ path: img.path, id: img.id }" :absolute="true">
              <NuxtImg height="200" :src="'aws' + img.path" class="object-cover w-32 h-32" />
            </UiFormImageCheckbox>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <UPagination @click="getImagesData" v-model="query.page" :page-count="query.limit" :total="images.total || 0" />
    </div>


  </div>
</template>

<script setup>
import { useNewProductStore } from '~/store/newProduct';
const productState = useNewProductStore()


const model = defineModel()
const query = ref({
  limit: 20,
  page: 1,
});
const images = ref([])
const loading = ref(false)

const getImagesData = async () => {

  loading.value = true

  try {
    const response = await useBaseOFetch("vendor/images", {
      query: query.value,
    });

    if (response.data) {

      images.value = response

    }

  } catch (error) {

    console.log(error)
  }

  loading.value = false

}
await getImagesData();

const addNewPathsToImages = (imgs) => {

  console.log(imgs, 'burda')
  images.value.data.unshift(imgs)
}


</script>