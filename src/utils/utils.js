export function rgbToHex(r, g, b) {
  r = r.toString(16);
  if (r.length == 1) {
    r = "0" + r;
  }
  g = g.toString(16);
  if (g.length == 1) {
    g = "0" + g;
  }
  b = b.toString(16);
  if (b.length == 1) {
    b = "0" + b;
  }
  return (r + g + b).toUpperCase();
}

let canvas, ctx;
export function getRgba(color) {
  if (!canvas || !ctx) {
    // canvas = createElement('<canvas width=1 height=1></canvas>');
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.width = "1px";
    canvas.style.height = "1px";
    ctx = canvas.getContext("2d");
  }
  ctx.clearRect(0, 0, 1, 1);
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const colorData = ctx.getImageData(0, 0, 1, 1).data;
  let a = colorData[3] / 255;
  a = parseFloat(a.toFixed(2));
  return {
    r: colorData[0],
    g: colorData[1],
    b: colorData[2],
    a,
  };
}

window.getRgba = getRgba;

export function hexToRgb(hex) {
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return { r, g, b };
}

export function toInt(value) {
  let int = parseInt(value);
  if (isNaN(int)) {
    return 0;
  }
  return int;
}

export function rgbToHsv(r, g, b) {
  r = toInt(r);
  g = toInt(g);
  b = toInt(b);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = 0;

  const sub = max - min;
  if (max === min) {
    h = 0;
  } else {
    if (r === max) {
      if (g >= b) {
        h = (60 * (g - b)) / sub;
      } else {
        h = (60 * (g - b)) / sub + 360;
      }
    } else if (g === max) {
      h = (60 * (b - r)) / sub + 120;
    } else {
      h = (60 * (r - g)) / sub + 240;
    }
  }
  if (h > 360) {
    h -= 360;
  } else if (h < 0) {
    h += 360;
  }
  s = sub / max;
  v = max / 255;
  h /= 360;
  s = isNaN(s) ? 0 : s;
  return {
    h,
    s,
    v,
  };
}

/**
 * 传入0-1
 */
export function hsvToRgb() {
  let h, s, v;
  if (arguments.length === 1) {
    const obj = arguments[0];
    h = obj.h;
    s = obj.s;
    v = obj.v;
  } else {
    [h, s, v] = arguments;
  }
  h *= 360;
  let r = 0;
  let g = 0;
  let b = 0;
  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  r = v;
  g = t;
  b = p;
  if (i === 0) {
    r = v;
    g = t;
    b = p;
  }
  if (i === 1) {
    r = q;
    g = v;
    b = p;
  }
  if (i === 2) {
    r = p;
    g = v;
    b = t;
  }
  if (i === 3) {
    r = p;
    g = q;
    b = v;
  }
  if (i === 4) {
    r = t;
    g = p;
    b = v;
  }
  if (i === 5) {
    r = v;
    g = p;
    b = q;
  }
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return {
    r,
    g,
    b,
  };
}

export function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
