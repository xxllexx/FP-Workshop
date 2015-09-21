
function doWhen(condition, action) {
    if (truthy(condition)) {
        return typeof action === 'function' ? action() : action;
    }
    return undefined;
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function() {
        return target[name];
    });
}

executeIfHasField([1,2,3], 'reverse');
// (console) The result is 3, 2, 1 //=> [3, 2, 1]

executeIfHasField({foo: 42}, 'foo');
// (console) The result is 42


function getProperty(key) {
    return function(dataArray){
        return doWhen(existy(dataArray.map), function() {
            return dataArray.map(item => executeIfHasField(item, key))
        });
    }
}

function getNames (arr){
    return getProperty('name')(arr);
}

//OR:
var getName = getProperty('name');

getNames([{name: 'test', age: 16}]);
//(console): test