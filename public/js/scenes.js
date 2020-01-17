let setEnvironment = (scene) => {
    killTrees();
    env.setAttribute('environment', scene);
};

let sceneForest = () => {
    setAttributes(title, { position: '0 3.5 -6' });
    setAttributes(subtitle, { position: '0 2.8 -6' });
    setTitleColor(COLORS.white);
    setTitle(text.initial.title);
    setSubtitle(text.initial.subtitle);
    setTimeout(() => {
        setSubtitle(text.firstButton);
        createButton('deltaButton', transitionDelta, COLORS.delta);
    }, 5000); // Match with Laura's audio
};

let sceneDelta = () => {
    let ground = document.getElementsByClassName('environmentGround')[0];
    ground.setAttribute('animation', {
        property: 'position',
        to: '0 0 0',
        dur: 0,
        easing: 'easeInQuad'
    });
    ground.setAttribute('animation__2', {
        property: 'scale',
        to: '1 1 1',
        dur: 0,
        easing: 'linear'
    });
    setEnvironment(scenes.delta);
    setTitleColor(COLORS.delta);
    setSubtitleColor(COLORS.white);
    setTitle(text.delta.title);
    setSubtitle(text.delta.subtitle);
    enableGUI('delta');
    setTimeout(() => {
        setSubtitle(text.button);
        createButton('thetaButton', transitionTheta, COLORS.theta);
    }, 10000); // Match with Laura's audio
};

let sceneTheta = () => {
    setEnvironment(scenes.theta);
    setTitleColor(COLORS.theta);
    setSubtitleColor(COLORS.white);
    setTitle(text.theta.title);
    setSubtitle(text.theta.subtitle);
    enableGUI('theta');
    setTimeout(() => {
        setSubtitle(text.button);
        createButton('alphaButton', transitionAlpha, COLORS.alpha);
    }, 10000); // Match with Laura's audio
};

let sceneAlpha = () => {
    setEnvironment(scenes.alpha);
    setTitleColor(COLORS.alpha);
    setSubtitleColor(COLORS.white);
    setTitle(text.alpha.title);
    setSubtitle(text.alpha.subtitle);
    enableGUI('alpha');
    setTimeout(() => {
        setSubtitle(text.button);
        createButton('betaButton', transitionBeta, COLORS.beta);
    }, 10000); // Match with Laura's audio
};

let sceneBeta = () => {
    setEnvironment(scenes.beta);
    setTitleColor(COLORS.beta);
    setSubtitleColor(COLORS.black);
    setTitle(text.beta.title);
    setSubtitle(text.beta.subtitle);
    enableGUI('beta');
    setTimeout(() => {
        setSubtitle(text.button);
        createButton('gammaButton', transitionGamma, COLORS.gamma);
    }, 10000); // Match with Laura's audio
};

let sceneGamma = () => {
    setEnvironment(scenes.gamma);
    setTitleColor(COLORS.gamma);
    setSubtitleColor(COLORS.white);
    setTitle(text.gamma.title);
    setSubtitle(text.gamma.subtitle);
    enableGUI('gamma');
    setTimeout(() => {
        setSubtitle(text.lastButton);
        createButton('resetButton', transitionReset);
    }, 10000); // Match with Laura's audio
};

