
var arr = [1, 2, 3, 4, 5];

var map_arr = arr.map(item => item * 2);
//(console): [2, 4, 6, 8, 10]

var arr_sum = arr.reduce((current, next) => current + next, 0);
//(console): 15

var filter = arr.filter(item => item > 2);
//(console): [3, 4, 5]

