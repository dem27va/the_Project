const canv = document.getElementById('canv');
const canv_context = canv.getContext('2d');

let platform_width = 100;
let platform_margin_bottom = 50;
let platform_height = 20;
let leftArrow = false;
let rightArrow = false;
let ballRadius = 7;
let life = 3;

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
    canv_context.lineWidth = 3;
    canv_context.fillStyle = 'red';
    canv_context.fillRect(platform.x, platform.y, platform.width, platform.height);
    canv_context.strokeStyle = 'black';
    canv_context.strokeRect(platform.x, platform.y, platform.width, platform.height);    
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
    if(ball.x > platform.x && ball.x < platform.x + platform.width && ball.y > platform.y && ball.y < platform.y + platform.height) {
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
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

function draw() {
    drawplatform();
    drawBall();
}

function update() {
    moveplatform();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
}


//ИГРА
function loop() {
    draw();
    update();

    requestAnimationFrame(loop);
}

loop();