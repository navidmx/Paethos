function fadeOutBlack(dur) {
    overlay = document.querySelector('#overlay');
    $('#overlay').fadeIn(dur);
}

function fadeInBlack(dur) {
    $('#overlay').fadeOut(dur);
}

function blackTransition() {
    fadeOutBlack(4000);
    setTimeout(() => {
        fadeInBlack(4000);
    }, 8000);
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
}
