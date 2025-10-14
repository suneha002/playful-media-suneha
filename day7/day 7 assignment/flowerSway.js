class Flower {
    constructor(x, y, xspeed, yspeed, size) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.hovered = false;
    }

    drawFlower() {
        // if (this.hovered == true) {
        //     this.x = this.x + sX;
        // }

        ellipse(this.x, this.y, this.size, this.size + 30);
        ellipse(this.x, this.y, this.size + 30, this.size);
        ellipse(this.x, this.y, this.size);
    }


    swayFlower() {
        let sX = (noise(0.1 * frameCount) - 0.5) * 20;
        if (this.hovered == true) {
            this.x = this.x + sX;
        }

    }
    grow() {
        if (this.hovered == true) {
            this.size = this.size + 0.05;
        }
    }

    mouseMove(mX, mY) {

        let distance = dist(mX, mY, this.x, this.y);
        if (distance < this.size * 10) {
            this.hovered = true;
        }
        else {
            this.hovered = false;
        }

    }


}