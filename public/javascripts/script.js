(function(){

    $(document).ready(function(){
        squares = $('#squares');
        method = $('#method');
        save = $('#save');

        buildDefaultData(rows,columns);
        populateSquares();

        //Attached onclick event to all squares
        $(squares).on("click", ".square", squareClick);

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
    var insertType;


    function changeInsertType(event){
      
            switch(event.which){
                case 71:
                    insertType = "G";
                    break;
                case 80:
                    insertType = "P";
                    break;
                case 87:
                    insertType = "W";
                    break;
                case 84:
                    insertType = "T";
                    break;
                case 72:
                    insertType = "H";
                    break;
                default:
                    insertType = "0";
            }
    }

    function squareClick(evt){
      
      //console.log("Clicked " + this.innerHTML);
      squareChange(evt);
    }

    function squareChange(evt){
          var currentRow = $(evt.target).attr("row")
          var currentCol = $(evt.target).attr("col")

          if (parseInt(method.val()) == methods.ELEMENTS) {
            if (insertType == "0") { 
              var currentElement = mapElements.indexOf(evt.target.innerHTML);
              dataElement[currentRow][currentCol] = mapElements[(currentElement + 1) % mapElements.length] 
            }
            else {
              dataElement[currentRow][currentCol] = insertType;
            }
          }
          else if (parseInt(method.val()) == methods.COLLISIONS) {
            if (collideElement) {
              dataCollision[currentRow][currentCol] = 0; }
            else if (!collideElement) {
              dataCollision[currentRow][currentCol] = 1; }
          }
          populateSquares(); 

    }

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
            var squareDivCont  = this + '</div>';
            squares.append(squareDivClass + squareDivAttr + squareDivCont);
          });
        });
    }
}());
