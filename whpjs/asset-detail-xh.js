var token;
var userid;
var currency_name;
var language;

$(function () {
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    changHead(userid);
    currency_name = GetRequest().currencyName;

    if (language != undefined && language != null & language == 2) {
        loadProperties();
    }

    if (currency_name == "USDT") {
        $("#usdtClass").attr("class", "active");
    } else {
        $("#bruClass").attr("class", "active");
    }

    transferGet();
});

function transferGet() {
    var str = "";
    $.ajax({
        url: "../usdtfb/LFbTransferXh/LFbTransferXhSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyid: currency_name
        },
        success: function (data) {
            if (data.code == 100) {

                for (var i in data.transferList) {
                    var transferInfo = data.transferList[i];

                    str += "<tr>";
                    str += "<td class=\"text-left p-l-20\">" + format(transferInfo.createtime, "yyyy-MM-dd HH:mm:ss") + "</td>";

                    if (language == 2) {
                        str += "<td>Account transfer</td>";
                    } else {
                        str += "<td>账户划转</td>";
                    }

                    str += "<td>" + transferInfo.from_money + " " + currency_name + "</td>";
                    str += "<td class=\"text-left font14\">";

                    if (language == 2) {
                        if (transferInfo.type == "0") {
                            str += "<p>Transfer to spot</p>";
                        } else {
                            str += "<p>Transfer to French currency</p>";
                        }
                    } else {
                        if (transferInfo.type == "0") {
                            str += "<p>转出到现货</p>";
                        } else {
                            str += "<p>转出到法币</p>";
                        }
                    }

                    str += "</td></tr>"
                }
                $("#transferInfo").html(str);
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                transferGet();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {
            tunchu("服务器连接失败！");
        }
    });
}

function tiaozhuan(name, th) {
    currency_name = name;
    $("li[role='presentation']").attr("class", "");
    $(th).parent().attr("class", "active");

    transferGet();
}
