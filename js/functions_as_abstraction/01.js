
/**start-block**/
function parseAge(age) {
    if (typeof age !== 'string') throw new Error("Expecting a string");

    var a;

    console.log("Attempting to parse an age");

    a = parseInt(age, 10);

    if (isNaN(a)) {
        console.log(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}
/**end-block**/

parseAge("42");
// (console) Attempting to parse an age //=> 42
parseAge(42);
// Error: Expecting a string
parseAge("frob");
// (console) Attempting to parse an age
// (console) Could not parse age: frob //=> 0