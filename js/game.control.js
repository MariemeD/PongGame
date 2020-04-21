// Contrôle du jeu
game.control = {
    onKeyDown : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = true;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
        }
    },

    onKeyUp : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = false;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = false;
        }
    },


    onKeyDown2 : function(event) {
        if ( event.keyCode === game.keycode2.KEYDOWN ) {
            game.playerTwo.goDown = true;
        } else if ( event.keyCode === game.keycode2.KEYUP ) {
            game.playerTwo.goUp = true;
        }
    },

    onKeyUp2 : function(event) {
        if ( event.keyCode === game.keycode2.KEYDOWN ) {
            game.playerTwo.goDown = false;
        } else if ( event.keyCode === game.keycode2.KEYUP ) {
            game.playerTwo.goUp = false;
        }
    }
};
