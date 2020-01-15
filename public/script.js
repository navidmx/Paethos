/* -- Constants -- */

const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    lightgreen: '#756E2B',
    lightred: '#FA8F5A',
    darkgreen: '#716C22',
    darkred: '#730A07',
    skyblue: '#76D6FF'
};

/* -------------------------- Helper Functions ------------------------------ */

const lerp = (a, b, u) => (1 - u) * a + u * b;

const rgbToHex = (r, g, b) => '#' + compToHex(r) + compToHex(g) + compToHex(b);

const compToHex = c => {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

const hexToRgb = hex => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
};

// Set initial environment

let env = document.querySelector('#env');
env.setAttribute('environment', {
    preset: 'forest',
    skyType: 'gradient',
    skyColor: COLORS.skyblue,
    horizonColor: COLORS.white,
    shadow: true,
    shadowSize: 10,
    fog: 1,
    playArea: 1,
    ground: 'hills',
    groundColor: COLORS.white,
    groundColor2: COLORS.white,
    groundTexture: 'checkerboard',
    groundYScale: 20,
    dressing: 'trees',
    dressingAmount: 50,
    dressingColor: COLORS.lightgreen,
    dressingScale: 5
});

// Fetch data from API
/*
fetch('../api/brainwaves')
    .then((response) => response.json())
    .then((data) => console.log(JSON.stringify(data)));
*/

// Transitions between two numbers or colors (type)
let fade = (id, object, property, end, duration, color = false) => {
    let el = document.querySelector(id);
    // If start is default (undefined), just get the current property
    let start = el.getAttribute(object)[property];
    let interval = 10,
        step = 1.0 / (duration / interval),
        u = 0.0;
    let startHex, endHex;
    if (color) {
        startHex = hexToRgb(start);
        endHex = hexToRgb(end);
    }
    let currInterval = setInterval(() => {
        if (u >= 1.0) clearInterval(currInterval);
        if (color) {
            let r = Math.round(lerp(startHex.r, endHex.r, u));
            let g = Math.round(lerp(startHex.g, endHex.g, u));
            let b = Math.round(lerp(startHex.b, endHex.b, u));
            el.setAttribute(object, property, rgbToHex(r, g, b));
        }
        else el.setAttribute(object, property, lerp(start, end, u));
        u += step;
    }, interval);
};

// Start animation sequences with a given duration
let animate = (scene, dur) => {
    switch (scene) {
        case 'intro':
            fade('#env', 'environment', 'fog', 1, 0.8, dur);
            fade('#env', 'environment', 'groundColor', COLORS.lightgreen, dur, true);
            fade('#env', 'environment', 'groundColor2', COLORS.darkgreen, dur, true);
            fade('#leftHand', 'line', 'opacity', 0, 1, dur);
            break;
        case 'creepy':
            fade('#env', 'environment', 'skyColor', COLORS.darkred, dur, true);
            fade('#env', 'environment', 'horizonColor', COLORS.lightred, dur, true);
            break;
    }
}

animate('intro', 500);