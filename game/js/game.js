var game = {
    groundWidth : null,
    groundHeight : null,
    groundColor : "#000000",
    netColor : "#FFFFFF",
    netWidth : null,
    socket: null,
    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,
    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,
    wallSound : null,
    playerSound : null,
    loaded: false,
    clientId: null,
    ball : {
        width : 10,
        height : 10,
        color : "#FFFF00",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX : 1,
        directionY : 1,

        // Rebond
        bounce : function(soundToPlay) {
            if ( this.posX > game.groundWidth || this.posX < 0 ) {
                this.directionX = -this.directionX;
            }
            if ( this.posY > game.groundHeight || this.posY < 0  ) {
                this.directionY = -this.directionY;
            }
        },
        // Cordonnées de la balle
        coord: function(){
            return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
        },
        // Mouvement de la balle
        move : function(coord) {
            this.posX = coord[0];
            this.posY = coord[1];
            this.directionX = coord[2];
        },
    },
    // IA
    ais : [
    ],
    // Joueur 1
    playerOne : {
        id : 1,
        width : 10,
        height : 80,
        color : "#000080",
        posX : 30,
        posY : 50,
        score: 0,
        goUp : false,
        goDown : false,
        usable: true,
        clientId: null,
        originalPosition : "left"

    },
    // Joueur 2
    playerTwo : {
        id : 2,
        width : 10,
        height : 80,
        color : "#FF4500",
        posX : 650,
        posY : 50,
        goUp : false,
        score : 0,
        goDown : false,
        usable: true,
        clientId: null,
        originalPosition : "right"
    },

    // INITIALISATION DU JEU
    init : function(param) {

        this.groundWidth = param.groundWidth;
        this.groundHeight = param.groundHeight;

        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);

        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);

        game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FF0000", 10, 10);
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);

        game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);

        this.displayScore(this.playerOne.score, this.playerTwo.score);
        this.displayBall(200,200);
        this.displayPlayers();
        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        //this.wallSound = new Audio("./sound/wall.ogg");
        //this.playerSound = new Audio("./sound/player.ogg");

        game.ais[0] = new ai(this.playerTwo, this.ball);

        param.stoppedAi.forEach(function(element){
            game.control.stopIa(element);
        });
        this.disabledPlayers(param);

        this.loaded = true;
    },

    // Désactivation des joueurs
    disabledPlayers: function(param)
    {
        if(this.playerOne.idClient == null ){
            this.playerOne.clientId = param.playerOne.idClient;
        }
        if(this.playerTwo.clientId == null){
            this.playerTwo.clientId = param.playerTwo.idClient;
        }

        if(this.playerOne.clientId !== game.clientId){
            this.playerOne.usable = false;
            console.log(false)
        }
        if(this.playerTwo.clientId != null && this.playerTwo.clientId !== game.clientId){
            this.playerTwo.usable = false;
            console.log(false)
        }
    },
    // Affichage du score sur le terrain
    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },
    // Mise à jour du score
    updateScore: function(data)
    {
        if(this.scoreLayer !== null)
        {
            this.scoreLayer.clear();
            this.displayScore(data[0],data[1]);
        }
    },
    // Affichage de la balle
    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },
    // Affichage des joueurs
    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },
    // Effacer trace
    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },
    // Initialisation du clavier et des commandes
    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },
    // Cordonnées joueurs
    coordPlayers : function()
    {
        var coords = {
            player1 : {
                y : game.playerOne.posY
            },
            player2 : {
                y : game.playerTwo.posY
            }
        };
        if ( game.control.controlSystem === "KEYBOARD" ) {
            if ( game.playerOne.goUp ) {
                if(coords.player1.y > 0){
                    coords.player1.y-=5;
                }
            } else if ( game.playerOne.goDown ) {
                if((coords.player1.y+50) < this.groundHeight){
                    coords.player1.y+=5;
                }
            }
            if ( game.playerTwo.goUp ) {
                if(coords.player2.y > 0){
                    coords.player2.y-=5;
                }
            } else if ( game.playerTwo.goDown ) {
                if((coords.player2.y+50) < this.groundHeight){
                    coords.player2.y+=5;
                }
            }
        }
        return coords;
    },

    // Bougez les joueurs
    movePlayers : function(playersCoords) {
        game.playerOne.posY = playersCoords.player1.y;
        game.playerTwo.posY = playersCoords.player2.y;
    }
};
