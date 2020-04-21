var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor: "#FFFFFF",
    groundLayer : null,
    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,
    scoreLayer : null,
    playersBallLayer : null,

    // Encapsulation de la balle
    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX : 1,
        directionY : 1,
        bounce : function(soundToPlay) {
            if ( this.posX > game.groundWidth || this.posX < 0 ) {
                this.directionX = -this.directionX;
            }
            if ( this.posY > game.groundHeight || this.posY < 0  ) {
                this.directionY = -this.directionY;
            }
        },

        move : function() { // dedié au deplacement de la balle
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },

        collide : function(anotherItem) {
            return !(this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
                || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height);

        },
    },

    // Joueur 1 raquette
    playerOne : {
        width : 10,
        height : 100,
        color : "#7FFF00",
        posX : 17,
        posY : 200,
        goUp : false,
        goDown : false
    },

    // Joueur 2raquette
    playerTwo : {
        width : 10,
        height : 100,
        color : "#FF1493",
        posX : 690,
        posY : 200,
        goUp : false,
        goDown : false
    },

    init : function() {

        // Création layer Terrain
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight,
            undefined, 0, "#000000", 1000, 1000);

        // Séparation terrain
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor,
            this.groundWidth / 2 - this.netWidth / 2, 0);

        // Création layer score
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight,
            undefined, 1, undefined, 70, 0);

        // Affichage score dans terrain
        this.displayScore(0,0);

        // Création layer balle/raquettes
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth,
            this.groundHeight, undefined, 2, undefined, 0, 0);

        //Affichege de la balle
        this.displayBall(200,200);

        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

    },

    //Fonction affichage score
    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#7FFF00",
            this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FF1493",
            this.scorePosPlayer2, 55);
    },

    //Fonction affichage balle
    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    // Fonction affichage raquettes joueurs
    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },

    // Raffréchissement positionnement ball
    moveBall : function() {
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
    },

    // Pour effacer la trainée blanche
    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    // Association événement/fonction
    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    // Mouvement des joueurs
    movePlayers : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 15)
            game.playerOne.posY-=5;
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
            game.playerOne.posY+=5;
    },

    //Choc entre balle et raquettes
    collideBallWithPlayersAndAction : function() {
        if ( this.ball.collide(game.playerOne) )
            game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerTwo) )
            game.ball.directionX = -game.ball.directionX;
    },
};
