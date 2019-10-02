let env = document.querySelector('#env');

let lerp = (a, b, u) => {
    return (1 - u) * a + u * b;
}

let fade = (object, property, start, end, duration) => {
    let interval = 10;
    let steps = duration / interval;
    let step_u = 1.0 / steps;
    let u = 0.0;
    let currInterval = setInterval(() => {
        if (u >= 1.0) 
            clearInterval(currInterval);
        let r = Math.round(lerp(start.r, end.r, u));
        let g = Math.round(lerp(start.g, end.g, u));
        let b = Math.round(lerp(start.b, end.b, u));
        let colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
        object[property] = colorname;
        u += step_u;
    }, interval);
}

let COLORS = {
    lightgreen: '#756E2B',
    darkgreen: '#716C22',
    skyblue: '#76d6ff'
}

let desc = {
    preset: 'forest',
    skyType: 'gradient',
    skyColor: COLORS.skyblue,
    horizonColor: 'white',
    shadow: false,
    shadowSize: 10,
    fog: 0.85,
    playArea: 1,
    ground: 'hills',
    groundColor: COLORS.lightgreen,
    groundColor2: COLORS.darkgreen,
    groundTexture: 'checkerboard',
    groundYScale: 10,
    dressing: 'trees',
    dressingAmount: 500,
    dressingColor: COLORS.lightgreen,
    dressingScale: 5
}

let updateEnv = () => {
    env.setAttribute('environment', desc);
}

updateEnv();