
/*
    Recursion and Composing Functions
     - And Combinator
     - Or Combinator
 */

function and() {
    var preds = toArray(arguments);

    return function() {
        var args = toArray(arguments);

        var everything = function(ps, truth) {
            if (!ps.length) return truth;
            else
                return args.every(getFirst(ps)) && everything(getRest(ps), truth);
        };

        return everything(preds, true);
    };
}


var everyEvenNumber = and(
    isNumber,
    function(n){ return n % 2 === 0 }
);

everyEvenNumber(2, 4, 6, 3);
//(console): false
everyEvenNumber(2, 4, 6, 8);
//(console): false


function or() {
    var preds = toArray(arguments);

    return function() {
        var args = toArray(arguments);
        var something = function(ps, truth) {
            if (!ps.length) return truth;
            else
                return args.some(getFirst(ps)) || something(getRest(ps), truth);
        };
        return something(preds, false);
    };
}

var someEvenNumber = or(
    function(n){ return n % 2 !== 0 },
    function(n){ return n === 0 }
);

someEvenNumber(0, 2, 4, 6);
//(console): true

someEvenNumber(2, 4, 6, 8);
//(console): false

