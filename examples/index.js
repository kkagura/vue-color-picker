import Vue from "vue";

import App from "./App.vue";
import ColorPicker from "../src";
// import ColorPicker from "../dist/index.js"
// import "../dist/index.css"

Vue.use(ColorPicker);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
