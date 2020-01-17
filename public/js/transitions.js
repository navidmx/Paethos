let blackout = document.querySelector("#blackout");

function fadeOutBlack(dur) {
    blackout.setAttribute('visible', true);
    blackout.setAttribute('animation', {
        property: 'material.opacity',
        to: 1,
        dur: dur,
        easing: 'easeInQuad'
    }, dur);
}

function fadeInBlack(dur) {
    blackout.setAttribute('animation', {
        property: 'material.opacity',
        to: 0,
        dur: dur,
        easing: 'easeInQuad'
    }, dur);
    setTimeout(() => {
        blackout.setAttribute('visible', false);
    }, dur);
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

function transitionDelta() {
    lowerWorld(10000);
    setTimeout(() => {
        killTrees;
        takeFlight(3000);
    }, 2000);
    setTimeout(() => {
        blackTransition();
        showHeading(text.delta.heading, text.delta.subheading, COLORS.delta);
    }, 5000);
    setTimeout(sceneDelta, 8000);
}
