//Observing Immutability at the Function Level

function randomlyRepeat (times, collection){
    return collection.reduce(function(current, item){
        return current.concat(repeatedly(times(10), function(){ return item; }));
    }, []);
}

function count(data){
    return data.reduce(function(current, item){
        return (current[item] = ((current[item] || 0) + 1), current);
    }, {});
}

var brands = randomlyRepeat(curry(rand), ['apple', 'dell', 'lg', 'samsung']);

count(brands);
//(console): ~ { apple: 7, dell: 2, lg: 6, samsung: 2 };

count(skipTake(3, brands));
//(console): ~ { apple: 3, lg: 2, samsung: 1 }

count(brands);
//(console): ~ { apple: 7, dell: 2, lg: 6, samsung: 2 };


function extend() {
    var main = toArray(arguments),
        rest = getRest(toArray(arguments));

    if (isObject(main) && !Array.isArray(main)) {
        rest.forEach(function(next){
            if (isObject(next) && !Array.isArray(next)) {
                for(var i in next) {
                    if (next.hasOwnProperty(i)){
                        main[i] = next[i];
                    }
                }
            }
        });
    }

    return main;
}

var user = {name: 'Alex'};

var user1 = extend(user, {age: 12}, {age: 18, secondName: 'Habbiby'});

user1;
//(console): { name: 'Alex', age: 18, secondName: 'Habbiby' };

user;
//(console): { name: 'Alex', age: 18, secondName: 'Habbiby' };


function merge() {
    return extend.apply(null, construct({}, [].slice.call(arguments)));
}

var user = {name: 'Alex'};

var user1 = merge(user, {age: 12}, {age: 18, secondName: 'Habbiby'});

user1;
//(console): { name: 'Alex', age: 18, secondName: 'Habbiby' }

user;
//(console): { name: 'Alex' }