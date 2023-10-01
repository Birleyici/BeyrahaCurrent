<template>
  <div>
    <label for="file" class="inline-block">
      <div
        class="flex items-center cursor-pointer space-x-4 bg-tertiary-100 hover:bg-tertiary-200 duration-300 rounded-md py-2 px-minimal"
      >
        <p class="text-sm">Görsel yükle</p>
        <Icon name="mdi:image-plus-outline"></Icon>
      </div>
    </label>
    <input id="file" class="hidden" type="file" name="file" @change="onChange($event)" />

    <div>
      <div class="flex justify-between flex-wrap mt-4">
        <div
          class="w-32 h-32 border rounded-md m-2 overflow-hidden"
          :key="item"
          v-for="item in 25"
        >
          <img src="/default-product.jpg" class="object-cover w-32 h-32" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const query = reactive({
  limit: 1,
  page: 1,
});

const onChange = async (e) => {
  const files = e.target.files;
  const formData = new FormData();
  formData.append("file", files[0]);
  const response = await useFetch("/api/upload", {
    method: "post",
    body: formData,
    query:{
      vendorId:1
    }
  });

  console.log(response)
};
</script>
