function InitialiseVkontakte(app_Id) {
    VK.init({
        apiId: app_Id,
        secret: 'eA7dgV2CfRNFsXCdqXdw',
        scope: +2+8192+4194304+4+8
    }, '5.73');

    VK.Auth.getLoginStatus(function (response) {
        authInfo(response);
    });   
}

/*Функция для проверки состояния входа:*/
function authInfo(response) {
    if (response.session) {
        console.log('Пользователь авторизовался на VK (' + response.status + ')');

        $(document).ready(function () {
            $('#tableContext').css("display", "initial");
            console.log('Таблица должна появиться через VK');
        });

        $(document).ready(function () {
            $('#vkLogin').css("display", "none");
        });
        $(document).ready(function () {
            $('#vkLogout').css("display", "initial");
        });

        VK.Auth.login(authLogin,+2+8192+4194304+4+8);
        //console.log('mid: ' + response.session.mid);        
        //console.log('access_token: ' + response.session.access_token);
    }
    else if (response.status === 'not_authorized') {
        console.log('Пользователь не авторизовался на VK (' + response.status + ')');
        $(document).ready(function () {
            $('#vkLogin').css("display", "initial");
        });
        $(document).ready(function () {
            $('#vkLogout').css("display", "none");
        });
    }
    else {
        console.log('Пользователь не подключен к VK (' + response.status + ')');
        $(document).ready(function () {
            $('#vkLogin').css("display", "initial");
        });
        $(document).ready(function () {
            $('#vkLogout').css("display", "none");
        });
    }
}

function authLogin(res) {    
    if (res.status === 'connected') {
        var user = {};
        user = res.session.user;        

        VK.Api.call('users.get', { version: '5.73', fields: 'photo_100,counters,common_count' }, function (res) {
            if (res.response) {                
                user.photo = res.response[0].photo_100;
                user.common_count = res.response[0].common_count;
                user.counters = res.response[0].counters;
                buildProfileVK(user);
            }
        });
    }
    else {
        console.log('Пользователь НЕ авторизован на VK!');
    }
}

//функция частичного представления данных из акаунта Vkontakte
function buildProfileVK(user) {
    let profileVK = `
        <ul class ="list-group">
            <li class ="list-group-item"><h3>${user.first_name} ${user.last_name}</h3></li>
            <li class ="list-group-item">Аватар:<img src="${user.photo}"></li>
            <li class ="list-group-item">Друзья: ${user.common_count}</li>
            <li class ="list-group-item">Альбомы: ${user.counters.albums}</li>
            <li class ="list-group-item">Группы: ${user.counters.groups}</li>
            <li class ="list-group-item">Подпищики: ${user.counters.followers}</li>
          </ul>
        `;
    document.getElementById('profileVK').innerHTML = profileVK;
}