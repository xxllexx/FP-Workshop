
getNth(['a', 'b', 'c'], 1);
//(console): b
// ... after 1000 times
//(console): b

function second(arr) {
    return getNth(arr, 1);
}
second(arr);
//(console): b

function second(arr) {
    return arr[1]
}
second(arr);
//(console): b

// even:
function second(arr) {
    return 'b'
}

second(arr);
//(console): b

//Idempotence
// someFun(arg) === compose(someFun, someFun)(arg);

var a = [1, [10, 20, 30], 3];

var secondTwice = compose(getSecond, getSecond);

getSecond(a) === secondTwice(a);
//(console): false

var dissociativeIdentity = compose(identity, identity);

identity(42) === dissociativeIdentity(42);
//(console): true

Math.abs(Math.abs(-42));
//(console): 42;


