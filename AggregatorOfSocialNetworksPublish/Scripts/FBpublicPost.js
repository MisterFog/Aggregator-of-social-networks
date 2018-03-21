//Сделать публикацию на стене
function onFBpost() {
    var new_post = document.getElementById("mytext").value;
    FB.api('/me/feed', 'post', { message: new_post }, function (response) {
        if (!new_post) {
            alert('Вы не ввели сообщение!');
            return;
        }
        if (response && !response.error) {
            resetValue('mytext')
        }
    });
}

//Очищает форму для записи сообщения textarea
function resetValue(elem) {
    elem = document.getElementById(elem);
    elem.value = "";
}