var token;
var userid;
var language;
var currencyid;
var currency_name;
var num = 10;
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
        url: "../usdtfb/FbCurrency/FbCurrencySelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var currency_list = data.currency;
                for (var i in currency_list) {
                    var currency = currency_list[i];
                    var str = "";
                    if (i == 0) {
                        str += "<li role=\"presentation\" class=\"active\">";
                        currencyid = currency.pid;
                        currency_name = currency.name;
                    } else {
                        str += "<li role=\"presentation\">";

                    }
                    str += "<a  onclick=\"tiaozhuan('" + currency.pid + "',this)\">" + currency.name + "</a>";
                    str += "</li>";

                    $("#class_ul").append(str);
                }
                sell(1);
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

function sell(page) {
    var pre = (page - 1) * num;
    var str = "";
    $.ajax({
        url: "../usdtfb/LFbSell/LFbSellSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyid: currencyid,
            type: 1,
            pay: null,
            page: pre,
            num: num
        },
        success: function (data) {
            if (data.code == 100) {
                var info_list = data.sell;
                if (language == 2) {
                    str += "<li>";
                    str += "<ul class=\"table-title\">";
                    str += "<li class=\"w1 text-left\">Nickname/User</li>";
                    str += "<li class=\"w2\">play</li>";
                    str += "<li class=\"w6\">Sales volume</li>";
                    str += "<li class=\"w3\">Limit quantity</li>";
                    str += "<li class=\"w4\">Price/unit price</li>";
                    str += "<li class=\"w5\">transaction<small>(0 Commission)</small></li>";
                    str += "</ul> </li>";
                } else {
                    str += "<li>";
                    str += "<ul class=\"table-title\">";
                    str += "<li class=\"w1 text-left\">昵称/用户</li>";
                    str += "<li class=\"w2\">支付款方式</li>";
                    str += "<li class=\"w6\">出售量</li>";
                    str += "<li class=\"w3\">限额量</li>";
                    str += "<li class=\"w4\">价格/单价</li>";
                    str += "<li class=\"w5\">交易<small>(0手续费)</small></li>";
                    str += "</ul> </li>";

                }

                for (var i in info_list) {
                    var sell_info = info_list[i];

                    str += "<li class=\"table\">";
                    str += "<ul class=\"tableHeader\">";
                    str += "<li class=\"w1 text-left table-member\">";
                    str += "<a href=\"\">";
                    str += "<img src=" + sell_info.img + "  class=\"circle-img\">";
                    str += "<div class=\"title\">";
                    str += sell_info.nickname;
                    str += "<span class=\"v-grade\"> " + sell_info.type + " </span>";
                    if (language == 2) {
                        if (sell_info.real_name == "0") {
                            str += "<span class=\"v-certification\">Uncertified</span>";
                        } else {
                            str += "<span class=\"v-certification\">identification</span>";
                        }
                    } else {
                        if (sell_info.real_name == "0") {
                            str += "<span class=\"v-certification\">未认证</span>";
                        } else {
                            str += "<span class=\"v-certification\">认证</span>";
                        }

                    }

                    str += "</div>";
                    str += "<div class=\"info\">";
                    if (language == 2) {
                        str += "<span>trade" + sell_info.trad_volume + "</span>";
                        str += "<span>trust" + sell_info.reputation + "%</span>";
                    } else {
                        str += "<span>交易" + sell_info.trad_volume + "</span>";
                        str += "<span>信任度" + sell_info.reputation + "%</span>";
                    }

                    str += "</div> </a> </li>";
                    str += "<li class=\"w2\">";

                    if (sell_info.pay_bank == "1") {
                        str += "<a href=\"\"><img src=\"img/gm/zf-1.png\" ></a>";
                    }

                    if (sell_info.pay_wx == "1") {
                        str += "<a href=\"\"><img src=\"img/gm/zf-2.png\" ></a>";
                    }

                    if (sell_info.pay_al == "1") {
                        str += "<a href=\"\"><img src=\"img/gm/zf-3.png\" ></a>";
                    }

                    str += "<li class=\"w6\">" + sell_info.number + " " + currency_name + "</li>";
                    str += "</li><li class=\"w3\">" + sell_info.min_money + " - " + sell_info.max_money + " CNY</li>";
                    str += "<li class=\"w4 orangeColor\">" + sell_info.univalent + " CNY</li>";
                    if (language == 2) {
                        str += "<li class=\"w5\"><a href=\"FaBiJiaoYi-Wycs-o.html?pid=" + sell_info.pid + "\" class=\"btn btn-danger\">Sell" + currency_name + "</a></li>";

                    } else {
                        str += "<li class=\"w5\"><a href=\"FaBiJiaoYi-Wycs-o.html?pid=" + sell_info.pid + "\" class=\"btn btn-danger\">出售" + currency_name + "</a></li>";

                    }
                    str += "</ul> </li>";
                }
                $("#sell_info").html(str);
                fenye(data.total, page, num, "sell", "tradeEndDynamic_page");
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                sell(page);
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function tiaozhuan(id, th) {
    currencyid = id;
    currency_name = $(th).text();
    $("li[role='presentation']").attr("class", "");
    $(th).parent().attr("class", "active");
    sell(1);
}