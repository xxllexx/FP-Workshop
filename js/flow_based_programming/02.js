//Lazy Chain

function LazyChain(obj) {
    this._calls = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function(methodName){
    var args = getRest([].slice.call(arguments));

    this._calls.push(function(target) {
        var meth = target[methodName];
        if (existy(meth)) {
            return meth.apply(target, args);
        }
        return null
    });

    return this;
};

new LazyChain([2,1,3]).invoke('sort')._calls;
//(console): [ [Function] ]

new LazyChain([2,1,3]).invoke('sort')._calls[0]();
//Error: sort undefined

new LazyChain([2,1,3]).invoke('sort')._calls[0]([2,1,3]);
//(console): [ 1, 2, 3 ]


LazyChain.prototype.run = function() {
    return this._calls.reduce(function(target, thunk) {
        return thunk(target);
    }, this._target);
};

new LazyChain([2,1,3]).invoke('sort').run();
//(console): [ 1, 2, 3 ]

new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .invoke('join', ' ')
    .run();
//(console): 1 2 3 5 6 7 8

LazyChain.prototype.tap = function(fn) {
    this._calls.push(function(target) {
        fn(target);
        return target;
    });

    return this;
};


var defferedChain = new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .tap(function(target){
        console.log('tap', target)
    })
    .invoke('join', ' ');

defferedChain.run();
//(console): tap [ 1, 2, 3, 5, 6, 7, 8 ]
//(console): 1 2 3 5 6 7 8



function LazyChainOnChain(obj) {
    var isLC = (obj instanceof LazyChain);

    this._calls = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
}

LazyChainOnChain.prototype = LazyChain.prototype;


new LazyChainOnChain(defferedChain)
    .tap(function(target){
        console.log('tap', target);
    })
    .invoke('substring', 0, 5)
    .run();

//(console): tap [ 1, 2, 3, 5, 6, 7, 8 ]
//(console): tap 1 2 3 5 6 7 8
//(console): 1 2 3
