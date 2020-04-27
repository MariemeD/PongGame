game.control = {

    // Déclaration
    controlSystem : null,
    mousePointer : null,

    // KEYDOW : raquette en bas
    onKeyDown : function(event) {
        game.control.controlSystem = "KEYBOARD";
        if(game.playerOne.usable === true){
            if ( event.keyCode === game.keycode.KEYDOWN ) {
                game.playerOne.goDown = true;
            } else if ( event.keyCode === game.keycode.KEYUP ) {
                game.playerOne.goUp = true;
            }
        }
        if(game.playerTwo.usable === true){
            if ( event.keyCode === game.keycode.KEYQ ) {
                game.socket.emit('stopIa',[0, game.clientId, 0]);
                game.playerTwo.goDown = true;
            } else if ( event.keyCode === game.keycode.KEYA ) {
                game.socket.emit('stopIa',[0, game.clientId, 0]);
                game.playerTwo.goUp = true;
            }
        }
    },

    // Arret de l'IA
    stopIa : function(id)
    {
        if(game.ais[id[0]] !== undefined && game.ais[id[0]] !== undefined && game.ais[id[0]].player !== null )
        {
            game.ais[id[0]].enabled = false;
            if(game.ais[id[0]].player.id === 1)
            {
                game.playerOne.clientId = id[1]
            }
            if(game.ais[id[0]].player.id === 2)
            {
                game.playerTwo.clientId = id[1]
            }
        }
    },

    // ONKEYUP : raquette vers le haut
    onKeyUp : function(event) {
        if(game.playerOne.usable === true){
            if ( event.keyCode === game.keycode.KEYDOWN ) {
                game.playerOne.goDown = false;
            } else if ( event.keyCode === game.keycode.KEYUP ) {
                game.playerOne.goUp = false;
            }
        }
        if(game.playerTwo.usable === true){
            if ( event.keyCode === game.keycode.KEYQ ) {
                game.socket.emit('stopIa',[0, game.clientId, 0]);
                game.playerTwo.goDown = false;
            } else if ( event.keyCode === game.keycode.KEYA ) {
                game.socket.emit('stopIa',[0, game.clientId, 0]);
                game.playerTwo.goUp = false;
            }
        }
    },
};
