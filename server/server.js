"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("path"));
var express = require('express');
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);
// ------------------------
// ROUTE
// ------------------------
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'pong.html'));
});

app.use("/js", express.static('../public/js/'));

let game = {
    groundWidth : 900,
    groundHeight : 500,
    netWidth : 6,
    init: false,
    stoppedAi : [],
    ball : {
        width : 15,
        height : 15,
        color : "#FFFF00",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX : 1,
        directionY : 1,
        // Rebond
        bounce : function(soundToPlay) {
            if ( game.ball.posX > game.groundWidth || this.posX < 0 ) {
                this.directionX = -this.directionX;
            }
            if ( this.posY > game.groundHeight || this.posY < 0  ) {
                this.directionY = -this.directionY;
            }
        },
        // Coordonnée balle
        coord: function(){
            return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
        },
        // Deplacement de la balle
        move : function(coord) {
            this.posX = coord[0];
            this.posY = coord[1];
        },
        // Collision de la balle avec autre chose
        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
                return true;
            }
            return false;
        }
    },
    // Mouvement ball
    moveBall: function(coord) {
        if(coord[0] === this.ball.posX && coord[1] === this.ball.posY)
            return;
        this.ball.move(coord);
        this.ball.bounce(this.wallSound);

        if(this.ball.posX < 0){
            this.playerTwo.score += 1;
            this.ball.posX = 200;
            this.ball.posY = 200;
            return [this.playerOne.score, this.playerTwo.score];
        }else if(this.ball.posX > this.groundWidth){
            this.playerOne.score += 1;
            this.ball.posX = 400;
            this.ball.posY = 200;
            return [this.playerOne.score, this.playerTwo.score];
        }
        return null;
    },
    // Joueur 1
    playerOne : {
        width : 10,
        height : 80,
        color : "#000080",
        posX : 30,
        posY : 50,
        score: 0,
        goUp : false,
        goDown : false,
        originalPosition : "left",
        idClient: null

    },
    // Joueur 2
    playerTwo : {
        width : 10,
        height : 80,
        color : "#FF4500",
        posX : 650,
        posY : 50,
        score : 0,
        goUp : false,
        goDown : false,
        originalPosition : "right",
        idClient: null
    },

    // Assignement No aux joueurs
    assignPlay : function(id)
    {
        if(this.playerOne.idClient == null)
        {
            this.playerOne.idClient = id;
        }else if(this.playerTwo.idClient == null)
        {
            this.playerTwo.idClient = id;
        }
    },
    // Collision ball / raquette
    collideBallWithPlayersAndAction : function() {
        if ( this.ball.collide(game.playerOne) || this.ball.collide(game.playerTwo) ) {
            game.ball.directionX = -game.ball.directionX;
        }
        return game.ball.directionX;
    }
};


// Initialisation des coordonnées des joueurs
let initPlayersCoords = {
    player1 : {
        y : game.playerOne.posY
    },
    player2 : {
        y : game.playerTwo.posY
    }

};


const room = "room";
setInterval(function(){
    let score = game.moveBall(game.ball.coord());
    if(score !== null)
    {
        io.to(room).emit('score',score);
    }
    var direction = game.collideBallWithPlayersAndAction();

    io.to(room).emit('ball',[game.ball.posX,game.ball.posY,direction]);

    let message = {
        player1 : {
            y : game.playerOne.posY,
            idClient : game.playerOne.idClient
        },
        player2 : {
            y : game.playerTwo.posY,
            idClient : game.playerTwo.idClient
        },
    };
    io.to(room).emit('players',message);
}, 5);

// Attrape une connexion
io.on('connection', (socket) => {
    console.log('a user connected', socket);
    console.log("Utilisateur Connecté");
    socket.join(room);
    // Initialisation du jeu
    game.assignPlay(socket.id);
    io.to(room).emit('init',game);
    io.to(room).emit('score',[0,0]);
    io.to(room).emit('ball',[game.ball.posX,game.ball.posY]);


    io.to(room).emit('players',initPlayersCoords);
    // Deconnexion du jeu
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // Mouvement des joueurs
    socket.on('movePlayers', (message) => {
        game.playerOne.posY  = message.player1.y;
        game.playerTwo.posY  = message.player2.y;

    });
    // Arret de l'IA
    socket.on('stopIa', (message) => {
        game.stoppedAi.push(message);
        if(message[0] === 0)
        {
            game.playerTwo.idClient = socket.id;
        }
        else if(message[0] === 1)
        {
            game.playerOne.idClient = socket.id;
        }
        else if(message[0] === 2)
        {
            game.playerTwo.idClient = socket.id;
        }
        io.to(room).emit('stopIaReturn',[message,game]);
    });

    io.to(room).emit('welcome', room);
});

http.listen(3000, () => {
    console.info('HTTP server started on port 3000');
});
