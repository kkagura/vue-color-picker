<template>
  <div>
    <color-picker v-model="color" />
    <color-picker
      :style="{
      marginTop: '600px'
    }"
      v-model="color2"
    />
    <input
      type="text"
      v-model="color"
      style="margin-top: 600px;"
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "rgba(210,224,67,.5)",
      color2: "rgba(210,224,67,.5)",
    };
  },
};
</script>