let scenes = {
    initial: {
        skyType: 'gradient',
        skyColor: COLORS.skyblue,
        horizonColor: COLORS.lightblue,
        lighting: 'distant',
        lightPosition: {
            x: -1.2,
            y: 0.88,
            z: -0.55
        },
        fog: 1.0,
        flatShading: false,
        playArea: 1.3,
        ground: 'hills',
        groundYScale: 80,
        groundColor: COLORS.white,
        groundColor2: COLORS.white,
        groundTexture: 'checkerboard',
        dressingScale: 1,
        dressingVariance: {
            x: 10,
            y: 10,
            z: 10
        },
        dressingUniformScale: true,
        dressingOnPlayArea: 0,
        grid: 'none',
        gridColor: '#c5a543',
        shadow: false
    },
    delta: {
        active: true,
        seed: 1,
        skyType: 'atmosphere',
        skyColor: '#88c',
        horizonColor: '#ddd',
        lighting: 'distant',
        lightPosition: {
            x: 0,
            y: -0.01,
            z: -0.46
        },
        fog: 0.7,
        flatShading: false,
        playArea: 1,
        ground: 'hills',
        groundYScale: 3,
        groundTexture: 'none',
        groundColor: '#553e35',
        groundColor2: '#694439',
        grid: '1x1',
        dressingOnPlayArea: 0,
        gridColor: '#39d2f2',
        shadow: false
    },
    theta: {
        active: true,
        seed: 14,
        skyType: 'gradient',
        skyColor: '#478d54',
        horizonColor: '#b696cb',
        lighting: 'distant',
        lightPosition: {
            x: 0,
            y: 2.01,
            z: -1
        },
        fog: 0.8,
        flatShading: false,
        playArea: 1,
        ground: 'spikes',
        groundYScale: 25,
        groundTexture: 'none',
        groundColor: '#2e455f',
        groundColor2: '#694439',
        dressing: 'apparatus',
        dressingAmount: 30,
        dressingColor: '#657067',
        dressingScale: 20,
        dressingVariance: {
            x: 20,
            y: 20,
            z: 20
        },
        dressingUniformScale: true,
        dressingOnPlayArea: 0,
        grid: '1x1',
        gridColor: '#478d54',
        shadow: false
    },
    alpha: {
        active: true,
        seed: 14,
        skyType: 'atmosphere',
        skyColor: COLORS.skyblue,
        horizonColor: '#78D8FF',
        lighting: 'point',
        lightPosition: {
            x: 0,
            y: 5,
            z: 3
        },
        fog: 0.9,
        flatShading: false,
        playArea: 10,
        ground: 'flat',
        groundYScale: 1,
        groundTexture: 'none',
        groundColor: '#7AD2F7',
        groundColor2: '#694439',
        dressing: 'none',
        dressingAmount: 30,
        dressingColor: '#657067',
        dressingScale: 20,
        dressingVariance: {
            x: 20,
            y: 20,
            z: 20
        },
        dressingUniformScale: true,
        dressingOnPlayArea: 0,
        grid: '0x0',
        gridColor: '#478d54',
        shadow: false
    },
    beta: {
        active: true,
        seed: 52,
        skyType: 'gradient',
        skyColor: '#1fbfd1',
        horizonColor: '#ddd',
        lighting: 'point',
        lightPosition: { x: -3.09, y: 3.36, z: 0.33 },
        fog: 0.67,
        flatShading: true,
        playArea: 1,
        ground: 'hills',
        groundYScale: 10,
        groundTexture: 'none',
        groundColor: '#feb943',
        groundColor2: '#b900ff',
        dressing: 'arches',
        dressingAmount: 25,
        dressingColor: '#795449',
        dressingScale: 30,
        dressingVariance: { x: 15, y: 80, z: 15 },
        dressingUniformScale: true,
        dressingOnPlayArea: 0.04,
        grid: 'none',
        gridColor: '#ccc',
        shadow: false
    },
    gamma: {
        skyType: 'gradient',
        skyColor: '#0c009c',
        horizonColor: '#e9ad8c',
        lightPosition: '0.5 1 0',
        fog: 0.8,
        flatShading: true,
        playArea: 3,
        ground: 'canyon',
        groundYScale: 9.76,
        groundColor: '#C66344',
        groundColor2: '#c96b4b',
        groundTexture: 'squares',
        dressingScale: 0.7,
        dressingVariance: { x: 0.5, y: 40, z: 0.5 },
        dressingUniformScale: false,
        gridColor: '#239893',
        shadow: true,
        active: true,
        seed: 20,
        shadowSize: 10.75,
        dressing: 'cylinders',
        dressingAmount: 400,
        dressingColor: '#c28a77'
    }
};
