var token;
var userid;
var currencyName;
var state;
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
            style: "1",
            page: pre,
            num: num
        },
        success: function (data) {
            if (data.code == 100) {
                var rechargeList = data.rechargeList;

                var str = "";

                for (var i in rechargeList) {
                    var rechargeInfo = rechargeList[i];

                    str += "<tr>";
                    str += "<td class=\"text-left p-l-20\">" + format(rechargeInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>";
                    str += "<td>" + rechargeInfo.from_wallet + "</td>";
                    str += "<td>" + rechargeInfo.money + "</td>";

                    if (language == 2) {
                        if (rechargeInfo.examine == "0") {
                            str += "<td>Unaudited</td>";
                        } else if (rechargeInfo.examine == "1") {
                            str += "<td>Audited</td>";
                        } else {
                            str += "<td>Audit failed</td>";
                        }
                    } else {
                        if (rechargeInfo.examine == "0") {
                            str += "<td>未审核</td>";
                        } else if (rechargeInfo.examine == "1") {
                            str += "<td>已审核</td>";
                        } else {
                            str += "<td>审核未通过</td>";
                        }
                    }

                    str += "</tr>";
                }

                $("#rechargeInfo").html(str);
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
        state = 1;
        codeid = "1001";
    } else if (currencyName == "ETC") {
        state = 2;
        codeid = "2001";
    } else if (currencyName == "BTC") {
        state = 3;
        codeid = "1";
    } else if (currencyName == "USDT") {
        state = 3;
        codeid = "31";
    } else if (currencyName == "BRU") {
        state = 3;
        codeid = "695";
    } else if (currencyName == "BCH") {
        state = 4;
        codeid = "3";
    } else if (currencyName == "LTC") {
        state = 5;
        codeid = "4";
    }

    $.ajax({
        url: "../usdtfb/FbWallet/Address",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            codeid: state
        },
        success: function (data) {
            if (data.code == 100) {
                var address = data.address;

                $("#address").val(address);

            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                currencyInfo();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {
            tunchu("服务器连接失败！");
        }
    });
}