var token;
var userid;
var cny;
var zsl = 0;
var msl = 0;
var m_min_trade = 0;
var m_max_trade = 0;
var m_trade = 0;
var z_min_trade = 0;
var z_max_trade = 0;
var z_trade = 0;
var pid;
var currencyid;
var data_currency;
$(function () {
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    pid = GetRequest().pid;
    selectDan();
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
                var str = "";
                data_currency = data.currency;
                for (var i in data.currency) {
                    var currency = data.currency[i];
                    if (currency.pid == currencyid) {
                        str += "<option value='" + currency.pid + "'>" + currency.name + "</option>";
                        qiehuan('m', currency.pid);
                    }

                }
                $("#mcurrency").html(str);

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

function cny_qh(id, value) {
    if (value == "CNY") {
        $("#" + id).val(cny.cny);

    } else {
        $("#" + id).val(cny.money);
    }
}

function jiajian(id, value) {
    var money = $("#" + id + "money").val();

    if (value == 1) {
        if (money < 100) {
            $("#" + id + "money").val(parseInt(money) + value);
            $("#" + id + "bfb").css("width", (parseInt(money) + value) + "%")
        }
    } else {
        if (money > 0) {
            $("#" + id + "money").val(parseInt(money) + value);
            $("#" + id + "bfb").css("width", (parseInt(money) + value) + "%")
        }
    }
}

function quanxuan(id) {
    var money = 0;
    if (id == "m") {
        money = msl;
    } else {
        money = zsl;
    }
    $("#" + id + "sl").val(money);
}

function mqd() {
    var bfb = $("#mmoney").val();
    var univalent = $("#munivalent").val();
    var mmin = $("#mmin").val();
    var mmax = $("#mmax").val();
    var mpassword = $("#mpassword").val();
    var mmemo = $("#mmemo").val();
    var length = $("input[name='mplay']:checked").length;
    var pay_wx = 0;
    var pay_al = 0;
    var pay_bank = 0;
    $('input[name="mplay"]:checked').each(function () {
        var value = $(this).val();
        if (value == 1) {
            pay_bank = 1;

        } else if (value == 2) {
            pay_wx = 1;

        } else {
            pay_al = 1;
        }
    });

    if (univalent == "") {
        tunchu("单价不能为空");
        return false;
    }
    if (mmin == "") {
        tunchu("单次最小成交不能为空");
        return false;
    }
    if (mmax == "") {
        tunchu("单次最大成交不能为空");
        return false;
    }
    if (mpassword == "") {
        tunchu("二级交易面不能为空");
        return false;
    }
    if (length == 0) {
        tunchu("请选择至少一种支付方式");
        return false;
    }
    if (m_min_trade > mmin) {
        tunchu("单笔最小成交额不能小于单笔最低成交额");
        return false;
    }
    if (mmin > m_max_trade) {
        tunchu("单笔最小成交额不能大于单笔最高成交额");
        return false;
    }
    if (m_max_trade < mmax) {
        tunchu("单笔最大成交额不能小于单笔最高成交额");
        return false;
    }
    if (mmax < m_min_trade) {
        tunchu("单笔最大成交额不能大于单笔最低成交额");
        return false;
    }

    $.ajax({
        url: "../usdtfb/FbSell/FbSellUpdate",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            univalent: univalent,
            min_money: mmin,
            max_money: mmax,
            bfb: bfb,
            memo: mmemo,
            password: mpassword,
            pay_wx: pay_wx,
            pay_al: pay_al,
            pay_bank: pay_bank,
            pid: pid
        },
        success: function (data) {
            if (data.code == 100) {
                chenggong("修改成功");
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 102) {
                tunchu("参数不全，请确认");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 104) {
                tunchu("订单进行中，无法进行修改");
            } else if (data.code == 105) {
                tunchu("交易密码不正确！");
            } else if (data.code == 106) {
                tunchu("请先绑定谷歌验证！");
            } else if (data.code == 107) {
                tunchu("谷歌验证码不正确！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                mqd();
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function qiehuan(id, value) {
    for (var i in data_currency) {
        var currency = data_currency[i];
        if (currency.pid == value) {
            if (id == "m") {
                $("#mmin").attr("placeholder", currency.min_trade);
                $("#mmax").attr("placeholder", currency.max_trade);
                m_min_trade = currency.min_trade;
                m_max_trade = currency.max_trade;
                m_trade = currency.trade_num;

            } else {
                $("#zmin").attr("placeholder", currency.min_trade);
                $("#zmax").attr("placeholder", currency.max_trade);
                z_min_trade = currency.min_trade;
                z_max_trade = currency.max_trade;
                z_trade = currency.trade_num;
            }
            select_dan(value, id, currency.currencyid);
        }
    }
}

function select_dan(fbcurrencyid, id, currencyid) {
    $.ajax({
        url: "../usdtfb/FbCurrency/FbCurrencyDan",
        method: "POST",
        data: {
            fbcurrencyid: fbcurrencyid,
            currencyid: currencyid
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                if (id == "m") {
                    $("#mcny").val(data.cny.cny);
                    $("#mky").val(data.money.money.surplus);
                    $(".mcurrency").html(data.money.money.name);

                    msl = data.money.money.surplus;
                } else {
                    $("#zcny").val(data.cny.cny);
                    $("#zky").val(data.money.money.surplus);
                    $(".zcurrency").html(data.money.money.name);
                    zsl = data.money.money.surplus;
                }

            } else if (data.code == 101) {
                if (language == 2) {
                    tunchu("No data");
                } else {
                    tunchu("暂无数据");
                }
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select_dan(fbcurrencyid, id, currencyid);
            } else {
                if (language == 2) {
                    tunchu("Network problems, please try again.");
                } else {
                    tunchu("网络出现问题,请重试");
                }
            }
        },
        error: function (err) {
        }
    });

}

function selectDan() {
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
                var sell = data.sell;
                currencyid = sell.fb_currency_id;
                $("#mmoney").val(sell.bfb);
                $("#mbfb").css("width", sell.bfb + "%");
                $("#munivalent").val(sell.univalent);
                $("#msl").val(sell.number);
                $("#mmin").val(sell.min_money);
                $("#mmax").val(sell.max_money);
                $("#mmemo").val(sell.memo);
                $('input[name="mplay"]').each(function () {
                    var value = $(this).val();

                    if (value == 1) {

                        if (sell.pay_bank == 1) {
                            $(this).iCheck('check');
                        }

                    } else if (value == 2) {
                        if (sell.pay_wx == 1) {
                            $(this).iCheck('check');
                        }

                    } else {
                        if (sell.pay_al == 1) {
                            $(this).iCheck('check');
                        }
                    }
                });
                if (sell.state == 1) {
                    $("#fabumaibi").html("发布买币");
                } else {
                    $("#fabumaibi").html("发布卖币");
                }
                select();
            } else if (data.code == 401) {

                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                selectDan();
            }

        },
        error: function (err) {

        }
    })
}