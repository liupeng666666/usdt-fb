$(function () {
    $('[data-toggle="popover"]').popover();
});

$(function () {
    $('[rel=popover]').popover({
        html: true,
        content: function () {
            return $('#popover_content_wrapper').html();
        }
    });
});

function showPop(dd) { //要显示的图层以及宽度
    $(dd).fadeIn();
}

function hidePop(dd) { //要显示的图层以及宽度
    $(dd).fadeOut();
}

//iCheck
$('.check-icheck').iCheck({
    checkboxClass: 'icheckbox_minimal-orange',
    radioClass: 'iradio_minimal-orange',
    increaseArea: '20%' // optional'
});

//可拖动弹出层
function popWin(obj) {
    var _z = 9000; //新对象的z-index
    var _mv = false; //移动标记
    var _x, _y; //鼠标离控件左上角的相对位置		
    var _obj = $(obj);
    var _wid = _obj.width();
    var _hei = _obj.height();
    var _tit = _obj.find(".tit");
    var _cls = _obj.find(".close");
    var docE = document.documentElement;
    var left = $(document).width() - _obj.width() - 10
    var top = docE.clientHeight - _obj.height() - 10;
    _obj.css({
        "display": "block",
        "z-index": _z - (-1)
    });

    _tit.mousedown(function (e) {
        _mv = true;
        _x = e.pageX - parseInt(_obj.css("left")); //获得左边位置
        _y = e.pageY - parseInt(_obj.css("top")); //获得上边位置
        _obj.fadeTo(50, 1); //点击后开始拖动并透明显示	
    });
    _tit.mouseup(function (e) {
        _mv = false;
        _obj.fadeTo("fast", 1); //松开鼠标后停止移动并恢复成不透明				 

    });

    $(document).mousemove(function (e) {
        if (_mv) {
            var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
            if (x <= 0) {
                x = 0
            }
            ;
            x = Math.min(docE.clientWidth - _wid, x) - 5;
            var y = e.pageY - _y;
            if (y <= 0) {
                y = 0
            }
            ;
            y = Math.min(docE.clientHeight - _hei, y) - 5;
            _obj.css({
                top: y,
                left: x,
                bottom: 'auto',
                right: 'auto',
            }); //控件新位置
        }
    });

    _cls.on("click", function () {
        _obj.hide();
    });

    reModel();
    $(window).on("resize", function () {
        reModel();
    });
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            _obj.hide();
        }
    });

    function reModel() {
        var b = docE ? docE : document.body,
            height = b.scrollHeight > b.clientHeight ? b.scrollHeight : b.clientHeight,
            width = b.scrollWidth > b.clientWidth ? b.scrollWidth : b.clientWidth;
    };
}

function loadProperties() {
    $.i18n.properties({
        name: 'strings', //属性文件名     命名格式： 文件名_国家代号.properties
        path: 'js/i18n/', //注意这里路径是你属性文件的所在文件夹
        mode: 'map',
        language: "en", //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
        callback: function () {
            console.info($("[data-locale]"));
            $("[data-locale]").each(function () {
                $(this).html($.i18n.prop($(this).data("locale")));

            });
        }
    });
}

/**
 * 修改所有页面头部
 *
 * @param subuserid
 */
