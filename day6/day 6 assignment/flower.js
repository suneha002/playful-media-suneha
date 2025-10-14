class Flower {
    constructor(x, y, size, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.hovered=false;
    }


    drawFlower() {

        if(this.hovered==true){
            fill("red");
        }
        else{
            fill("white");
        }
        // ellipse(this.x, this.y, this.size, this.size + 30);
        // ellipse(this.x, this.y, this.size + 30, this.size);
        ellipse(this.x, this.y, this.size);
    }


    move() {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
        if(this.y>height || this.y<0){
            this.ySpeed= -this.ySpeed;
        }
        if(this.x>width || this.x<0){
            this.xSpeed= -this.xSpeed;
        }

    }

    changeColor(mX,mY){

        let distance=dist(mX, mY, this.x,this.y);
        if(distance<this.size/2){
            this.hovered=true;
        }
        // else{
        //     this.hovered=false;
        // }
    }

}