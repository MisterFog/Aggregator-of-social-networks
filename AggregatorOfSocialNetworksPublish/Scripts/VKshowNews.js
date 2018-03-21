//Мой список Новостей в Vkontakte
function onVKnews() {
    console.log('Проверка работы кнопки Новости в ВК');
    VK.api("newsfeed.get", { version: '5.73', fields: 'date, text, attachments' }, function (data) {
        if (data.response && !data.response.error) {
            var feed = {};
            for (c = 1; c < data.response.items.length; c++) {
                //преобразуем время unixtime в гринвич
                feed.unixtime = data.response.items[c].date;
                feed.time = new Date(feed.unixtime * 1000);
            }
            buildNewsVK(data);
        }
    });
}

//Вывод Новостей от друзей и групп
function buildNewsVK(feed) {
    console.log(feed);
    let output = '<h3>Мои новости Vkontakte:</h3>';

    for (let i in feed.response.items) {
        if (feed.response.items[i].source_id) {

            // преобразуем время unixtime в гринвич
            feed.response.items[i].time = new Date(feed.response.items[i].date * 1000);

            if (feed.response.items[i].type == "friend") {
                for (let n in feed.response.items[i].friend) {
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                        <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                    </ul>
                                </div>
                            `;
                        }
                    }
                }
            }

            if (feed.response.items[i].type == "audio") {
                for (let n in feed.response.items[i].audio) {
                    c == 1;
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                        <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                        <audio src=="${feed.response.items[i].audio[n].url}" style="width: avto; height: avto">
                                        <li class ="list-group-item">artist: ${feed.response.items[i].audio[n].artist}
                                        <li class ="list-group-item">treck: ${feed.response.items[i].audio[n].title}
                                    </ul>
                                </div>
                            `;
                        }
                    }
                    for (let c in feed.response.groups) {
                        if (feed.response.items[i].source_id == -feed.response.groups[c].gid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                         <li class ="list-group-item">Avtor: ${feed.response.groups[c].name}
                                        <audio src=="${feed.response.items[i].audio[n].url}" style="width: avto; height: avto">
                                        <li class ="list-group-item">artist: ${feed.response.items[i].audio[n].artist}
                                        <li class ="list-group-item">treck: ${feed.response.items[i].audio[n].title}
                                    </ul>
                                </div>
                            `;
                        }
                    }
                }
            }

            if (feed.response.items[i].type == "video") {
                for (let n in feed.response.items[i].video) {
                    c == 1;
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                        <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                        <img src="${feed.response.items[i].video[n].image}" style="width: avto; height: avto">
                                        </video>
                                    </ul>
                                </div>
                            `;
                        }
                    }
                    for (let c in feed.response.groups) {
                        if (feed.response.items[i].source_id == -feed.response.groups[c].gid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                        <li class ="list-group-item">Avtor: ${feed.response.groups[c].name}
                                        <img src="${feed.response.items[i].video[n].image}" style="width: avto; height: avto">
                                    </ul>
                                </div>
                            `;
                        }
                    }
                }
            }

            if (feed.response.items[i].type == "wall_photo") {
                for (let n in feed.response.items[i].photos) {
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                        <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                        <img src="${feed.response.items[i].photos[n].src}" style="width: avto; height: avto">
                                    </ul>
                                </div>
                            `;
                        }
                    }
                    for (let c in feed.response.groups) {
                        if (feed.response.items[i].source_id == -feed.response.groups[c].gid) {
                            output += `
                                <div class ="well">
                                    <ul class ="list-group">
                                        <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                         <li class ="list-group-item">Avtor: ${feed.response.groups[c].name}
                                        <img src="${feed.response.items[i].photos[n].src}" style="width: avto; height: avto">
                                    </ul>
                                </div>
                            `;
                        }
                    }
                }
            }

            if (feed.response.items[i].type == "post") {
                if (feed.response.items[i].attachment.type == "photo") {
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                            <div class ="well">
                                <ul class ="list-group">
                                    <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                    <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                    <li class ="list-group-item" style="overflow: hidden; height: 300px; ">Post: ${feed.response.items[i].text}
                                    <img src="${feed.response.items[i].attachment.photo.src}" style="width: avto; height: avto">
                                </ul>
                            </div>
                        `;
                        }
                    }
                    for (let c in feed.response.groups) {
                        if (feed.response.items[i].source_id == -feed.response.groups[c].gid) {
                            output += `
                            <div class ="well">
                                <ul class ="list-group">
                                    <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                    <li class ="list-group-item">Avtor: ${feed.response.groups[c].name}
                                    <li class ="list-group-item" style="overflow: hidden; height: 300px; ">Post: ${feed.response.items[i].text}
                                    <img src="${feed.response.items[i].attachment.photo.src}" style="width: avto; height: avto">
                                </ul>
                            </div>
                        `;
                        }
                    }
                }
                if (feed.response.items[i].attachment.type == "link") {
                    for (let c in feed.response.profiles) {
                        if (feed.response.items[i].source_id == feed.response.profiles[c].uid) {
                            output += `
                            <div class ="well">
                                <ul class ="list-group">
                                    <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                    <li class ="list-group-item">Avtor: ${feed.response.profiles[c].first_name} ${feed.response.profiles[c].last_name}
                                    <li class ="list-group-item" style="overflow: hidden; height: 300px; ">Post: ${feed.response.items[i].text}
                                    <img src="${feed.response.items[i].attachment.image_src}" style="width: avto; height: avto">
                                </ul>
                            </div>
                        `;
                        }
                    }
                    for (let c in feed.response.groups) {
                        if (feed.response.items[i].source_id == -feed.response.groups[c].gid) {
                            output += `
                            <div class ="well">
                                <ul class ="list-group">
                                    <li class ="list-group-item">Time: ${feed.response.items[i].time.toLocaleString()}
                                    <li class ="list-group-item">Avtor: ${feed.response.groups[c].name}
                                    <li class ="list-group-item" style="overflow: hidden; height: 300px; ">Post: ${feed.response.items[i].text}
                                    <img src="${feed.response.items[i].attachment.image_src}" style="width: avto; height: avto">
                                </ul>
                            </div>
                        `;
                        }
                    }
                }
            }
        }
    }
    document.getElementById('newsVK').innerHTML = output;
}