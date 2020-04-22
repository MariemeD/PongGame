var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile('/Pong_Marieme/index.html');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
