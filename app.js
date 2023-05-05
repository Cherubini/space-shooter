const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

canvas.width=canvasWidth;
canvas.height=canvasHeight;

let animate;

let player = new Player(canvasWidth/2, canvasHeight/2, 50, 50, null, './assets/spaceship.png')

let allEnemies=[];
let enemySpawnCooldown = 120;
//let previousTime;

function animator(timestamp) {

    // if(previousTime){
    //     const delta = timestamp-previousTime;
    //     const framerate = 1000/delta;
    //     console.log(framerate);
    // }
    //previousTime= timestamp;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    animate = requestAnimationFrame(animator);
    if (player){
        player.draw(ctx, this.imageUrl);
        player.controls(canvasWidth, canvasHeight);
    }
    enemySpawnCooldown--;
    if (enemySpawnCooldown<=0) {
        enemySpawn();
        enemySpawnCooldown=120;        
    }

    allEnemies.forEach(enemy => {
        enemy.draw(ctx)
        enemy.move();
    });

    if(player){
        checkCollision();
    }
}

function enemySpawn() {
    const randomX=Math.random()* (canvasWidth-50)
    let enemy = new BaseEnemy(randomX, -60, 50, 50, null, './assets/evilspaceship.png')
    allEnemies.push(enemy);
}

function checkCollision() {
    let playerAssets = [player, ...player.projectiles];
    console.log(playerAssets);
    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
        for (let j = 0; j < allEnemies.length; j++) {
            const enemy = allEnemies[j];
            if (pA.isColliding(enemy)) {
                pA.collision();
                enemy.collision();
            }
            
            // if(enemy.x < (pA.x + pA.width) && 
            // (enemy.x + enemy.width) > pA.x &&
            // enemy.y < pA.y + pA.height &&
            // (enemy.y +enemy.height) > pA.y){
            //     enemy.healthPoints--;
            // }
        
        }        
    }
    allEnemies = allEnemies.filter(enemy => enemy.isAlive );
        player.projectiles = player.projectiles.filter(projectile => projectile.isAlive);

        if(!player.isAlive)
            player=null;
}
animator();
