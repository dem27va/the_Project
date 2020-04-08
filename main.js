const canv = document.getElementById('canv');
const canv_context = canv.getContext('2d');

//Загружаем иконки
const score_img = new Image();
score_img.src = "img/score.png";
const level_img = new Image();
level_img.src = "img/level.png";
const life_img = new Image();
life_img.src = "img/life.png";


let platform_width = 100;
let platform_margin_bottom = 50;
let platform_height = 10;
let leftArrow = false;
let rightArrow = false;
let ballRadius = 7;
let life = 3;
let score = 0;
let scoreStep = 5;
let level = 1;
const maxLevel = 3;
let game_over = false;

//Описываем платформу
const platform = {
    x : canv.width/2 - platform_width/2,
    y : canv.height - platform_margin_bottom - platform_height,
    width : platform_width,
    height : platform_height,
    dx : 10 //шаг перемещения платформы
}

//Описываем шарик
const ball = {
    x : canv.width / 2,
    y : platform.y - ballRadius,
    radius : ballRadius,
    speed : 5,
    dx : 3 * (Math.random() * 2 - 1), //Запускаем шаик под разными углами,
    dy : -3
}

//Рисуем платформу
function drawplatform() {
    canv_context.clearRect(0, 0, canv.width, canv.height);
    canv_context.lineWidth = 2;
    canv_context.fillStyle = 'black';
    canv_context.fillRect(platform.x, platform.y, platform.width, platform.height);
    //canv_context.strokeStyle = 'black';
    //canv_context.strokeRect(platform.x, platform.y, platform.width, platform.height);    
}

//Рисуем шар
function drawBall() {
    canv_context.beginPath();
    canv_context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    canv_context.fillStyle = 'red';
    canv_context.fill();
    canv_context.strokeStyle = 'black';
    canv_context.stroke();
    canv_context.closePath();
}

//Двигаем шарик
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Ударение о стену
function ballWallCollision() {
    if(ball.x + ball.radius > canv.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if(ball.y + ball.radius > canv.height) {
        life--;
        resetBall();
    }
}

//Столкновение с платформой
function ballPaddleCollision() {
    //Определяем точку удара шарика о платформу в диапазоне от -1 до 1
    //сначала получаем значение от минул половины длины платформы до плюс половины длины платформы,
    //а потом делим на половину длины платформы
    let ballHitsPlatformPoint = (ball.x - (platform.x + platform.width / 2)) / (platform.width / 2);
    
    //Получаем угол отражения шара от платформы в диапазоне от -60 до +60 градусов
    //(в реальности чуть больше за счет того, что при расчете ballHitsPlatformPoint мы берем координату ball.x, а платформа отбивает ball.x+ball.radius)
    let ballReflactionAngle = ballHitsPlatformPoint * Math.PI / 3;
    
    
    if(ball.x + ball.radius > platform.x && ball.x - ball.radius < platform.x + platform.width && ball.y + ball.radius > platform.y) {
        ball.dx = ball.speed * Math.sin(ballReflactionAngle);
        ball.dy = -ball.speed * Math.cos(ballReflactionAngle);
        console.log(ballHitsPlatformPoint, ballReflactionAngle);
    }
    
}

//Восстанавливаем шарик
function resetBall() {
    ball.x = canv.width / 2;
    ball.y = platform.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

//Управление платформой
document.addEventListener('keydown', function(ev) {
    if(ev.keyCode == 37) {
        leftArrow = true;
    } else if(ev.keyCode == 39) {
        rightArrow = true;
    }
})
document.addEventListener('keyup', function(ev) {
    if(ev.keyCode == 37) {
        leftArrow = false;
    } else if(ev.keyCode == 39) {
        rightArrow = false;
    }
})

//Двигаем платформу
function moveplatform() {
    if(leftArrow) {
        platform.x -= platform.dx;
    } else if(rightArrow) {
        platform.x += platform.dx;
    }

    //Смотрим не выходит ли платформа за рамки
    if(platform.x <= 0) {
        platform.x = 0;
    } else if(platform.x >= canv.width - platform.width) {
        platform.x = canv.width - platform.width;
    }
}

//Создаем блоки
const block = {
    row : 2,
    column : 5,
    width : 55,
    height : 20,
    offsetLeft : 20,
    offsetTop : 20,
    marginTop : 40,
    fillColor : 'brown',
    strokeColor : 'black'
}
let blocks = [];
function createBlocks() {    
    for(let row = 0; row < block.row; row++) {
        blocks[row] = [];
        for(col = 0; col < block.column; col++) {
            blocks[row][col] = {
                x : col * (block.offsetLeft + block.width) + block.offsetLeft,
                y : row * (block.offsetTop + block.height) + block.offsetTop + block.marginTop,
                notBroken : true 
            }
        }
        
    }
}
createBlocks();

//Рисуем блоки
function drawBlocks() {
    for(let row = 0; row < block.row; row++) {
        for(col = 0; col < block.column; col++) {
            let bl = blocks[row][col];
            if(bl.notBroken) {
                canv_context.fillStyle = block.fillColor;
                canv_context.fillRect(bl.x, bl.y, block.width, block.height);
                canv_context.strokeStyle = block.strokeColor;
                canv_context.strokeRect(bl.x, bl.y, block.width, block.height);
            }
        }
     }
}

//Столкновения шарика с блоком
function ballBlockCollision() {
    for(let row = 0; row < block.row; row++) {
        for(col = 0; col < block.column; col++) {
            let bl = blocks[row][col];
            if(bl.notBroken) {
                if(ball.x + ball.radius > bl.x
                    && ball.x - ball.radius < bl.x + block.width 
                    && ball.y + ball.radius > bl.y
                    && ball.y - ball.radius < bl.y + block.height) {
                        ball.dy = - ball.dy;
                        bl.notBroken = false;
                        score += scoreStep;
                    }
            }
        }
     }
}


//Показываем игровую информацию
function showGameInfo(txt, txt_x, txt_y, img, img_x, img_y) {
    canv_context.fillStyle = 'black';
    canv_context.font = '20px Calibri';
    canv_context.fillText(txt, txt_x, txt_y);
    canv_context.drawImage(img, img_x, img_y, width = 30, height = 30);
}

//Определяем завершение игры
function gameOver() {
    if(life <= 0) {
        game_over = true;
    }
}

//Переход на следующий уровень
function nextLevel() {
    let levelCleared = true;
    for(let row = 0; row < block.row; row++) {
        for(col = 0; col < block.column; col++) {
            levelCleared = levelCleared &&  !blocks[row][col].notBroken;
        }
    }

    if(levelCleared) {
        if(level >= maxLevel) {
            game_over = true;
            return;
        }
        block.row++;
        createBlocks();
        ball.speed += 0.5;
        resetBall();
        level++;
    }
}


function draw() {
    drawplatform();
    drawBall();
    drawBlocks();

    showGameInfo(score, 40, 27, score_img, 5, 5);
    showGameInfo(level, canv.width / 2, 27, level_img, (canv.width / 2) - 35, 5);
    showGameInfo(life, canv.width - 15, 27, life_img, canv.width - 50, 5);    
}

function update() {
    moveplatform();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBlockCollision();
    gameOver();
    nextLevel();
}


//ИГРА
function loop() {
    draw();
    update();

    if(!game_over) {    //Выполняем основной цикл только если игра не не закончена 
        requestAnimationFrame(loop);
    }    
}

loop();