//Мой список друзей в Facebook
function onFBfriends() {
    FB.api('/me', 'GET', { fields: 'taggable_friends{name,picture,id}' }, function (response) {
        if (response && !response.error) {
            buildFriendsFB(response);
        }
    });
}

// Вывод списка друзей в Facebook
function buildFriendsFB(friends) {
    var html = '<h3 style="margin-left: 40px">Список друзей Facebook:</h3>';
    for (let i in friends.taggable_friends.data) {
        var f = friends.taggable_friends.data[i];
        //console.log('https://www.facebook.com/profile.php?id=' + f.id + '&fref=pb&hc_location=friends_tab&pnref=friends.all');
        html += '<li style="margin-bottom:15px; margin-left: 50px">' +
                    '<a target="_blank" href="https://www.facebook.com/profile.php?id=' + f.id + '&fref=pb&hc_location=friends_tab&pnref=friends.all" style="text-decoration: none; color: #000; display: flex; alingn-items: center">'
                        + '<img src="' + f.picture.data.url + '" style="border-radius: 50%; width: 95px; height: 95px; margin-right: 20px">'
                        + '<div>'
                        + '<h4 style="margin: 0">' + f.name + '<h4>'
                        + '<button>Message</button>'
                        + '</div>'
                        +
                    '</a>'
                + '</li>';
    }
    document.getElementById('friendsFB').innerHTML = html;//output;
}