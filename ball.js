export class ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.radius = rad;
        this.speed = speed;
        this.dx = 3 * (Math.random() * 2 - 1); //Запускаем шаик под разными углами,
        this.dy = -3;
        this.img = new Image();
        this.img.src = "img/ball.png";
    }

    drawBall() {
        canv_context.beginPath();
        canv_context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canv_context.fillStyle = 'red';
        canv_context.fill();
        canv_context.strokeStyle = 'black';
        canv_context.stroke();
        canv_context.closePath();
    }

    moveBall() {
        this.x += this.dx;
        this.y += this.dy;
    }

    resetBall() {
        ball.x = canv.width / 2;
        ball.y = platform.y - ballRadius;
        ball.dx = 3 * (Math.random() * 2 - 1);
        ball.dy = -3;
    }
}

/*
const ball = {
    x : canv.width / 2,
    y : platform.y - ballRadius,
    radius : ballRadius,
    speed : 5,
    dx : 3 * (Math.random() * 2 - 1), //Запускаем шаик под разными углами,
    dy : -3
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
}*/