# vue-color-pucker-simple

## install
```bash
npm install --save vue-color-picker-simple
```

## usage
```bash
import Vue from "vue";
import ColorPicker from "vue-color-picker-simple";
import "vue-color-picker-simple/dist/index.css";

Vue.use(ColorPicker);

```

```bash
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

```