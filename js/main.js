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
        HTML += "<div id='" + id + " +' class='t_row'>";
        for(var j=0; j<10; j++){
            id = i + "_" + j;
            html_class = "col block borderLT ";

            //create the border for our html grid
            if(j === 9){
                html_class += "borderR";
            }

            HTML += "<div id='" + id + " +' class='"+ html_class +"'></div>";
        }
        HTML += "</div>";
    }

    //grid is complete, so now we add the content to the page
    return HTML;

}

document.getElementById("Tetris").innerHTML = generateGrid();