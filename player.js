class Player extends GameObject{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 8;
        this.controller = {};
        this.projectiles = [];
        this.attackCoolDown = 5;
    }
    draw(ctx){
        super.draw(ctx);
        this.attackCoolDown--
        this.projectiles.forEach(projectile => {
            projectile.draw(ctx);
            projectile.move();
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
            let projectiles = new Projectile(this.x + (this.width/2), this.y, 1, 10)
            this.projectiles.push(projectiles);
            this.attackCoolDown = 5;
        }

    }

}