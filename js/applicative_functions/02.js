
var arr = [1, 2, 3, 4, 5];

function complement(pred) {
    return function() {
        return !pred.apply(null, toArray(arguments));
    };
}

var filter01 = arr.filter(item => greaterThen(item, 3));
//(console): [4, 5]


var filter01 = arr.filter(item => complement(greaterThen)(item, 3));
//(console): [1, 2, 3]