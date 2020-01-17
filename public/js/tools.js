/* ------------------------------- Constants -------------------------------- */

const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    lightgreen: '#756E2B',
    lightred: '#FA8F5A',
    darkgreen: '#716C22',
    darkred: '#730A07',
    lightblue: '#D1F1FF',
    skyblue: '#76D6FF',
    delta: '#8598C2',
    theta: '#AE91B8',
    alpha: '#82A799',
    beta: '#E7CE6D',
    gamma: '#E9867F'
};

/* ---------------------------- Helper Functions ---------------------------- */

const random = (min, max) => Math.random() * (max - min) + min;

const lerp = (a, b, u) => (1 - u) * a + u * b;

const rgbToHex = (r, g, b) => '#' + compToHex(r) + compToHex(g) + compToHex(b);

const coinFlip = () => Math.random() > 0.5;

const compToHex = (c) => {
    if (c < 0) c = 0;
    let hex = Math.floor(c).toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

const setAttributes = (el, attrs) => {
    for (let key in attrs) el.setAttribute(key, attrs[key]);
};

const hexToRgb = (hex) => {
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
let scene = document.querySelector('#scene');

let focused = $('#focused');
let waves = ['delta', 'theta', 'alpha', 'beta', 'gamma'];
let waveEls = [];
for (let i = 0; i < waves.length; i++) {
    waveEls[i] = document.querySelector(`#${waves[i]} > a-ring`);
    document.querySelector(`#${waves[i]} > #loader_ring_count`).remove();
}
let circles = document.querySelectorAll('.circle');
for (circle of circles) {
    setAttributes(circle, {
        'height': 1,
        'width': 1,
        'count': 0,
        'margin': "0 0.2 0 0.2",
        'visible': false,
        'background-color': "#333333"
    })
}

let ratio, currWave;
function getWaves() {
    setInterval(() => {
        fetch('../api/brainwaves')
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < waveEls.length; i++) {
                    currWave = data[waves[i]];
                    if (currWave < 0.1) currWave = 0.1;
                    else if (currWave > 100) currWave = 100;
                    ratio = (Math.log10(currWave) + 1) * -120;
                    if (ratio > -1) ratio = -2; // Min label
                    if (data.focus) {
                        focused.setAttribute('value', 'Focused');
                        focused.setAttribute('font-color', 'lightgreen');
                    } else {
                        focused.setAttribute('value', 'Not Focused');
                        focused.setAttribute('font-color', 'lightred');
                    }
                    waveEls[i].setAttribute('theta-length', ratio);
                }
            });
    }, 100);
}

let enableGUI = interface => $(`#${interface}`).attr(`visible`, true);

let title = document.querySelector('#title');
let subtitle = document.querySelector('#subtitle');

let setTitle = text => document.querySelector('#title').setAttribute('text', { value: text});
let setSubtitle = text => document.querySelector('#subtitle').setAttribute('text', { value: text});

// Transitions between two numbers or colors (type)

const INTERVAL = 10; // Time between fades, e.g. framerate

let fade = (id, object, property, end, duration, color = false) => {
    let el = document.querySelector(id);
    let start = el.getAttribute(object)[property];
    let step = 1 / (duration / INTERVAL),
        u = 0;
    let startHex, endHex;
    if (color) {
        startHex = hexToRgb(start);
        endHex = hexToRgb(end);
    }
    let currInterval = setInterval(() => {
        if (u >= 1) {
            clearInterval(currInterval);
        }
        if (color) {
            let r = Math.round(lerp(startHex.r, endHex.r, u));
            let g = Math.round(lerp(startHex.g, endHex.g, u));
            let b = Math.round(lerp(startHex.b, endHex.b, u));
            el.setAttribute(object, property, rgbToHex(r, g, b));
        } else el.setAttribute(object, property, lerp(start, end, u));
        u += step;
    }, INTERVAL);
};

// Creates entity based on object of parameters
let placeEntity = (attributes) => {
    let newEntity = document.createElement('a-entity');
    setAttributes(newEntity, attributes);
    scene.appendChild(newEntity);
};

// Places trees based on given count, space from player, radius from center, and play time
function placeRandomTrees(count, space, radius, dur) {
    let currCount = 0;
    let treeLoop = setInterval(() => {
        if (currCount >= count) {
            clearInterval(treeLoop);
        }

        let xScale = random(3, 5);
        yScale = random(2, 4);
        zScale = xScale;

        let xPos = random(-radius, radius);
        yPos = random(1.5, 2.3);
        zPos = random(-radius, radius);

        let dist = Math.sqrt(xPos * xPos + zPos * zPos);
        if (dist > space) {
            placeEntity({
                class: 'tree',
                scale: `${xScale} ${yScale} ${zScale}`,
                position: `${xPos} ${yPos} ${zPos}`,
                'obj-model': 'obj: url(assets/lowpolytree.obj)',
                material: {
                    shader: 'standard',
                    color: rgbToHex(
                        random(113, 117),
                        random(108, 110),
                        random(34, 43)
                    )
                }
            });
        }
        currCount++;
    }, dur / count);
}

function changeEnvironment(property, result, dur) {
    env.setAttribute('animation', {
        property: property,
        to: result,
        dur: dur,
        easing: 'easeInCubic'
    });
}

// RETURNS sound element based on given attributes
let createSound = (attributes) => {
    let newSound = document.createElement('a-sound');
    setAttributes(newSound, {'sound' : attributes});
    scene.appendChild(newSound);
    return newSound;
}

// Example for using create sound
let testNarration = createSound({
        'id' : 'narration',
        'src' : 'url(assets/test_narration.mp3)',
        'autoplay' : 'false'
        });

// Example for playing returned sound (must be called when ready to play sound): 
// testNarration.components.sound.playSound();

function toggleOceanVisibility() {
    let ocean = document.querySelector('a-ocean');
    if(!ocean.getAttribute('visible')) ocean.setAttribute('visible', 'true');
    else ocean.setAttribute('visible', 'false');
}

function lowerDressing(duration){

    env.setAttribute('animation', {

        property: 'environmentDressing',
        to: "0 -5 0",
        duration: duration,
        easing: 'easeInQuad'


    });

}