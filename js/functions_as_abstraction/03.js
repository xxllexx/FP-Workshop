
/**start-block**/
function fail(thing) {
    throw new Error(thing);
}

/**end-block**/
/**start-block**/
function warn(thing) {
    if (!window.production)
        console.log(["WARNING:", thing].join(' '));
}

/**end-block**/
/**start-block**/
function note(thing) {
    if (!window.production)
        console.log(["NOTE:", thing].join(' '));
}

/**end-block**/
window.production = true;

parseAge("frob");
//(console): empty
window.production = false;

parseAge("frob");
// (console) NOTE: Attempting to parse an age //
// (console) WARNING: Could not parse age: frob //=> 0