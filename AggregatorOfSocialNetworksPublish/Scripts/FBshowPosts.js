//Мои посты Facebook
function onFBfeed() {
    FB.api('/me/feed', { fields: 'full_picture , name, id, created_time, message' }, function (response) {
        if (response && !response.error) {
            buildFeedFB(response);
        }
    });
}

//Вывод списка моих постов в Facebook
function buildFeedFB(feed) {
    //console.log(feed);
    let output = '<h3>Мои посты Facebook:</h3>';
    for (let i in feed.data) {
        if (feed.data[i].id) {
            output += `
              <div class ="well">
                  <ul class ="list-group">
                    <li class ="list-group-item">Time: ${feed.data[i].created_time}
                    <li class ="list-group-item">Message: ${feed.data[i].message}
                    <li class ="list-group-item" style="overflow: hidden;">Name: ${feed.data[i].name}
                    <img src="${feed.data[i].full_picture}" style="width: 200px; height: avto">
                  </ul>
              </div>
            `;
        }
    }
    document.getElementById('feedFB').innerHTML = output;
}