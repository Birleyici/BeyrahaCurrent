<template>
  <div class="items-center" :class="[absolute && 'relative']">
    <input
    :checked="isValueSelected(value, modelValue)"
      @change="onChange($event)"
      :name="name"
      type="checkbox"
      class="hidden"
      :id="id"
    />
    <label
      :for="id"
      class="flex items-center space-x-2 cursor-pointer"
      :class="[labelClass, absolute && '!space-x-0']"
    >
      <div :class="absolute && 'absolute top-2 left-2'">
        <span class="block w-5 h-5 border-2 border-gray-300 rounded-md relative">
          <Icon
            v-if="isValueSelected(value, modelValue)"
            name="material-symbols:fitbit-check-small-rounded"
            class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          ></Icon>
        </span>
      </div>
      <span class="text-gray-700 no-select text-sm"><slot></slot></span>
    </label>
  </div>
</template>

<script setup>
const { name, id, modelValue, value, labelClass, absolute } = defineProps([
  "name",
  "id",
  "modelValue",
  "value",
  "labelClass",
  "absolute",
]);

const emit = defineEmits(["update:modelValue"]);

const isValueSelected = (value, modelValue) => {
  if (Array.isArray(modelValue)) {
    return modelValue.some(
      selectedImage => selectedImage.id === value.id && selectedImage.path === value.path
    );
  } else {
    return modelValue && modelValue.id === value.id && modelValue.path === value.path;
  }
};



const modelValueIsArray = Array.isArray(modelValue);

const onChange = (event) => {
  if (modelValueIsArray) {
    // Dizi içindeki uygun elemanı bul
    const index = modelValue.findIndex(item => 
      item.id === value.id && item.path === value.path);

    if (index > -1) {
      // Eleman zaten varsa, çıkar
      modelValue.splice(index, 1);
    } else {
      // Eleman yoksa, ekle
      modelValue.push(value);
    }
    // Reaktif güncelleme için yeni bir dizi oluştur
    emit("update:modelValue", [...modelValue]);
  } else {
    // Tek değer durumu
    if (event.target.checked) {
      emit("update:modelValue", value);
    } else {
      emit("update:modelValue", null);
    }
  }
};

</script>

<style>
input[type="checkbox"]:checked + label span:first-child svg {
  opacity: 1;
}

input[type="checkbox"]:checked + label span:first-child {
  background-color: #f97316; /* bg-secondary-500 */
}
</style>
