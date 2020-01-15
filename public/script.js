/* ------------------------------- Constants -------------------------------- */

const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    lightgreen: '#756E2B',
    lightred: '#FA8F5A',
    darkgreen: '#716C22',
    darkred: '#730A07',
    lightblue: '#D1F1FF',
    skyblue: '#76D6FF'
};

/* ---------------------------- Helper Functions ---------------------------- */

const random = (min, max) => Math.random() * (max - min) + min;

const lerp = (a, b, u) => (1 - u) * a + u * b;

const rgbToHex = (r, g, b) => '#' + compToHex(r) + compToHex(g) + compToHex(b);

const coinFlip = () => Math.random() > 0.5;

const compToHex = c => {
    let hex = Math.floor(c).toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

const setAttributes = (el, attrs) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

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
let scene = document.querySelector('#scene');
let gui = document.querySelector('#gui');

env.setAttribute('environment', {
    preset: 'forest',
    skyType: 'gradient',
    skyColor: COLORS.skyblue,
    horizonColor: COLORS.lightblue,
    shadow: true,
    shadowSize: 10,
    fog: 0.9,
    playArea: 1.4,
    ground: 'hills',
    groundColor: COLORS.white,
    groundColor2: COLORS.white,
    groundTexture: 'checkerboard',
    groundYScale: 80,
    dressing: 'trees',
    dressingAmount: 0,
    dressingColor: COLORS.lightgreen,
    dressingScale: 5
});

function getWaves() {
    setInterval(()=> {
        fetch('../api/brainwaves')
            .then((response) => response.json())
            .then((data) => {
                data = JSON.stringify(data);
            });
    }, 100);
}

// getWaves();

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
            console.log("Fade complete");
            clearInterval(currInterval);
        }
        if (color) {
            let r = Math.round(lerp(startHex.r, endHex.r, u));
            let g = Math.round(lerp(startHex.g, endHex.g, u));
            let b = Math.round(lerp(startHex.b, endHex.b, u));
            el.setAttribute(object, property, rgbToHex(r, g, b));
        }
        else el.setAttribute(object, property, lerp(start, end, u));
        u += step;
    }, INTERVAL);
};

// Creates entity based on object of parameters
let placeEntity = (attributes) => {
    let newEntity = document.createElement('a-entity');
    setAttributes(newEntity, attributes);
    scene.appendChild(newEntity);
}

// Places trees based on given count, space from player, radius from center, and play time
function placeRandomTrees(count, space, radius, dur){
    let currCount = 0;
    let treeLoop = setInterval(() => {
        if (currCount >= count) {
            console.log("Trees complete.");
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
                'class': 'tree',
                'scale': `${xScale} ${yScale} ${zScale}`,
                'position': `${xPos} ${yPos} ${zPos}`,
                'obj-model': 'obj: url(assets/lowpolytree.obj)',
                'material': {
                    'shader': 'standard',
                    'color': rgbToHex(random(113, 117), random(108, 110), random(34, 43))
                }
            });
        }
        currCount++;
    }, dur / count);
}

let title = document.querySelector('#title');
let subtitle = document.querySelector('#subtitle');

// Start animation sequences with a given duration
let animate = (scene, dur) => {
    switch (scene) {
        case 'intro':
            let start = document.querySelector('#startButton');
            setTimeout(() => {
                start.addEventListener('pressed', () => {
                    animate('fadeIn', 8000);
                    start.remove();
                    document.querySelector('#title').setAttribute('text', {
                        'value': 'Initializing...'
                    })
                    document.querySelector('#subtitle').setAttribute('text', {
                        'value': 'Calibrating PAETHOS to your brain waves...'
                    })
                });
            }, 1000);
            setAttributes(title, {
                position: '0 2.5 -3',
                text: {
                    align: 'center',
                    font: 'exo2bold',
                    value: 'Welcome to PAETHOS',
                    color: 'black',
                    opacity: 1,
                    width: 8
                }
            });
            setAttributes(subtitle, {
                position: '0 2 -3',
                text: {
                    align: 'center',
                    font: 'exo2semibold',
                    value: 'To begin, use your hand to click the button!',
                    color: 'black',
                    opacity: 0.7,
                    width: 4
                }
            });
            break;
        case 'fadeIn':
            fade('#env', 'environment', 'fog', 0.7, dur);
            fade('#env', 'environment', 'groundColor', COLORS.lightgreen, dur, true);
            fade('#env', 'environment', 'groundColor2', COLORS.darkgreen, dur, true);
            placeRandomTrees(40, 20, 70, dur);
            setTimeout(() => {
                setAttributes(title, {
                    position: '0 2.3 -2',
                    text: {
                        value: 'Calibrated!',
                        width: 2
                    }
                });
                setAttributes(subtitle, {
                    position: '0 2.2 -2',
                    text: {
                        value: 'View your brain activity below...',
                        width: 1.5
                    }
                })
                gui.setAttribute('position', '0 1.6 -2');
            }, dur);
            break;
        case 'creepy':
            fade('#env', 'environment', 'skyColor', COLORS.darkred, dur, true);
            fade('#env', 'environment', 'horizonColor', COLORS.lightred, dur, true);
            break;
    }
}

animate('intro', 500);