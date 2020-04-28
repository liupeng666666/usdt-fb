var token;
var userid;
var language;
var state = 0;
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
    select(1);
});

function select(page) {
    var p = (page - 1) * num;
    $.ajax({
        url: "../usdtfb/FbOrder/FbOrderSelectQ",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {
            state: state,
            page: p,
            num: num
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.order) {
                    var order = data.order[i];
                    str += "<tr>";
                    str += "<td class=\"text-left\">";
                    str += "<div class=\"table-member\">";
                    str += "<a href=\"\">";
                    str += "	<img src=\"" + order.img + "\"  class=\"circle-img\">";
                    str += "	<div class=\"title\">";
                    str += "<span class=\"v-grade\">" + order.grade_type + "</span>";
                    if (language == 2) {
                        if (order.real_name == "0") {
                            str += "<span class=\"v-certification\">Uncertified</span>";
                        } else {
                            str += "<span class=\"v-certification\">identification</span>";
                        }
                    } else {
                        if (order.real_name == "0") {
                            str += "<span class=\"v-certification\">未认证</span>";
                        } else {
                            str += "<span class=\"v-certification\">认证</span>";
                        }

                    }
                    str += "</div>";
                    str += "<div class=\"info\">";
                    str += order.nickname;
                    str += "</div>";
                    str += "</a>";
                    str += "</div>";
                    str += "</td>";
                    str += "<td>" + order.id + "</td>";
                    if (language == 2) {
                        if (order.type == 0) {
                            str += "<td>purchase" + order.currency_name + "</td>";
                        } else {
                            str += "<td>sell" + order.currency_name + "</td>";
                        }
                    } else {
                        if (order.type == 0) {
                            str += "<td>购买" + order.currency_name + "</td>";
                        } else {
                            str += "<td>出售" + order.currency_name + "</td>";
                        }
                    }

                    str += "<td>" + order.money + "CNY</td>  ";
                    str += "<td>" + order.number + "" + order.currency_name + "</td>";
                    str += "<td>" + order.time + "<br>" + order.date + "</td>  ";
                    if (order.state == 0 || order.state == 1 || order.state == 2 || order.state == 3 || order.state == 4 || order.state == 8 || order.state == 9) {
                        if (language == 2) {
                            str += "<td>Have in hand</td>";
                        } else {
                            str += "<td>进行中</td>";
                        }
                        var jyxq = "查看交易详情";
                        if (language == 2) {
                            jyxq = "transaction details";
                        }
                        if (data.userid == order.userid) {
                            if (order.state == 0) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step1.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 1) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step2.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 2) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step2.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 3) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 4) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 8) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 9) {
                                str += "<td><a class=\"detail-link\" href=\"Goumai-Step4.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            }
                        } else {
                            if (order.state == 0) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step1.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 1) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step1.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 2) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step2.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 3) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 4) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 8) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step4.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            } else if (order.state == 9) {
                                str += "<td><a class=\"detail-link\" href=\"chushou-Step3.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                            }
                        }
                    } else if (order.state == 5 || order.state == 6) {
                        if (language == 2) {
                            str += "<td class=\"redColor\">Cancelled</td>";
                        } else {
                            str += "<td class=\"redColor\">已取消</td>";
                        }

                        str += "<td><a class=\"detail-link\" href=\"Goumai-Step5.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                    } else {
                        if (language == 2) {
                            str += "<td class=\"greenColor\">success</td>";
                        } else {
                            str += "<td class=\"greenColor\">已完成</td>";
                        }

                        if (data.userid == order.userid) {
                            str += "<td><a class=\"detail-link\" href=\"Goumai-Step4.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                        } else {
                            str += "<td><a class=\"detail-link\" href=\"chushou-Step4.html?pid=" + order.pid + "\">" + jyxq + "</a></td>";
                        }

                    }

                    str += "</tr> ";
                }

                $("#ul_html").html(str);
                fenye(data.total, page, num, "select", "tradeEndDynamic_page");
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                select(page);
            } else {
                tunchu("服务器连接失败！");
            }

        },
        error: function (err) {

        }
    });
}

function xuanze(id, th) {
    state = id;
    $("li[role='presentation']").attr("class", "");
    $(th).parent().attr("class", "active");
    select(1);
}