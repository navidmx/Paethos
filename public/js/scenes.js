let setScene = scene => {
    env.setAttribute('environment', scene);
}

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
    }
}