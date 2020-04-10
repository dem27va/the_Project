//Создаем блоки
const block = {
    row : 2,
    column : 7,
    width : 55,
    height : 20,
    offsetLeft : 0,
    offsetTop : 0,
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
//createBlocks();

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