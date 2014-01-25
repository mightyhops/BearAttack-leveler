(function(){

    //For js math and log. display happens in css
    var rows = 30;
    var columns = 29;
    var mapElements = ["A", "B", "C"];

    $(document).ready(function(){
        squares = $('#squares');
        input = $('#input');
        method = $('#method');
        message = $('#message');
        save = $('#save');

        buildDefaultData(rows,columns);
        populateSquares();

        //Attached onclick event to all squares
        squares.find(".square").click(squareClick);

        //log the array to console
        save.click(function(){console.log(dataElement)});

    }); //end document ready


    var dataElement = [];

    //dom elements
    var squares;
    var input;
    var method;
    var mathTarget;
    var message;
    var blockSize;
    var displayContent;

    var methods = {
        ELEMENTS: 0,
        COLLISIONS: 1
    };


    function squareClick(){
        console.log("Clicked " + this.innerHTML);
          if (parseInt(method.val()) == methods.ELEMENTS) {
            var currentElement = mapElements.indexOf(this.innerHTML);
            this.innerHTML = mapElements[(currentElement + 1) % mapElements.length] }
          else if (parseInt(method.val()) == methods.COLLISIONS) {
            if ($(this).hasClass('hit0')) {
              $(this).addClass('hit1').removeClass('hit0'); }
            else if ($(this).hasClass('hit1')) {
              $(this).addClass('hit0').removeClass('hit1'); }
          }

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
            squares.append('<div class="square red hit' + dataCollision[index][index2] + '" title="' + this + '">' + this + '</div>');
          });
        });
    }
}());
