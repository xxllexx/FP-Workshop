
function range(length){
    var index = -1,
        result = Array(length);

    while(++index < length) result[index] = index;

    return result;
}

function repeat(times, VALUE) {
    return range(times).map(function() { return VALUE; });
}

repeat(4, "Test");
//(console): [ 'Test', 'Test', 'Test', 'Test' ]

function repeatedly(times, fn) {
    return range(times).map(fn);
}

function iterateUntil(fun, check, init) {
    var ret = [],
        result = fun(init);

    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }

    return ret;
}

iterateUntil(
    function(n) { return n + n },
    function(n) { return n <= 1024 },
1);
//(console): [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ]