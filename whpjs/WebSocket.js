var userid;
var socket;
var token;
var from_img;
var from_pid;
var from_nickname;
var to_img;
var to_pid;
var to_nickname;

function socket() {
    token = window.sessionStorage.getItem("token");
    from_img = window.sessionStorage.getItem("userimg");
    from_pid = window.sessionStorage.getItem("userid");
    userid = from_pid;
    from_nickname = window.sessionStorage.getItem("nickname");
    websocket();
    $("#to_img").attr("src", to_img);
    $("#to_nickname").html(to_nickname);
    fblanguage();
}

function websocket() {
    if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    } else {
        console.log("您的浏览器支持WebSocket");
        socket = new WebSocket("ws://127.0.0.1:8097/FbSocket/ID=" + userid);

        //socket = new WebSocket("wss://socket.b-currency.com/usdt_socket/WebSocket/ID=B." + index_user.userid);
        //打开事件
        socket.onopen = function () {
            console.log("Socket 已打开");
            csh();
        };
        //获得消息事件
        socket.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            if (data.code != 200) {
                if (data.state == 1) {
                    var sock = data.socket;
                    for (var i in sock) {
                        zhanshi(sock[i], i);
                    }
                } else {
                    zhanshi(data, 1);
                }
            }

        };
        //关闭事件
        socket.onclose = function () {
            console.log("Socket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
            return false;
        }

    }

}

function csh() {
    console.log(from_pid + "==" + to_pid);
    var json = {
        state: 1,
        from: from_pid,
        to: to_pid
    };
    socket.send(JSON.stringify(json));
}

function zhanshi(sock, num) {
    var str = "";
    if (sock.from == from_pid) {
        str += "<div class=\"direct-chat-msg right\">";
        str += "<img class=\"direct-chat-img\" src=\"" + from_img + "\" alt=\"Message User Image\">";
        str += "<div class=\"direct-chat-info clearfix\">";
    } else {
        str += "<div class=\"direct-chat-msg\">";
        str += "<img class=\"direct-chat-img\" src=\"" + to_img + "\" alt=\"Message User Image\">";
        str += "<div class=\"direct-chat-info clearfix\">";
        str += "<div class=\"direct-chat-name\">" + to_nickname + "</div>";
    }

    str += "<div class=\"direct-chat-text\">";
    var message = JSON.parse(sock.message);
    if (message.state == 0) {
        str += message.message;
    } else {
        str += "<img src=\"" + message.message + "\" style=\"float:right\"/>";
    }
    str += "</div>";
    str += "</div>";
    str += "</div>";
    if (num == 0) {
        $("#websocket").html(str);
    } else {
        $("#websocket").append(str);
    }
    $('#websocket').scrollTop($('#websocket')[0].scrollHeight);
}

function fasong() {
    var message = $("#socket_message").val();

    if (message != "") {
        var json_message = {
            state: 0,
            message: message
        };
        var json = {
            state: 0,
            message: JSON.stringify(json_message),
            from: from_pid,
            to: to_pid
        };
        zhanshi(json, 2);
        $("#socket_message").val("");
        socket.send(JSON.stringify(json));
    }
}

function fblanguage() {
    $.ajax({
        url: "../usdtfb/FbLanguage/FbLanguageSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.language) {
                    var language = data.language[i];
                    str += "<li onclick='language_send(\"" + language.title + "\",0)'>" + language.title + "</li>";
                }
                str += "  <li>";
                str += "  <a href=\"\" data-toggle=\"modal\" data-target=\"#editShort\">";
                str += "   编辑常用语";
                str += "  </a>";
                str += "   </li>";
                $("#language_ul").html(str);
            }
        },
        error: function (err) {

        }
    })
}

function language_qd() {
    var title = $("#language_message").val();
    if (title != "") {
        $.ajax({
            url: "../usdtfb/FbLanguage/FbLanguageInsert",
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            data: {
                title: title
            },
            success: function (data) {
                if (data.code == 100) {
                    $("#language_message").val("");
                    $("#editShort").modal("hide");
                    fblanguage();
                }
            },
            error: function (err) {

            }
        })
    }
}

function language_send(message, state) {
    if (message != "") {
        var json_message = {
            state: state,
            message: message
        };
        var json = {
            state: 0,
            message: JSON.stringify(json_message),
            from: from_pid,
            to: to_pid
        };
        zhanshi(json, 2);
        socket.send(JSON.stringify(json));
    }
}

function socket_img() {
    $("#socket_file").click();
}

$('#socket_file').change(function () {
    var file = $('#socket_file').get(0).files[0];

    var formdata = new FormData();
    formdata.append("file", file);
    $.ajax({
        url: "../usdtfb/FbSocket/FbSocketImg",
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
                language_send(data.img, 1);
            } else if (data.code == 103) {
                alert('上传图片失败');
            }
        },
        error: function (err) {

        }
    })

})