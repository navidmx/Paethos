let env = document.querySelector('#env');

// Linear interpolation given start, end, and step
let lerp = (a, b, u) => {
    return (1 - u) * a + u * b;
}

// Transitions between two numbers or colors (type)
let fade = (type, object, property, start, end, duration) => {
    let interval = 10;
    let steps = duration / interval;
    let step_u = 1.0 / steps;
    let u = 0.0;
    let currInterval = setInterval(() => {
        if (u >= 1.0) clearInterval(currInterval);
        if (type == 'color') {
            let startHex = hexToRgb(start);
            let endHex = hexToRgb(end);
            let r = Math.round(lerp(startHex.r, endHex.r, u));
            let g = Math.round(lerp(startHex.g, endHex.g, u));
            let b = Math.round(lerp(startHex.b, endHex.b, u));
            object[property] = rgbToHex(r, g, b);
        } else if (type == 'number') {
            object[property] = lerp(start, end, u);
        }
        updateEnv();
        u += step_u;
    }, interval);
}

// Color helper functions
let componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

let rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

// Pre-defined environment colors
const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    lightgreen: '#756E2B',
    darkgreen: '#716C22',
    skyblue: '#76D6FF'
}

let desc = {
    preset: 'forest',
    skyType: 'gradient',
    skyColor: COLORS.black,
    horizonColor: COLORS.white,
    shadow: true,
    shadowSize: 10,
    fog: 1,
    playArea: 1,
    ground: 'hills',
    groundColor: COLORS.white,
    groundColor2: COLORS.white,
    groundTexture: 'checkerboard',
    groundYScale: 0,
    dressing: 'trees',
    dressingAmount: 0,
    dressingColor: COLORS.white,
    dressingScale: 5
}

let updateEnv = () => {
    env.setAttribute('environment', desc);
}

let startEnv = (duration) => {
    fade('color', desc, 'groundColor', desc.groundColor, COLORS.lightgreen, duration);
    fade('color', desc, 'groundColor2', desc.groundColor2, COLORS.darkgreen, duration);
    fade('color', desc, 'dressingColor', desc.dressingColor, COLORS.lightgreen, duration);
    fade('color', desc, 'skyColor', desc.skyColor, COLORS.skyblue, duration);
    fade('number', desc, 'fog', desc.fog, 0.8, duration);
    fade('number', desc, 'dressingAmount', desc.dressingAmount, 500, duration);
    fade('number', desc, 'groundYScale', desc.groundYScale, 10, duration);
}

updateEnv();
startEnv(1000);