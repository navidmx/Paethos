let env = document.querySelector('#env');

// Pre-defined environment colors
const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    lightgreen: '#756E2B',
    darkgreen: '#716C22',
    skyblue: '#76D6FF'
};

// Environment description
let desc = {
    preset: 'forest',
    skyType: 'gradient',
    skyColor: COLORS.skyblue,
    horizonColor: COLORS.white,
    shadow: true,
    shadowSize: 10,
    fog: 0.8,
    playArea: 1,
    ground: 'hills',
    groundColor: COLORS.lightgreen,
    groundColor2: COLORS.darkgreen,
    groundTexture: 'checkerboard',
    groundYScale: 50,
    dressing: 'trees',
    dressingAmount: 0,
    dressingColor: COLORS.lightgreen,
    dressingScale: 5
};

// Fetch data
fetch('/api/brainwaves')
    .then((response) => response.json())
    .then((data) => console.log(JSON.stringify(data)));

// Linear interpolation given start, end, and step
let lerp = (a, b, u) => (1 - u) * a + u * b;

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
};

// Color helper functions
let rgbToHex = (r, g, b) => '#' + compToHex(r) + compToHex(g) + compToHex(b);

let compToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

let hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
};

let updateEnv = () => {
    env.setAttribute('environment', desc);
};

let startEnv = (duration) => {
    fade('color', desc, 'groundColor');
};

updateEnv();
//startEnv(1000);
