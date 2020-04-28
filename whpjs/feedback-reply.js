var token;
var userid;
var pid;
var language;

$(function () {
    pid = GetRequest().pid;
    userid = window.sessionStorage.getItem("userid");
    token = window.sessionStorage.getItem("token");
    language = window.localStorage.getItem("language");
    changHead(userid);

    if (language != undefined && language != null & language == 2) {
        loadProperties();
    }

    select();
});

function select() {
    $.ajax({
        url: "../usdtfb/FbProblem/FbProbleamDan",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        data: {pid: pid},
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                var problem = data.problem;
                str += "<li>";

                if (language == 2) {
                    str += "<p>Question number：<span>" + problem.id + "</span></p>";
                    str += "<p>Question type：<span>" + problem.title + " " + problem.message + "</span></p>";
                    str += "<p>Submit time：<span>" + problem.createtime + "</span></p>";
                } else {
                    str += "<p>问题编号：<span>" + problem.id + "</span></p>";
                    str += "<p>问题类型：<span>" + problem.title + " " + problem.message + "</span></p>";
                    str += "<p>提交时间：<span>" + problem.createtime + "</span></p>";
                }

                str += "</li>";
                $("#p_list").html(str);
                $("#programme").val(problem.programme);
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
