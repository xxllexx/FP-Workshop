//Functor

function addOne(a) {
    return a + 1;
}

addOne(5);
//(console): 6

addOne([5]);
//(console): 51

//class (typeclass) Functor f where fmap :: (a -> b) -> f a -> f b

//JS map -> Functor Lift fmap :: (a -> b) -> [a] -> [b]

[0, 1, 2, 3].map(addOne);
//(console): [1, 2, 3, 4];

//[addOne(0), addOne(1), addOne(2) ...] //-> [1, 2, 3, 4];

var fmap = curry(function(f, obj) {
    return obj.fmap ? obj.fmap(f) : f(obj);
});

var AnyFunctor = function(val){
    if(!(this instanceof AnyFunctor)) {
        return new AnyFunctor(val);
    }

    this.val = val;
};

AnyFunctor.prototype.fmap = function(fn){
    return AnyFunctor(fn(this.val));
};

fmap(addOne, AnyFunctor(2));
//(console): AnyFunctor(3)

AnyFunctor.prototype.fmap = function(fn){
    return AnyFunctor(this.val.map(fn));
};

fmap(addOne, AnyFunctor([0, 1, 2, 3]));
//(console) AnyFunctor([1, 2, 3, 4]);
