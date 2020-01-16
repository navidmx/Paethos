let scenes = {
    initial: {
        skyType: 'gradient',
        skyColor: COLORS.skyblue,
        horizonColor: COLORS.lightblue,
        lighting: 'distant',
        fog: 0.8,
        flatShading: false,
        playArea: 1,
        ground: 'hills',
        groundYScale: 80,
        groundColor: COLORS.white,
        groundColor2: COLORS.white,
        groundTexture: 'squares',
        shadow: false,
        grid: 'none'
    }
}

console.log("Hey");
$("#env").attr('environment', scenes.initial);