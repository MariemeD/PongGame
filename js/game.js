var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000080",
    netWidth : 6,
    netColor: "#FFFFFF",
    groundLayer : null,
    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,

    init : function() {

        // Terrain
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight,
            undefined, 0, "#000080", 1000, 1000);

        // Séparation terrain
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor,
            this.groundWidth / 2 - this.netWidth / 2, 0);

        // Score
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight,
            undefined, 1, undefined, 0, 0);

        // Affichage score dans terrain
        game.display.drawTextInLayer(this.scoreLayer, "SCORE", "50px Arial", "#FF0000",
            100, 100);
    }
};
