function fadeOutBlack(dur) {
    overlay = document.querySelector('#overlay');
    $('#overlay').fadeIn(dur);
}

function fadeInBlack(dur) {
    $('#overlay').fadeOut(dur);
}

function blackTransition() {
    fadeOutBlack(4000);
    setInterval(() => {
        fadeInBlack(4000);
    }, 8000);
}

function lowerWorld(duration) {
    // REQUIRES WE ARE IN TREE WORLD
    let trees = document.getElementsByClassName('tree');

    changeEnvironment('position', '0 -500 0', duration);
    for (tree of trees) {
        tree.setAttribute('animation', {
            property: 'position',
            to: '0 -500 0',
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

function firstTransition() {
    lowerWorld(4000);
    setInterval(() => {
        killTrees;
        fade('#env', 'environment', 'skyColor', '#88c', 4000, true);
        fade('#env', 'environment', 'horizonColor', '#ddd', 4000, true);
    }, 4000);
    setInterval(() => {
        blackTransition();
    }, 8000);
}
