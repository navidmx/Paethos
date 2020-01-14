const express = require('express');

const port = 3000;

const app = express();

app.use(express.static('public'));

/*
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});*/
counter = 0;
setInterval(function() {
    counter = counter + 1;
}, 1000);

app.get('/api/test', (req, res) => {
    res.send(counter.toString());
});

alpha = 2;
beta = 3;
delta = 4;
gamma = 5;
theta = 6;

app.get('/api/brainwaves', (req, res) => {
    res.json({
        alpha: alpha,
        beta: beta,
        delta: delta,
        gamma: gamma,
        theta: theta
    });
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});
