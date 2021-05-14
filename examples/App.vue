<template>
  <div>
    <color-picker v-model="color" @onOpen="onOpen" @onClose="onClose" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "rgba(210,224,67,.5)",
    };
  },
  methods: {
    onOpen() {
      console.log("open");
    },
    onClose(color) {
      console.log("close", color);
    },
  },
};
</script>
