class Car {
    constructor(x, y, s, speed) {
        this.x = x;
        this.y = y;
        this.size = s;
        this.speed = speed;
    }


    show(redColour) {
        fill(redColour,0,0)
        rect(this.x, this.y, this.size, 20);
        ellipse(this.x + 10, this.y + 20, 10);
        ellipse(this.x + this.size - 10, this.y + 20, 10);
    }
    move() {
        this.x = this.x + this.speed;
        if (this.x > width) {
            this.x = 0;
        }
    }
    grow(){
        if(this.size<200){
        this.size=this.size+1;
        }
    }
}