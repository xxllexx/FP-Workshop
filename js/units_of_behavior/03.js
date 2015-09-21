
function getNth(a, index) {
    if (!isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if (isOutOfRange(a, index)) fail("Index value is out of bounds");
    return a[index];
}

getNth([1, 2, 3], 1);
//(console): 2;

getNth("abcd", 1);
//(console): b;

getNth([1, 2, 3], 'a');
//(console): Error: Expected a number as the index;

getNth(123, 1);
//(console): Error: Not supported on non-indexed type;

getNth([1, 2, 3], 5);
//(console): Error: Index value is out of bounds;
