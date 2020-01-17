// Start animation sequences with a given duration
let animate = (scene, dur) => {
    let start = document.querySelector('#startButton');
    switch (scene) {
        case 'intro':
            setEnvironment(scenes.initial);
            setTimeout(() => {
                start.addEventListener('pressed', () => {
                    animate('fadeIn', 5000);
                    start.remove();
                    setTitle(text.calibrate.title);
                    setSubtitle(text.calibrate.subtitle);
                });
            }, 1000);
            soundFadeIn(sound.forest);
            setTitle(text.intro.title);
            setSubtitle(text.intro.subtitle);
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
                setTitle(text.calibrate.title2);
                setSubtitle('');
                setTimeout(sceneForest, dur);
            }, dur);
            break;
    }
};

animate('intro', 500);
