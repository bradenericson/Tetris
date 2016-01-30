'use strict';
/**
 * Created by braden on 1/29/16.
 */

function generateGrid(){
    var HTML = "<div id='grid'>";
    var id;
    var html_class;

    for(var i=0; i<22;i++){
        id = "row_"+i;
        HTML += '<div id="' + id + '" class="t_row">';
        for(var j=0; j<10; j++){
            id = i + "_" + j;
            html_class = "col block borderLT ";

            //create the border for our html grid
            if(j === 9){
                html_class += "borderR";
            }

            HTML += '<div id="' + id +'" class="'+ html_class +'"></div>';
        }
        HTML += "</div>";
    }

    //grid is complete, so now we add the content to the page
    return HTML;

}
document.getElementById("Tetris").innerHTML = generateGrid();

document.addEventListener("DOMContentLoaded", function(event) {
    //your code to run since DOM is loaded and ready


    var test = new Tetromino("red", "Z");
    var grid = new Grid();
    grid.setTetromino(test);
    grid.draw();

    document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case 37: // left
                grid.moveLeft();
                break;

            case 38: // up
                grid.rotateRight();
                break;

            case 39: // right
                grid.moveRight();
                break;

            case 40: // down
                break;

            case 90: //z
                grid.rotateLeft();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    };

});

function Tetris(){

}
