
/*
 function unit(value) -> monad
 function bind(monad, function(value) -> monad  ) -> monad
 Monad is object.

 Axioms:

 bind(unit(value), f) === f(value);
 bind(monad, unit) === monad
 bind(bind(monad, f), g) === bind(monad, function(value) { return bind(f(value), g)})

 bind(monad, func) -> monad.bind(func)



 unit(value) .bind(f) === f(value)

 monad .bind(unit) === monad

 monad .bind(f).bind(g) === monad.bind(function(value) { return f(value).bind(g) })

*/



//monad macroid
function MONAD() {
    return function unit(value){
        var monad = Object.create(null);

        monad.bind = function(func) {
            return func(value);
        };

        return monad;
    }
}

//identity monad
var _identity = MONAD();

var monad = _identity('Hello world');

monad.bind(note);
//(console): NOTE: Hello world


function MONAD() {
    var prototype = Object.create(null);
    function unit(value){
        var monad = Object.create(prototype);

        monad.bind = function(func, args) {
            return func.apply(null, args ? [value].concat(args) : [value]);
        };

        return monad;
    }

    unit.lift = function(name, func){

        prototype[name] = function() {
            return unit(this.bind(func, [].slice.call(arguments)));
        };

        return unit;
    };


    return unit;
}


var ajax = MONAD().lift('alert', note);

var monad = ajax('Hello Outworld');

monad.alert();
//(console): NOTE: Hello Outworld



function MONAD(modifire) {
    var prototype = Object.create(null);
    function unit(value){
        var monad = Object.create(prototype);

        monad.bind = function(func, args) {
            return func.apply(null, args ? [value].concat(args) : [value]);
        };

        if (typeof modifire === 'function') {
            modifire(monad, value);
        }

        return monad;
    }

    unit.lift = function(name, func){
        prototype[name] = function() {
            return unit(this.bind(func, [].slice.call(arguments)));
        };

        return unit;
    };

    return unit;
}

var maybe = MONAD(function(monad, value){

    if (value == null) {
        monad.is_null = true;
        monad.bind = function(){
            return monad;
        }
    }
});


maybe(null).bind(note);
//(console):

maybe('test').bind(note);
//(console): test