function onVKLogin(){
    VK.Auth.login(function () {         
    }, +2+8192+4194304+4+8)
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

//выйти из аккаунта Vkontakte
function onVKLogout(){
    console.log('кнопка выхода из контакта была нажата');        
    VK.Auth.logout(function (response) {
        //setElements(false);
        window.location.reload();//перезагрузка страницы
    });
}