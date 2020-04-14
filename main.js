import  {Ball} from './modules/ball.js';
//import {Block} from './modules/classBlock.js';
import {createBlocks, level1, level2, level3} from './modules/levels.js';

//Объявляем уровни
let levelsArr = [level1, level2, level3];
let currentLevel = 1;

const canv = document.getElementById('canv');
const canv_context = canv.getContext('2d');

//Кол-во жизней и очков 
const maxLife = 3;
let life = maxLife;
let scoreStep = 5;
let score = 0;

//Параметры платформы и шарика
const platform_width = 75;
const platform_margin_bottom = 50;
const platform_height = 10;
const ballRadius = 7;
let ballSpeed = 4;
let leftArrow = false;
let rightArrow = false;

//Состояния игры 
let gameMenu = true;
let gameIsOver = false;
let gamePaused = false;
let victory = false;
let levelChange = false;

//Описываем платформу
const platform = {
    x : canv.width/2 - platform_width/2,
    y : canv.height - platform_margin_bottom - platform_height,
    width : platform_width,
    height : platform_height,
    dx : 10 //шаг перемещения платформы
}

//Рисуем платформу
function drawPlatform() {
    canv_context.clearRect(0, 0, canv.width, canv.height);
    canv_context.lineWidth = 2;
    canv_context.fillStyle = 'black';
    canv_context.fillRect(platform.x, platform.y, platform.width, platform.height);   
}

//Создаем обьект шарик
let ball = new Ball(canv.width / 2, platform.y - ballRadius, ballSpeed, ballRadius);

//Столкновение cо стенками
/*function ballWallCollision() {
    if(ball.x + ball.radius >= canv.width || ball.x - ball.radius <= 0) {
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }
    if(ball.y + ball.radius >= canv.height) {
        life--;
        ball.resetBall(canv.width / 2, platform.y - ballRadius);        
    }
}*/

function ballWallCollision() {
    if(ball.x + ball.radius >= canv.width) {
        ball.x = canv.width - ball.radius - 1;
        ball.dx = -ball.dx;
    }
    if(ball.x - ball.radius <= 0) {
        ball.x = 0 + ball.radius + 1;
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }
    if(ball.y + ball.radius >= canv.height) {
        life--;
        ball.resetBall(canv.width / 2, platform.y - ballRadius);        
    }
}


//Столкновение с платформой
function ballPlatformCollision() {
    //Определяем точку удара шарика о платформу в диапазоне от -1 до 1
    //сначала получаем значение от минус половины длины платформы до плюс половины длины платформы,
    //а потом делим на половину длины платформы
    let ballHitsPlatformPoint = (ball.x - (platform.x + platform.width / 2)) / (platform.width / 2);
    
    //Получаем угол отражения шара от платформы в диапазоне от -60 до +60 градусов
    //(в реальности чуть больше за счет того, что при расчете ballHitsPlatformPoint мы берем координату ball.x, а платформа отбивает ball.x+ball.radius)
    let ballReflactionAngle = ballHitsPlatformPoint * Math.PI / 3;    
    
    if(ball.x + ball.radius > platform.x 
        && ball.x - ball.radius < platform.x + platform.width 
        && ball.y + ball.radius > platform.y
        && ball.y - ball.radius < platform.y + platform_height) {
        ball.dx = ball.speed * Math.sin(ballReflactionAngle);
        ball.dy = -ball.speed * Math.cos(ballReflactionAngle);
    }    
}

//Перезапускаем игру
function resetGame() {
    currentLevel = 0;
    score = 0;
    life = maxLife;
    ball.speed = 5;
    gameMenu = true;
    gameIsOver = false;
    gamePaused = false;
    victory = false;    
    platform.x = canv.width/2 - platform_width/2;
    platform.y = canv.height - platform_margin_bottom - platform_height;
}

//Управление платформой
document.addEventListener('keydown', function(ev) { //Двигаем платформу влево/вправо когда кнопка нажата
    if(ev.keyCode == 37) {
        leftArrow = true;
    } else if(ev.keyCode == 39) {
        rightArrow = true;
    }
})
document.addEventListener('keyup', function(ev) { //Не двигаем платформу когда кнопка отпущена
    if(ev.keyCode == 37) {
        leftArrow = false;
    } else if(ev.keyCode == 39) {
        rightArrow = false;
    }
})
//Обрабатываем ввод с клавиатуры
/*document.addEventListener('keydown', function(ev) { //Переключаем состояние паузы по нажатию "Esc"
    if(ev.keyCode == 27) {
        if(gamePaused) {
            gamePaused = false;
        } else {
            gamePaused = true;
        }
    }
})*/
document.addEventListener('keydown', function(ev) { //Запускаем игру по нажатию "Enter"
    if(ev.keyCode == 13) {
        //Включаем/выключаем паузу клавишей "Enter"
        if(gamePaused) {
            gamePaused = false;
            levelChange = false;
        } else {
            gamePaused = true;
        }
        
        if(gameMenu) {
            gamePaused = false; //Выключаем паузу, если она была включена при нахождении в меню
        }
        gameMenu = false;
    }
})
document.addEventListener('keydown', function(ev) { //Переапускаем игру по нажатию "R" при game over
    if(ev.keyCode == 82) {
        if(gameIsOver || victory) {
            canv_context.clearRect(0, 0, canv.width, canv.height);
            resetGame();
            ball.resetBall(canv.width / 2, platform.y - ballRadius);
            blocksArr = createBlocks(levelsArr[currentLevel]);
        }                     
    }
})

