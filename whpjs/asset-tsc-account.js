var token;
var assetListTmp;
var assetUsdtListTmp;
var currency_name;
var currency_id;
var accMoney;
var surplus;
var updState;
var profitSum;
var profitSumCny;
var userid;
var language;

$(function () {
    token = window.sessionStorage.getItem("token");
    userid = window.sessionStorage.getItem("userid");
    language = window.localStorage.getItem("language");
    changHead(userid);

    if (language != undefined && language != null & language == 2) {
        loadProperties();
    }

    select();
    selectSet();
    usdtSelect();
});

var profitSumStr = "";
var profitStr = "";

function select() {
    $.ajax({
        url: "../usdtfb/LFbAssetOrder/LFbAssetOrderSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        async: false,
        success: function (data) {
            if (data.code == 100) {
                assetListTmp = data.asset;
                profitSum = data.profitSum;
                profitSumCny = data.profitSumCny;
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select();
                selectSet();
                usdtSelect();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function selectSet() {

    profitSumStr = "";
    profitStr = "";
    if (language == 2) {
        profitSumStr = "<li class=\"title\">Total Assets |</li>";
        profitSumStr += "<li> Total revenue：";
    } else {
        profitSumStr = "<li class=\"title\">资产总计 |</li>";
        profitSumStr += "<li> 总收益：";
    }

    profitSumStr += "<span class=\"orangeColor font24\">$" + profitSum + " <small>≈￥" + profitSumCny + "</small></span>";

    $("#profitSum").html(profitSumStr);

    var account_list = assetListTmp;
    for (var i in account_list) {
        var account_info = account_list[i];

        profitStr += "<tr> <td class=\"text-left p-l-20\"><img src=" + account_info.img + " style=\"width:25px;height:25px;\" class=\"m-r-10\">" + account_info.name + "</td>";
        profitStr += "<td>" + account_info.moneySum + "</td>";
        profitStr += "<td class=\"redColor\">" + account_info.frozen + "</td>";
        profitStr += "<td class=\"greenColor2\">" + account_info.surplus + "</td>";

        if (language == 2) {
            profitStr += "<td> <a href=\"user-assets-recharge.html?currencyName=" + account_info.name + "\" class=\"detail-link detail-link-sm orange-link\">Recharge</a>";
            profitStr += "<a href=\"user-assets-withdraw.html?currencyName=" + account_info.name + "\" class=\"detail-link detail-link-sm\">Cash withdrawal</a>";
            profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">Transaction</a>";
            profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"" + account_info.pid + "\", \"" + account_info.name +
                "\", \"" + account_info.surplus + "\", \"" + account_info.money + "\", 1)'>Transfer</a>";
            profitStr += "<a href=\"user-assets-detail.html?pid=" + account_info.pid + "\"  class=\"detail-link detail-link-sm\">Detailed</a>";
            profitStr += "</td> </tr>";
        } else {
            profitStr += "<td> <a href=\"user-assets-recharge.html?currencyName=" + account_info.name + "\" class=\"detail-link detail-link-sm orange-link\">充值</a>";
            profitStr += "<a href=\"user-assets-withdraw.html?currencyName=" + account_info.name + "\" class=\"detail-link detail-link-sm\">提现</a>";
            profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">交易</a>";
            profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"" + account_info.pid + "\", \"" + account_info.name +
                "\", \"" + account_info.surplus + "\", \"" + account_info.money + "\", 1)'>划转</a>";
            profitStr += "<a href=\"user-assets-detail.html?pid=" + account_info.pid + "\"  class=\"detail-link detail-link-sm\">明细</a>";
            profitStr += "</td> </tr>";
        }
    }

    $("#profitInfoFb").html(profitStr);
}

function usdtSelect() {
    profitStr = "";

    $.ajax({
        url: "../usdtfb/LFbAssetOrder/LFbAssetOrderUsdtSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        async: false,
        success: function (data) {
            if (data.code == 100) {
                assetUsdtListTmp = data.assetUsdt;
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select();
                usdtSelect();
                usdtSelectSet();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function usdtSelectSet() {
    profitStr = "";

    var accountInfo = assetUsdtListTmp;

    profitStr += "<tr> <td class=\"text-left p-l-20\"><img src=\"img/zichan/usdt.png\" >USDT</td>";
    profitStr += "<td>" + accountInfo.surplus + "</td>";
    profitStr += "<td class=\"redColor\">0</td>";
    profitStr += "<td class=\"greenColor2\">" + accountInfo.surplus + "</td>";

    if (language == 2) {
        profitStr += "<td> <a href=\"user-assets-recharge.html\" class=\"detail-link detail-link-sm orange-link\">Recharge</a>";
        profitStr += "<a href=\"user-assets-withdraw.html\" class=\"detail-link detail-link-sm\">Cash withdrawal</a>";
        profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">Transaction</a>";
        profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"\", \"USDT\", \"" + accountInfo.surplus +
            "\", \"" + accountInfo.moneyUsdt + "\", 2)'>Transfer</a>";
        profitStr += "<a href=\"user-assets-detail-xh.html?currencyName=USDT\" class=\"detail-link detail-link-sm\">Detailed</a>";
        profitStr += "</td> </tr>";
    } else {
        profitStr += "<td> <a href=\"user-assets-recharge.html\" class=\"detail-link detail-link-sm orange-link\">充值</a>";
        profitStr += "<a href=\"user-assets-withdraw.html\" class=\"detail-link detail-link-sm\">提现</a>";
        profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">交易</a>";
        profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"\", \"USDT\", \"" + accountInfo.surplus +
            "\", \"" + accountInfo.moneyUsdt + "\", 2)'>划转</a>";
        profitStr += "<a href=\"user-assets-detail-xh.html?currencyName=USDT\" class=\"detail-link detail-link-sm\">明细</a>";
        profitStr += "</td> </tr>";
    }

    profitStr += "<tr> <td class=\"text-left p-l-20\"><img src=\"img/zichan/BRU.png\" >BRU</td>";
    profitStr += "<td>" + accountInfo.bur_money + "</td>";
    profitStr += "<td class=\"redColor\">0</td>";
    profitStr += "<td class=\"greenColor2\">" + accountInfo.bur_money + "</td>";

    if (language == 2) {
        profitStr += "<td> <a href=\"user-assets-recharge.html\" class=\"detail-link detail-link-sm orange-link\">Recharge</a>";
        profitStr += "<a href=\"user-assets-withdraw.html\" class=\"detail-link detail-link-sm\">Cash withdrawal</a>";
        profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">Transaction</a>";
        profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"\", \"BRU\", \"" + accountInfo.bur_money +
            "\", \"" + accountInfo.moneyBru + "\", 2)'>Transfer</a>";
        profitStr += "<a href=\"user-assets-detail-xh.html?currencyName=BRU\" class=\"detail-link detail-link-sm\">Detailed</a>";
        profitStr += "</td> </tr>";
    } else {
        profitStr += "<td> <a href=\"user-assets-recharge.html\" class=\"detail-link detail-link-sm orange-link\">充值</a>";
        profitStr += "<a href=\"user-assets-withdraw.html\" class=\"detail-link detail-link-sm\">提现</a>";
        profitStr += "<a href=\"FaBiJiaoYi-Wygm.html\" class=\"detail-link detail-link-sm\">交易</a>";
        profitStr += "<a href=\"\" class=\"detail-link detail-link-sm\" data-toggle=\"modal\" onclick='transfer(\"\", \"BRU\", \"" + accountInfo.bur_money +
            "\", \"" + accountInfo.moneyBru + "\", 2)'>划转</a>";
        profitStr += "<a href=\"user-assets-detail-xh.html?currencyName=BRU\" class=\"detail-link detail-link-sm\">明细</a>";
        profitStr += "</td> </tr>";
    }

    $("#profitInfoXh").html(profitStr);
}

function transfer(fb_pid, fb_name, fb_surplus, fb_money, state) {
    $(":text").val("");
    $("#message").html("");
    var str = "";
    currency_id = fb_pid;
    currency_name = fb_name;
    accMoney = fb_money;
    surplus = fb_surplus;
    updState = state;

    $("#currencyFrmName").val(fb_name);
    var moneySum = parseInt((fb_money * fb_surplus) * 100) / 100;
    $("#moneySum").val(moneySum + "$");
    if (state == 1) {
        if (language == 2) {
            $("#currencyAcctFrm").val("Legal account");
        } else {
            $("#currencyAcctFrm").val("法币账户");
        }

    } else {
        if (language == 2) {
            $("#currencyAcctFrm").val("Spot account");
        } else {
            $("#currencyAcctFrm").val("现货账户");
        }
    }

    $("#currencyAcctTo").val(1);

    for (var i in assetListTmp) {
        var assetInfoTmp = assetListTmp[i];
        if (fb_name == assetInfoTmp.name) {
        } else {
            str += "<option value=\"" + assetInfoTmp.pid + "\">" + assetInfoTmp.name + "</option>";
        }
    }
    $("#currencyToName").html(str);

    if (language == 2) {
        $("#moneyFrm").attr('placeholder', 'Available assets' + fb_surplus + fb_name);
    } else {
        $("#moneyFrm").attr('placeholder', '可用资产' + fb_surplus + fb_name);
    }

    $("#toTransfer").modal("show");
}


function accChange() {
    var account = $("#currencyAcctTo").val();
    $("#moneyFrm").val("");
    $("#moneyTo").val("");
    var str = "";
    if (account == 1) {
        for (var i in assetListTmp) {
            var assetInfoTmp = assetListTmp[i];
            if (currency_name == assetInfoTmp.name) {
            } else {
                str += "<option value=\"" + assetInfoTmp.pid + "\">" + assetInfoTmp.name + "</option>";
            }
        }
    } else {
        if (currency_name == "USDT") {
            str += "<option value=\"2\">BRU</option>";
        } else if (currency_name == "BRU") {
            str += "<option value=\"1\">USDT</option>";
        } else {
            str += "<option value=\"1\">USDT</option>";
            str += "<option value=\"2\">BRU</option>";
        }
    }
    $("#currencyToName").html(str);
}

function currencyChange() {
    $("#moneyFrm").val("");
    $("#moneyTo").val("");
}

function qiehuan(money, id) {
    if (money == null || money == 0) {
        money = 0
    } else {
        money = parseFloat(money);
    }

    $("#message").html("");
    var account = $("#currencyAcctTo").val();
    var currencyToName = $("#currencyToName").find("option:selected").text();
    var accCurrencyMoney = 0;

    if (account == 1) {
        for (var i in assetListTmp) {
            var assetInfoTmp = assetListTmp[i];
            if (currencyToName == assetInfoTmp.name) {
                accCurrencyMoney = assetInfoTmp.money;
            }
        }
    } else {
        if (currencyToName == "USDT") {
            accCurrencyMoney = assetUsdtListTmp.moneyUsdt;
        } else {
            accCurrencyMoney = assetUsdtListTmp.moneyBru;
        }
    }

    var accMoneyTo = parseInt(((money * accMoney) / accCurrencyMoney) * 100000000) / 100000000;
    $("#" + id).val(accMoneyTo);

    if (isNaN(money)) {
        if (language == 2) {
            $("#message").html("The number of transitions must be numerical！");
        } else {
            $("#message").html("划转数量必须是数值！");
        }
    } else if (money > surplus) {
        if (language == 2) {
            $("#message").html("The quantity you entered exceeds the remaining quantity of this order!");
        } else {
            $("#message").html("您输入的数量超出了本订单剩余数量!");
        }
    }
}

function updateClick() {
    $("#message").html("");
    var currencyFrmId = "";
    var currencyToId = "";
    var moneyKeyFrm = "";
    var moneyKeyTo = "";
    var currencyFrmName = $("#currencyFrmName").val();
    var currencyToName = $("#currencyToName").find("option:selected").text();

    var surplusUpd = $("#moneyFrm").val();
    surplusUpd = parseFloat(surplusUpd);

    if (surplusUpd == null || surplusUpd == "" || surplusUpd == 0) {
        if (language == 2) {
            $("#message").html("The number of transfers should not be empty or zero！");
        } else {
            $("#message").html("划转数量不能为空或者0！");
        }

        return false;
    } else if (isNaN(surplusUpd)) {
        if (language == 2) {
            $("#message").html("The number of transitions must be numerical！");
        } else {
            $("#message").html("划转数量必须是数值！");
        }
        return false;
    } else if (surplusUpd > surplus) {

        if (language == 2) {
            $("#message").html("Transfer quantity shall not exceed the remaining quantity of this order!");
        } else {
            $("#message").html("划转数量不能超过本订单剩余数量!");
        }
        return false;
    }

    var account = $("#currencyAcctTo").val();
    if (updState == 1 && account == 1) {
        currencyFrmId = currency_id;
        currencyToId = $("#currencyToName").val();
    } else if (updState == 1 && account == 2) {
        currencyFrmId = currency_id;
        currencyToId = null;
    } else if (updState == 2 && account == 1) {
        currencyFrmId = null;
        currencyToId = $("#currencyToName").val();
    } else {
        currencyFrmId = null;
        currencyToId = null;
    }

    for (var i in assetListTmp) {
        var assetInfoTmp = assetListTmp[i];
        if (currencyFrmId == assetInfoTmp.pid) {
            moneyKeyFrm = assetInfoTmp.currencyid;
        }

        if (currencyToId == assetInfoTmp.pid) {
            moneyKeyTo = assetInfoTmp.currencyid;
        }
    }

    if (moneyKeyFrm == null || moneyKeyFrm == "") {
        if (currencyFrmName == "USDT") {
            moneyKeyFrm = "usdt";
        } else if (currencyFrmName == "BRU") {
            moneyKeyFrm = "bru";
        }
    }

    if (moneyKeyTo == null || moneyKeyTo == "") {
        if (currencyToName == "USDT") {
            moneyKeyTo = "usdt";
        } else if (currencyToName == "BRU") {
            moneyKeyTo = "bru";
        }
    }

    $.ajax({
        type: "post",
        url: "../usdtfb/LFbAssetOrder/LFbAssetOrderUpdate",
        async: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyFrmId: currencyFrmId,
            currencyToId: currencyToId,
            moneyKeyFrm: moneyKeyFrm,
            moneyKeyTo: moneyKeyTo,
            currencyFrmName: currencyFrmName,
            currencyToName: currencyToName,
            surplusUpd: surplusUpd
        },
        success: function (info) {
            var str = "";
            if (info.code == 100) {

                if (updState == 1) {
                    select();
                    selectSet();
                    usdtSelect();
                } else if (updState == 2) {
                    select();
                    usdtSelect();
                    usdtSelectSet();
                }

                $("#toTransfer").modal("hide");
            } else {
                ajax_code(info.code);
            }
        },
        error: function (err) {
            ajax_code(500);
        }
    });
}