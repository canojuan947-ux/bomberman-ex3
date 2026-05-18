const rows = 13;
const cols = 15;

const game = document.getElementById("game");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const levelText = document.getElementById("level");
const enemiesText = document.getElementById("enemies");

let score = 0;
let lives = 3;
let level = 1;

let player = {
    x:1,
    y:1
};

let bombs = [];
let explosions = [];

let enemies = [];

const map = [];

function generateMap(){

    for(let y=0;y<rows;y++){

        map[y] = [];

        for(let x=0;x<cols;x++){

            if(
                y === 0 ||
                x === 0 ||
                y === rows-1 ||
                x === cols-1 ||
                (x % 2 === 0 && y % 2 === 0)
            ){
                map[y][x] = 1;
            }
            else if(Math.random() < 0.30 && !(x <= 2 && y <= 2)){
                map[y][x] = 2;
            }
            else{
                map[y][x] = 0;
            }
        }
    }
}

function generateEnemies(){

    enemies = [];

    for(let i=0;i<level+2;i++){

        let type = "normal";

        if(level >= 3 && Math.random() < 0.4){
            type = "fast";
        }

        enemies.push({
            x:Math.floor(Math.random()*10)+3,
            y:Math.floor(Math.random()*8)+3,
            type:type
        });
    }
}

function draw(){

    game.innerHTML = "";

    enemiesText.innerText = enemies.length;

    for(let y=0;y<rows;y++){

        for(let x=0;x<cols;x++){

            const cell = document.createElement("div");

            cell.classList.add("cell");

            if(map[y][x] === 1){
                cell.classList.add("wall");
            }
            else if(map[y][x] === 2){
                cell.classList.add("breakable");
            }
            else{
                cell.classList.add("floor");
            }

            if(player.x === x && player.y === y){
                cell.classList.add("player");
            }

            enemies.forEach(enemy => {

                if(enemy.x === x && enemy.y === y){

                    if(enemy.type === "fast"){
                        cell.classList.add("fastEnemy");
                    }
                    else{
                        cell.classList.add("enemy");
                    }
                }
            });

            bombs.forEach(bomb => {

                if(bomb.x === x && bomb.y === y){
                    cell.classList.add("bomb");
                }
            });

            explosions.forEach(explosion => {

                if(explosion.x === x && explosion.y === y){
                    cell.classList.add("explosion");
                }
            });

            game.appendChild(cell);
        }
    }
}

function moveEnemies(){

    enemies.forEach(enemy => {

        let times = 1;

        if(enemy.type === "fast"){
            times = 2;
        }

        for(let i=0;i<times;i++){

            const directions = [
                [1,0],
                [-1,0],
                [0,1],
                [0,-1]
            ];

            const dir = directions[Math.floor(Math.random()*directions.length)];

            const nx = enemy.x + dir[0];
            const ny = enemy.y + dir[1];

            if(map[ny][nx] === 0){
                enemy.x = nx;
                enemy.y = ny;
            }
        }

        if(enemy.x === player.x && enemy.y === player.y){

            lives--;
            livesText.innerText = lives;

            player.x = 1;
            player.y = 1;

            if(lives <= 0){
                alert("GAME OVER");
                location.reload();
            }
        }
    });

    draw();
}

setInterval(moveEnemies,700);

function explodeBomb(bomb){

    const range = [
        [bomb.x,bomb.y],
        [bomb.x+1,bomb.y],
        [bomb.x-1,bomb.y],
        [bomb.x,bomb.y+1],
        [bomb.x,bomb.y-1]
    ];

    range.forEach(pos => {

        const x = pos[0];
        const y = pos[1];

        explosions.push({x,y});

        if(map[y] && map[y][x] === 2){
            map[y][x] = 0;
            score += 10;
        }

        enemies = enemies.filter(enemy => {

            if(enemy.x === x && enemy.y === y){
                score += 100;
                return false;
            }

            return true;
        });

        if(player.x === x && player.y === y){

            lives--;
            livesText.innerText = lives;

            player.x = 1;
            player.y = 1;

            if(lives <= 0){
                alert("GAME OVER");
                location.reload();
            }
        }
    });

    scoreText.innerText = score;

    draw();

    setTimeout(() => {

        explosions = [];
        draw();

    },500);

    if(enemies.length === 0){

        level++;

        levelText.innerText = level;

        alert("Nivel superado");

        generateMap();
        generateEnemies();
        draw();
    }
}

document.addEventListener("keydown",(e)=>{

    let nx = player.x;
    let ny = player.y;

    if(e.key === "w") ny--;
    if(e.key === "s") ny++;
    if(e.key === "a") nx--;
    if(e.key === "d") nx++;

    if(map[ny][nx] === 0){
        player.x = nx;
        player.y = ny;
    }

    if(e.code === "Space"){

        const bomb = {
            x:player.x,
            y:player.y
        };

        bombs.push(bomb);

        draw();

        setTimeout(() => {

            explodeBomb(bomb);

            bombs = bombs.filter(b => b !== bomb);

            draw();

        },2000);
    }

    draw();
});

generateMap();
generateEnemies();
draw();