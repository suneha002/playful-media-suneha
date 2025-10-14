class Flower{
    constructor(x,y,size,speed){
        this.x=x;
        this.y=y;
        this.size=size;
        this.speed=speed;
    }



    show(){
        ellipse(this.x,this.y,this.size);
        ellipse(this.x,this.y-20,this.size*2);
        ellipse(this.x,this.y+20,this.size*2);
        ellipse(this.x-20,this.y,this.size*2);
        ellipse(this.x+20,this.y,this.size*2);
    }

    move(){
        this.x=this.x+ this.speed;
        if(this.x>width){
            this.x=0;
        }
    }
    grow(){
        if(this.size<200){
        this.size=this.size+1;
    }
    }
}