<template>
  <div id="exampleWrapper" class="">
    <div class="flex space-x-2 border rounded-md">
      <label class="bg-tertiary-500 px-4 py-2 rounded-l-md text-white" for="file_input"
        >Fotoğraf seç</label
      >
      <p v-if="fileName" class="mt-2 px-4">{{ formattedFileName }}</p>
    </div>
    <input
      class="hidden"
      id="file_input"
      type="file"
      @change="showFileName"
      accept=".png, .jpg, .jpeg"
    />
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-300" id="file_input_help">
      PNG, JPG or JPEG (MAX. 1MB).
    </p>
  </div>
</template>

<script setup>
const fileName = ref("Dosya seçilmedi");

const showFileName = (event) => {
  if (event.target.files.length > 0) {
    fileName.value = event.target.files[0].name;
  }
};

const formattedFileName = computed(() => {
  if (fileName.value.length > 18) {
    const ext = fileName.value.slice(((fileName.value.lastIndexOf(".") - 1) >>> 0) + 2);
    return `${fileName.value.substring(0, 15)}...${ext}`;
  }
  return fileName.value;
});
</script>
