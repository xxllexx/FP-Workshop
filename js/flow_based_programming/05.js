//Data flow

function sqr(x) {
    return x * x;
}

pipeline(42
    , sqr
    , note
    , function(n) {
        return -n
    }
);
//(console): NOTE: 16
//(console): NaN


function negativeSqr(n) {
    var s = sqr(n);
    note(n);
    return -s;
}

negativeSqr(42);
//(console): NOTE: 4
//(console): -16



//{values: [4, 16, undefined, -16]}
//{values: [4, 16, undefined, -16], state: -16}

function actions(acts, done) {
    return function (seed) {
        var init = { values: [], state: seed };

        var intermediate = acts.reduce(function (stateObj, action) {

            var result = action(stateObj.state);
            var values = cat(stateObj.values, [result.answer]);

            return {
                values: values,
                state: result.state
            };
        }, init);

        var keep = intermediate.values.filter(existy);

        return done(keep, intermediate.state);
    };
};

function mSqr() {
    return function(state) {
        var ans = sqr(state);

        return {
            answer: ans,
            state: ans
        };
    }
}


var doubleSquareAction = actions(
    [
        mSqr(),
        mSqr()
    ],
    function(values) {
        return values;
    }
);

doubleSquareAction(10);
//(console) [100, 10000]


function mNote() {
    return function(state) {

        note(state);

        return {
            answer: undefined,
            state: state
        };
    }
}

function mNeg() {
    return function(state) {
        return {
            answer: -state,
            state: -state
        };
    }
}

var negativeSqrAction = actions(
    [
        mSqr(),
        mNote(),
        mNeg()
    ], function(_, state) {
        return state;
    }
);

negativeSqrAction(9);
//NOTE: 81
//(console): -81


function lift(answerFun, stateFun) {
    return function() {
        var args = [].slice.call(arguments);

        return function(state) {
            var ans = answerFun.apply(null, construct(state, args));
            var s = stateFun ? stateFun(state) : ans;

            return {answer: ans, state: s};
        };
    };
};

var mSqr2 = lift(sqr);
var mNote2 = lift(note, identity);
var mNeg2 = lift(function(n) { return -n });

var negativeSqrAction2 = actions(
    [
        mSqr2(),
        mNote2(),
        mNeg2()
    ], function(_, state) {
        return state;
    }
);

negativeSqrAction(100);
// NOTE: 10000
//(console): -10000

var push = lift(function(stack, e) { return construct(e, stack) });
var pop = lift(getFirst, getRest);

var stackAction = actions([
        push(1),
        push(2),
        pop()
    ],
    function(values, state) {
        return values;
    });


stackAction([]);
//(console): [ [ 1 ], [ 2, 1 ], 2 ];


pipeline([], stackAction).forEach(function(elem) {
    console.log(elem);
});
//(console) [ 1 ]
//(console) [ 2, 1 ]
//(console) 2

