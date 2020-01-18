const express = require('express');
var dgram = require('dgram');

const serverport = 3000;

var ganglionHost = '127.0.0.1';
var bandpowerPort = 2131;
var focusPort = 2132;

var data = {
    alpha: 0,
    beta: 0,
    delta: 0,
    gamma: 0,
    theta: 0,
    focus: 0,
    focusLastFiveSeconds: 0
};

var lastFocus = new Date();

/* UDP DATA FROM GANGLION */

var ganglionServerBandpower = dgram.createSocket('udp4');
var ganglionServerFocus = dgram.createSocket('udp4');

ganglionServerBandpower.on('listening', function() {
    var address = ganglionServerBandpower.address();
    console.log(
        'UDP Server listening on ' + address.address + ':' + address.port
    );
});

ganglionServerFocus.on('listening', function() {
    var address = ganglionServerFocus.address();
    console.log(
        'UDP Server listening on ' + address.address + ':' + address.port
    );
});

function findAverage(jsonObj, band) {
    sum = 0;
    for (i = 0; i < 4; i++) {
        sum += json.data[i][band];
    }
    return sum / 4.0;
}

ganglionServerBandpower.on('message', function(message, remote) {
    message = String(message);
    json = JSON.parse(message);

    data.delta = findAverage(json, 0);
    data.theta = findAverage(json, 1);
    data.alpha = findAverage(json, 2);
    data.beta = findAverage(json, 3);
    data.gamma = findAverage(json, 4);

    console.log(data);
});

ganglionServerFocus.on('message', function(message, remote) {
    message = String(message).replace(']', '');
    data.focus = JSON.parse(message).data;
    if (data.focus) {
        lastFocus = new Date();
    }
});

ganglionServerBandpower.bind(bandpowerPort, ganglionHost);

ganglionServerFocus.bind(focusPort, ganglionHost);

/* NODE SERVER */

const app = express();

app.use(express.static('public'));

app.get('/api/test', (req, res) => {
    res.send('Hi this is working.');
});

app.get('/api/brainwaves', (req, res) => {
    var now = new Date();
    if (now - lastFocus < 5000) {
        data.focusLastFiveSeconds = 1;
    } else {
        data.focusLastFiveSeconds = 0;
    }
    res.json(data);
});

app.listen(serverport, function() {
    console.log('server listening on port ' + serverport);
});
