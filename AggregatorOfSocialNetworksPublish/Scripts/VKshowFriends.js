//запрос на вывод списка друзей в VK
function onVKfriends() {
    VK.api("friends.search", { version: '5.73', count: 200, fields: "photo_100, online" }, function (data) {
        // Действия с полученными данными 
        buildFriendsVK(data.response);
    });
}

// Вывод списка друзей в Вконтакте
function buildFriendsVK(friends) {
    var html = '<h3>Список друзей Vkontakte:</h3>';

    for (var i = 1; i < friends.length; i++) {
        var f = friends[i];
        var online = f.online ? 'online' : 'offline'; // ?-если :-иначе
        //console.log(f.uid);
        html += '<li style="margin-bottom:15px">' +
                               '<a href="#" style="text-decoration: none; color: #000; display: flex; alingn-items: center">'
                                   + '<img src="' + f.photo_100 + '" style="border-radius: 50%; width: 100px; height: 100px; margin-right: 20px">'
                                   + '<div>'
                                   + '<h4 style="margin: 0">' + f.first_name + ' ' + f.last_name + '<h4>'
                                   + '<p>' + online + '</p>'
                                   + '<button type="button" data-uid="' + f.uid + '" class="open-detail" data-toggle="modal" data-target="#myModal">Написать сообщение</button>'
                                   + '</div>'
                                   +
                               '</a>'
                           + '</li>';
    }
    document.getElementById('friendsVK').innerHTML = html;//output;
}

//обработчик событий - нажатие кнопки "Открыть"
$(document).on('click', '.open-detail', function (event) {//при клике функция дастаёт id друга
    event.preventDefault();//при клике чтобы функция не реагировала на переход по ссылки <a href="#"...
    var uid = +$(event.target).data('uid');//+ преобразует строку в цифры, сама фун. вытаскивает из атрибутов друга его id
    console.log('нажатие кнопки "Написать...:"' + uid);
    sendRequest('users.get', { version: '5.73', user_ids: uid, fields: 'sex, bdate, city, country, photo_max' }, drowDetailedFriendVK);
});

$('#send-message').on('click', sendMessage);

//вызов диологового окна
$('#myModal').on('shown.bs.modal', '.open-detail', function (event) {
    $('#myInput').focus();
})

//отображение модального окна с инфой о друге в VK
function drowDetailedFriendVK(data) {
    var user = data.response[0];
    var $detail = $('.detail');

    var sex = 'man';
    if (user.sex === 1) {
        sex = 'woman'
    }
    var man = user.sex ? '2' : 'woman'; // ?-если :-иначе

    var uHtml = '<li>' + user.bdate + '</li>'
                + '<li>' + sex + '</li>'
                + '<li>' + user.city.title + '</li>'
                + '<li>' + user.country.title + '</li>';

    $detail.find('#big_foto').attr('src', user.photo_max);
    $detail.find('#nameUser').text(user.first_name + ' ' + user.last_name);
    $detail.find('#infUser').html(uHtml);
    $detail.find('#send-message').attr('data-uid', user.id);

    $detail.show();
}

//отправка сообщения другу в VK
function sendMessage(event) {
    var uid = +$(event.target).attr('data-uid');
    var $value = $('#textmessage').val();//val()-показывает текст

    if (!$value) {
        alert('Вы не ввели сообщение!');
        return;
    }
    sendRequest('messages.send', { version: '5.73', user_id: uid, message: $value }, function () {
        //console.log('Сообщение отправлено!');
        resetValue('textmessage')
    });
}

//Очищает форму для записи сообщения textarea
function resetValue(elem) {
    elem = document.getElementById(elem);
    elem.value = "";
}
