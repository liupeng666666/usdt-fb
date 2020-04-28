var token;
var userid;
var language;
var pid;
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
    bank();
});

function bank() {
    $.ajax({
        url: "../usdtfb/FbPlay/FbBankSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.bank) {
                    var bank = data.bank[i];
                    str += "<option value='" + bank.pid + "'>" + bank.name + "</option>";

                }
                $("#bank_id").html(str);
                select();
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                bank();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function select() {
    $.ajax({
        url: "../usdtfb/FbPlay/FbPlaySelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            type: 3
        },
        success: function (data) {
            if (data.code == 100) {
                for (var i in data.play) {
                    var play = data.play[i];
                    if (play.type == 3) {
                        $("#khao").val(play.khao);
                        $("#q_khao").val(play.khao);
                        $("#name").val(play.name);
                        $("#memo").val(play.memo);
                        $("#open_bank").val(play.openbank);
                        $("#bank_id").find("option[value='" + play.bankid + "']").attr("selected", true);
                        pid = play.pid;
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

function qd() {
    var khao = $("#khao").val();
    var zkhao = $("#q_khao").val();
    var name = $("#name").val();
    var memo = $("#memo").val();
    var open_bank = $("#open_bank").val();
    var password = $("#password").val();
    var bank_id = $("#bank_id").val();
    if (name == "") {
        tunchu("姓名不能为空");
        return false;
    }
    if (khao == "") {
        tunchu("银行卡号不能为空");
        return false;
    }
    if (zkhao == "") {
        tunchu("确认银行卡号不能为空");
        return false;
    }
    if (khao !== zkhao) {
        tunchu("银行卡和确认银行卡号不一致");
        return false;
    }

    if (open_bank == "") {
        tunchu("开户行不能为空");
        return false;
    }
    if (password == "") {
        tunchu("请填写密码");
        return false;
    }

    if (pid == null) {
        var formdata = new FormData();
        formdata.append("khao", khao);
        formdata.append("name", name);
        formdata.append("open_bank", open_bank);
        formdata.append("memo", memo);
        formdata.append("bankid", bank_id);
        formdata.append("password", password);
        formdata.append("type", 3);
        $.ajax({
            url: "../usdtfb/FbPlay/FbPlayInsert",
            method: "POST",
            data: formdata,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.code == 100) {
                    tanchu("添加成功！");
                } else if (data.code == 101) {
                    tunchu("暂无数据！");
                } else if (data.code == 103) {
                    tunchu("服务器连接失败！");
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
        });
    } else {
        var formdata = new FormData();
        formdata.append("khao", khao);
        formdata.append("name", name);
        formdata.append("open_bank", open_bank);
        formdata.append("memo", memo);
        formdata.append("bankid", bank_id);
        formdata.append("password", password);
        formdata.append("pid", pid);
        $.ajax({
            url: "../usdtfb/FbPlay/FbPlayUpdate",
            method: "POST",
            data: formdata,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.code == 100) {
                    tanchu("修改成功！");
                } else if (data.code == 101) {
                    tunchu("暂无数据！");
                } else if (data.code == 103) {
                    tunchu("服务器连接失败！");
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
        });
    }
}