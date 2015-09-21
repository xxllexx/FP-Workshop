
function isNumber (num) {
    return !isNaN(+num) && (typeof +num === 'number')
}

isNumber(1);
//(console): true;

isNumber('test');
//(console): false;

function isIndexed (arr) {
    return Array.isArray(arr) || (typeof arr === 'string')
}

isIndexed([1, 2, 3]);
//(console): true;

isIndexed('test');
//(console): true;

function isOutOfRange (arr, index) {
    return index < 0 || index >= arr.length
}

isOutOfRange([1, 2, 3], 2);
//(console): true;

isOutOfRange([1, 2, 3], 5);
//(console): false;


