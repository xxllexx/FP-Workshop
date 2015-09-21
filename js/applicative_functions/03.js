//decoupling

function cat() {
    var args = toArray(arguments),
        head = getFirst(args);

    if (existy(head)){
        return head.concat.apply(head, getRest(args));
    }

    return [];
}

function construct(head, tail) {
    return cat([head], Array.isArray(tail) ? tail : [tail]);
}

function mapcat(fun, coll) {
    return cat.apply(null, coll.map(fun));
}

mapcat(function(e) {
    return construct(e, [","]);
}, [1,2,3]);

//(console): [ 1, ',', 2, ',', 3, ',' ]

function butLast(coll) {
    return (Array.isArray(coll) ? coll : [coll]).slice(0, -1);
}

function interpose (inter, coll) {
    return butLast(mapcat(function(e) {
        return construct(e, [inter]);
    }, coll));
}

//(console): [ 1, ',', 2, ',', 3 ]
