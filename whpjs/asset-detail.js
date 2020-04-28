var token;
var userid;
var currencyPreid;
var currencyid;
var currency_name;
var gmOrderList;
var scOrderList;
var transferList;
var language;

$(function () {
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    currencyPreid = GetRequest().pid;
    changHead(userid);
    if (language != undefined && language != null & language == 2) {
        loadProperties();
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
                    if (currencyPreid == currency.pid) {
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

                orderInfoGet();
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
            tunchu("服务器连接失败！");
        }
    });
}

function orderInfoGet() {
    var str = "";
    $.ajax({
        url: "../usdtfb/LFbAssetOrderDetail/LFbAssetOrderDetailSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyid: currencyid
        },
        success: function (data) {
            if (data.code == 100) {
                gmOrderList = data.gmList;
                scOrderList = data.scList;
                transferList = data.transferList;

                for (var i in gmOrderList) {
                    var gmOrderInfo = gmOrderList[i];

                    str += "<tr>";
                    str += "<td class=\"text-left p-l-20\">" + format(gmOrderInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>"
                    if (language == 2) {
                        str += "<td>Trading buy</td>";
                    } else {
                        str += "<td>交易买入</td>";
                    }

                    str += "<td>" + gmOrderInfo.number + " " + currency_name + "</td>";
                    str += "<td class=\"text-left font14\">";

                    if (language == 2) {
                        str += "<p>Type: Trading buy</p>";
                        str += "<p>Price：" + gmOrderInfo.money + " CNY</p>";
                        str += "<p>Order number：" + gmOrderInfo.id + "</p>";
                    } else {
                        str += "<p>类型：交易买入</p>";
                        str += "<p>价格：" + gmOrderInfo.money + " CNY</p>";
                        str += "<p>订单编号：" + gmOrderInfo.id + "</p>";
                    }

                    str += "</td></tr>"
                }
                $("#orderInfo").html(str);
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                orderInfoGet();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {
            tunchu("服务器连接失败！");
        }
    });
}

function gmOrderInfoSet() {
    var str = "";
    $("#orderInfo").html("");

    for (var i in gmOrderList) {
        var gmOrderInfo = gmOrderList[i];

        str += "<tr>";
        str += "<td class=\"text-left p-l-20\">" + format(gmOrderInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>"

        if (language == 2) {
            str += "<td>Trading buy</td>";
        } else {
            str += "<td>交易买入</td>";
        }

        str += "<td>" + gmOrderInfo.number + " " + currency_name + "</td>";
        str += "<td class=\"text-left font14\">";

        if (language == 2) {
            str += "<p>Type: Trading buy</p>";
            str += "<p>Price：" + gmOrderInfo.money + " CNY</p>";
            str += "<p>Order number：" + gmOrderInfo.id + "</p>";
        } else {
            str += "<p>类型：交易买入</p>";
            str += "<p>价格：" + gmOrderInfo.money + " CNY</p>";
            str += "<p>订单编号：" + gmOrderInfo.id + "</p>";
        }

        str += "</td></tr>"
    }
    $("#orderInfo").html(str);
}

function scOrderInfoSet() {
    var str = "";
    $("#orderInfo").html("");

    for (var i in scOrderList) {
        var scOrderInfo = scOrderList[i];

        str += "<tr>";
        str += "<td class=\"text-left p-l-20\">" + format(scOrderInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>"

        if (language == 2) {
            str += "<td>Trading sell</td>";
        } else {
            str += "<td>交易卖出</td>";
        }

        str += "<td>" + scOrderInfo.number + " " + currency_name + "</td>";
        str += "<td class=\"text-left font14\">";

        if (language == 2) {
            str += "<p>Type：Trading sell</p>";
            str += "<p>Price：" + scOrderInfo.money + " CNY</p>";
            str += "<p>Order number：" + scOrderInfo.id + "</p>";
        } else {
            str += "<p>类型：交易卖出</p>";
            str += "<p>价格：" + scOrderInfo.money + " CNY</p>";
            str += "<p>订单编号：" + scOrderInfo.id + "</p>";
        }

        str += "</td></tr>"
    }

    $("#orderInfo").html(str);
}

function transferInfoSet() {
    var str = "";
    $("#orderInfo").html("");

    for (var i in transferList) {
        var transferInfo = transferList[i];

        str += "<tr>";
        str += "<td class=\"text-left p-l-20\">" + format(transferInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>"

        if (language == 2) {
            str += "<td>Account transfer</td>";
        } else {
            str += "<td>账户划转</td>";
        }

        str += "<td>" + transferInfo.from_money + " " + currency_name + "</td>";
        str += "<td class=\"text-left font14\">";

        if (transferInfo.type == "1") {

            if (language == 2) {
                str += "<p>Transfer to French currency</p>"
            } else {
                str += "<p>转出到法币</p>"
            }

        } else {

            if (language == 2) {
                str += "<p>Transfer to spot</p>"
            } else {
                str += "<p>转出到现货</p>"
            }
        }

        str += "</td></tr>"
    }
    $("#orderInfo").html(str);
}

function tiaozhuan(id, th) {
    currencyid = id;
    currency_name = $(th).text();
    $("li[role='presentation']").attr("class", "");
    $(th).parent().attr("class", "active");

    orderInfoGet();
    $("#detailOne").attr("class", "active");
}

function detailGet(id, th) {
    $("li[role='presentation']").attr("class", "");
    $(th).parent().attr("class", "active");

    if (id == 1) {
        gmOrderInfoSet();
    } else if (id == 2) {
        scOrderInfoSet();
    } else {
        transferInfoSet();
    }

}
