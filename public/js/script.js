let title = document.querySelector('#title');
let subtitle = document.querySelector('#subtitle');
let gui = document.querySelector('#gui');
let focusedGUI = document.querySelector('#focusedGUI');

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
                        value: 'Initializing...'
                    });
                    document.querySelector('#subtitle').setAttribute('text', {
                        value: 'Calibrating PAETHOS to your brain waves...'
                    });
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
            fade(
                '#env',
                'environment',
                'groundColor',
                COLORS.lightgreen,
                dur,
                true
            );
            fade(
                '#env',
                'environment',
                'groundColor2',
                COLORS.darkgreen,
                dur,
                true
            );
            placeRandomTrees(40, 20, 70, dur);
            setTimeout(() => {
                //getWaves();
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
                });
                gui.setAttribute('visible', 'true');
                focusedGUI.setAttribute('visible', 'true');
            }, dur);
            break;
    }
};

animate('fadeIn', 10);

function takeFlight(duration) {
    //skyColor: COLORS.skyblue,
    fade('#env', 'environment', 'skyColor', COLORS.black, duration, true);
    fade('#env', 'environment', 'horizonColor', COLORS.black, duration, true);
    //horizonColor: COLORS.lightblue,
    //fade('#env', 'environment', 'fog', 1, 4000);
}

//document.getElementsByClassName("tree").setAttribute(object, property, rgbToHex(r, g, b))
/*
function changeEnvironment(property, result, dur) {
    env.setAttribute('animation', {
        property: property,
        to: result,
        dur: dur,
        easing: 'linear'
    });
}
/*
function lowerWorld(duration) {
    let trees = document.getElementsByClassName('tree');

    changeEnvironment('position', '0 -100 0', duration);
    for (tree of trees) {
        tree.setAttribute('animation', {
            property: 'position',
            to: '0 -100 0',
            dur: duration,
            easing: 'linear'
        });
    }
}

function killTrees() {
    let trees = document.getElementsByClassName('tree');
    for (tree of trees) {
        tree.remove();
    }
}
/*
function firstTransition() {
    let duration = 1000;
    takeFlight(duration);
    lowerWorld(duration);

    setInterval(() => {
        killTrees();
        changeEnvironment('position', '0 0 0', 0);
    }, duration + 10);
    setInterval(() => {
        fade('#env', 'environment', 'skyColor', '#88c', duration, true);
        fade('#env', 'environment', 'horizonColor', '#ddd', duration, true);
    }, 2 * duration + 20);

    /*fade('#env', 'environment', 'skyColor', COLORS.white, duration, true);
        fade(
            '#env',
            'environment',
            'horizonColor',
            COLORS.white,
            duration,
            true
        );*/
//env.setAttribute('environment', { opacity: 0 });
//fade('#env', 'material', 'opacity', 0, 0, true);
/*env.setAttribute('environment', {
            active: true,
            seed: 1,
            skyType: 'atmosphere',
            skyColor: '#88c',
            horizonColor: '#ddd',
            lighting: 'distant',
            lightPosition: { x: 0, y: -0.01, z: -0.46 },
            fog: 0.7,
            flatShading: false,
            playArea: 1,
            ground: 'hills',
            groundYScale: 3,
            groundTexture: 'none',
            groundColor: '#553e35',
            groundColor2: '#694439',
            dressing: 'none',
            dressingAmount: 100,
            dressingColor: '#795449',
            dressingScale: 5,
            dressingVariance: { x: 1, y: 1, z: 1 },
            dressingUniformScale: true,
            grid: '1x1',
            dressingOnPlayArea: 0,
            gridColor: '#39d2f2',
            shadow: false
        });*/
//changeEnvironment('opacity', 0, 1000);
/*env.setAttribute('animation', {
            property: 'position',
            to: '0 0 0',
            dur: 0,
            easing: 'linear'
        });*/
/*
        env.setAttribute('animation', {
            property: 'opacity',
            to: 0,
            dur: 1000,
            easing: 'linear'
        });
        env.setAttribute('animation', {
            property: 'opacity',
            to: 0,
            dur: 1000,
            easing: 'linear'
        });*/

//scene.setAttribute('position', '0 0 0');
//fade('#env', 'environment', 'skyColor', '#88c', 500, true);
//fade('#env', 'environment', 'horizonColor', '#ddd', 500, true);
/*env.setAttribute('environment', {
            active: true,
            seed: 1,
            skyType: 'atmosphere',
            skyColor: '#88c',
            horizonColor: '#ddd',
            lighting: 'distant',
            lightPosition: { x: 0, y: -0.01, z: -0.46 },
            fog: 0.7,
            flatShading: false,
            playArea: 1,
            ground: 'hills',
            groundYScale: 3,
            groundTexture: 'none',
            groundColor: '#553e35',
            groundColor2: '#694439',
            dressing: 'none',
            dressingAmount: 100,
            dressingColor: '#795449',
            dressingScale: 5,
            dressingVariance: { x: 1, y: 1, z: 1 },
            dressingUniformScale: true,
            grid: '1x1',
            dressingOnPlayArea: 0,
            gridColor: '#39d2f2',
            shadow: false
        });*/
