//вспомогательные функцыи для получения токена, которые необходимы при отправки персонального сообщенияD:\Учёба\Дипломный\Diplom\WebAppDiplom\Content\bootstrap.min.css
function getUrl(method, params) {
    if (!method) throw new Error('Вы не указали метод VK!');
    params = params || {};
    /*Получить токен: https://oauth.vk.com/authorize?client_id=6344428&display=page&redirect_uri=&scope=messages,groups,friends,wall,email,photos,status,offline&response_type=token&v=5.73
    токен действителен 1 день; Есть возможность получить токен без срока действия — для этого в scope добавьте значение offline.*/
    //https://oauth.vk.com/blank.html#access_token=c5c2386a02894d3ec7f31fc7a24c3dfae44b7a697d8b8d29e188f006f334380c6e6838680aaf7220fcfdb&expires_in=0&user_id=5594725&email=ty_mister@rambler.ru
    params['access_token'] = 'c5c2386a02894d3ec7f31fc7a24c3dfae44b7a697d8b8d29e188f006f334380c6e6838680aaf7220fcfdb';
    return 'https://api.vk.com/method/' + method + '?' + $.param(params) + '&v=5.73';
}
function sendRequest(method, params, func) {
    $.ajax({
        url: getUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: func
    });
}