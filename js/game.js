var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000080",
    netWidth : 6,
    netColor: "#FFFFFF",
    groundLayer : null,
    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,
    scoreLayer : null,
    playersBallLayer : null,


    init : function() {

        // Terrain
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight,
            undefined, 0, "#000080", 0, 0);

        // Séparation terrain
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor,
            this.groundWidth / 2 - this.netWidth / 2, 0);

        // Score
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight,
            undefined, 1, undefined, 0, 0);

        // Affichage score dans terrain
        this.displayScore(0,0);

    },

    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF",
            this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF",
            this.scorePosPlayer2, 55);
    },
};
