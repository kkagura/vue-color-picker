import {
  hsvToRgb,
  rgbToHsv,
  toInt,
  rgbToHex,
  getRgba,
  hexToRgb,
} from "./utils/utils";

export default {
  props: {
    visible: Boolean,
    posX: Number,
    posY: Number,
    value: String,
  },
  data() {
    return {
      rgba: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
      hsv: {
        h: 1,
        s: 1,
        v: 1,
      },
      hex: "",
      hsvcPos: {
        x: 0,
        y: 0,
      },
      hcPos: {
        x: 0,
      },
      alphaPos: {
        x: 0,
      },
      panelRect: {
        width: 0,
        height: 0,
      },
      panelPos: {
        x: 0,
        y: 0,
      },
    };
  },
  watch: {
    rgba: {
      handler() {
        const color =
          this.rgba.a === 1
            ? "#" + this.hex
            : `rgba(${this.rgba.r},${this.rgba.g},${this.rgba.b},${this.rgba.a})`;
        this.$emit("change", color);
      },
      deep: true,
    },
    visible() {
      if (this.visible) {
        this.measure();
      }
    },
  },
  //  hsv => rgb => hex
  //  rgb => hsv; rgb => hex
  //  hex => rgb => hsv
  mounted() {
    this.init();
    this.$nextTick(() => {
      const { width, height } = this.$refs.panel.getBoundingClientRect();
      this.panelRect = { width, height };
      this.measure();
    });
  },
  methods: {
    init() {
      this.rgba = getRgba(this.value);
      this.updateHex();
      this.updateHsv();
      this.updateHsvcPos();
      this.updateHcPos();
      this.updateAlphaPos();
    },
    close() {
      this.$emit("close");
    },
    measure() {
      let { innerWidth: maxX, innerHeight: maxY } = window;
      const { width, height } = this.panelRect;
      maxY -= height;
      maxX -= width;
      [this.panelPos.x, this.panelPos.y] = [
        Math.min(this.posX, maxX),
        Math.min(this.posY, maxY),
      ];
    },
    updateHex() {
      const { r, g, b } = this.rgba;
      const hex = rgbToHex(r, g, b);
      this.hex = hex;
    },
    updateRgbByHex() {
      const rgb = hexToRgb("#" + this.hex);
      this.rgba = Object.assign(this.rgba, rgb);
    },
    updateRgbByHsv() {
      const { h, s, v } = this.hsv;
      const rgb = hsvToRgb(h, s, v);
      this.rgba = Object.assign(this.rgba, rgb);
    },
    updateHsv() {
      const { r, g, b } = this.rgba;
      this.hsv = rgbToHsv(r, g, b);
    },
    updateHsvcPos() {
      const { width, height } = this.$refs.hsvp.getBoundingClientRect();
      const { s, v } = this.hsv;
      const x = s * width - 6;
      const y = (1 - v) * height - 6;
      this.hsvcPos = { x, y };
    },
    updateHcPos() {
      const { h } = this.hsv;
      const { width } = this.$refs.hp.getBoundingClientRect();
      const x = h * width - 2;
      this.hcPos.x = x;
    },
    updateAlphaPos() {
      const { a } = this.rgba;
      const { width } = this.$refs.alpha.getBoundingClientRect();
      const x = a * width - 2;
      this.alphaPos.x = x;
    },
    dragHsv(e) {
      e.preventDefault();
      const half = 6;
      const move = (e) => {
        const {
          top,
          left,
          width,
          height,
        } = this.$refs.hsvp.getBoundingClientRect();
        let x = e.pageX - left - half;
        let y = e.pageY - top - half;
        if (x < -half) {
          x = -half;
        }
        if (x > width - half) {
          x = width - half;
        }
        if (y < -half) {
          y = -half;
        }
        if (y > height - half) {
          y = height - half;
        }
        const s = (x + half) / width;
        const v = 1 - (y + half) / height;
        this.hsv.s = s;
        this.hsv.v = v;
        this.hsvcPos.x = x;
        this.hsvcPos.y = y;
        this.updateRgbByHsv();
        this.updateHex();
      };
      move(e);
      this.bindDragger(move);
    },
    dragHp(e) {
      e.preventDefault();
      const { left, width } = this.$refs.hp.getBoundingClientRect();
      const half = 2;
      const move = (e) => {
        let x = e.pageX - left - half;
        if (x < -half) {
          x = -half;
        }
        if (x > width - half) {
          x = width - half;
        }
        let h = (x + half) / width;
        this.hsv.h = h;
        this.hcPos.x = x;
        this.updateRgbByHsv();
        this.updateHex();
      };
      move(e);
      this.bindDragger(move);
    },
    dragAlpha(e) {
      e.preventDefault();
      const { left, width } = this.$refs.alpha.getBoundingClientRect();
      const half = 2;
      const move = (e) => {
        let x = e.pageX - left - half;
        if (x < -half) {
          x = -half;
        }
        if (x > width - half) {
          x = width - half;
        }
        this.rgba.a = (x + half) / width;
        this.alphaPos.x = x;
      };
      move(e);
      this.bindDragger(move);
    },
    bindDragger(move) {
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("mouseleave", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("mouseleave", up);
    },
    onRgbaChange(value, tag) {
      value = toInt(value);
      this.rgba[tag] = value;
      this.updateHex();
      this.updateHsv();
      this.updateHsvcPos();
      this.updateHcPos();
      this.updateAlphaPos();
    },
    onHexChange(e) {
      const hex = "#" + e.target.value;
      const rgb = getRgba(hex);
      this.rgba = Object.assign(this.rgba, rgb);
    },
    renderSVPanel() {
      const { x, y } = this.hsvcPos;
      return (
        <div
          style={{
            backgroundColor: this.hsvpBg,
          }}
          class="ew-hsvp"
          ref="hsvp"
          onMousedown={this.dragHsv}
        >
          <div class="ew-hsvp-m ew-hsvp-m2"></div>
          <div class="ew-hsvp-m ew-hsvp-m1"></div>
          <span
            class="ew-hsvc"
            style={{
              left: x + "px",
              top: y + "px",
            }}
          ></span>
        </div>
      );
    },
    renderHPanel() {
      return (
        <div class="ew-hp" ref="hp" onMousedown={this.dragHp}>
          <span
            style={{
              left: this.hcPos.x + "px",
            }}
            class="ew-hpc"
          ></span>
        </div>
      );
    },
    renderAlphaPanel() {
      return (
        <div class="ew-alpha" ref="alpha" onMousedown={this.dragAlpha}>
          <div class="ew-alpha-bg">
            <span
              style={{
                left: this.alphaPos.x + "px",
              }}
              class="ew-alphac"
            ></span>
          </div>
        </div>
      );
    },
    renderRgbaPanel() {
      return (
        <div class="ew-cip-row">
          <div class="ew-cip-row-sub">
            R:
            <input
              value={this.rgba.r}
              onInput={(e) => this.onRgbaChange(e.target.value, "r")}
              class="ew-cip-i-r ew-cip-i"
            />
          </div>
          <div class="ew-cip-row-sub">
            G:
            <input
              value={this.rgba.g}
              onInput={(e) => this.onRgbaChange(e.target.value, "g")}
              class="ew-cip-i-g ew-cip-i"
            />
          </div>
          <div class="ew-cip-row-sub">
            B:
            <input
              value={this.rgba.b}
              onInput={(e) => this.onRgbaChange(e.target.value, "b")}
              class="ew-cip-i-b ew-cip-i"
            />
          </div>
          <div class="ew-cip-row-sub">
            A:
            <input
              value={parseFloat(this.rgba.a.toFixed(2))}
              onInput={(e) => this.onRgbaChange(e.target.value, "a")}
              class="ew-cip-i-a ew-cip-i"
            />
          </div>
        </div>
      );
    },
    renderHexPanel() {
      const { r, g, b, a } = this.rgba;
      const color = `rgba(${r},${g},${b},${a})`;
      return (
        <div class="ew-cip-row2 ew-cip-row">
          <div class="ew-cip-row-sub">
            HEX:#
            <input
              value={this.hex}
              onInput={this.onHexChange}
              class="ew-cip-hex-input"
            />
          </div>
          <div class="ew-cip-row-sub ew-cip-pre">
            <div
              class="ew-cip-pre-bg"
              style={{
                backgroundColor: color,
              }}
            ></div>
          </div>
          <button class="ew-cp-row-save" onClick={this.close}>
            确定
          </button>
        </div>
      );
    },
  },
  computed: {
    hsvpBg() {
      const { r, g, b } = hsvToRgb(this.hsv.h, 1, 1);
      return `rgb(${r},${g},${b})`;
    },
  },
  render() {
    const { x, y } = this.panelPos;
    return (
      <div
        v-show={this.visible}
        ref="panel"
        style={{
          left: x + "px",
          top: y + "px",
        }}
        class="ew-cp-panel"
      >
        {this.renderSVPanel()}
        {this.renderHPanel()}
        {this.renderAlphaPanel()}
        <div class="ew-cpi">
          {this.renderRgbaPanel()}
          {this.renderHexPanel()}
        </div>
      </div>
    );
  },
};
