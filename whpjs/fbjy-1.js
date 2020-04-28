var token;
var userid;
var language;
var pid;
var univalent;
var min_money;
var max_money;
var surplus;
var currency_name;
var ts_state = false;
var p_type = 0;
var p_userid;
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
        url: "../usdtfb/FbSell/FbSellDan",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            pid: pid
        },
        success: function (data) {
            if (data.code == 100) {
                $("#img").attr("src", data.sell.img);
                $("#nickname").html(data.sell.nickname);
                $("#grade_name").html(data.sell.grade_name);
                to_img = data.sell.img;
                to_nickname = data.sell.nickname;
                to_pid = data.sell.userid;

                if (language == 2) {
                    if (data.sell.real_name == 1) {
                        $("#realname").html("Certified");
                    } else {
                        $("#realname").html("Uncertified");
                    }
                } else {
                    if (data.sell.real_name == 1) {
                        $("#realname").html("认证");
                    } else {
                        $("#realname").html("未认证");
                    }
                }

                $("#num").html(data.sell.trad_volume);
                $("#xrd").html(data.sell.reputation + "%");
                $("#memo").html(data.sell.memo);
                if (data.sell.state != 0) {
                    tunchu("提示：该交易已下线");
                }
                var str = "";
                if (data.sell.pay_wx == 1) {
                    $("#pay").append("<img src=\"img/gm/zf-2.png\" >");
                    if (language == 2) {
                        str += "wechat、";
                    } else {
                        str += "微信、";
                    }

                }
                if (data.sell.pay_al == 1) {
                    $("#pay").append("<img src=\"img/gm/zf-3.png\" >");
                    if (language == 2) {
                        str += "alipay、";
                    } else {
                        str += "支付宝、";
                    }

                }
                if (data.sell.pay_bank == 1) {
                    $("#pay").append("<img src=\"img/gm/zf-1.png\" >");
                    if (language == 2) {
                        str += "bank、";
                    } else {
                        str += "银行、";
                    }

                }
                if (language == 2) {
                    if (data.sell.type == 1) {
                        $("#title").html("adopt " + str + "Transfers are purchased in Renminbi (CNY)" + data.sell.currency);
                    } else {
                        $("#title").html("adopt " + str + "Transfer to Renminbi (CNY) for sale" + data.sell.currency);
                    }
                } else {
                    if (data.sell.type == 1) {
                        $("#title").html("通过" + str + "转账以人民币（CNY）购买" + data.sell.currency);
                    } else {
                        $("#title").html("通过" + str + "转账以人民币（CNY）出售" + data.sell.currency);
                    }
                }

                $("#univalent").html(data.sell.univalent + " CNY");
                univalent = data.sell.univalent;
                $("#min_max").html(data.sell.min_money + " CNY-" + data.sell.max_money + " CNY");
                if (language == 2) {
                    $("#min_max_title").html("（Limit the amount of the order" + data.sell.min_money + " CNY-" + data.sell.max_money + " CNY Between）");
                    $("#limit_time").html(data.time + "M");
                } else {
                    $("#min_max_title").html("（下单金额范围限制在" + data.sell.min_money + " CNY-" + data.sell.max_money + " CNY之间）");
                    $("#limit_time").html(data.time + "分钟");
                }

                $("#number").html(data.sell.surplus + " " + data.sell.currency);

                if (data.friend > 0) {
                    $("#fb_friend").attr("data-target", "");
                    if (language == 2) {
                        $("#fb_friend").html("YFriends");
                    } else {
                        $("#fb_friend").html("已是好友");

                    }

                } else {
                    $("#fb_friend").attr("data-target", "#followTa");

                    if (language == 2) {
                        $("#fb_friend").html("Friends");
                    } else {
                        $("#fb_friend").html("加ta好友");

                    }
                }
                min_money = data.sell.min_money;
                max_money = data.sell.max_money;
                surplus = data.sell.surplus;
                currency_name = data.sell.currency;
                p_userid = data.sell.userid;
                p_type = data.sell.type;
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

function qiehuan(money, id, state) {
    if (state == 1) {
        var z = parseInt((money / univalent) * 100000000) / 100000000;
        $("#" + id).val(z);
        if (money > max_money || money < min_money) {
            ts_state = false;
            if (language == 2) {
                $("#tishi").html("The amount you entered is not within the scope of the transaction.");
            } else {
                $("#tishi").html("您输入的金额不在交易范围之内");
            }

            $("#tishi").show();

        } else if (z > surplus) {
            ts_state = false;
            if (language == 2) {
                $("#tishi").html("The quantity you entered exceeds the remaining quantity of this order.");
            } else {
                $("#tishi").html("您输入的数量超出了本订单剩余数量");
            }

            $("#tishi").show();

        } else {
            ts_state = true;
            $("#tishi").hide();
        }
    } else {
        var m = parseInt((money * univalent) * 100) / 100;
        $("#" + id).val(m);
        if (m > max_money || m < min_money) {
            ts_state = false;
            if (language == 2) {
                $("#tishi").html("The amount you entered is not within the scope of the transaction.");
            } else {
                $("#tishi").html("您输入的金额不在交易范围之内");
            }

            $("#tishi").show();

        } else if (money > surplus) {
            ts_state = false;
            if (language == 2) {
                $("#tishi").html("The quantity you entered exceeds the remaining quantity of this order.");
            } else {
                $("#tishi").html("您输入的数量超出了本订单剩余数量");
            }
            $("#tishi").show();

        } else {
            ts_state = true;
            $("#tishi").hide();
        }
    }
}

function lx() {
    var money = $("#money").val();
    var currency_money = $("#currency_money").val();
    if (money == "" || currency_money == "") {
        if (language == 2) {
            $("#tishi").html("Please enter the amount and quantity.");
        } else {
            $("#tishi").html("请输入金额和数量");
        }
        $("#tishi").show();
        return false;
    }
    if (ts_state == false) {
        return false;
    }
    $("#t_danjia").html(univalent + "CNY");
    $("#t_money").html(money + "CNY");
    $("#t_num").html(currency_money + currency_name);
    $("#toBuy").modal("show");
}

function qd() {
    $("#t_hide").show();
    $("#t_show").hide();
    var money = $("#money").val();
    var currency_money = $("#currency_money").val();
    $.ajax({
        url: "../usdtfb/FbOrder/FbOrderInsert",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            sellid: pid,
            money: money,
            number: currency_money,
            univalent: univalent,
            type: p_type,
            userid: p_userid,
            fuserid: p_userid
        },
        success: function (data) {
            if (data.code == 100) {
                location.href = "Goumai-Step1.html?pid=" + data.uuid;
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 102) {
                tunchu("下线或参数不全");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 104) {
                tunchu("余额不足，请及时充币");
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

function friend_qd() {
    $.ajax({
        url: "../usdtfb/FbFriend/FbFriendInsert",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            yuserid: p_userid
        },
        success: function (data) {
            $("#followTa").modal("hide");
            if (data.code == 100) {
                select();
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 102) {
                tunchu("已是好友！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                friend_qd();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    })
}