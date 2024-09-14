<template>
  <div>
    <label for="file" class="inline-block">
      <div
        class="flex items-center cursor-pointer space-x-4 bg-tertiary-100 hover:bg-tertiary-200 duration-300 rounded-md py-2 px-minimal">
        <p class="text-sm">Görsel yükle</p>
        <Icon name="mdi:image-plus-outline"></Icon>
        <Icon v-if="loading" name="mdi:loading" class="animate-spin"></Icon>
      </div>
    </label>
    <input id="file" class="hidden" type="file" name="file" multiple @change="uploadImages($event)" />
  </div>
</template>

<script setup>
const emit = defineEmits(['uploadedImages'])
const loading = ref(false);
const uploadImages = async (e) => {
  loading.value = true;
  const files = e.target.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("file[]", files[i]);
  }

  const response = await useBaseOFetchWithAuth("upload", {
    method: "post",
    body: formData,
  });

  if (!response.error) {
    await saveImagePaths(response);
  }
  loading.value = false;
};

const saveImagePaths = async (paths) => {

  try {
    const response = await useBaseOFetchWithAuth("vendor/images", {
      method: "POST",
      body: paths,
    });
    console.log(response)

    emit('uploadedImages', response.data)

  } catch (error) {
    console.log(error, "error");
  }
};

</script>