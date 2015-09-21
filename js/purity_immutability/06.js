//Defensive Freezing

var a = [1, 2, 3];
a[1] = 42;

//(console): [1, 42, 3];

var b = [1, 2, 3];

Object.freeze(b);

b[1] = 108;
//(console): [1, 2, 3];

Object.isFrozen(b);
//(console): true

var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

Object.freeze(x);

x[0] = "";

x[1]['c']['d'] = 100000;

//(console): [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: 100000 } } ]

function deepFreeze(obj) {
    if (!Object.isFrozen(obj)) Object.freeze(obj);

    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || typeof obj[key] !== 'object') continue;
        deepFreeze(obj[key]);
    }
}


var y =      [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: [] } } ];
deepFreeze(y);

y[0] = null;

y[1]['c']['d'] = 42;

//(console): [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: [] } } ]
