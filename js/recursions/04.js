//too mach recursion

function evenOline(n) {
    if (n === 0)
        return true;
    else
        return partial(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
    if (n === 0)
        return false;
    else
        return partial(evenOline, Math.abs(n) - 1);
}

evenOline(5)()()()();
//(console): [Function]

evenOline(5)()()()()();
//(console): false

evenOline(4)()()()();
//(console): true

function trampoline(fun) {
    var result = fun.apply(fun, getRest(toArray(arguments)));

    while (typeof result === 'function') {
        result = result();
    }
    return result;
}

function isEvenSafe(n) {
    if (n === 0)
        return true;
    else
        return trampoline(partial(oddOline, Math.abs(n) - 1));
}
function isOddSafe(n) {
    if (n === 0)
        return false;
    else
        return trampoline(partial(evenOline, Math.abs(n) - 1));
}

isOddSafe(201);
//(console): true;