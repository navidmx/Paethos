let blackout = document.querySelector('#blackout');

function fadeOutBlack(dur) {
    blackout.setAttribute('visible', true);
    blackout.setAttribute(
        'animation',
        {
            property: 'material.opacity',
            to: 1,
            dur: dur,
            easing: 'easeInQuad'
        },
        dur
    );
}

function fadeInBlack(dur) {
    blackout.setAttribute(
        'animation',
        {
            property: 'material.opacity',
            to: 0,
            dur: dur,
            easing: 'easeInQuad'
        },
        dur
    );
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
    for (tree of trees) tree.remove();
}

function transitionDelta() {
    lowerWorld(10000);
    setTimeout(() => {
        killTrees;
        takeFlight(3000);
    }, 2000);
    setTimeout(() => {
        blackTransition();
        soundFadeOut(sound.forest);
        soundFadeIn(sound.delta, true);
        showHeading(text.delta.heading, text.delta.subheading, COLORS.delta);
    }, 5000);
    setTimeout(sceneDelta, 8000);
}

function transitionTheta() {
    blackTransition();
    soundFadeOut(sound.delta);
    soundFadeIn(sound.theta, true);
    showHeading(text.theta.heading, text.theta.subheading, COLORS.theta);
    setTimeout(sceneTheta, 3000);
}

function transitionAlpha() {
    blackTransition();
    soundFadeOut(sound.theta);
    soundFadeIn(sound.alpha, true);
    showHeading(text.alpha.heading, text.alpha.subheading, COLORS.alpha);
    setTimeout(toggleOceanVisibility, 2000);
    setTimeout(sceneAlpha, 3000);
}

function transitionBeta() {
    blackTransition();
    soundFadeOut(sound.alpha);
    playSound(sound.narrator.eyes);
    soundFadeIn(sound.beta, true);
    showHeading(text.beta.heading, text.beta.subheading, COLORS.beta);
    setTimeout(toggleOceanVisibility, 2000);
    setTimeout(sceneBeta, 3000);
}

function transitionGamma() {
    blackTransition();
    soundFadeOut(sound.beta);
    soundFadeIn(sound.gamma, true);
    showHeading(text.gamma.heading, text.gamma.subheading, COLORS.gamma);
    setTimeout(sceneGamma, 3000);
}

function transitionReset() {
    blackTransition();
    setTimeout(() => {
        sceneFinal();
        placeRandomTrees(100, 50, 200, 0);
        env.setAttribute('scale', '8 1 8');
        document
            .getElementsByClassName('environmentGround')[0]
            .setAttribute('animation', {
                property: 'position',
                to: '0 -50 0',
                dur: 0,
                easing: 'easeOutQuad'
            });
    }, 3000);

    setTimeout(() => {
        let trees = document.getElementsByClassName('tree');
        for (tree of trees) {
            tree.setAttribute('animation', {
                property: 'position',
                to: { y: -50 },
                dur: 0,
                easing: 'easeOutQuad'
            });
        }
    }, 4000);
    setTimeout(() => {
        let trees = document.getElementsByClassName('tree');
        document
            .getElementsByClassName('environmentGround')[0]
            .setAttribute('animation__3', {
                property: 'position',
                to: '0 0 0',
                dur: 5000,
                easing: 'easeOutQuad'
            });
        env.setAttribute('animation__4', {
            property: 'scale',
            to: { x: 1, z: 1 },
            dur: 5000,
            easing: 'linear'
        });

        for (tree of trees) {
            tree.setAttribute('animation', {
                property: 'position',
                to: { y: 0 },
                dur: 5000,
                easing: 'easeOutQuad'
            });
        }
    }, 4200);
}
