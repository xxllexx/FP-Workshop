
function generateRandomCharacter() {
    return rand(26).toString(36);
}

function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}

generateString(generateRandomCharacter, 20);
//(console): 20 random chars

var composedRandomString = partial(generateString, generateRandomCharacter);

composedRandomString(10);
//(console): 10 random chars

generateString(K("a"), 10);
//(console): 10 random chars


