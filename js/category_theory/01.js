//Composition

var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

var sine = function(x) {
    return Math.sin(x)
};
var cube = function(x) {
    return x * x * x
};

var sineOfCube = compose(sine, cube);

sineOfCube(10) === sine(cube(10));
//(console): true;

var compose = function(){
    var args = [].slice.call(arguments);

    return function() {
        var _arguments = arguments;

        return args.reverse().reduce(function(cur, next){

            return cur ? next.call(next, cur) : next.apply(next, _arguments);

        }, 0);
    }
};


var limit = curry(function(num, data){
    return data.slice(0, num);
});

var _map = curry(function(fn, arr){
    return arr.map(fn);
});

var getProp = curry(function(prop, obj){
    return obj[prop];
});

var users = [
    {name: 'Ivan', age: 18},
    {name: 'Katya', age: 23},
    {name: 'Victor', age: 18},
    {name: 'Nata', age: 14},
    {name: 'Alex', age: 18},
    {name: 'Sveta', age: 34}
];

var usersList = compose(
    _map(
        getProp('name')
    ),
    limit(4)
);

usersList(users);
//(console): [ 'Ivan', 'Katya', 'Victor', 'Nata' ]