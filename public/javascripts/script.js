(function(){

    $(document).ready(function(){
        squares = $('#squares');
        method = $('#method');
        save = $('#save');
        statusMsg = $('#statusMsg');

        buildDefaultData(rows,columns);
        populateSquares();

        //Attached on click and hover events to all squares
        var clickDown = false;
        $(squares).on("mousedown", ".square", function(evt){ clickDown = true; console.log("cd"); squareChange(evt)});
        $(squares).on("mouseleave", ".square:not(.icon)", function(evt){ console.log('me'); if (clickDown){ squareChange(evt); }});
        $(squares).on("mouseup", ".square", function(evt){ clickDown = false; console.log("mu");  });
        //$(squares).mousedown(squareClick)

        //Enable keyboard shortcuts for insertType changes
        $(document).keyup(changeInsertType);

        //log the array to console
        save.click(function(){console.log(dataElement)});

    }); //end document ready

    
    //dom elements
    var squares;
    var method;
    var save;

    //For js math and log. display happens in css
    var rows = 30;
    var columns = 29;

    //Layer elements and options
    var dataElement = [];
    var dataCollision = [];
    var mapElements = ["G", "P", "W", "T", "H"];
    var titleElements = ["Grass", "Path", "Water", "Tree", "House"];
    var collideElement = false;
    var methods = {
        ELEMENTS: 0,
        COLLISIONS: 1
    };
    var insertType = "W";


    function changeInsertType(event){
      
            switch(event.which){
                case 71:
                    insertType = "G";
                    $("#statusMsg").val("Mode: Grass");
                    break;
                case 80:
                    insertType = "P";
                    $("#statusMsg").val("Mode: Path");
                    break;
                case 87:
                    insertType = "W";
                    $("#statusMsg").val("Mode: Water");
                    break;
                case 84:
                    insertType = "T";
                    $("#statusMsg").val("Mode: Tree");
                    break;
                case 72:
                    insertType = "H";
                    $("#statusMsg").val("Mode: House");
                    break;
                default:
                    insertType = "W";
                    $("#statusMsg").val("Default Mode: Water");
            }
    }

//    function squareClick(evt){
//      squareChange(evt);
//      var clickdown = true;
//      console.log("clickdown: " + clickdown);
//      $(squares).mouseup(function(){
//        clickdown = false; 
//        console.log("mouseup: " + clickdown);
//        return;
//      }) 
//      //$(squares).hover(squareChange(evt));
//    }

    function squareChange(evt){
          var currentRow = $(evt.target).attr("row") || $(evt.target).parent().attr("row")
          var currentCol = $(evt.target).attr("col") || $(evt.target).parent().attr("col")

          if (parseInt(method.val()) == methods.ELEMENTS) {
            if (insertType == "0") { 
              //incrDataElement(currentRow, currentCol);
              console.log("Forbidden insertType!");
              insertType == "W";
              dataElement[currentRow][currentCol] = insertType;
            }
            else {
              dataElement[currentRow][currentCol] = insertType;
            }
          }
          else if (parseInt(method.val()) == methods.COLLISIONS) {
            if (dataCollision[currentRow][currentCol] == 0) {
              dataCollision[currentRow][currentCol] = 1;
              }
            else if (dataCollision[currentRow][currentCol] == 1) {
              dataCollision[currentRow][currentCol] = 0; 
              }
          }
          populateSquares(); 
    }
    
//    function incrDataElement(row, col){
//      var cElm = mapElements.indexOf(dataElement[row][col]);
//      var nElm = (cElm + 1) % mapElements.length;
//      dataElement[row][col] = mapElements[nElm] 
//    }

    function buildDefaultData(rows,columns){
        dataElement = [];
        dataCollision = [];
        for(var i = 0; i < rows; i++){
          elementRow = [];
          collisionRow = [];
          for(var j = 0; j < columns; j++){
            elementRow.push(mapElements[0]);
            collisionRow.push(0);
          }
          dataElement.push(elementRow);
          dataCollision.push(collisionRow);
        }
    }

    function populateSquares(){
        squares.empty();
        $(dataElement).each(function(index, element){
          $(this).each(function(index2, element2){
            var squareDivClass = '<div class="square el' + this[0] + ' hit' + dataCollision[index][index2] + '" ';
            var squareDivAttr  = 'row="'+index+'" col="'+index2+'" title="' + titleElements[mapElements.indexOf(this[0])] + '">';
            var squareDivCont  = '<div class="icon sprite-el'+ this[0]+ '" style="display: inline-block; margin-top: 8px"></div>';
            squares.append(squareDivClass + squareDivAttr + squareDivCont);
          });
        });
    }
}());
