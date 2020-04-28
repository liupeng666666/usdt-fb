var token;
var language;
$(function () {
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    assetSelect();
});

function fenye(total, page, num, ff, id) {
    var m = Math.ceil(parseFloat(total) / num);
    page = parseInt(page);
    var str = "";
    if (page == 1) {
        if (language == 2) {
            str += "<li><a href=\"javascript:void(0)\">last</a></li>";
        } else {
            str += "<li><a href=\"javascript:void(0)\">上一页</a></li>";
        }

    } else {
        if (language == 2) {
            str += "<li onclick='" + ff + "(\"" + (page - 1) + "\")'><a href=\"javascript:void(0)\">last</a></li>";
        } else {
            str += "<li onclick='" + ff + "(\"" + (page - 1) + "\")'><a href=\"javascript:void(0)\">上一页</a></li>";
        }
    }
    if (m <= 5) {
        for (var i = 1; i < (m + 1); i++) {
            str += "<li onclick='" + ff + "(\"" + i + "\")'><a href=\"javascript:void(0)\">" + i + "</a></li>";
        }
    } else {
        if (m - page > 5) {
            for (var i = page; i < page + 5; i++) {
                str += "<li onclick='" + ff + "(\"" + i + "\")'><a href=\"javascript:void(0)\">" + i + "</a></li>";
            }
        } else {
            for (var i = (m - 5); i < (m + 1); i++) {
                str += "<li onclick='" + ff + "(\"" + i + "\")'><a href=\"javascript:void(0)\">" + i + "</a></li>";
            }
        }
    }
    if (page == m) {
        if (language == 2) {
            str += "<li><a href=\"javascript:void(0)\">next</a></li>";
        } else {
            str += "<li><a href=\"javascript:void(0)\">下一页</a></li>";
        }

    } else {
        if (language == 2) {
            str += "<li onclick='" + ff + "(\"" + (page + 1) + "\")'><a href=\"javascript:void(0)\">next</a></li>";
        } else {
            str += "<li onclick='" + ff + "(\"" + (page + 1) + "\")'><a href=\"javascript:void(0)\">下一页</a></li>";
        }

    }

    $("#" + id).html(str);
}

function GetRequest() {
    var url = location.search; // 获取url中"?"符后的字串

    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }

    return theRequest;
}

function GMCS(state, pid, type) {
    var url = window.location.pathname;
    //alert(state+"=="+type+"=="+url);
    if (type == 1) {
        if (state == 0 && url != "/usdt-fb/Goumai-Step1.html") {
            window.location.href = "Goumai-Step1.html?pid=" + pid;
        } else if (state == 1 && url != "/usdt-fb/Goumai-Step2.html") {
            window.location.href = "Goumai-Step2.html?pid=" + pid;
        } else if (state == 2 && url != "/usdt-fb/Goumai-Step2.html") {
            window.location.href = "Goumai-Step2.html?pid=" + pid;
        } else if (state == 3 && url != "/usdt-fb/Goumai-Step3.html") {
            window.location.href = "Goumai-Step3.html?pid=" + pid;
        } else if (state == 5 && url != "/usdt-fb/Goumai-Step5.html") {
            window.location.href = "Goumai-Step5.html?pid=" + pid;
        } else if (state == 6 && url != "/usdt-fb/Goumai-Step5.html") {
            window.location.href = "Goumai-Step5.html?pid=" + pid;
        } else if (state == 7 && url != "/usdt-fb/Goumai-Step4.html") {
            window.location.href = "Goumai-Step4.html?pid=" + pid;
        } else if (state == 8 && url != "/usdt-fb/Goumai-Step3.html") {
            window.location.href = "Goumai-Step3.html?pid=" + pid;
        } else if (state == 9 && url != "/usdt-fb/Goumai-Step4.html") {
            window.location.href = "Goumai-Step4.html?pid=" + pid;
        }
    } else {
        if (state == 0 && url != "/usdt-fb/chushou-Step1.html") {
            window.location.href = "chushou-Step1.html?pid=" + pid;
        } else if (state == 1 && url != "/usdt-fb/chushou-Step1.html") {
            window.location.href = "chushou-Step1.html?pid=" + pid;
        } else if (state == 2 && url != "/usdt-fb/chushou-Step2.html") {
            window.location.href = "chushou-Step2.html?pid=" + pid;
        } else if (state == 3 && url != "/usdt-fb/chushou-Step3.html") {
            window.location.href = "chushou-Step3.html?pid=" + pid;
        } else if (state == 5 && url != "/usdt-fb/Goumai-Step5.html") {
            window.location.href = "Goumai-Step5.html?pid=" + pid;
        } else if (state == 6 && url != "/usdt-fb/Goumai-Step5.html") {
            window.location.href = "Goumai-Step5.html?pid=" + pid;
        } else if (state == 7 && url != "/usdt-fb/chushou-Step4.html") {
            window.location.href = "chushou-Step4.html?pid=" + pid;
        } else if (state == 8 && url != "/usdt-fb/chushou-Step4.html") {
            window.location.href = "chushou-Step4.html?pid=" + pid;
        } else if (state == 9 && url != "/usdt-fb/chushou-Step3.html") {
            window.location.href = "chushou-Step3.html?pid=" + pid;
        }
    }
}

