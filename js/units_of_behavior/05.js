
//Comparator  -1/0/1

[2, 3, -6, 0, -108, 42].sort();
//(console): [-108, -6, 0, 2, 3, 42]
[0, -1, -2].sort();
//(console): [-1, -2, 0]
[2, 3, -1, -6, 0, -108, 42, 10].sort();
//(console): [-1, -108, -6, 0, 10, 2, 3, 42]

[2, 3, -1, -6, 0, -108, 42, 10].sort(function(x,y) {
    if (x < y) return -1;
    if(y < x) return 1;
    return 0;
});

//Predicate
// function that returns true or false
// for instance: lessThen, greaterThen, lessOrEqual, greaterOrEqual, isOdd, isEven;

function lessOrEqual (x, y) {
    return x <= y
}

function greaterThen(x, y){
    return x > y;
}

function greaterOrEqual (x, y) {
    return x >= y
}

function truthy(x) {
    return (x !== false);
};

function existy(x) {
    return x != null
};

function truthy(x) {
    return (x !== false) && existy(x)
};


function comparator (pred){
    return function(x, y) {
        if (truthy(pred(x, y))) return -1;
        else if (truthy(pred(y, x))) return 1;
        else return 0;
    }
}

var arr = [-100, -1, 1, 10, 0, -10, 100];

arr.sort(comparator(lessOrEqual));
//(console): [ -100, -10, -1, 0, 1, 10, 100 ]