function changHead(subuserid) {
    var endtime = window.sessionStorage.getItem("timetofailure");
    if (endtime != undefined && endtime != null && endtime != "") {
        var date = new Date();
        var ntime = date.getTime();
        if (ntime >= endtime) {
            window.sessionStorage.clear();
        }
        var google_renzhen = window.sessionStorage.getItem("google_renzhen");
        if (google_renzhen == 0) {
            window.sessionStorage.clear();
        }
    }

    var nickname = window.sessionStorage.getItem("nickname");
    var img = window.sessionStorage.getItem("userimg");
    var zhoren = window.localStorage.getItem("language");
    if (subuserid != undefined && subuserid != null && subuserid != "" &&
        nickname != undefined && nickname != null && nickname != "") {
        var info = "<li class=\"dropdown personInf\"><a href=\"../usdt-qd/hotTradeCharts.html\" class=\"dropdown-toggle\" ";
        info += "data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">";
        info += " <img id=\"head_img_url\" onerror=\"javascript:this.src='img/head.png';\" src=\"" +
            img + "?timestamp=" + (new Date()).valueOf() + "\"> " + nickname;
        info += "<span class=\"caret\"></span></a> <ul class=\"dropdown-menu\"><li>";
        if (zhoren == 1 || zhoren == undefined || zhoren == null ||
            zhoren == "") {
            info += "<a href=\"../usdt-qd/inforPage.html?type=account\"><i class=\"iconfont icon-careful\"></i>我的账户</a></li>";
            info += "<li><a href=\"../usdt-qd/inforPage.html?type=perfectUserInfo\"><i class=\"iconfont icon-user\"></i>个人信息设置</a></li>";
            info += "<li><a href=\"../usdt-qd/inforPage.html?type=certification\"><i class=\"iconfont icon-shimingrenzheng\"></i>实名认证</a></li>";
            info += "<li><a href=\"../usdt-qd/personalDetails.html\"><i class=\"iconfont icon-careful\"></i>个人详情</a></li>";
            info += "<li><a href=\"../usdt-qd/inviting.html\"><i class=\"iconfont icon-careful\"></i>邀请好友</a></li>";
            info += "<li role=\"separator\" class=\"divider\"></li>";
            info += "<li><a href=\"javascript:loginOut()\"><i class=\"iconfont icon-qiehuanzuhu\"></i>退出账户</a></li></ul></li>";
        } else {
            info += "<a href=\"../usdt-qd/inforPage.html\"><i class=\"iconfont icon-careful\"></i>My account</a></li>";
            info += "<li><a href=\"../usdt-qd/inforPage.html?type=perfectUserInfo\"><i class=\"iconfont icon-user\"></i>Personal settings</a></li>";
            info += "<li><a href=\"../usdt-qd/inforPage.html?type=certification\"><i class=\"iconfont icon-shimingrenzheng\"></i>Verified</a></li>";
            info += "<li><a href=\"../usdt-qd/personalDetails.html\"><i class=\"iconfont icon-careful\"></i>Personal details</a></li>";
            info += "<li><a href=\"../usdt-qd/inviting.html\"><i class=\"iconfont icon-careful\"></i>invite friends</a></li>";
            info += "<li role=\"separator\" class=\"divider\"></li>";
            info += "<li><a href=\"javascript:loginOut()\"><i class=\"iconfont icon-qiehuanzuhu\"></i>LoginOut</a></li></ul></li>";
        }
        info += "<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" ";
        info += "data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">";
        if (zhoren == 1 || zhoren == undefined || zhoren == null ||
            zhoren == "") {
            info += "<spab class=\"circleBtn\">中文<span class=\"caret\"></span></spab></a>";
        } else if (zhoren == 2) {
            info += "<spab class=\"circleBtn\">English<span class=\"caret\"></span></spab></a>";
        }
        info += " <ul class=\"dropdown-menu language\"><li><a href=\"javascript:chooselanguage(1)\">中文</a></li>";
        info += "<li><a href=\"javascript:chooselanguage(2)\">English</a></li></ul></li>";
        $(".top_yc").remove();
        $("#sub_user_info").append(info);
    } else {
        if (zhoren == 1 || zhoren == undefined || zhoren == null ||
            zhoren == "") {
            $(".circleBtn").html("中文<span class=\"caret\"></span>");
        } else if (zhoren == 2) {
            $(".circleBtn").html("English<span class=\"caret\"></span>");
        }
    }
    var utoken = window.sessionStorage.getItem("token");
    if (utoken != null && utoken != "" && typeof (utoken) != undefined) {
        itvcul = setInterval(checkUserOtherLogin, 10000);
        var info = "<div class=\"dialogBox\" id=\"userOtherLogin_dialog\" style=\"display: none;\">";
        info += "<div class=\"mask\"></div>";
        info += "<div class=\"paymentBox\">";
        info += "<h3>下线通知</h3>";
        info += "<p >您的账号在另一台电脑登录。如非本人操作，则密码可能已泄露，建议尽快修改密码。</p>";
        info += " <div>";
        info += "<a onclick=\"Tuichu()\">退出</a>";
        info += "<a  onclick=\"offlineLogin()\">登录</a>";
        info += "</div>";
        info += "</div>";
        info += "</div>";
        $("body").append(info);

    }
}

