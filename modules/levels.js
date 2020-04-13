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

export const level1 = [
    [{n:1, i:'img/_0block.png'}, {n:1, i:'img/_1bool.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_1str.png'}, {n:1, i:'img/_0block.png'}],
    [{n:1, i:'img/_1if.png'}, 0, {n:1, i:'img/_1switch.png'}, 0, {n:1, i:'img/_1else.png'}],
    [0, {n:1, i:'img/_1html.png'}, 0, {n:1, i:'img/_1var.png'}, 0],
    [{n:1, i:'img/_0block.png'}, 0, {n:1, i:'img/_0block.png'}, 0, {n:1, i:'img/_0block.png'}]
];

export const level2 = [
    [0, 0, {n:1, i:'img/_2scope.png'}, 0, 0],
    [{n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}],
    [{n:1, i:'img/_2css.png'}, 0, {n:1, i:'img/_2loop.png'}, 0, {n:1, i:'img/_2func.png'}],
    [{n:1, i:'img/_0block.png'}, {n:1, i:'img/_2rand.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_2arr.png'}, {n:1, i:'img/_0block.png'}]
];

export const level3 = [
    [0, 0, {n:1, i:'img/_3vue.png'}, 0, 0],
    [{n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}],
    [{n:1, i:'img/_3obj.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_3class.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_3dom.png'}],
    [{n:1, i:'img/_0block.png'}, 0, {n:1, i:'img/_3oop.png'}, 0, {n:1, i:'img/_0block.png'}],
    [{n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}, {n:1, i:'img/_0block.png'}]
];
/*export const level4 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];*/