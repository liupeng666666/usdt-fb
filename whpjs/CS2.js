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
                if (data.state == 1) {
                    if (url == "/usdt-fb/Goumai-Step5.html") {

                    } else {
                        window.location.href = "Goumai-Step5.html?pid=" + pid;
                    }
                } else {
                    var cjson = data.message.cjson;
                    var fjson = data.message.fjson;
                    var muser = data.message.muser.user;
                    GMCS(cjson.state, pid, data.type);
                    djs(data.datetime, data.message.datetime);

                    $("#orderid").html(cjson.id);
                    $("#univalent").html(cjson.univalent + "CNY");
                    $("#number").html(cjson.number + fjson.sell.currency);
                    $("#money").html(cjson.money + "CNY");
                    $("#memo").html(fjson.sell.memo);
                    $("#zcurrency1").html(fjson.sell.currency);
                    $("#zcurrency2").html(fjson.sell.currency);
                    $("#zcurrency3").html(fjson.sell.currency);
                    $("#zorderid").html(cjson.id);
                    $("#zmoney").html(cjson.money);
                    order_zt(1, cjson.state);
                    if (url == "/usdt-fb/chushou-Step2.html") {
                        if (data.type == 0) {
                            $("#nickname").html(muser.nickname);
                            $("#phone").html(muser.phone);
                            $("#email").html(muser.email);
                            $("#zfb").html(muser.alpay);
                            $("#weixin").html(muser.wx);
                            to_img = muser.user.img;
                            to_nickname = muser.user.nickname;
                            to_pid = muser.user.pid;
                            socket();

                        }
                    } else {
                        window.location.href = "Goumai-Step1.html?pid=" + pid;
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

function djs(datetime, starttime) {
    var time = (starttime - datetime) / 1000;
    if (time < 0) {

    } else {
        var timer = setInterval(function () {
            if (time <= 0) {
                clearInterval(timer);
            }
            var fh = chicangzhouqi(time);
            $("#djs").html(fh);
            time = time - 1;
        }, 1000);
    }
}

function chicangzhouqi(time) {
    time = time;
    var minute = Math.floor(time / 60);
    var second = Math.floor(time) - (minute * 60);
    return minute + "分" + second + "秒";
}

function tanchu(id) {
    if (id == 1) {
        $("#img").attr("src", zfb_url);
    } else {
        $("#img").attr("src", wx_url);
    }
    $("#toFukuanma").modal("show");
}

function qd(state) {

    var password = $("#password").val();
    if (password == "") {
        alert("密码不能为空");
        return false;
    }

    $.ajax({
        url: "../usdtfb/FbOrder/FbOrderUpdate",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            pid: pid,
            state: state,
            type: 0,
            password: password
        },
        success: function (data) {
            if (data.code == 100) {
                if (state == 3) {
                    window.location.href = "chushou-Step3.html?pid=" + pid;
                } else if (state == 6) {
                    window.location.href = "Goumai-Step5.html?pid=" + pid;
                }
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 104) {
                tunchu("该订单不是您购买订单");
            } else if (data.code == 105) {
                tunchu("交易密码错误！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                qd(state);
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    })
}