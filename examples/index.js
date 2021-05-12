import Vue from "vue";

import App from "./App.vue";
import ColorPicker from "../src";

Vue.use(ColorPicker);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
