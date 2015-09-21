//Promise

function LazyChainPromisse(obj){
    this._calls = [];
    this._target = obj;
}

LazyChainPromisse.prototype.invoke = function(){
    var first = getFirst(toArray(arguments)),
        rest = getRest(toArray(arguments));

    this._calls.push(function(target) {

        if (typeof first === 'string') {
            var meth =  target[first];

            if (existy(meth)) {
                return meth.apply(target, rest);
            }
        } else if (typeof first === 'function'){
            return first.apply(first, [target]);
        }

    });

    return this;
};

LazyChainPromisse.prototype.run = function(callback, index, target) {
    if (!index || index < this._calls.length) {
        target = target || this._target;
        index = index || 0;

        Promise.resolve(this._calls[index](target)).then(function(result){
            this.run(callback, ++index, result || target);
        }.bind(this));

    } else {
        callback(target);
    }
};


var m = new LazyChainPromisse([1, 3, 2])
    .invoke(function(target){
        return new Promise(function(resolve, reject){

            setTimeout(function(){
                resolve(target.concat([4, 6, 5]));
            }, 2000)

        })
    })
    .invoke(function(target){
        return new Promise(function(resolve, reject){

            setTimeout(function(){
                resolve(target.concat([7,9,8]));
            }, 1000)

        })
    })
    .invoke(function(target){
        return target.concat([100, 200, 45]);
    })
    .invoke('sort');

m.run(function(result){
    note([result]);
});

//after 3000 ms
//(console): NOTE: 1,100,2,200,3,4,45,5,6,7,8,9
