import {Block} from './classBlock.js';

//export let lvlMatrix = [];
export function createBlocks(level) {
    let lvlMatrix = [];

    level.forEach((row, rIndex) => {
        row.forEach((col, colIndex) => {
            if(col.n == 1) {
                lvlMatrix.push(new Block(80*colIndex, 40 + 30 * rIndex, col.i));
            }
        });       
    });
   return lvlMatrix; 
}

/*export const level1 = [
    [{n:1, i:'img/block.png'}, {n:1, i:'img/1bool.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/1str.png'}, {n:1, i:'img/block.png'}],
    [{n:1, i:'img/1if.png'}, 0, {n:1, i:'img/1switch.png'}, 0, {n:1, i:'img/1else.png'}],
    [0, {n:1, i:'img/1html.png'}, 0, {n:1, i:'img/1var.png'}, 0],
    [{n:1, i:'img/block.png'}, 0, {n:1, i:'img/block.png'}, 0, {n:1, i:'img/block.png'}]
];

export const level2 = [
    [0, 0, {n:1, i:'img/2scope.png'}, 0, 0],
    [{n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}],
    [{n:1, i:'img/2css.png'}, 0, {n:1, i:'img/2loop.png'}, 0, {n:1, i:'img/2func.png'}],
    [{n:1, i:'img/block.png'}, {n:1, i:'img/2arr.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/2rand.png'}, {n:1, i:'img/block.png'}]
];

export const level3 = [
    [0, 0, {n:1, i:'img/3vue.png'}, 0, 0],
    [{n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}],
    [{n:1, i:'img/3obj.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/3class.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/3dom.png'}],
    [{n:1, i:'img/block.png'}, 0, {n:1, i:'img/3oop.png'}, 0, {n:1, i:'img/block.png'}],
    [{n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}, {n:1, i:'img/block.png'}]
];

/*export const level4 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];*/

//Test levels
export const level1 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, {n:1, i:'/img/0block.png'}, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
export const level2 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, {n:1, i:'img/3class.png'}, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
export const level3 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, {n:1, i:'img/0block.png'}, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];