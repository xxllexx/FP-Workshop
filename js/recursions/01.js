
function getLength(arr) {
    return arr.length ? 1 + getLength(arr.splice(1)) : 0
}

getLength(range(10));
//(console): 10

function cycle(times, ary) {
    return times <= 0 ? [] : cat(ary, cycle(times - 1, ary));
}

cycle(5, [1,2,3]);
//(console): [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3 ]

function nexts(graph, node) {
    if (!graph.length) return [];

    var pair = getFirst(graph),
        from = getFirst(pair),
        to = getSecond(pair),
        more = getRest(graph);

    return node === from ? construct(to, nexts(more, node)) : nexts(more, node);
}

var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']];

nexts(influences, 'Lisp');
//(console): [ 'Smalltalk', 'Scheme' ]

function depthSearch(graph, nodes, seen) {
    if (!nodes.length) return seen.reverse();
    var node = getFirst(nodes),
        more = getRest(nodes);
    if (!!~seen.indexOf(node)) return depthSearch(graph, more, seen);
    else
        return depthSearch(graph,
            cat(nexts(graph, node), more),
            construct(node, seen));
}

depthSearch(influences, ['Smalltalk'], []);
//(console): [ 'Smalltalk', 'Self', 'Lua', 'JavaScript' ]


//Tail (self-)recursion && Tail call optimization