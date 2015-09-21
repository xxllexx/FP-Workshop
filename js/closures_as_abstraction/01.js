
function plucker(FIELD) {
    return function(obj) {
        return (obj && obj[FIELD]);
    };
}

var best = {title: "Infinite Jest", author: "DFW"};

var getTitle = plucker('title');

getTitle(best);

var books = [
    {title: "Chthon"},
    {stars: 5},
    {title: "Botchan"}
];

var third = plucker(2);

third(books);
//(console): { title: 'Botchan' }

function filter(array, cond) {
    return array.filter(cond)
};

var getTitle = plucker('title');

filter(books, getTitle);
//(console): [ { title: 'Chthon' }, { title: 'Botchan' } ]