
function invoker (NAME, METHOD) {
    return function(target) {
        if (!existy(target)) fail("Must provide a target");

        var targetMethod = target[NAME];

        var args = getRest(toArray(arguments));

        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

var rev = invoker('reverse', Array.prototype.reverse);

rev([1,2,3]);
//(console): [3, 2, 1]

rev("qwe");
//(console): undefined

function dispatch() {
    var funs = toArray(arguments),
        size = funs.length;

    return function(target) {
        var ret = undefined,
            args = getRest(toArray(arguments));

        for (var funIndex = 0; funIndex < size; funIndex++ ) {
            var fun = funs[funIndex];

            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret;
        }

        return ret;
    };
}

var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));

str([1,2,3]);
//(console): 1,2,3;

function numberReverse(x) {
    if (typeof x !== 'number') return null;
    var y = 0;
    do {
        y = (y + (x % 10)) * 10;
    } while( x = Math.floor(x / 10) );

    return y / 10;
}

function stringReverse(str){
    return typeof str === 'string' ? str.split('').reverse().join('') : null;
}

var rev = dispatch(
    invoker('reverse', Array.prototype.reverse),
    numberReverse,
    stringReverse
);

rev([1,2,3]);
//(console): [ 3, 2, 1 ]

rev("abc");
//(console): cba

rev(1234);
//(console): 4321


var sillyReverse = dispatch(rev, K(42));
sillyReverse([1,2,3]);
//(console): [ 3, 2, 1 ]

sillyReverse("abc");
//(console): cba

sillyReverse(100002);
//(console): 200001

function first(val) {
    note('first is', val);
    return true;
}

function second(val) {
    note('second is', val);
    return true;
}

function performCommandHardcoded(command) { var result;
    switch (command.type) {
        case 'first':
            result = first(command.message);
            break;
        case 'second':
            result = second(command.target);
            break;
        default:
            console.log(command.type);
    }
    return result;
}

performCommandHardcoded({type: 'first', message: 'hi!'});
//(console): NOTE: first is, hi!
performCommandHardcoded({type: 'second', target: 'some'});
//(console): NOTE: second is,some
performCommandHardcoded({type: '123', target: 'some'});
//(console): 123

function isA(type, action) {
    return function(obj) {
        if (type === obj.type) return action(obj);
    }
}

var performCommand = dispatch(
    isA('first', function(obj) { return first(obj.message) }),
    isA('second', function(obj) { return second(obj.target) }),
    function(obj) { note('rest', obj.type) }
);

var superCommand = dispatch(
    isa('hello', function(obj){ note('Super', obj); return true}),
    performCommand
);

superCommand({type: 'first', message: ' hello'});
//(console)  NOTE: first is, hello

superCommand({type: 'second', target: 'hi!'});
//(console) NOTE: second is,hi!

superCommand({type: 'asd', target: 'hi!'});
//(console) NOTE: rest

superCommand({type: 'hello', target: 'hi!'});
//(console) NOTE: Super