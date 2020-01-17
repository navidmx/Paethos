// Start animation sequences with a given duration
let animate = (scene, dur) => {
    let start = document.querySelector('#startButton');
    switch (scene) {
        case 'intro':
            let start = document.querySelector('#startButton');
            setEnvironment(scenes.initial);
            setTimeout(() => {
                start.addEventListener('pressed', () => {
                    animate('fadeIn', 5000);
                    start.remove();
                    setTitle('Initializing...');
                    setSubtitle('Calibrating PAETHOS to your brain waves...');
                });
            }, 1000);
            setAttributes(title, {
                position: '0 2.5 -3',
                text: {
                    align: 'center',
                    font: 'exo2bold',
                    value: 'Welcome to PAETHOS',
                    color: 'black',
                    opacity: 1,
                    width: 8
                }
            });
            setAttributes(subtitle, {
                position: '0 2 -3',
                text: {
                    align: 'center',
                    font: 'exo2semibold',
                    value: 'To begin, use your hand to click the button!',
                    color: 'black',
                    opacity: 0.7,
                    width: 4
                }
            });
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
                setTitle('Calibrated.');
                setSubtitle('');
                setTimeout(() => {
                    setAttributes(title, {
                        position: '0 3.5 -6'
                    });
                    setAttributes(subtitle, {
                        position: '0 2.8 -6'
                    });
                    setTitle('This is your mind.');
                    setSubtitle(`Your neurons fire in concerted efforts,
                                generating waves of differing significance.
                                We are going to examine these waves.`);
                }, dur);
            }, dur);
            break;
    }
};

animate('intro', 500);
