'use strict';
/**
 * Created by braden on 1/29/16.
 */

var DEFAULT_BG_COLOR = "white";

function Coordinate(row, col){
    this.max_row = 22;
    this.max_col = 10;
    this.row = row;
    this.col = col;
}

Coordinate.prototype.getID = function(){
    return this.row + "_" + this.col;
};

Coordinate.prototype.toString = function(){
    return this.row + "_" + this.col;
};

Coordinate.prototype.getRow = function(){
    return this.row;
};

Coordinate.prototype.getCol = function(){
    return this.col;
};

Coordinate.prototype.moveLeft = function(){
    this.col--;
};

Coordinate.prototype.moveRight = function(){
    this.col++;
};

Coordinate.prototype.canMoveLeft = function(){

    if(this.col > 0){
        return true;
    }
};

Coordinate.prototype.canMoveRight = function(){

    if(this.col+1 < this.max_col){
        return true;
    }
};
Coordinate.prototype.outOfBounds = function(){
    //checks if a coordinate is out of bounds. returns true if yes.
    return this.col < 0 || this.col >= this.max_col || this.row < 0 || this.row >= this.max_row;

};

Coordinate.prototype.getDistanceOutside = function(){
    //returns the number of positions away the coordinate is from being a valid placement
    //the number is how many shifts right we need to make to make it valid (could be negative)
    var result = {left: 0, top: 0};

    if(this.col < 0){
        result.left = Math.abs(this.col);
    }else if(this.col >= this.max_col){
        result.left = this.max_col - this.col - 1;
    }

    if(this.row < 0){
        result.top =  Math.abs(this.row);
    } else if(this.row >= this.max_row){
        result.top = this.max_row - this.row - 1;
    }

    return result;
};

//---


function Block(color, coordinate){
    this.position = coordinate;
    this.color = color;
}

Block.prototype.getPosition = function(){
    return [this.position.getRow(), this.position.getCol()];
};

Block.prototype.getID = function(){
    return this.position.getID();
};

Block.prototype.setPosition = function(coord){
    this.position = coord;
};

Block.prototype.moveLeft = function(){
    this.position.moveLeft();
};

Block.prototype.moveRight = function(){
    this.position.moveRight();
};

Block.prototype.canMoveLeft = function(){
    return this.position.canMoveLeft();
};

Block.prototype.canMoveRight = function(){
    return this.position.canMoveRight();
};

Block.prototype.outOfBounds = function(){
    return this.position.outOfBounds();
};

Block.prototype.getDistanceOutside = function(){
    return this.position.getDistanceOutside();
};



function Tetromino(color, shape){
    this.color = color;
    this.shape = shape;
    this.blocks = new Array(4);
    var coordinates = new Array(4);
    //determine the starting coordinates for the blocks
    if(shape === "O"){
        coordinates[0] = new Coordinate(2,4);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,5);
        coordinates[3] = new Coordinate(3,5);
        //no origin
    }else if(shape === "S"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,4);
        coordinates[3] = new Coordinate(2,5);
        //[1] is origin
    }else if(shape === "L"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(3,5);
        coordinates[3] = new Coordinate(2,5);
        //[1[ is origin
    }else if(shape === "I"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(2,4);
        coordinates[2] = new Coordinate(2,5);
        coordinates[3] = new Coordinate(2,6);
        //no origin or maybe [1] is
    }else if(shape === "J"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(3,3);
        coordinates[2] = new Coordinate(3,4);
        coordinates[3] = new Coordinate(3,5);
        //[2] is origin
    }else if(shape === "T"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,4);
        coordinates[3] = new Coordinate(3,5);
        //[1] is origin
    }else if(shape === "Z"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(2,4);
        coordinates[2] = new Coordinate(3,4);
        coordinates[3] = new Coordinate(3,5);
        //[2] is origin
    }else{
        //throw an error. not a shape
    }

    //create the blocks and set the positions
    for(var i=0; i<this.blocks.length;i++){
        this.blocks[i] = new Block(this.color, coordinates[i]);
    }
    this.origin = this.blocks[1];
}

Tetromino.prototype.setDefaultPosition = function(){
    var coordinates = new Array(4);
    var shape = this.shape;

    //determine the starting coordinates for the blocks
    if(shape === "O"){
        coordinates[0] = new Coordinate(2,4);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,5);
        coordinates[3] = new Coordinate(3,5);
    }else if(shape === "S"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,4);
        coordinates[3] = new Coordinate(2,5);
    }else if(shape === "L"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(3,5);
        coordinates[3] = new Coordinate(2,5);
    }else if(shape === "I"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(2,4);
        coordinates[2] = new Coordinate(2,5);
        coordinates[3] = new Coordinate(2,6);
    }else if(shape === "J"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(3,3);
        coordinates[2] = new Coordinate(3,4);
        coordinates[3] = new Coordinate(3,5);
    }else if(shape === "T"){
        coordinates[0] = new Coordinate(3,3);
        coordinates[1] = new Coordinate(3,4);
        coordinates[2] = new Coordinate(2,4);
        coordinates[3] = new Coordinate(3,5);
    }else if(shape === "Z"){
        coordinates[0] = new Coordinate(2,3);
        coordinates[1] = new Coordinate(2,4);
        coordinates[2] = new Coordinate(3,4);
        coordinates[3] = new Coordinate(3,5);
    }else{
        //throw an error. not a shape
    }

    //create the blocks and set the positions
    for(var i=0; i<this.blocks.length;i++){
        this.blocks[i].position = coordinates[i];
    }
};

