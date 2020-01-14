const express = require('express');

const port = 3000;

const app = express();

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});