//Двигаем платформу
function movePlatform() {
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

//создаем массив с блоками
let blocksArr = createBlocks(levelsArr[currentLevel]);

//Столкновения шарика с блоком
function ballBlockCollision() {
    blocksArr.forEach(bl => {
        if(ball.x + ball.radius >= bl.x
            && ball.x - ball.radius <= bl.x + bl.width 
            && ball.y + ball.radius >= bl.y
            && ball.y - ball.radius <= bl.y + bl.height) {
                ball.dy = - ball.dy;
                bl.isHit = true;
                blocksArr = blocksArr.filter(bl => !bl.isHit);
                score += scoreStep;                
            }
        })
    }
                

//Показываем игровую информацию
function showGameInfo(txt, txt_x, txt_y, img, img_x, img_y) {
    canv_context.fillStyle = 'black';
    canv_context.font = '20px Calibri';
    canv_context.fillText(txt, txt_x, txt_y);
    canv_context.drawImage(img, img_x, img_y, 30, 30);
}

//Определяем завершение игры
function gameOver() {
    if(life <= 0) {
        gameIsOver = true;
    }
}

function nextLevel() {
    if(blocksArr.length == 0) {
        if(currentLevel >= levelsArr.length - 1) {
            victory = true;            
            return;
        }
        currentLevel++;        
        blocksArr = createBlocks(levelsArr[currentLevel]); 
        ball.speed += 0.5;
        ball.resetBall(canv.width / 2, platform.y - ballRadius);
        platform.x = canv.width/2 - platform_width/2,
        platform.y = canv.height - platform_margin_bottom - platform_height,
        gamePaused = true;
        levelChange = true;

    }
}

function draw() {
    drawPlatform();
    ball.drawBall(canv_context);

    //Рисуем блоки. Надо перенести этот функционал в класс Blocks, а здесь вызывать только функцию drawBlocks()
    blocksArr.forEach(bl => bl.drawBlock(canv_context));

    showGameInfo(score, 50, 27, score_img, 5, 5);
    showGameInfo(currentLevel + 1, (canv.width / 2) + 20, 27, level_img, (canv.width / 2) - 20, 5);
    showGameInfo(life, canv.width - 15, 27, life_img, canv.width - 50, 5);
       
    if(gameMenu) {     //Стартовый экран
        canv_context.rect(0, 0, canv.width, canv.height);
        canv_context.fillStyle = 'rgba(0, 0, 0, 1)';
        canv_context.fill();

        canv_context.font = '25px Calibri';
        canv_context.fillStyle = 'lightgray';
        canv_context.textAlign = 'center';
        canv_context.fillText('Нажмите "Enter", чтобы начать игру', canv.width / 2, canv.height / 2);
    }
    
    if(gamePaused && !gameMenu && !levelChange) {     //Экран паузы
        canv_context.rect(0, 0, canv.width, canv.height);
        canv_context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        canv_context.fill();

        canv_context.font = '30px Calibri';
        canv_context.fillStyle = 'lightgray';
        canv_context.textAlign = 'center';
        canv_context.fillText('Пауза', canv.width / 2, canv.height / 2);
    }

    if(gamePaused && levelChange) {     //Экран перехода на следующий уровень
        canv_context.rect(0, 0, canv.width, canv.height);
        canv_context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        canv_context.fill();

        canv_context.font = '30px Calibri';
        canv_context.fillStyle = 'lightgreen';
        canv_context.textAlign = 'center';
        canv_context.fillText(`Уровень ${currentLevel+1}`, canv.width / 2, canv.height / 2 -30);
        canv_context.font = '25px Calibri';
        canv_context.fillText('Нажми "Enter", чтобы продолжить', canv.width / 2, canv.height / 2 +30);
    }

    if(gameIsOver || victory) {     //Экран победы или поражения
        canv_context.rect(0, 0, canv.width, canv.height);
        canv_context.fillStyle = 'rgba(0, 0, 0, 0.9)';
        canv_context.fill();

        canv_context.font = '30px Calibri';
        canv_context.fillStyle = 'lightgray';
        canv_context.textAlign = 'center';
        if(gameIsOver) {       //Поражение
            canv_context.fillStyle = 'tomato';
            canv_context.fillText('Игра окончена', canv.width / 2, canv.height / 2 - 30);
            canv_context.fillText(`Ты набрал ${score} очков`, canv.width / 2, canv.height / 2 + 30);
        } else {        //Победа
            canv_context.fillStyle = 'lightgreen';
            canv_context.fillText('Победа!', canv.width / 2, canv.height / 2 - 30);
            canv_context.fillText(`Ты набрал ${score} очков`, canv.width / 2, canv.height / 2 + 30);
        }        
        canv_context.font = '20px Calibri';
        canv_context.fillText('Нажми "r", чтобы начать заново', canv.width / 2, canv.height * 2 / 3);
        

    }
}

function update() {
    if(gamePaused || gameMenu || gameIsOver || victory || levelChange) return; //Ничег не обновляем, если игра на паузе
    movePlatform();
    ball.moveBall();
    ballWallCollision();
    ballPlatformCollision();
    ballBlockCollision();
    gameOver();
    nextLevel();    
}

//ИГРА
function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();