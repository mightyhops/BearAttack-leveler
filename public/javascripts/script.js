(function(){

    //For js math and log. display happens in css
    var rows = 30;
    var columns = 29;
    var mapElements = ["A", "B", "C"];

    $(document).ready(function(){
        squares = $('#squares');
        input = $('#input');
        method = $('#method');
        mathTarget = $('#math-target');
        message = $('#message');
        blockSize = $('#blocksize');
        displayContent = $('#display-content');

        buildDefaultData(rows,columns);
        populateSquares();

        //On square click, change current element
        squares.find(".square").click(function(){
          console.log("Clicked " + this.innerHTML);
          currentElement = mapElements.indexOf(this.innerHTML);
          this.innerHTML = mapElements[(currentElement + 1) % mapElements.length]
          onInput();
        });

        input.keyup(onInput);
        method.change(function(event){
            var advanced = $('#advanced');
            advanced.removeClass('math');
            if($(this).val() == methods.OEIS){
                event.stopImmediatePropagation();
            } else if($(this).val() == methods.MATH){
                advanced.addClass('math');
            }
        });
        method.change(onInput);
        mathTarget.change(onInput);
        blockSize.change(function(){
            displayContent.prop('checked', true);
            var cssClass = blockSize.val();
            switch(cssClass){
                case 'pixel':
                    rows = columns = 1050;
                    break;
                default:
                    rows = columns = 30;
            }
            buildDefaultData(rows,columns);
            populateSquares();
            if(cssClass.length){
                squares.find('.square').addClass(cssClass);
            }
        });
        displayContent.click(function(){
            if(displayContent.is(':checked')){
                squares.find('.square').removeClass('hidetext');
            } else {
                squares.find('.square').addClass('hidetext');
            }
        });


        onInput({});
    });

    var data = [];

    //dom elements
    var squares;
    var input;
    var method;
    var mathTarget;
    var message;
    var blockSize;
    var displayContent;

    var methods = {
        REGEX: 0,
        OEIS: 3
    };

    function criteriaRegex(){
        return {
            type: 0,
            input: "",
            test: function(value){
                return new RegExp(this.input).test(value);
            }
        }
    }

    function criteriaOEIS(){
        return {
            type: 1,
            input: [],
            test: function(value){
                return $.inArray(parseFloat(value), this.input) !== -1;
            }
        }
    }


    var oesiTimeout;

    function onInput(event){
        var userInput = input.val();
        if(userInput.length){
            var criteria;
            switch(parseInt(method.val())){
                case methods.REGEX:
                default:
                    criteria = criteriaRegex();

            }
            criteria.input = userInput;
            startVisualization(criteria);
        }
    }

    function startVisualization(criteria){
        try {
            runVisualization(criteria);
        } catch (e) {
            message.addClass('invalid').text('invalid');
            squares.find('.square').addClass('red').removeClass('green');
        }
    }

    function runVisualization(criteria){
        var matches = 0;
        squares.find('.square').each(function(i){
            var square = $(this);
            square.addClass('red').removeClass('green');
            function match(){
                square.addClass('green').removeClass('red');
                matches++;
            }
            var content = square.text();
            var y = Math.floor(i / columns) + 1;
            var x = (i % columns) + 1;
            if(criteria.test(content, i, x, y)){
                match();
            }
        });
        message.removeClass('invalid').text(matches + ' matches');
    }

    function buildDefaultData(rows,columns){
        data = [];
        for(var i = 0; i < rows; i++){
          row = [];
          for(var j = 0; j < columns; j++){
            row.push(mapElements[0]);
          }
          data.push(row);
        }
    }

    function populateSquares(){
        squares.empty();
        $(data).each(function(){
          $(this).each(function(){
            squares.append('<div class="square red" title="' + this + '">' + this + '</div>');
          });
        });
    }
}());
