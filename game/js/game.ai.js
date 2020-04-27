class ai {
    constructor(player, ball) {
        this.player = player;
        this.ball = ball;
        this.enabled = true;
    }

    // Mouvement : alterne suivre et centrer
    move() {
        if(this.enabled === true)
        {
            if ( this.ball.directionX === 1 ) {
                if ( this.player.originalPosition === "right" ) {
                    // suivre
                    return this.followBall();
                }
                if ( this.player.originalPosition === "left" ) {
                    // centrer
                    return this.goCenter();
                }
            } else {
                if ( this.player.originalPosition === "right" ) {
                    // centrer
                    return this.goCenter();
                }
                if ( this.player.originalPosition === "left" ) {
                    // suivre
                    return this.followBall();
                }
            }
        }
    }

    // Calque des mouvements de la raqueete sur la balle.
    // En gros la raquette suit la balle quand c'est l'IA
    followBall() {
        if ( this.ball.posY < this.player.posY + this.player.height/2 ) {
            // la position de la balle est sur l'écran, au dessus de celle de la raquette
            this.player.posY -= 3;
        } else if ( this.ball.posY > this.player.posY + this.player.height/2 ) {
            // la position de la balle est sur l'écran, en dessous de celle de la raquette
            this.player.posY += 3;
        }
        return this.player.posY;
    }

    // La raquette se repositionne au centre
    goCenter() {
        if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
            this.player.posY--;
        } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
            this.player.posY++;
        }
        return this.player.posY;
    }
}
