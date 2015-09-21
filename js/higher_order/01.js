
function max(arr) {
    return Math.max.apply(Math, arr);
}

max([1, 200, 2]);
//(console): 200;


//Not just max value from array
//But also any 'best value' from any types of data

function finder(valueFun, bestFun, coll) {
    return coll.reduce(function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

function identity (value) {
    return value
}

finder(identity, Math.max, [1,2,3,4,5]);
//(console): 5


var people = [
    {name: "Fred", age: 65},
    {name: "Lucy", age: 36}
];

finder(plucker('age'), Math.max, people);
//(console): { name: 'Fred', age: 65 }


finder(plucker('name'), function(x,y) {
    return (x.charAt(0) === "L") ? x : y
}, people);
//(console): { name: 'Lucy', age: 36 }


//OR instead of finder
function best(fun, coll) {
    return coll.reduce(function(x, y) {
        return fun(x, y) ? x : y
    });
}

best(function(x,y) { return x > y }, [1,2,3,4,5]);
//(console): 5