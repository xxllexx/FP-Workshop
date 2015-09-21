
function add(x) {
    return function(y){
        return x + y
    }
}

var add3 = add(3);

add3(4);


function _curry(fn) {
    var args = getRest(toArray(arguments));

    return function () {
        return fn.apply(this, args.concat(toArray(arguments)));
    };
}

var c = _curry(function(a, b, c){
    console.log(arguments);
});

c(1);
//(console) { '0': 1 }

c(1, 2);
//(console) { '0': 1, '1': 2 }

c(1, 2, 3);
//(console) { '0': 1, '1': 2, '2': 3 }


function curry(fn, length) {
    length = length || fn.length;

    return function () {
        var combined = [fn].concat(toArray(arguments));
        return arguments.length < length ?
            length - arguments.length > 0
                ? curry(_curry.apply(this, combined), length - arguments.length)
                : _curry.call(this, combined )
            : fn.apply(this, arguments);
    };
}


function test(one, two, three, four) {
    console.log(arguments);
}

var ca = curry(test);

ca('asd');
//(console) [Function]

ca('asd')('qwe');
//(console) [Function]

ca('asd')('qwe')('asd');
//(console) [Function]

ca('asd')('qwe')('asd')('rew');
//(console) { '0': 'asd', '1': 'qwe', '2': 'asd', '3': 'rew' }
