export class Block {
    constructor(x, y, img_src) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 30;
        //this.marginTop = 40;
        this.img = new Image();
        this.img.src = img_src;
        //this.img.src = "img/_0block.png";
        this.isHit = false;
    }

    update() {

    }

    drawBlock(cnv_ctx) {
        cnv_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        /*cnv_ctx.fillStyle = 'brown';
        cnv_ctx.fillRect(this.x, this.y, this.width, this.height);
        cnv_ctx.strokeStyle = 'black';
        cnv_ctx.strokeRect(this.x, this.y, this.width, this.height);*/
    }
}