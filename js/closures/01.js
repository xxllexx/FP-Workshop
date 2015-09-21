
function helloSomething() {
    var CAPTURED = "world";

    return function() {
        return "hello " + CAPTURED;
    };
}

var run = helloSomething();
run();
//(console): hello world

//function argument as closure variable;
function createScaleFunction(FACTOR) {
    return function(v) {
        return v.map(function(n) {
            return (n * FACTOR);
        });
    };
}
var scale10 = createScaleFunction(10);
scale10([1,2,3]);
//(console): [10, 20, 30]

//free variable
function makeAdder(CAPTURED) {
    return function(free) {
        return free + CAPTURED;
    };
}
var add10 = makeAdder(10);
add10(32);
//(console): 42

var add1024 = makeAdder(1024);
add1024(11);
//(console): 1035

add10(98);
//(console): 108


function average() {
    return toArray(arguments).reduce((current, next) => current + next, 0)/ arguments.length
}

function averageDamp(FUN) {
    return function(n) {
        return average(n, FUN(n));
    }
}

var averageSq = averageDamp(function(n) {
    return n * n
});

averageSq(10);
//(console): 55