//Вывод списка чатов в Вконтакте
$('#dialogsVK').on('click', function (event) {
    event.preventDefault();
    sendRequest('messages.getDialogs', { version: '5.73', count: 8 }, buildListDialogsVK);
});

//Вывод списка чатов
function buildListDialogsVK(data) {
    var uid = [];
    var html = '<h3>' + 'Мои диалоги Vkontakte:' + '</h3>';
    html += '<h4>' + 'Колличество диалогов: ' + data.response.count + '</h4>';

    //console.log(data.response.items);
    for (var i = 0; i < data.response.items.length; i++) {
        var f = data.response.items[i].message;
        f.time = new Date(f.date * 1000);
        uid[i] = f.user_id;
        //console.log(uid[i]);       
        html += '<div class ="well">'
                + '<ul class ="list-group">'
                    + '<li class ="list-group-item">' + f.time.toLocaleString()
                    + '<div class ="detailDialog' + i + '">'
                        + '<img id="big_fotoDialo" src="" style=" border-radius: 50%;width: 100px; height: 100px;">'
                        + '<h3 id="nameUserDialo">' + '</h3>'
                    + '</div>'
                    + '<li class ="list-group-item">' + f.body
                    + '<button data-did="' + uid[i] + '" class ="open-dialoVK" data-toggle="modal" data-target="#myModalChats">' + 'Открыть' + '</button>'
                + '</ul>'
            + '</div>';
    }
    document.getElementById('drowdialogsVK').innerHTML = html;

    infUserDialog(uid);
}

//обработчик кнопки открыть диалог
$(document).on('click', '.open-dialoVK', function (event) {//вешаем событие клика на документ, но обрабатываем только элемент class = open-dialoVK
    event.preventDefault();
    var did = +$(event.target).data('did');//==+$(event.target).attr('data-did');
    console.log('нажатие кнопки "Открыть": ' + did);
    sendRequest('messages.getHistory', { version: '5.73', user_id: did, count: 8 }, drowChat)
});

//вызов диологового окна
$('#myModalChats').on('shown.bs.modal', '.open-dialoVK', function (event) {
    $('#myInput').focus();
})

//отображение чата
function drowChat(data) {
    var $detailChat = $('.detailChat');
    console.log(data.response);
    var uid = [];
    var dHtml = '<h3 id="nameUserChat">' + '</h3>'
              + '<h5>' + 'Колличество сообщений: ' + data.response.count + '</h5>';

    for (var i = 0; i < data.response.items.length; i++) {
        var f = data.response.items[i];

        f.time = new Date(f.date * 1000);
        uid[i] = f.from_id;

        if (data.response.items[i].out == 0) {
            var uidname = f.user_id;
            infUserNameChat(uidname);
            dHtml += '<div class ="well_0">'
                   + '<li>' + f.time + '</li>'
                   + '<img id="big_fotoChat" src="" style=" border-radius: 50%;width: 60px; height: 60px;">'
                   //+ '<li>' + f.attachments + '</li>'
                   + '<li>' + f.body + '</li>'
                   + '</div>'
            ;
        }
        else {
            dHtml += '<div class ="well_1">'
                   + '<li>' + f.time + '</li>'
                   + '<img id="big_fotoChat" src="" style=" border-radius: 50%;width: 60px; height: 60px;">'
                   + '<li>' + f.body + '</li>'
                   + '</div>'
            ;
        }
    }
    $detailChat.find('#infChat').html(dHtml);
    infUserFotoChat(uid)
}

function infUserFotoChat(uid) {
    sendRequest('users.get', { version: '5.73', user_ids: uid, fields: 'photo_max' }, function (data) {
        var user_0 = data.response[0];
        var user_1 = data.response[1];
        //console.log(data);
        var $detailDialog = $(".well_0");
        $detailDialog.find('#big_fotoChat').attr('src', user_0.photo_max);
        var $detailDialog = $(".well_1");
        $detailDialog.find('#big_fotoChat').attr('src', user_1.photo_max);
    });
}

function infUserNameChat(uid) {
    sendRequest('users.get', { version: '5.73', user_ids: uid, fields: 'first_nam,last_name' }, function (data) {
        var user = data.response[0];
        var $detailDialog = $(".detailChat");
        $detailDialog.find('#nameUserChat').text(user.first_name + ' ' + user.last_name);
    });
}

//Вывод списка чатов
function buildListDialogsVK(data) {
    var uid = [];
    var html = '<h3>' + 'Мои диалоги Vkontakte:' + '</h3>';
    html += '<h4>' + 'Колличество диалогов: ' + data.response.count + '</h4>';

    //console.log(data.response.items);
    for (var i = 0; i < data.response.items.length; i++) {
        var f = data.response.items[i].message;
        f.time = new Date(f.date * 1000);
        uid[i] = f.user_id;
        //console.log(uid[i]);       
        html += '<div class ="well">'
                + '<ul class ="list-group">'
                    + '<li class ="list-group-item">' + f.time.toLocaleString()
                    + '<div class ="detailDialog' + i + '">'
                        + '<img id="big_fotoDialo" src="" style=" border-radius: 50%;width: 100px; height: 100px;">'
                        + '<h3 id="nameUserDialo">' + '</h3>'
                    + '</div>'
                    + '<li class ="list-group-item">' + f.body
                    + '<button data-did="' + uid[i] + '" class ="open-dialoVK" data-toggle="modal" data-target="#myModalChats">' + 'Открыть' + '</button>'
                + '</ul>'
            + '</div>';
    }
    document.getElementById('drowdialogsVK').innerHTML = html;

    infUserDialog(uid);
}

//вывод информации о собеседники диалога
function infUserDialog(uid) {
    sendRequest('users.get', { version: '5.73', user_ids: uid, fields: 'photo_max' }, function (data) {
        for (var y = 0; y < uid.length; y++) {
            var user = data.response[y];
            //console.log(user);            
            //console.log(user.id);
            //console.log(user.photo_max);
            //console.log(user.first_name + ' ' + user.last_name);            

            var $detailDialog = $(".detailDialog" + [y]);
            //console.log($detailDialog);
            $detailDialog.find('#big_fotoDialo').attr('src', user.photo_max);
            $detailDialog.find('#nameUserDialo').text(user.first_name + ' ' + user.last_name);
        }
    });
}

//отображение человека с кем ведётся переписка в диалогах
function drowDialogFriendVK(data) {
    //console.log(data.response[0]);
    if (data.response[0]) {
        console.log(data.response[0].first_name + ' ' + data.response[0].last_name);
        console.log(data.response[0].photo_max);
    }

    let output = `
                  <div>
                  <img src="${data.response[0].photo_max}" style="width: 100px; height: 100px" class ="img-circle">
                  ${data.response[0].first_name} ${data.response[0].last_name}
                  </div>
                `;
    document.getElementById('drowDialogFriendVK').innerHTML = output;
}