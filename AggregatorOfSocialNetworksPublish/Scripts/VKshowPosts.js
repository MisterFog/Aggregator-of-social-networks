//Мои посты Vkontakte
function onVKfeed() {
    VK.api('wall.get', { version: '5.73', fields: "date, text, attachments" }, function (data) {
        if (data.response && !data.response.error) {
            var feed = {};

            for (c = 0; c < data.response.length; c++) {

                //преобразуем время unixtime в гринвич
                feed.unixtime = data.response[c].date;
                feed.time = new Date(feed.unixtime * 1000);

                //вычленяем из поля attachments фото
                if (data.response[c].attachments) {
                    for (n = 0; n < data.response[c].attachments.length ; n++) {
                        if (data.response[c].attachments[n].type == "photo") {
                            feed.photo = data.response[c].attachments[n].photo.src;
                            //console.log("Item:" + c + "; attachments[" + n + "].photo: " + feed.photo);
                        }
                    }
                }
            }
            buildFeedVK(data);
        }
    });
}

//Вывод списка моих постов в Vkontakte
function buildFeedVK(feed) {
    console.log(feed);
    let output = '<h3>Мои посты Vkontakte:</h3>';
    for (let i in feed.response) {
        if (feed.response[i].id) {
            feed.response[i].time = new Date(feed.response[i].date * 1000);// преобразуем время unixtime в гринвич
            for (n = 0; n < feed.response[i].attachments.length; n++) {
                if (feed.response[i].attachments[n].type == "photo") {
                    if (n == 0) {
                        output += `
                            <div class ="well">
                                <ul class ="list-group">
                                    <li class ="list-group-item">Time: ${feed.response[i].time.toLocaleString()}
                                    <li class ="list-group-item" style="overflow: hidden; height: 300px; ">Message: ${feed.response[i].text}
                                    <img src="${feed.response[i].attachments[n].photo.src_big}" style="width: avto; height: avto">
                                </ul>
                            </div>
                         `;
                    }
                }
            }
        }
    }
    document.getElementById('feedVK').innerHTML = output;
}