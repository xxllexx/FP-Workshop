
function take(array, n) {
    n = n || 1;
    var length = array ? array.length : 0;
    if (!length) return [];
    return array.slice( 0, n < 0 ? 0 : n);
}

function random (min, max) {
    return Math.floor(Math.random() * ((max || 0) - (min || 0) + 1) + min);
}

var rand = partial(random, 1);

repeatedly(10, partial(rand, 10));
//(console): Array with 10 items

take(repeatedly(100, partial(rand, 10)), 5);
//(console): Array with 5 items

function randString(len) {
    var ascii = repeatedly(len, partial1(rand, 26));

    return ascii.map(function(n) {
        return n.toString(36);
    }).join('');
}

randString(10);
//(console): 10 random chars
