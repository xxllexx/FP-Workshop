//Pipelining

function pipeline(seed) {
    return getRest(toArray(arguments)).reduce(function (l, r) {
        return r(l);
    }, seed);
}

pipeline();
//(console): undefined

pipeline(42);
//(console): 42

pipeline(42, function(n) { return -n });
//(console): -42


function fifth(a) {
    return pipeline(a
        , getRest
        , getRest
        , getRest
        , getRest
        , getFirst);
}

fifth([1,2,3,4,5]);
//(console): 5

function negativeFifth(a) {
    return pipeline(a
        , fifth
        , function(n) { return -n }
    );
}

negativeFifth([1,2,3,4,5,6,7,8,9]);
//(console): -5


var library = [
    {title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed: 1}
];

function isArrayOfStrings(arr) {
    return Array.isArray(arr) && and(function(s){
            return typeof s === 'string'
        }).apply(null, arr);
}

function isFunction(arg) {
    return typeof arg === 'function'
}

function isString(str) {
    return typeof str === 'string'
}

function whenType(pred, condition, action) {
    return function(obj){
        return pred(condition) ? obj.map(action) : undefined;
    }
}


var select = function(condition, object){
    return dispatch(
        whenType(isFunction, condition, function(obj){
            var res = {};
            for(var key in obj){
                if(truthy(condition(key, obj[key]))){
                    res[key] = obj[key];
                }
            }
            return res;
        }),
        whenType(isString, condition, function(obj){
            var res = {};
            return (res[condition] = obj[condition], res)
        }),
        whenType(isArrayOfStrings, condition, function(obj){
            return condition.reduce(function(curr, next){
                return (curr[next] = obj[next], curr);
            }, {});
        })
    )(object);
};


select(function(key, value){
    return key === 'title';
}, library);
//(console): [
//             { title: 'SICP' },
//             { title: 'SICP' },
//             { title: 'Joy of Clojure' }
//           ]

function rename(obj, newNames) {
    return Object.keys(obj).reduce(function (cur, next) {
        if(newNames.hasOwnProperty(next)){
            cur[newNames[next]] = obj[next];
        }

        return cur;
    }, getFirst(select([obj], function(key, value){ return !~Object.keys(newNames).indexOf(key)})))
};

function as(newNames, table) {
    return table.map(function(obj) {
        return rename(obj, newNames);
    });
};

select(['edition'], as({ed: 'edition'}, library));
//(console): [ { edition: 1 }, { edition: 2 }, { edition: 1 } ]


function restrict(table, pred) {
    return table.reduce(function(newTable, obj) {
        if (truthy(pred(obj))) return newTable;
        else
            return newTable.filter(function(item){
                return item !== obj
            });
    }, table);
};

restrict(
    function(book) {
        return book.edition > 1;
    },
    select(
        ['title', 'edition'],
        as({ed: 'edition'}, library)
    )
);
//(console): [ { title: 'SICP', edition: 2 } ]

function firstEditions(table) {
    return pipeline(table
        , function(t) { return as({ed: 'edition'}, t) }
        , function(t) { return select(['title', 'edition', 'isbn'], t) }
        , function(t) { return restrict(function(book) { return book.edition === 1; }, t); }
    );
}

firstEditions(library);
//(console): [ { title: 'SICP', edition: 1, isbn: '0262010771' },
//             { title: 'Joy of Clojure', edition: 1, isbn: '1935182641' } ]

var RQL = {
    select: curry(select),
    as: curry(as),
    where: curry(restrict)
};

function allFirstEditions(table) {
    return pipeline(table
        , RQL.select(['title', 'ed', 'isbn'])
        , RQL.as({ed: 'edition'})
        , RQL.where(function(book) {return book.edition === 1; })
    );
}

allFirstEditions(library);
//(console): [ { title: 'SICP', isbn: '0262010771', edition: 1 },
//             { title: 'Joy of Clojure', isbn: '1935182641', edition: 1 } ]

