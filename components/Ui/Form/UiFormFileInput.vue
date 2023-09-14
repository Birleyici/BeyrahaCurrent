<template>
  <div id="exampleWrapper" class="">
    <div class="flex space-x-2 border rounded-md">
      <label class="bg-tertiary-500 px-4 py-2 rounded-l-md text-white flex items-center" for="file_input">Fotoğraf seç</label>
      <div class="mt-2 px-4">
        <p v-if="fileNames.length > 0">{{ displayFileName }}</p>
        <p v-else>Dosya seçilmedi</p>
      </div>
    </div>
    <input
      class="hidden"
      id="file_input"
      type="file"
      multiple
      @change="showFileNames"
      accept=".png, .jpg, .jpeg"
    />
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-300" id="file_input_help">
      PNG, JPG or JPEG (MAX. 1MB).
    </p>
  </div>
</template>

<script setup>
const fileNames = ref([]);

const showFileNames = (event) => {
  fileNames.value = Array.from(event.target.files).map(file => {
    if (file.name.length > 10) {
      const ext = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
      return `${file.name.substring(0, 15)}...${ext}`;
    }
    return file.name;
  });
};

const displayFileName = computed(() => {
  if (fileNames.value.length === 1) {
    return fileNames.value[0];
  } else if (fileNames.value.length > 1) {
    return `${fileNames.value[0]} (ve ${fileNames.value.length - 1} dosya daha)`;
  }
  return '';
});
</script>
