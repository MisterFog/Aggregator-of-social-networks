function onFBLogin() {
    FB.login(function (response) { });
}

function onFBLogout() {
    console.log('кнопка выхода из facebook была нажата');
    FB.logout(function (response) {
        FB.getLoginStatus(function (response) {
            window.location.reload();//перезагрузка страницы
        });
    })
}

//функция частичного представления данных из акаунта Facebook
function buildProfileFB(user, count) {
    let profileFB = `          
          <ul class ="list-group">
            <li class ="list-group-item"><h3>${user.name}</h3></li>
            <li class ="list-group-item">Аватар: <img src="${user.picture.data.url}" style="width: 100px; height: 100px"></li>
            <li class ="list-group-item">Друзья: ${user.friends.summary.total_count}</li>
            <li class ="list-group-item">Альбомы: ${count}</li>
            <li class ="list-group-item">Группы: </li>
          </ul>
        `;
    document.getElementById('profileFB').innerHTML = profileFB;
}