
function getFirst(arrOrString) {
    return getNth(arrOrString, 0);
}

getFirst([1, 2, 3]);
//(console): 1;

function getSecond(arrOrString) {
    return getNth(arrOrString, 1);
}

getSecond([1, 2, 3]);
//(console): 2;

function toArray(arr){
    return (
        (Array.isArray(arr) && arr)
        || (!Array.isArray(arr) && arr.length && [].slice.call(arr))
        || (typeof arr === 'string' && arr.split(''))
        || (typeof arr === 'object' && [])
    )
}

function getRest(arrOrString){
    return toArray(arrOrString).slice(1);
}

getRest([1, 2, 3]);
//(console): [2, 3];
