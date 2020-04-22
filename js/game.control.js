// Contrôle du jeu
game.control = {
    onKeyDown : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = true;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
        }

        if ( event.keyCode === game.keycode.SPACEBAR && !game.ball.inGame ) {
            game.ball.inGame = true;
            game.ball.posX = game.playerOne.posX + game.playerOne.width;
            game.ball.posY = game.playerOne.posY;
            game.ball.directionX = 1;
            game.ball.directionY = 1;
        }
    },

    onKeyUp : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = false;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = false;
        }
    },
};
