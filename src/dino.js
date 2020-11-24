const CONSTANTS = {
    DINO_WIDTH: 40,
    DINO_HEIGHT: 60,
    GRAVITY: 0.25,
    TERMINAL_VEL: 10,
    JUMP_SPEED: 12,
};

const dinoSprite = new Image();
dinoSprite.src = "img/dino_sprite.png";

export default class Dino {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = 450;
        this.vel = 0;
        this.width = CONSTANTS.DINO_WIDTH;
        this.height = CONSTANTS.DINO_HEIGHT;
    }

    drawDino(ctx, x) {
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);
        ctx.drawImage(dinoSprite, 2122, 6, 80, 86, this.x, this.y, this.width, this.height);
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

        // if (this.isOutOfBounds(this.x)) {
        //     this.wrap(this.x);
        // };
    }

    jump() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);
    }

    animate(ctx) {
        this.moveDino();
        if (this.isOutOfBounds(this.x) == "left") {
            this.drawDino(ctx, this.dimensions.x);
        }  
        if (this.isOutOfBounds(this.x) == "right"){
            this.drawDino(ctx, 0);
        }
        this.drawDino(ctx);
    }

    controlDino(direction) {
        if(direction=="left") {
            this.x -= 9;
        } 

        if(direction=="right") {
            this.x += 9;
        }
    }

    // isOutOfBounds(x) {
    //     if (x < 0 || x > this.dimensions.width) {
    //         return true;
    //     };
    //     return false;
    // };

    isOutOfBounds(x) {
        if (x < 0) {
            return "left"
        };
        if (x > this.dimensions.width) {
            return "right";
        };
        return false;
    };

    wrap(x) {
        debugger
        if (x > this.dimensions.x) {
            this.x = 0;
        }
        if (x < 0) {
            this.x = this.dimensions.x;
        }
    }
}
