function fadeOutBlack(dur) {
    overlay = document.querySelector('#overlay');
    $('#overlay').fadeIn(dur);
}

function fadeInBlack(dur) {
    $('#overlay').fadeOut(dur);
}

function blackTransition() {
    fadeOutBlack(2000);
    setTimeout(() => {
        fadeInBlack(2000);
    }, 4000);
}

function takeFlight(duration) {
    //skyColor: COLORS.skyblue,
    fade('#env', 'environment', 'skyColor', COLORS.black, duration, true);
    fade('#env', 'environment', 'horizonColor', COLORS.black, duration, true);
    //horizonColor: COLORS.lightblue,
    //fade('#env', 'environment', 'fog', 1, 4000);
}

function lowerWorld(duration) {
    // REQUIRES WE ARE IN TREE WORLD
    let trees = document.getElementsByClassName('tree');

    //changeEnvironment('position', '0 -400 0', duration);
    env.setAttribute('animation', {
        property: 'groundColor',
        to: '000000',
        dur: duration,
        easing: 'easeInQuad'
    });
    env.setAttribute('animation', {
        property: 'groundColor2',
        to: '000000',
        dur: duration,
        easing: 'easeInQuad'
    });
    document
        .getElementsByClassName('environmentGround')[0]
        .setAttribute('animation', {
            property: 'position',
            to: '0 -200 0',
            dur: duration,
            easing: 'easeInQuad'
        });

    document
        .getElementsByClassName('environmentGround')[0]
        .setAttribute('animation__2', {
            property: 'scale',
            to: '6 6 6',
            dur: duration,
            easing: 'linear'
        });

    for (tree of trees) {
        tree.setAttribute('animation', {
            property: 'position',
            to: '0 -200 0',
            dur: duration,
            easing: 'easeInQuad'
        });
    }
}

function killTrees() {
    let trees = document.getElementsByClassName('tree');
    for (tree of trees) {
        tree.remove();
    }
}

function firstTransition() {
    lowerWorld(10000);
    setTimeout(() => {
        killTrees;
        takeFlight(3000);
    }, 2000);
    setTimeout(() => {
        blackTransition();
    }, 5000);
    setTimeout(() => {
        sceneTwo();
    }, 8000);
}

function sceneTwo() {
    document
        .getElementsByClassName('environmentGround')[0]
        .setAttribute('animation', {
            property: 'position',
            to: '0 0 0',
            dur: 0,
            easing: 'easeInQuad'
        });
    document
        .getElementsByClassName('environmentGround')[0]
        .setAttribute('animation__2', {
            property: 'scale',
            to: '1 1 1',
            dur: 0,
            easing: 'linear'
        });
    $('#env').each(function() {
        var attributes = this.attributes;
        var i = attributes.length;
        while (i--) {
            this.removeAttributeNode(attributes[i]);
        }
    });
    env.setAttribute('environment', {
        preset: 'starry'
    }); /*,
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
}
/*
setTimeout(() => {
    firstTransition();
    fade('#env', 'environment', 'fog', 1, 5000);
}, 1500);
*/
