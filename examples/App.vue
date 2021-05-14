<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'space-between',
    }"
  >
    <color-picker v-model="color" @onOpen="onOpen" @onClose="onClose" />
    <color-picker
      :style="{
        marginRight: r + 'px',
      }"
      v-model="color"
      @onOpen="onOpen"
      @onClose="onClose"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "rgba(210,224,67,.5)",
      r: 0,
    };
  },
  methods: {
    onOpen() {
      console.log("open");
    },
    onClose(color) {
      console.log("close", color);
      this.r += 100;
    },
  },
};
</script>
