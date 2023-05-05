class Projectile extends GameObject{

    constructor(x, y, width, height, color = 'orange'){
        super(x,y,width,height, color);
        this.speed = 15;
    }

    move(canvasHeight){
        this.y -= this.speed;
        if(this.y> canvasHeight)    
            this.isAlive=false

    }    
    
    collision(){
        this.isAlive = false;
    }
}