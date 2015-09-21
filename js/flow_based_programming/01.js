//- Chain:

function user (){
    var firstName, secondName, nickName;

    return {
        setFirstName: function(str){
            firstName = str;
            return this;
        },
        setSecondName: function(str){
            secondName = str;
            return this;
        },
        setNickName: function(str){
            nickName = str;
            return this;
        },
        getUserInfo: function(){
            return [firstName, secondName, nickName].join(' ');
        }
    }
}


user()
    .setFirstName('Alex')
    .setSecondName('Kovalenko')
    .setNickName('xxllexx')
    .getUserInfo();

//(console): Alex Kovalenko xxllexx
