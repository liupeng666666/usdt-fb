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
    score();
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
                    var zuser = data.message.zuser;
                    var play = data.message.play;
                    GMCS(cjson.state, pid, data.type);
                    djs(data.datetime, data.message.datetime);
                    order_zt(0, cjson.state);
                    $("#orderid").html(cjson.id);
                    $("#univalent").html(cjson.univalent + "CNY");
                    $("#number").html(cjson.number + fjson.sell.currency);
                    $("#money").html(cjson.money + "CNY");
                    $("#memo").html(fjson.sell.memo);
                    if (url == "/usdt-fb/Goumai-Step3.html") {
                        if (data.type == 1) {
                            $("#nickname").html(zuser.user.nickname);
                            for (var i in play.play) {
                                var p = play.play[i];
                                if (p.type == '1') {
                                    zfb_url = p.img;
                                    $("#zfb").show();
                                } else if (p.type == 2) {
                                    $("#weixin").show();
                                    wx_url = p.img;
                                } else {
                                    $("#bank_name").html(p.bank_name);
                                    $("#openbank").html(p.openbank);
                                    $("#khao").html(p.khao);
                                    $("#bank_memo").html(p.memo);
                                }
                            }
                            to_img = zuser.user.img;
                            to_nickname = zuser.user.nickname;
                            to_pid = zuser.user.pid;
                            socket();
                        } else {
                            window.location.href = "chushou-Step1.html?pid=" + pid;
                        }
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

function qd() {
    var score = $('input:radio[name="11"]').val();
    if (score == "" || score == null) {
        alert("请选择评价");
        return false;
    }


    $.ajax({
        url: "../usdtfb/FbEvaluate/FbEvaluateInsert",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            pid: pid,
            type: 1,
            score: score
        },
        success: function (data) {
            if (data.code == 100) {
                window.location.href = "Goumai-Step4.html?pid=" + pid;

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
                qd();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    })
}

function score() {

    $.ajax({
        url: "../usdtfb/FbScore/FbScoreSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },

        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.score) {
                    var score = data.score[i];
                    str += "<label>" + score.name + "</label>";
                    str += "<input type=\"radio\" name=\"11\" value=\"" + score.score + "\"  class=\"check-icheck\"/>";
                    if (score.score >= 0) {
                        str += "+" + score.score;
                    } else {
                        str += score.score;
                    }
                }

                $("#score").html(str);
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                score();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    })
}