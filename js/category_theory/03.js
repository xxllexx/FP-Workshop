// Functor Maybe

var Maybe = function(val) {
    if (!(this instanceof Maybe)) {
        return new Maybe(val);
    }

    this.val = val;
};

Maybe.prototype.fmap = function(f){
    return this.val == null ? Maybe(null) : Maybe(f(this.val));
};

var users = [
    {name: 'Ivan', secondName: 'Pucka', age: 18},
    {name: 'Katya', secondName: 'Veider', age: 23},
    {name: 'Victor', secondName: 'Greg', age: 18},
    {name: 'Nata', secondName: 'Pavlov', age: 14},
    {name: 'Alex', secondName: 'Tandopolis', age: 18},
    {name: 'Sveta', secondName: 'Vasileva', age: 34}
];

var toUpper = curry(function(str){ return str.toUpperCase()});

var getKey = curry(function(key, obj){
    return obj[key];
});

var getObject = curry(function(search, arr){
    var result =  arr.filter(item => item.name === search);
    return result.length ? getFirst(result) : null;
});

var result = compose(
    fmap(toUpper()),
    fmap(getKey('secondName')),
    Maybe,
    getObject('Sveta')
);

var extract = function(functor){
    return functor.val
};

compose(extract, result)(users);
//(console): VASILEVA