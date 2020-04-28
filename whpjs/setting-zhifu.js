var token;
var userid;
var language;
$(function () {
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    changHead(userid);
    if (language != undefined && language != null & language == 2) {
        if (language == 2) {
            loadProperties();
        }
    }
    select();
});

function select() {
    $.ajax({
        url: "../usdtfb/FbPlay/FbPlaySelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                for (var i in data.play) {
                    var play = data.play[i];
                    if (play.type == 1) {
                        $("#wx").html(play.khao);
                        if (language == 2) {
                            $("#wx_c").html("update");
                        } else {
                            $("#wx_c").html("修改");
                        }

                        $("#wx_c").attr("href", $("#wx_c").attr("href") + "?pid=" + play.pid);
                    }
                    if (play.type == 2) {
                        $("#al").html(play.khao);

                        if (language == 2) {
                            $("#al_c").html("update");
                        } else {
                            $("#al_c").html("修改");
                        }
                        $("#al_c").attr("href", $("#al_c").attr("href") + "?pid=" + play.pid);
                    }
                    if (play.type == 3) {
                        $("#bank_c").attr("href", $("#bank_c").attr("href") + "?pid=" + play.pid);
                    }
                }
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}