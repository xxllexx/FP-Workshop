
function K(value) {
    return function(){
        return value;
    }
}

function checker() {
    var validators = toArray(arguments);

    return function(obj) {
        return validators.reduce(function(errs, check) {
            if (check(obj)) return errs;
            else
                return (errs.push(check.message), errs);
        }, []);
    };
}

var alwaysPasses = checker(K(true), K(true));
alwaysPasses({});
//(console): []

var fails = K(false);
fails.message = "a failure in life";

var alwaysFails = checker(fails);
alwaysFails({});
//(console): [ 'a failure in life' ]

function validator(message, fun) {
    var f = function() {
        return fun.apply(fun, arguments);
    };

    f['message'] = message;

    return f;
}


var gonnaFail = checker(validator("Error!", K(false)));
gonnaFail(100);
//(console): [ 'Error!' ]

function isObject(obj) {
    var type = typeof obj;
    return !!obj && (type === 'object' || type === 'function');
}

var checkCommand = checker(validator("must be an Object", isObject));
checkCommand({});
//(console): []

checkCommand(34);
//[ 'must be an Object' ]