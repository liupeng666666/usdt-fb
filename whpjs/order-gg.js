var token;
var userid;
var language;
var mcurrencyid;
var mstate;
var zcurrencyid;
var zstate;
var number = 10;
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
    msell(1);
    zsell(1);
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
                if (language == 2) {
                    str = "<option value=''>whole</option>";
                } else {
                    str = "<option value=''>全部</option>";
                }

                for (var i in data.currency) {
                    var currency = data.currency[i];
                    str += "<option value='" + currency.pid + "'>" + currency.name + "</option>";

                }
                $("#mcurrency").html(str);
                $("#zcurrency").html(str);
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

function msell(page) {
    $.ajax({
        url: "../usdtfb/FbSell/FbSellSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyid: mcurrencyid,
            state: mstate,
            page: (page - 1) * number,
            num: number,
            type: 0
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.sell) {
                    var sell = data.sell[i];
                    str += "<tr>";
                    str += "<td>" + sell.orderid + "</td>";
                    str += "<td>" + sell.name + "</td>  ";
                    str += "<td>" + sell.date + "<br>" + sell.time + "</td>";
                    str += "<td>" + sell.univalent + "CNY</td>  ";
                    str += "<td>" + sell.number + "" + sell.name + "</td>";
                    str += "<td>" + sell.surplus + "" + sell.name + "</td>";
                    str += "<td>" + sell.complete_number + "" + sell.name + "</td>";
                    if (sell.state == 0) {
                        if (language == 2) {
                            str += "<td>Have in hand</td>";
                        } else {
                            str += "<td>进行中</td>";
                        }
                    } else if (sell.state == 1) {
                        if (language == 2) {
                            str += "<td>Lower shelf</td>";
                        } else {
                            str += "<td>已下线</td>";
                        }
                    } else {
                        if (language == 2) {
                            str += "<td  class=\"greenColor\">success</td>";
                        } else {
                            str += "<td  class=\"greenColor\">已完成</td>";
                        }

                    }
                    if (language == 2) {
                        str += "<td><a class=\"detail-link orange-link\"onclick=\"tiaozhuan('" + sell.pid + "','" + sell.style + "')\"  >edit</a></td>";
                    } else {
                        str += "<td><a class=\"detail-link orange-link\" onclick=\"tiaozhuan('" + sell.pid + "','" + sell.style + "')\" >编辑</a></td>";
                    }

                    str += "</tr> ";
                }

                $("#mhtml").html(str);
                fenye(data.total, page, number, "msell", "mul");
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                msell(page);
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function qiehuan(id) {
    if (id == 'm') {
        $("#mul").show();
        $("#zul").hide();
    } else {
        $("#zul").show();
        $("#mul").hide();
    }
}

function zsell(page) {
    $.ajax({
        url: "../usdtfb/FbSell/FbSellSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            currencyid: zcurrencyid,
            state: zstate,
            page: (page - 1) * number,
            num: number,
            type: 1
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.sell) {
                    var sell = data.sell[i];
                    str += "<tr>";
                    str += "<td>" + sell.orderid + "</td>";
                    str += "<td>" + sell.name + "</td>  ";
                    str += "<td>" + sell.date + "<br>" + sell.time + "</td>";
                    str += "<td>" + sell.univalent + "CNY</td>  ";
                    str += "<td>" + sell.number + "" + sell.name + "</td>";
                    str += "<td>" + sell.surplus + "" + sell.name + "</td>";
                    str += "<td>" + sell.complete_number + "" + sell.name + "</td>";
                    if (sell.state == 0) {
                        if (language == 2) {
                            str += "<td>Have in hand</td>";
                        } else {
                            str += "<td>进行中</td>";
                        }
                    } else if (sell.state == 1) {
                        if (language == 2) {
                            str += "<td>Lower shelf</td>";
                        } else {
                            str += "<td>已下线</td>";
                        }
                    } else {
                        if (language == 2) {
                            str += "<td  class=\"greenColor\">success</td>";
                        } else {
                            str += "<td  class=\"greenColor\">已完成</td>";
                        }

                    }
                    if (language == 2) {
                        str += "<td><a class=\"detail-link orange-link\" onclick=\"tiaozhuan('" + sell.pid + "','" + sell.style + "')\" >edit</a></td>";
                    } else {
                        str += "<td><a class=\"detail-link orange-link\" onclick=\"tiaozhuan('" + sell.pid + "','" + sell.style + "')\">编辑</a></td>";
                    }

                    str += "</tr> ";
                }

                $("#zhtml").html(str);
                fenye(data.total, page, number, "zsell", "zul");
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                zsell(page);
            } else {
                tunchu("服务器连接失败！");
            }
        },
        error: function (err) {

        }
    });
}

function xuanze(id) {
    if (id == 'm') {
        mcurrencyid = $("#mcurrency").val();
        mstate = $("input[name='11']:checked").val();
        msell(1);
    } else {
        zcurrencyid = $("#zcurrency").val();
        zstate = $("input[name='22']:checked").val();
        zsell(1);
    }
}

$('input:radio[name="11"]').change(function () {
    var name = $(this).attr("name");
    if (name == "11") {
        xuanze('m');
    } else {
        xuanze('z');
    }
});

function tiaozhuan(pid, style, currencyid) {
    if (style == 1) {
        tunchu("交易正在进行中无法编辑");
        return false;
    } else {
        window.location.href = "order-umguanggao.html?pid=" + pid;
    }
}

