
/*
- Function returns value that is result of function argument manipulation
- Independent
- no side-effects
*/

PI = 3.14;

function areaOfACircle(radius) {
    return PI * sqr(radius);
}
areaOfACircle(3);
//(console): 28.26

// ... some code
PI = "Magnum";
// ... more code

areaOfACircle(3);
//(console): NaN

/*
- Separating the Pure from the Impure
- Date.now, console.log, this makes functions Impure.
*/