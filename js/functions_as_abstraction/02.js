
/**start-block**/
function fail(thing) {
    throw new Error(thing);
}

/**end-block**/
/**start-block**/
function warn(thing) {
    console.log(["WARNING:", thing].join(' '));
}

/**end-block**/
/**start-block**/
function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}

/**end-block**/
/**start-block**/
function parseAge(age) {
    if (typeof age !== 'string') fail("Expecting a string"); var a;

    note("Attempting to parse an age");
    a = parseInt(age, 10);

    if (isNaN(a)) {
        warn(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}

/**end-block**/
parseAge("frob");
// (console) NOTE: Attempting to parse an age //
// (console) WARNING: Could not parse age: frob //=> 0