var token;
var userid;
var currencyName;
var codeid;
var num = 10;
var language;

$(function () {
    token = window.sessionStorage.getItem("token");
    userid = window.sessionStorage.getItem("userid");
    language = window.localStorage.getItem("language");
    changHead(userid);

    currencyName = GetRequest().currencyName;

    if (language != undefined && language != null & language == 2) {
        loadProperties();
    }

    currencyInfo();

    select(1);

});

function select(page) {

    var pre = (page - 1) * num;

    $.ajax({
        url: "../usdtfb/LFbRecharge/LFbRechargeSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            codeid: codeid,
            style: "2",
            page: pre,
            num: num
        },
        success: function (data) {
            if (data.code == 100) {
                var withDrawList = data.rechargeList;

                var str = "";

                for (var i in withDrawList) {
                    var withDrawInfo = withDrawList[i];

                    str += "<tr>";
                    str += "<td class=\"text-left p-l-20\">" + format(withDrawInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>";
                    str += "<td>" + withDrawInfo.to_address + "</td>";
                    str += "<td>" + withDrawInfo.money + "</td>";

                    if (language == 2) {
                        if (withDrawInfo.examine == "0") {
                            str += "<td>Unaudited</td>";
                        } else if (withDrawInfo.examine == "1") {
                            str += "<td>Audited</td>";
                        } else {
                            str += "<td>Audit failed</td>";
                        }
                    } else {
                        if (withDrawInfo.examine == "0") {
                            str += "<td>未审核</td>";
                        } else if (withDrawInfo.examine == "1") {
                            str += "<td>已审核</td>";
                        } else {
                            str += "<td>审核未通过</td>";
                        }
                    }

                    str += "</tr>";
                }

                $("#withDrawInfo").html(str);
                fenye(data.count, page, num, "select", "tradeEndDynamic_page");

            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select(1);
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {
            tunchu("服务器连接失败！");
        }
    });
}


function currencyInfo() {
    if (currencyName == "ETH") {
        codeid = "1001";
    } else if (currencyName == "ETC") {
        codeid = "2001";
    } else if (currencyName == "BTC") {
        codeid = "1";
    } else if (currencyName == "USDT") {
        codeid = "31";
    } else if (currencyName == "BRU") {
        codeid = "695";
    } else if (currencyName == "BCH") {
        codeid = "3";
    } else if (currencyName == "LTC") {
        codeid = "4";
    }
}