function startCheckUserOtherLoginItv() {
    var utoken = window.sessionStorage.getItem("token");
    if (utoken != null && utoken != "" && typeof (utoken) != undefined) {
        itvcul = setInterval(checkUserOtherLogin, 10000);
        var info = "<div class=\"dialogBox\" id=\"userOtherLogin_dialog\" style=\"display: none;\">";
        info += "<div class=\"mask\"></div>";
        info += "<div class=\"paymentBox\">";
        info += "<h3>下线通知</h3>";
        info += "<p >您的账号在另一台电脑登录。如非本人操作，则密码可能已泄露，建议尽快修改密码。</p>";
        info += " <div>";
        info += "<a onclick=\"Tuichu()\">退出</a>";
        info += "<a  onclick=\"offlineLogin()\">登录</a>";
        info += "</div>";
        info += "</div>";
        info += "</div>";
        $("body").append(info);
    }

}

function Tuichu() {
    $("#userOtherLogin_dialog").hide();
    var dqurl = location.href;
    var inum1 = dqurl.indexOf(".com");
    var inum2 = dqurl.indexOf(".html");
    var dqurl2 = dqurl.substring(inum1, inum2);
    var inumlng = (dqurl2.match(/\//g) || []).length;
    var inum3 = dqurl.indexOf("trade");
    var language = window.localStorage.getItem("language");
    if (inum3 > 0) {
        window.location.href = "../usdt-qd/login/login.html";
    } else {
        var info = "";
        var ad = "";
        if (inumlng <= 1) {
            ad += "../";
        }
        if (language == 1) {
            info += "<li><a href=\"" + ad + "../usdt-qd/login/login.html\" data-locale=\"daohanglan.denglu\">登录</a></li>";
        } else {
            info += "<li><a href=\"" + ad + "../usdt-qd/login/login.html\" data-locale=\"daohanglan.denglu\">Login</a></li>";
        }
        info += "<li><a href=\"#\">|</a></li>";
        if (language == 1) {
            info += "<li><a href=\"" + ad + "../usdt-qd/login/register.html\"data-locale=\"daohanglan.zhuce\">注册</a></li>";
        } else {
            info += "<li><a href=\"" + ad + "../usdt-qd/login/register.html\"data-locale=\"daohanglan.zhuce\">Register</a></li>";
        }
        info += "<li class=\"dropdown\">";
        info += "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">";
        if (language == 1) {
            info += "<span class=\"circleBtn\">中文<span class=\"caret\"></span></span></a>";
        } else {
            info += "<span class=\"circleBtn\">English<span class=\"caret\"></span></span></a>";
        }
        info += "<ul class=\"dropdown-menu language\">";
        info += "<li><a href=\"javascript:chooselanguage(1)\">中文</a></li>";
        info += "<li><a href=\"javascript:chooselanguage(2)\">English</a></li></ul></li>";
        $(".navbar-right .dropdown").remove();
        $("#sub_user_info").append(info);
    }
}

function checkUserOtherLogin() {
    var dqurl = location.href;
    var inum1 = dqurl.indexOf(".com");
    var inum2 = dqurl.indexOf(".html");
    var dqurl2 = dqurl.substring(inum1, inum2);
    var inumlng = (dqurl2.match(/\//g) || []).length;

    var userrg = window.sessionStorage.getItem("user_rg");
    var userid = window.sessionStorage.getItem("userid");
    var utoken = window.sessionStorage.getItem("token");
    var httpurl = "../usdtpc/subuser/getLoginPlatformInfo";
    if (inumlng > 1) {
        httpurl = "../../usdtpc/subuser/getLoginPlatformInfo";
    }
    $.ajax({
        url: httpurl,
        data: {
            "userid": userid,
            "type": 1,
            "uuid": userrg
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', utoken);
        },
        method: "POST",
        success: function (data) {
            if (data.code == 100) {
                clearInterval(itvcul);
                window.sessionStorage.clear();
                $("#userOtherLogin_dialog").show();
            } else if (data.code == 101) {
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                checkUserOtherLogin();
            } else {
            }

        },
        error: function (err) {
        }
    })
}

function tunchu(value) {
    $("#myAlert").alert('close');
    $("#mySuccress").alert('close');
    var str = "<div id=\"myAlert\" class=\"alert alert-warning\" style=\"position:absolute;top:80%;right:1%;\">";
    str += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>";
    str += "<strong>警告！</strong>" + value;
    str += "</div>";
    $("body").append(str);
}

function chenggong(value) {
    $("#myAlert").alert('close');
    $("#mySuccress").alert('close');
    var str = "<div id=\"mySuccress\" class=\"alert alert-warning\" style=\"position:absolute;top:80%;right:1%;background-color: #9ACD32;border-color: #9ACD32;\">";
    str += "<a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>";
    str += "<strong>成功！</strong>" + value;
    str += "</div>";
    $("body").append(str);
}

$(".close").click(function () {
    $("#myAlert").alert('close');
    $("#mySuccress").alert('close');
});

function tokenLoseEfficacy() {
    var username = window.sessionStorage.getItem("loginid");
    var password = window.sessionStorage.getItem("loginpwd");
    var type = window.sessionStorage.getItem("logintype");
    type = Number(type);
    if (username == undefined || username == null || password == undefined ||
        password == null) {
        window.location.href = "../usdt-qd/login/login.html";
    } else {
        $
            .ajax({
                url: "../usdtpc/auth/tokenLoseEfficacy",
                data: {
                    "username": username,
                    "password": password,
                    "type": type
                },
                method: "POST",
                success: function (data) {
                    if (data.code == 100) {
                        window.sessionStorage.setItem("userimg",
                            data.users.img);
                        window.sessionStorage.setItem("userid",
                            data.users.pid);
                        window.sessionStorage.setItem("nickname",
                            data.users.nickname);
                        window.sessionStorage.setItem("token", data.token);
                        if (data.users.email != undefined &&
                            data.users.email != null &&
                            data.users.email != "") {
                            window.sessionStorage.setItem("email",
                                data.users.email);
                        }
                        window.sessionStorage.setItem("isgoogle",
                            data.users.isgoogle);
                        if (data.users.google_secret != undefined &&
                            data.users.google_secret != null &&
                            data.users.google_secret != "") {
                            window.sessionStorage.setItem("google_secret",
                                data.users.google_secret);
                        } else {
                            window.sessionStorage.setItem("google_secret",
                                "");
                        }
                        window.sessionStorage.setItem("phone",
                            data.users.phone);
                        window.sessionStorage.setItem("loginid", username);
                        window.sessionStorage.setItem("loginpwd", password);
                        window.sessionStorage.setItem("logintype", type);
                    } else if (data.code == 101) {
                        // alert("用户名或密码不对");
                        window.location.href = "../usdt-qd/login/login.html";
                    } else {
                        window.location.href = "../usdt-qd/login/login.html";
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    window.location.href = "../usdt-qd/login/login.html";
                    if (Number(XMLHttpRequest.status) != 0 &&
                        XMLHttpRequest.readyState != 0 &&
                        textStatus != "error" &&
                        errorThrown.length != 0) {
                        // alert("网络异常，请您检查网络后刷新页面！");
                    } else if ("timeout" == textStatus &&
                        "timeout" == errorThrown) {
                        // alert("请求超时，请您检查网络后刷新页面！");
                    } else {
                        // alert("网络异常，请您检查网络后刷新页面！");
                    }
                }
            });
    }

}

function loginOut() {
    window.sessionStorage.clear();
    window.location.reload();
}