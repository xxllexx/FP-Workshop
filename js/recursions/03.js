// Codependent functions, mutual recursion

function even(n) {
    //console.log('from even', n);
    if (n === 0)
        return true;
    else
        return odd(Math.abs(n) - 1);
}

function odd(n) {
    //console.log('from odd', n);
    if (n === 0)
        return false;
    else
        return even(Math.abs(n) - 1);
}

even(4);
//(console): true

function flat(array) {
    if (Array.isArray(array))
        return cat.apply(cat, array.map(flat));
    else
        return [array];
}

flat([[1,2], [3,4]]);
//(console): [ 1, 2, 3, 4 ]

/*
    doSomethingWithResult(someArray.map(someFun));
*/

function visit(mapFun, resultFun, array) {
    if (Array.isArray(array))
        return resultFun(array.map(mapFun));
    else
        return resultFun(array);
}

visit(identity, isNumber, 42);
//(console): true

visit(isNumber, identity, [1, 2, null, 3]);
//(console): [ true, true, false, true ]

function postDepth(fun, ary) {
    return visit(partial(postDepth, fun), fun, ary);
}

postDepth(function(x) {
    return x === "Lisp" ? "LISP" : x;
}, influences);

//(console): [ [ 'LISP', 'Smalltalk' ],
//             [ 'LISP', 'Scheme' ],
//             [ 'Smalltalk', 'Self' ]
//             ...

function influencedWithStrategy(strategy, lang, graph) {
    var results = [];

    strategy(function(x) {
        if (Array.isArray(x) && getFirst(x) === lang){
            results.push(getSecond(x));
        }

        return x;

    }, graph);

    return results;
}

influencedWithStrategy(postDepth, "Smalltalk", influences);
//(console): [ 'Self' ]