var str = "";
var xh_str = "";

function assetSelect() {
    $.ajax({
        url: "../usdtfb/LFbAsset/LFbAssetSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var asset_list = data.asset;
                for (var i in asset_list) {
                    var asset = asset_list[i];
                    str += "<tr> <td class=\"text-left\">" + asset.name + "</td>";
                    str += "<td>" + asset.surplus + "</td>";
                    str += "<td>" + asset.frozen + "</td>";
                    str += "</tr>";
                }

                var usdtAsset_list = data.usdtAsset;
                for (var i in usdtAsset_list) {
                    var usdtAsset = usdtAsset_list[i];

                    xh_str += "<tr> <td class=\"text-left\"> USDT </td>";
                    xh_str += "<td>" + usdtAsset.surplus + "</td>";
                    xh_str += "<td>" + 0 + "</td>";
                    xh_str += "</tr>";

                    xh_str += "<tr> <td class=\"text-left\"> BRU </td>";
                    xh_str += "<td>" + usdtAsset.bur_money + "</td>";
                    xh_str += "<td>" + 0 + "</td>";
                    xh_str += "</tr>";
                }

                $("#xhAssetInfo").html(xh_str);
                $("#assetInfo").html(str);
            }
        },
        error: function (err) {

        }
    });
}

function order_zt(type, state) {
    if (type == 0) {
        if (language == 2) {
            if (state == 0) {
                $(".order-status").html("Waiting for your payment");
            } else if (state == 1) {
                $(".order-status").html("Waiting for the other party to pay the money");
            } else if (state == 2) {
                $(".order-status").html("Waiting for the other party to pay the money");
            } else if (state == 3) {
                $(".order-status").html("Received currency, please comment on both sides");
            } else if (state == 5) {
                $(".dqyqx").html("The order has been cancelled");
                $(".tip").html("Tip: The other party has cancelled the order, this transaction failed!");
            } else if (state == 6) {
                $(".dqyqx").html("The order has been cancelled");
                $(".tip").html("Tip: You cancelled the order and the transaction failed!");
            } else if (state == 7) {
                $(".ddywc").html("The order has been completed");
            } else if (state == 8) {
                $(".order-status").html("Received currency, please comment on both sides");
            } else if (state == 9) {
                $(".order-status").html("Received currency, please comment on both sides");
            }
        } else {
            if (state == 0) {
                $(".order-status").html("等待您付款中");
            } else if (state == 1) {
                $(".order-status").html("等待对方放币");
            } else if (state == 2) {
                $(".order-status").html("等待对方放币");
            } else if (state == 3) {
                $(".order-status").html("已收币，请双方评价");
            } else if (state == 5) {
                $(".dqyqx").html("订单已取消");
                $(".tip").html("提示：对方已取消订单 本次交易失败！");
            } else if (state == 6) {
                $(".dqyqx").html("订单已取消");
                $(".tip").html("提示：您已取消订单 本次交易失败！");
            } else if (state == 7) {
                $(".ddywc").html("订单已完成");
            } else if (state == 8) {
                $(".order-status").html("已收币，请双方评价");
            } else if (state == 9) {
                $(".order-status").html("已收币，请双方评价");
            }
        }

    } else {
        if (language == 2) {
            if (state == 0) {
                $(".order-status").html("Waiting for payment");
            } else if (state == 1) {
                $(".order-status").html("Payment made by the other party");
            } else if (state == 2) {
                $(".order-status").html("Payment made by the other party");
            } else if (state == 3) {
                $(".order-status").html("Received currency, please comment on both sides");
            } else if (state == 5) {
                $(".dqyqx").html("The order has been cancelled");

                $(".tip").html("Tip: You cancelled the order and the transaction failed!");
            } else if (state == 6) {
                $(".dqyqx").html("The order has been cancelled");
                $(".tip").html("Tip: The other party has cancelled the order, this transaction failed!");
            } else if (state == 7) {
                $(".ddywc").html("The order has been completed");
            } else if (state == 8) {
                $(".order-status").html("Received currency, please comment on both sides");
            } else if (state == 9) {
                $(".order-status").html("Received currency, please comment on both sides");
            }
        } else {
            if (state == 0) {
                $(".order-status").html("等待对方付款");
            } else if (state == 1) {
                $(".order-status").html("对方已付款");
            } else if (state == 2) {
                $(".order-status").html("对方已付款");
            } else if (state == 3) {
                $(".order-status").html("已收币，请双方评价");
            } else if (state == 5) {
                $(".dqyqx").html("订单已取消");
                $(".tip").html("提示：您已已取消订单 本次交易失败！");
            } else if (state == 6) {
                $(".dqyqx").html("订单已取消");
                $(".tip").html("提示：对方取消订单 本次交易失败！");
            } else if (state == 7) {
                $(".ddywc").html("订单已完成");
            } else if (state == 8) {
                $(".order-status").html("已收币，请双方评价");
            } else if (state == 9) {
                $(".order-status").html("已收币，请双方评价");
            }
        }
    }
}

