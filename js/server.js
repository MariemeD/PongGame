var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
    //res.sendFile('/../index.html');
    res.sendFile('pong.html', {root: './'});
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
