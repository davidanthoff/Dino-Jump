const CONSTANTS = {
    DINO_WIDTH: 40,
    DINO_HEIGHT: 60,
    GRAVITY: 0.8,
    TERMINAL_VEL: 12
};

export default class Dino {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
        this.vel = 0;
    }

    drawDino(ctx) {
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);
    }

    moveDino() {
        //for each frame, the bird should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
        this.y += this.vel;
        //the acceleration of gravity is in pixels per second per second
        //so each second, it changes the velocity by whatever the gravity constant is
        this.vel += CONSTANTS.GRAVITY;
        //we set a 'terminal velocity', a maximum speed the bird can travel
        //this keeps the game from becoming too wild because the bird is moving too fast to control
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            //if the terminal velocity is exceeded, we set it to the terminal velicty
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    jump() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel = -1 * CONSTANTS.FLAP_SPEED;
    }

    animate(ctx) {
        this.moveDino();
        this.drawDino(ctx);
    }
}