function format(value, str) {
    if (value == null || value == "" || typeof (value) == "undefined") {
        return "";
    }

    var date = new Date(value);
    var mat = {};
    mat.M = date.getMonth() + 1;//月份记得加1
    mat.H = date.getHours();
    mat.s = date.getSeconds();
    mat.m = date.getMinutes();
    mat.Y = date.getFullYear();
    mat.D = date.getDate();
    mat.d = date.getDay();//星期几
    mat.d = check_date(mat.d);
    mat.H = check_date(mat.H);
    mat.M = check_date(mat.M);
    mat.D = check_date(mat.D);
    mat.s = check_date(mat.s);
    mat.m = check_date(mat.m);
    if (str.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D + " " + mat.H + ":" + mat.m + ":" + mat.s;
    }
}

//检查是不是两位数字，不足补全
function check_date(str) {
    str = str.toString();
    if (str.length < 2) {
        str = '0' + str;
    }
    return str;
}

function chicangzhouqi(createtime) {

    var date = new Date();
    var createtimes = new Date(createtime);
    var time = (date.getTime() - createtimes.getTime()) / 1000;
    var hour = Math.floor(time / (60 * 60));
    var minute = Math.floor(time / 60) - (hour * 60);
    var second = Math.floor(time) - (hour * 60 * 60) - (minute * 60);
    return hour + ":" + minute + ":" + second;
}

function unde(value, type) {
    if (typeof (value) == "undefined") {
        return type;
    } else {
        return value;
    }

}