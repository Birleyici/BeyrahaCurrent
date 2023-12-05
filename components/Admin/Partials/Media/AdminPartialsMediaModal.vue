<template>
  <div>
    <label for="file" class="inline-block">
      <div
        class="flex items-center cursor-pointer space-x-4 bg-tertiary-100 hover:bg-tertiary-200 duration-300 rounded-md py-2 px-minimal"
      >
        <p class="text-sm">Görsel yükle</p>
        <Icon name="mdi:image-plus-outline"></Icon>
        <Icon v-if="loading" name="mdi:loading" class="animate-spin"></Icon>
      </div>
    </label>
    <input
      id="file"
      class="hidden"
      type="file"
      name="file"
      multiple
      @change="uploadImages($event)"
    />

    <div>
      <div class="flex flex-auto gap-4 flex-wrap mt-4 relative">
        <div
          v-if="pending"
          class="absolute right-0 flex items-center justify-center left-0 w-full h-full bg-slate-100 opacity-40 z-[2]"
        >
          <Icon name="mdi:loading" class="w-12 h-12 animate-spin"></Icon>
        </div>

        <div
          class="w-32 h-32 border rounded-md overflow-hidden"
          :key="Math.random()"
          v-for="img in images.data"
        >
          <div>
            <UiFormImageCheckbox
              v-model="selectedImage"
              :id="Math.random()"
              :value="{ path: img.path, id: img.id }"
              :absolute="true"
            >
              <NuxtImg
                height="200"
                :src="'aws' + img.path"
                class="object-cover w-32 h-32"
                alt=""
              />
            </UiFormImageCheckbox>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-2">
      <!-- Pagination -->
      <div class="flex space-x-2 mt-4">
        <!-- Previous button -->
        <UiButtonsBaseButton
          :disabled="!images.prev_page_url"
          @click="changePage(images.current_page - 1)"
          class="w-10"
          color="slate"
        >
          &laquo;
        </UiButtonsBaseButton>

        <!-- Current page -->
        <UiButtonsBaseButton class="w-10 bg-primary-400" color="slate">
          {{ images.current_page }}
        </UiButtonsBaseButton>
        <!-- Next button -->

        <UiButtonsBaseButton
          :disabled="!images.next_page_url"
          @click="changePage(images.current_page + 1)"
          class="w-10"
          color="slate"
        >
          &raquo;
        </UiButtonsBaseButton>
      </div>
    </div>
  </div>
</template>
<script setup>
const query = reactive({
  limit: 20,
  page: 1,
});

const emit = defineEmits(["selecteds"]);
const { selecteds } = defineProps(["selecteds"]);
const selectedImage = ref(selecteds);


const { data: images, pending, error, refresh } = await useBaseFetch("vendor/images",
  {
    method: "GET",
    query,
    cache: "no-cache",

  }
);


const changePage = (page) => {
  query.page = page;
  refresh(); // You might need to update this method to handle the new page change
};

const loading = ref(false);
const uploadImages = async (e) => {
  loading.value = true;
  const files = e.target.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files[]", files[i]);
  }

  const { data, pending, error, refresh } = await useFetch("/api/upload", {
    method: "post",
    body: formData,
    query: {
      vendorId: 1,
    },
    cache: false,
  });

  if (error.value == null) {
    await saveImagePaths(data.value);
  }
  loading.value = pending.value;
};

const saveImagePaths = async (paths) => {
  try {
    const {
      data,
      pending,
      error,
      refresh: refreshSavePaths,
    } = await useBaseFetch("vendor/images", {
      method: "POST",
      body: paths,
      cache: 'no-cache',
    });

    await refresh();

  } catch (error) {
    
    console.log(error, "error");
  
  }
};

watch(selectedImage, () => {
  emit("selecteds", selectedImage.value);
});


</script>
