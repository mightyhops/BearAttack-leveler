(function(){

    $(document).ready(function(){
        squares = $('#squares');
        input = $('#input');
        method = $('#method');
        mathTarget = $('#math-target');
        message = $('#message');
        blockSize = $('#blocksize');
        displayContent = $('#display-content');

        buildDefaultData(rows*columns);
        populateSquares();

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
                case 'xsmall':
                    rows = columns = 69;
                    break;
                case 'small':
                    rows = columns = 41;
                    break;
                case 'medium':
                    rows = columns = 15;
                    break;
                case 'large':
                    rows = columns = 10;
                    break;
                case 'xlarge':
                    rows = columns = 5;
                    return;
                default:
                    rows = columns = 30;
            }
            buildDefaultData(rows*columns);
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
        MATH: 1,
        BOOLEAN: 2,
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

    function criteriaMath(){
        return {
            type: 1,
            input: "",
            targets: {
                value:0,
                index:1,
                row:2,
                column:3
            },
            target:0,
            test: function(value, index, x, y){
                var checkValue;
                switch(this.target){
                    case this.targets.index:
                        checkValue = index;
                        break;
                    case this.targets.row:
                        checkValue = y;
                        break;
                    case this.target.column:
                        checkValue = x;
                        break;
                    case this.targets.value:
                    default:
                        checkValue = parseFloat(value);
                        break;
                }
                var thisCriteria = this.input.replace(/n/g, index.toString());
                thisCriteria = thisCriteria.replace(/x/g, value);
                thisCriteria = thisCriteria.replace(/r/g, y);
                thisCriteria = thisCriteria.replace(/c/g, x);
                return eval(thisCriteria) === checkValue;
            }
        }
    }

    function criteriaBoolean(){
        return {
            type: 1,
            input: "",
            target: true,
            test: function(value, index, x, y){
                var thisCriteria = this.input.replace(/n/g, index.toString());
                thisCriteria = thisCriteria.replace(/x/g, value);
                thisCriteria = thisCriteria.replace(/r/g, y);
                thisCriteria = thisCriteria.replace(/c/g, x);
                return eval(thisCriteria) === this.target;
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

    //For js math and log. display happens in css
    var rows = 30;
    var columns = 29;

    var oesiTimeout;

    function onInput(event){
        var userInput = input.val();
        if(userInput.length){
            var criteria;
            switch(parseInt(method.val())){
                case methods.MATH:
                    criteria = criteriaMath();
                    criteria.target = parseInt(mathTarget.val());
                    break;
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

    function buildDefaultData(length){
        data = [];
        for(var i = 0; i < length; i++){
            data.push(i + 1);
        }
    }

    function populateSquares(){
        squares.empty();
        $(data).each(function(){
            squares.append('<div class="square red" title="' + this + '">' + this + '</div>');
        });
    }
}());
