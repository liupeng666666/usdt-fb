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
    select();
});


function select() {
    $.ajax({
        url: "../usdtfb/FbPlay/FbPlaySelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {type: 2},
        success: function (data) {
            if (data.code == 100) {
                for (var i in data.play) {
                    var play = data.play[i];
                    if (play.type == 2) {
                        $("#khao").val(play.khao);
                        $("#zimg").attr("src", play.img);
                        $("#img_li").show();
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

function dk() {
    $("#file").click();
}

$('#file').change(function () {
    var file = $('#file').get(0).files[0];
    //创建用来读取此文件的对象
    var reader = new FileReader();
    //使用该对象读取file文件
    reader.readAsDataURL(file);
    //读取文件成功后执行的方法函数
    reader.onload = function (e) {
        //读取成功后返回的一个参数e，整个的一个进度事件
        console.log(e);
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        $('#zimg').get(0).src = e.target.result;
    }
    $("#img_li").show();
})


function xg() {
    var khao = $("#khao").val();
    var file = $('#file').get(0).files[0];
    var password = $("#password").val();
    if (khao == "") {
        tunchu("支付宝号码不能为空");
        return false;
    }
    if (pid == null) {
        if (file == null) {
            tunchu("请上传收款码");
            return false;
        }
    }
    if (password == "") {
        tunchu("请填写密码");
        return false;
    }

    if (pid == null) {
        var formdata = new FormData();
        formdata.append("khao", khao);
        formdata.append("file", file);
        formdata.append("password", password);
        formdata.append("type", 2);
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
                    tunchu("添加成功！");
                }
            },
            error: function (err) {

            }
        });
    } else {
        var formdata = new FormData();
        formdata.append("khao", khao);
        formdata.append("file", file);
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
                    tunchu("修改成功！");
                } else if (data.code == 101) {
                    tunchu("暂无数据！");
                } else if (data.code == 103) {
                    tunchu("服务器连接失败！");
                } else if (data.code == 401) {
                    tokenLoseEfficacy();
                    token = window.sessionStorage.getItem("token");
                    xg();
                } else {
                    tunchu("服务器连接失败！");
                }
            },
            error: function (err) {

            }
        });
    }
}
