import "./style/index.less";
import ColorPickerPanel from "./ColorPickerPanel";
import { contains } from "./utils/utils";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      showPanel: false,
      posX: 0,
      posY: 0,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  methods: {
    onClickDocument(e) {
      if (!this._com) {
        return;
      }
      if (!contains(this._com.$el, e.target) && !contains(this.$el, e.target)) {
        this.close();
      }
    },
    change(color) {
      this.$emit("change", color);
    },
    onClick() {
      if (!this.showPanel) {
        this.measure();
        this.open();
        this.showPanel = true;
      }
    },
    open() {
      this.$emit("onOpen");
    },
    measure() {
      const { x, y, height } = this.$refs.button.getBoundingClientRect();
      this.posX = x;
      this.posY = y + height;
    },
    togglePanel() {
      if (!this._com) {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = 0;
        container.style.top = 0;
        document.body.appendChild(container);
        const el = document.createElement("div");
        container.appendChild(el);
        const self = this;
        this._com = new this.$root.constructor({
          el,
          render() {
            const opt = {
              props: {
                visible: self.showPanel,
                posX: self.posX,
                posY: self.posY,
                value: self.value,
              },
              on: {
                change: self.change,
                close: self.close,
              },
            };
            return <ColorPickerPanel {...opt} />;
          },
        });
      }
      this._com.$forceUpdate();
    },
    close() {
      this.showPanel = false;
      this.$emit("onClose", this.value);
    },
  },
  watch: {
    showPanel() {
      this.togglePanel();
    },
  },
  mounted() {
    document.addEventListener("click", this.onClickDocument);
  },
  render() {
    return (
      <div onClick={this.onClick} class="ew-cp-trigger" ref="button">
        <span class="ew-cp-alpha-bg">
          <span
            class="ew-cp-color-bg"
            style={{
              backgroundColor: this.value,
            }}
          >
            <i class="ew-cp-color-icon">
              <svg
                t="1569127389612"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1109"
                width="20"
                height="20"
              >
                <path
                  d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z"
                  p-id="1110"
                  fill="#fff"
                ></path>
              </svg>
            </i>
          </span>
        </span>
      </div>
    );
  },
};
