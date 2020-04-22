// Contrôle du jeu
game.control = {
    onKeyDown : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = true;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
        }

        if ( event.keyCode === game.keycode.SPACEBAR ) {
            game.ball.inGame = true;
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
