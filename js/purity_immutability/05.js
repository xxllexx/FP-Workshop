
var s = "Lemongrab";
s.toUpperCase();
//=> "LEMONGRAB"
s;
//=> "Lemongrab"

var key = "lemongrab";

var obj = {
    lemongrab: "Earl"
};

obj[key] === "Earl";
//(console): true

//--- doSomethingThatMutatesStrings(key);

obj[key];

//(console): undefined

obj["lemonjon"];
//(console): "Earl"


//mutates ret and index variables
function skipTake(n, coll) {
    var ret = [],
        sz = coll.length;

    for(var index = 0; index < sz; index += n) {
        ret.push(coll[index]);
    }

    return ret;
}

console.log(skipTake(3, range(20)));

//Immutability and Recursion

//мутирует result, i;
function summ(array) {
    var result = 0;
    var sz = array.length;

    for (var i = 0; i < sz; i++) result += array[i];

    return result;
}

summ(range(10));
//(console): [ 0, 3, 6, 9, 12, 15, 18 ]

//recursion implementation
function summRec(array, seed) {
    if (!array.length)
        return seed;
    else
        return summRec(getRest(array), getFirst(array) + seed);
}

summRec([], 0);
//(console): 0;

summRec(range(10), 0);
//(console): 45