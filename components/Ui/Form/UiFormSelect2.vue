// use it
<template>
  <div>
    <Select2
      v-model="myValue"
      :options="myOptions"
      :settings="{ settingOption: value, settingOption: value }"
      @change="myChangeEvent($event)"
      @select="mySelectEvent($event)"
    />
    <h4>Value: {{ myValue }}</h4>
  </div>
</template>
<script setup >
const {options} =defineProps(['options'])
const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
};
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", event);
};
const myOptions = [
  { id: 1, text: "apple" },
  { id: 2, text: "berry" },
  { id: 3, text: "cherry" },
];
const myValue = ref();
</script>

<style>
select + .select2-container {
  width: 100% !important;
}
</style>
