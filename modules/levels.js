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
/*
export const level1 = [
    [{n:1, i:'/img/block.png'}, {n:1, i:'/img/bool.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/str.png'}, {n:1, i:'/img/block.png'}],
    [{n:1, i:'/img/if.png'}, 0, {n:1, i:'/img/switch.png'}, 0, {n:1, i:'/img/else.png'}],
    [0, {n:1, i:'/img/html.png'}, 0, {n:1, i:'/img/var.png'}, 0],
    [{n:1, i:'/img/block.png'}, 0, {n:1, i:'/img/block.png'}, 0, {n:1, i:'/img/block.png'}]
];

export const level2 = [
    [0, 0, {n:1, i:'/img/scope.png'}, 0, 0],
    [{n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}],
    [{n:1, i:'/img/css.png'}, 0, {n:1, i:'/img/loop.png'}, 0, {n:1, i:'/img/func.png'}],
    [{n:1, i:'/img/block.png'}, {n:1, i:'/img/arr.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/rand.png'}, {n:1, i:'/img/block.png'}]
];

export const level3 = [
    [0, 0, {n:1, i:'/img/vue.png'}, 0, 0],
    [{n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}],
    [{n:1, i:'/img/obj.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/class.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/dom.png'}],
    [{n:1, i:'/img/block.png'}, 0, {n:1, i:'/img/oop.png'}, 0, {n:1, i:'/img/block.png'}],
    [{n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}, {n:1, i:'/img/block.png'}]
];*/

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
    [0, {n:1, i:'./img/loop.png'}, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, {n:1, i:'/img/0block.png'}, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
export const level2 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, {n:1, i:'/img/3class.png'}, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
export const level3 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, {n:1, i:'/img/0block.png'}, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
