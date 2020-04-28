var token;
var userid;
var language;
var pid;
var url = window.location.pathname;
var zfb_url;
var wx_url;
$(function () {
    pid = GetRequest().pid;
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
        url: "../usdtfb/FbOrder/FbOrderSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            pid: pid
        },
        success: function (data) {
            if (data.code == 100) {

                var cjson = data.message.cjson;
                var fjson = data.message.fjson;
                var muser = data.message.muser;
                GMCS(cjson.state, pid, data.type);
                order_zt(1, cjson.state);
                $("#orderid").html(cjson.id);
                $("#univalent").html(cjson.univalent + "CNY");
                $("#number").html(cjson.number + fjson.sell.currency);
                $("#money").html(cjson.money + "CNY");
                to_img = muser.user.img;
                to_nickname = muser.user.nickname;
                to_pid = muser.user.pid;
                socket();

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