Tetromino.prototype.rotateLeft = function(){
    var shift = {left: 0, top: 0};


    var block;
    var row;
    var col;
    var temp;
    var pos;
    var origin = this.origin.position;
    for(var i=0; i < this.blocks.length; i++){
        block = this.blocks[i];
        row = block.position.getRow();
        col = block.position.getCol();

        col = col - origin.col;
        row = row - origin.row;

        row = -row;

        // /swap
        temp = col;
        col = -row;
        row = temp;

        row = -row;

        col = col + origin.col;
        row = row + origin.row;

        pos = new Coordinate(row,col);
        if(pos.outOfBounds()){
            temp = pos.getDistanceOutside();
            if(temp.left !== 0 && Math.abs(temp.left) > Math.abs(shift.left)){
                shift.left = temp.left;
            }
            if(temp.top !== 0 && Math.abs(temp.top) > Math.abs(shift.top)){
                shift.top = temp.top;
            }
        }
        this.blocks[i].setPosition(pos);
    }

    return shift;
};

Tetromino.prototype.rotateRight = function(){
    var shift = {left: 0, top: 0};

    var block;
    var row;
    var col;
    var pos;
    var temp;
    var origin = this.origin.position;
    for(var i=0; i < this.blocks.length; i++){
        block = this.blocks[i];
        row = block.position.getRow();
        col = block.position.getCol();

        col = col - origin.col;
        row = row - origin.row;

        col = -col;

        // /swap
        temp = row;
        row = -col;
        col = temp;

        col = -col;

        col = col + origin.col;
        row = row + origin.row;

        pos = new Coordinate(row,col);
        if(pos.outOfBounds()){
            temp = pos.getDistanceOutside();
            if(temp.left !== 0 && Math.abs(temp.left) > Math.abs(shift.left)){
                shift.left = temp.left;
            }
            if(temp.top !== 0 && Math.abs(temp.top) > Math.abs(shift.top)){
                shift.top = temp.top;
            }
        }
        this.blocks[i].setPosition(pos);
    }

    return shift;
};

Tetromino.prototype.moveLeft = function(){
    for(var i=0; i<this.blocks.length; i++){
        this.blocks[i].moveLeft();
    }
};

Tetromino.prototype.moveRight = function(){
    for(var i=0; i<this.blocks.length; i++){
        this.blocks[i].moveRight();
    }
};

Tetromino.prototype.canMoveLeft = function(){

    for(var i=0; i<this.blocks.length; i++){

        if(!this.blocks[i].canMoveLeft()){
            //a block can't move left
            return false;
        }
    }
    //all blocks can move left
    return true;
};

Tetromino.prototype.canMoveRight = function(){

    for(var i=0; i<this.blocks.length; i++){

        if(!this.blocks[i].canMoveRight()){
            //a block can't move right
            return false;
        }
    }
    //all blocks can move right
    return true;
};

Tetromino.prototype.outOfBounds = function(){
    for(var i=0; i< this.blocks.length;i++){
        if(this.blocks[i].outOfBounds()){
            return true;
        }
    }
    //no blocks are outOfBounds
    return false;
};

Tetromino.prototype.getDistanceOutside = function(){

};




function Grid(){
  this.board = document.getElementById("grid");
  this.currentTetromino = null;
}

Grid.prototype.setTetromino = function(tetro){
    this.currentTetromino = tetro;
};

Grid.prototype.draw = function(){
    var block;
    for(var i=0; i<4;i++){
        block = this.currentTetromino.blocks[i];
        document.getElementById(block.getID()).style.backgroundColor = block.color;
    }
};

Grid.prototype.undraw = function(){
    var block;
    for(var i=0; i<4;i++){
        block = this.currentTetromino.blocks[i];
        document.getElementById(block.getID()).style.backgroundColor = DEFAULT_BG_COLOR;
    }
};

Grid.prototype.shiftTetromino = function(shift){
    //shift = {left,top}
    while(shift.left !== 0){
        if(shift.left < 0){
            this.currentTetromino.moveLeft();
            shift.left++;
        }else if(shift.left > 0){
            this.currentTetromino.moveRight();
            shift.left--;
        }
    }
    /*
     while(shift.top !==0){
     if(shift.top < 0){
     this.currentTetromino.moveDown();
     shift++;
     }else if(shift > 0){
     this.currentTetromino.moveUp();
     shift--;
     }
     }
     */
};

Grid.prototype.rotateLeft = function(){
    this.undraw();
    var shift = this.currentTetromino.rotateLeft();

    this.shiftTetromino(shift);

    this.draw();
};

Grid.prototype.rotateRight = function(){
    this.undraw();
    var shift = this.currentTetromino.rotateRight();

    this.shiftTetromino(shift);

    this.draw();
};

Grid.prototype.moveLeft = function(){
    if(this.currentTetromino.canMoveLeft()){
        this.undraw();
        this.currentTetromino.moveLeft();
        this.draw();
    }

};

Grid.prototype.moveRight = function(){
    if(this.currentTetromino.canMoveRight()){
        this.undraw();
        this.currentTetromino.moveRight();
        this.draw();
    }
};

Grid.prototype.moveDown = function(){

};