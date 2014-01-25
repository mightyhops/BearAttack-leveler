(function(){

    $(document).ready(function(){
        squares = $('#squares');
        method = $('#method');
        save = $('#save');

        buildDefaultData(rows,columns);
        populateSquares();

        //Attached onclick event to all squares
        $(squares).on("click", ".square", squareClick);

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


    function squareClick(){
        //console.log("Clicked " + this.innerHTML);
          var currentRow = $(this).attr("row")
          var currentCol = $(this).attr("col")

          if (parseInt(method.val()) == methods.ELEMENTS) {
            var currentElement = mapElements.indexOf(this.innerHTML);
            dataElement[currentRow][currentCol] = mapElements[(currentElement + 1) % mapElements.length] 
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
            var squareDivClass = '<div class="square el' + mapElements + ' hit' + dataCollision[index][index2] + '" ';
            var squareDivAttr  = 'row="'+index+'" col="'+index2+'" title="' + titleElements[mapElements.indexOf(this[0])] + '">';
            var squareDivCont  = this + '</div>';
            squares.append(squareDivClass + squareDivAttr + squareDivCont);
          });
        });
    }
}());
