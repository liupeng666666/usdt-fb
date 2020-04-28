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
        url: "../usdtfb/FbUser/FbUserSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                $("#img").attr("src", data.user.img);
                $("#nickname").html(data.user.nickname);
                $("#gradeid").html(data.user.grade_type);
                $("#phone").html(data.user.phone);
                $("#email").html(data.user.email);
                $("#name").html(data.user.realname);
                if (language == 2) {
                    if (data.user.real_name == 1) {
                        $(".v-certification").html("Certified");
                        $(".have").html("Certified");
                    } else {
                        $(".v-certification").html("Uncertified");
                        $(".have").html("Uncertified");
                    }
                } else {
                    if (data.user.real_name == 1) {
                        $(".have").html("已认证");
                        $(".v-certification").html("已认证");
                    } else {
                        $(".have").html("未认证");
                        $(".v-certification").html("未认证");
                    }
                }

                if (typeof (data.user.wx) != "undefined") {
                    $("#wx_c").hide();
                    $("#wx_d").show();
                    $("#wx_d").val(data.user.wx);
                    if (language == 2) {
                        $("#wx_b").html("update");
                    } else {
                        $("#wx_b").html("修改");
                    }

                }
                if (typeof (data.user.qq) != "undefined") {
                    $("#qq_c").hide();
                    $("#qq_d").show();
                    $("#qq_d").val(data.user.qq);

                    if (language == 2) {
                        $("#qq_b").html("update");
                    } else {
                        $("#qq_b").html("修改");
                    }

                }
                if (typeof (data.user.alpay) != "undefined") {
                    $("#al_c").hide();
                    $("#al_d").show();
                    $("#al_d").val(data.user.alpay);

                    if (language == 2) {
                        $("#al_b").html("update");
                    } else {
                        $("#al_b").html("修改");
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

function bd(id, th) {
    var t = $(th).html();
    if (t == "绑定") {
        $("#" + id + "_c").hide();
        $("#" + id + "_d").show();
        $(th).html("修改");
    } else if (t == "binding") {
        $("#" + id + "_c").hide();
        $("#" + id + "_d").show();
        $(th).html("update");
    }
}

function update_qd() {
    var wx = $("#wx_d").val();
    var qq = $("#qq_d").val();
    var al = $("#al_d").val();
    $.ajax({
        url: "../usdtfb/FbUser/FbUserUpdate",
        method: "POST",
        data: {
            wx: wx,
            qq: qq,
            alpay: al
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                tunchu("修改成功！");

            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                update_qd();
            } else {
                tunchu("服务器连接失败！");
            }

        },
        error: function (err) {

        }
    })
}