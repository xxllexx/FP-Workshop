
var zombie = {
    name: "Bub",
    film: "Day of the Dead"
};

function keys(obj) {
    return Object.keys(obj);
}

keys(zombie);
//(console): ['name', 'film']

function values(obj) {
    return keys(obj).map(key => obj[key])
}
values(zombie);
//(console): ['Bub', 'Day of the Dead']

function pluck(key, arr){
    return arr.map(item => item[key] || undefined);
}

var data = [
    {title: "Chthon", author: "Anthony"},
    {title: "Grendel", author: "Gardner"},
    {title: "After Dark"}
];

pluck('author', data);
//(console): [ 'Anthony', 'Gardner', undefined ]

function pairs(obj) {
    return keys(obj).reduce(function(current, next){
        return (current.push([next, obj[next]]), current);
    }, [])
}

pairs(zombie);
//(console): [ [ 'name', 'Bub' ], [ 'film', 'Day of the Dead' ] ]

function toObject(arr) {
    return (arguments.length > 1) ?
        toObject([getFirst(toArray(arguments)), getSecond(toArray(arguments))]) :
        getFirst(arr).reduce(function(c, n, i){
            return (c[n] = getSecond(arr)[i], c);
        }, {});
}

toObject(['key_1', 'key_2', 'key_3'], ['value_1', 'value_2']);
//(console): { key_1: 'value_1', key_2: 'value_2', key_3: undefined }


toObject(pairs(zombie).map(function(pair) {
    return [pair[0].toUpperCase(), pair[1]];
}));
//(console): { NAME: 'FILM', Bub: 'Day of the Dead' }

