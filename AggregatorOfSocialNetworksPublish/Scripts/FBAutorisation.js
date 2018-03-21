function InitialiseFacebook(appId) {
    window.fbAsyncInit = function () {
        FB.init({
            appId: appId,
            cookie: true,  // enable cookies to allow the server to access the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.12' // use graph api version 2.8
        });

        /*Так выглядит обратный вызов. Он обращается к FB.getLoginStatus(), чтобы получить новейшие данные о состоянии входа. 
        (statusChangeCallback() — это функция, которая обрабатывает отклик.)*/
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

        //Работа с контроллером
        /*авторизировать пользователя на стороне сервера и записать данные о нем в БД. */
        FB.Event.subscribe('auth.login', function (response) {
            var credentials = { uid: response.authResponse.userID, accessToken: response.authResponse.accessToken };
            SubmitLogin(credentials);
        });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.12&appId=225062131301892&autoLogAppEvents=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

/*Функция для проверки состояния входа:*/
function statusChangeCallback(response) {
    if (response.status === 'connected') {        
        console.log('Пользователь авторизовался на Facebook (' + response.status + ')');

        $(document).ready(function () {
            $('#tableContext').css("display", "initial");
            console.log('Таблица должна появиться через FB');
        });

        $(document).ready(function () {
            $('#fbLogin').css("display", "none");
        });
        $(document).ready(function () {
            $('#fbLogout').css("display", "initial");
        });

        FB.login(authLoginFB, { scope: 'public_profile,email,user_birthday,user_location,user_posts' });
    }
    else if (response.status === 'not_authorized') {
        console.log('Пользователь не авторизовался на Facebook (' + response.status + ')');
        $(document).ready(function () {
            $('#fbLogin').css("display", "initial");
        });
        $(document).ready(function () {
            $('#fbLogout').css("display", "none");
        });
    }
    else {
        console.log('Пользователь не подключен к Facebook (' + response.status + ')');
        $(document).ready(function () {
            $('#fbLogin').css("display", "initial");
        });
        $(document).ready(function () {
            $('#fbLogout').css("display", "none");
        });
    }
}

function authLoginFB(res) {
    FB.api('/me', 'GET', { fields: 'email , name, birthday, location, picture, friends, albums' },
    function (response) {
        var count = 0;
        for (c = 0; c < response.albums.data.length; c++) {
            count++;
        }
        buildProfileFB(response, count);
    });
}

//Работа с контроллером
// Для отправки запроса с сервера. Оповещает разрыв соединения с FB
function SubmitLogin(credentials) {
    $.ajax({
        url: "/Home/FacebookLogin",
        type: "POST",
        data: credentials,
        error: function () {
            //alert("error logging in to your facebook account.");
            console.log("error logging in to your facebook account.");
        },
        success: function (credentials) {
            //console.log(credentials);
        }
    });
}