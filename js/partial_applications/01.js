
function div(n, d) {
    return n / d
}

function partial1(fun, arg1) {
    return function() {
        var args = construct(arg1, toArray(arguments));
        return fun.apply(fun, args);
    };
}

var over10Part1 = partial1(div, 10);
over10Part1(5);
//(console): 2

function partial(fun) {
    var pargs = getRest(toArray(arguments));

    return function() {
        var args = cat(pargs, toArray(arguments));
        return fun.apply(fun, args);
    };
}


var zero = validator("cannot be zero", function(n) {
    return 0 === n
});

var number = validator("arg must be a number", isNumber);

function sqr(n) {
    if (!number(n)) fail(number.message);
    if (zero(n)) fail(zero.message);

    return n * n;
}

function condition1() {
    var validators = toArray(arguments);

    return function(fun, arg) {
        var errors = mapcat(function(isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);

        if (errors.length > 0) fail(errors.join(", "));

        return fun(arg);
    };
}

var sqrPre = condition1(
    validator("arg must not be zero", complement(zero)),
    validator("arg must be a number", isNumber)
);

sqrPre(identity, 0);
//Error: arg must not be zero;

sqrPre(identity, 'qwe');
//Error: arg must be a number;

sqrPre(identity, 1);
//(console): 1;

function uncheckedSqr(n) {
    return n * n
};

uncheckedSqr('');
//(console): 0
//(console): NaN

var checkedSqr = partial(sqrPre, uncheckedSqr);

checkedSqr(0);
//Error: arg must not be zero;

checkedSqr("test");
//Error: arg must be a number;

checkedSqr(10);
//(console): 100;

var sillySquare = partial(
    condition1(
        validator("should be even", function(num){
            return num%2 === 0
        })),
    checkedSqr
);

sillySquare(12);
//(console): 144;

sillySquare(11);
//Error: should be even;



function hasKeys() {
    var keys = toArray(arguments);

    return function(obj){
        return !keys.filter(item => complement(plucker(item))(obj)).length;
    }
}

var validateCommand = condition1(
    validator("arg must be a map", isObject),
    validator("arg must have the correct keys", hasKeys('msg', 'type')));

var createCommand = partial(validateCommand, identity);

createCommand({msg: 'test', type: '123'});
//(console): {msg: 'test', type: '123'}

createCommand("asd");
//Error arg must be a map, arg must have the correct keys
createCommand({msg: 'test', type1: '123'});
//arg must have the correct keys

var createLaunchCommand = partial( condition1(
        validator("arg must have the count down", hasKeys('countDown'))),
    createCommand);

createLaunchCommand({msg: 'test', type: '123', countDown: '123'})
//(console): { msg: 'test', type: '123', countDown: '123' }