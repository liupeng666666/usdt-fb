var token;
var userid;
var style = 0;
var num = 4;
var totalAqu;
var totalBqu;
var language;

$(function () {
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    changHead(userid);

    if (language != undefined && language != null & language == 2) {
        loadProperties();
    }

    // AQU进行中订单情报取得
    select(1, 0);
});

/**
 * 根据用户id分区查询最近订单
 * @param style
 */
function select(page, pageType) {

    if (pageType == null) {
        $("li[role='presentation']").each(function () {
            if ($(this).attr("class") == "active") {
                style = $(this).attr("data");
            }

        });
    }

    var pre = (page - 1) * num;

    $.ajax({
        url: "../usdtpc/auth/getOrderByTradeSector",
        data: {
            "userid": userid,
            "style": style,
            "begintime": null,
            "endtime": null,
            "page": pre,
            "number": num,
            "state": "1"
        },
        method: "GET",
        success: function (data) {
            if (data.code == 100) {
                var result = data.order;
                var str = "";

                for (var i = 0; i < result.length; i++) {
                    var dataInfo = result[i];
                    str += "<tr>";
                    str += "<td>" + dataInfo.orderid + "</td>";
                    str += "<td>" + dataInfo.y_name + "</td>";
                    str += "<td>" + unde(dataInfo.beginprice, 0) + "</td>";
                    str += "<td>" + unde(dataInfo.purchase, 0) + "</td>";

                    if (language == 2) {
                        if (dataInfo.rise_fall == 0) {
                            str += "<td class=\"greenColor2\">Buy up</td>";
                        } else if (dataInfo.rise_fall == 1) {
                            str += "<td class=\"redColor\">Buy or fall</td>";
                        }
                    } else {
                        if (dataInfo.rise_fall == 0) {
                            str += "<td class=\"greenColor2\">买涨</td>";
                        } else if (dataInfo.rise_fall == 1) {
                            str += "<td class=\"redColor\">买跌</td>";
                        }
                    }

                    if (style == 0) {
                        str += "<td>" + dataInfo.range + "%</td><td>M" + dataInfo.minute + "</td>";

                        var time = dataInfo.createtime.substring(0, 8);
                        var date = dataInfo.createtime.substring(9, 19);
                        str += "<td>" + time + "<br>" + date + "</td>";

                        if (language == 2) {
                            if (dataInfo.style == "0") {
                                str += "<td>Have in hand</td>";
                                str += "<td>**</td><td>**</td>";
                            } else {
                                str += "<td>Completed</td>";
                                if (dataInfo.income >= 0) {
                                    str += "<td>profit</td><td class=\"greenColor2\">+$" + unde(dataInfo.income, 0) + "</td>";
                                } else {
                                    str += "<td>loss</td><td class=\"redColor\">-$" + (0 - unde(dataInfo.income, 0)) + "</td>";
                                }
                            }
                        } else {
                            if (dataInfo.style == "0") {
                                str += "<td>进行中</td>";
                                str += "<td>**</td><td>**</td>";
                            } else {
                                str += "<td>已完成</td>";
                                if (dataInfo.income >= 0) {
                                    str += "<td>盈利</td><td class=\"greenColor2\">+$" + unde(dataInfo.income, 0) + "</td>";
                                } else {
                                    str += "<td>亏损</td><td class=\"redColor\">-$" + (0 - unde(dataInfo.income, 0)) + "</td>";
                                }
                            }
                        }

                    } else {
                        str += "<td>" + unde(dataInfo.range, 0) + "%</td><td>" + dataInfo.icrease * 100 + "%</td>";
                        var time = dataInfo.createtime.substring(0, 8);
                        var date = dataInfo.createtime.substring(9, 19);
                        str += "<td>" + time + "<br>" + date + "</td>";

                        var positionTime = chicangzhouqi(dataInfo.buytime);

                        if (language == 2) {
                            if (dataInfo.style == "0") {
                                str += "<td>Have in hand</td>";
                                str += "<td>" + positionTime + "</td>";

                                str += "<td>**</td><td>**</td>";
                            } else {
                                str += "<td>Completed</td>";
                                str += "<td>" + positionTime + "</td>";
                                if (dataInfo.income >= 0) {
                                    str += "<td>profit</td><td class=\"greenColor2\">+$" + unde(dataInfo.income, 0) + "</td>";
                                } else {
                                    str += "<td>loss</td><td class=\"redColor\">-$" + (0 - unde(dataInfo.income, 0)) + "</td>";
                                }
                            }
                            str += "<td>Recommend</td>";
                        } else {
                            if (dataInfo.style == "0") {
                                str += "<td>进行中</td>";
                                str += "<td>" + positionTime + "</td>";

                                str += "<td>**</td><td>**</td>";
                            } else {
                                str += "<td>已完成</td>";
                                str += "<td>" + positionTime + "</td>";
                                if (dataInfo.income >= 0) {
                                    str += "<td>盈利</td><td class=\"greenColor2\">+$" + unde(dataInfo.income, 0) + "</td>";
                                } else {
                                    str += "<td>亏损</td><td class=\"redColor\">-$" + (0 - unde(dataInfo.income, 0)) + "</td>";
                                }
                            }
                            str += "<td>推荐</td>";
                        }
                    }
                    str += "</tr>";
                }

                if (style == 0) {

                    $("#aquInfo").html(str);

                    fenye(data.total, page, num, "select", "aquTradeEndDynamic_page");

                    style = 1;
                    select(1, 1);
                } else if (style == 1) {

                    $("#bquInfo").html(str);

                    fenye(data.total, page, num, "select", "bquTradeEndDynamic_page");
                }

            } else {

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (Number(XMLHttpRequest.status) != 0 && XMLHttpRequest.readyState != 0 && textStatus != "error" && errorThrown.length != 0) {
                //alert("网络异常，请您检查网络后刷新页面！");
            } else if ("timeout" == textStatus && "timeout" == errorThrown) {
                //alert("请求超时，请您检查网络后刷新页面！");
            } else {
                //alert("网络异常，请您检查网络后刷新页面！");
            }
        }
    });
}

function pageChange(pageType) {
    if (pageType == 0) {
        $("#aquTradeEndDynamic_page").show();
        $("#bquTradeEndDynamic_page").hide();
    } else {
        $("#aquTradeEndDynamic_page").hide();
        $("#bquTradeEndDynamic_page").show();
    }
}
