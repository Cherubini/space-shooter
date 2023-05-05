class Player extends GameObject{
    constructor(x, y, width, height, color, imageUrl){
        super(x, y, width, height,color, imageUrl);
        this.speed = 8;
        this.controller = {};
        this.projectiles = [];
        this.attackCoolDown = 5;
        this.healthPoints = 5;
    }
    draw(ctx){
        super.draw(ctx);
        this.attackCoolDown--
        this.projectiles.forEach(projectile => {
            projectile.draw(ctx);
            projectile.move(ctx.height);
        })
    }

    controls(canvasWidth, canvasHeight){
            document.onkeydown = (keyEvent) => {
                //console.log('on key down', keyEvent);
                this.controller[keyEvent.key] = true;
                console.log(this.controller);
                
            }

            document.onkeyup = (keyEvent) => {
                //console.log('on key up', keyEvent);
                this.controller[keyEvent.key] = false;

            }


      
             console.log(this.controller)
             if(this.controller.ArrowUp){
                this.y = this.y > 0 ? (this.y - this.speed) : this.y;
             }
             if(this.controller.ArrowDown){
                this.y = this.y <= (canvasHeight - this.height) ? (this.y + this.speed) : this.y;
              
             }
             if(this.controller.ArrowLeft){
                this.x = this.x > 0 ? (this.x - this.speed) : this.x;

              
             }
             if(this.controller.ArrowRight){
                this.x = this.x <= (canvasWidth - this.width) ? (this.x + this.speed) : this.x;
             }

             if(this.controller[" "]){
                this.baseAttack();
             }
             

    }

    baseAttack(){
        if(this.attackCoolDown<=0){
            let projectiles1 = new Projectile(this.x + (this.width/4), this.y, 2, 10)
            let projectiles2 = new Projectile(this.x + (this.width/4)*3, this.y, 2, 10)
            this.projectiles.push(projectiles1,projectiles2);
            this.attackCoolDown = 5;
        }

    }

    collision(){
        this.healthPoints--;
        if (this. healthPoints <=0)
            this.isAlive = false;
    }

}