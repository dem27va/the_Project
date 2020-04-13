export  class Ball {
    constructor(x, y, speed, rad) {
        
        //this.canv_context = cnv_ctx;
        this.x = x;
        this.y = y;
        this.radius = rad;
        this.speed = speed;
        this.dx = 3 * (Math.random() * 2 - 1); //Запускаем шарик под разными углами,
        this.dy = -3;
        this.img = new Image();
        this.img.src = "img/ball.png";
    }

    drawBall(cnv_ctx) {
        //cnv_ctx.drawImage(this.img, this.x, this.y, 14, 14);
        cnv_ctx.beginPath();
        cnv_ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cnv_ctx.fillStyle = 'red';
        cnv_ctx.fill();
        cnv_ctx.strokeStyle = 'black';
        cnv_ctx.stroke();
        cnv_ctx.closePath();
    }

    moveBall() {
        this.x += this.dx;
        this.y += this.dy;
    }

    resetBall(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 3 * (Math.random() * 2 - 1); //Запускаем шарик под разными углами,
        this.dy = -3;
    }
}