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
    w_select();
    q_select();
});

function select() {
    $.ajax({
        url: "../usdtfb/FbProblemClass/FbProbleamClassSelect",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.ProblemClass) {
                    var ProblemClass = data.ProblemClass[i];
                    str += "<option value =\"" + ProblemClass.pid + "\">" + ProblemClass.title + "</option>";
                }
                $("#problem_class").html(str);
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

function w_select() {
    $.ajax({
        url: "../usdtfb/FbProblem/FbProbleamSelect",
        method: "POST",
        data: {
            state: 0
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.problem) {
                    var problem = data.problem[i];
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
                }
                $("#w_list").html(str);
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                w_select();
            } else {
                tunchu("服务器连接失败！");
            }

        },
        error: function (err) {

        }
    });
}

function q_select() {
    $.ajax({
        url: "../usdtfb/FbProblem/FbProbleamSelect",
        method: "POST",
        data: {
            state: 1
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (data) {
            if (data.code == 100) {
                var str = "";
                for (var i in data.problem) {
                    var problem = data.problem[i];
                    str += "<li>";

                    if (language == 2) {
                        str += "<p>Question number：<span>" + problem.id + "</span></p>";
                        str += "<p>Question type：<span>" + problem.title + " " + problem.message + "</span></p>";
                        str += "<p>Submit time：<span>" + problem.createtime + "</span></p>";
                        str += "<a href=\"feedback-reply.html?pid=" + problem.pid + "\">See</a>";
                    } else {
                        str += "<p>问题编号：<span>" + problem.id + "</span></p>";
                        str += "<p>问题类型：<span>" + problem.title + " " + problem.message + "</span></p>";
                        str += "<p>提交时间：<span>" + problem.createtime + "</span></p>";
                        str += "<a href=\"feedback-reply.html?pid=" + problem.pid + "\">查看</a>";
                    }

                    str += "</li>";
                }
                $("#q_list").html(str);
            } else if (data.code == 101) {
                tunchu("暂无数据！");
            } else if (data.code == 103) {
                tunchu("服务器连接失败！");
            } else if (data.code == 401) {
                tokenLoseEfficacy();
                token = window.sessionStorage.getItem("token");
                q_select();
            } else {
                tunchu("服务器连接失败！");
            }

        },
        error: function (err) {

        }
    });
}

function tc_file(id) {
    $("#inputfile" + id).click();
}

$('#inputfile1').change(function () {
    var file = $('#inputfile1').get(0).files[0];
    //创建用来读取此文件的对象
    var reader = new FileReader();
    //使用该对象读取file文件
    reader.readAsDataURL(file);
    //读取文件成功后执行的方法函数
    reader.onload = function (e) {
        //读取成功后返回的一个参数e，整个的一个进度事件
        console.log(e);
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        $('#img1').get(0).src = e.target.result;
    }
    $("#li_i1").hide();
    $("#li_img1").show();
})
$('#inputfile2').change(function () {
    var file = $('#inputfile2').get(0).files[0];
    //创建用来读取此文件的对象
    var reader = new FileReader();
    //使用该对象读取file文件
    reader.readAsDataURL(file);
    //读取文件成功后执行的方法函数
    reader.onload = function (e) {
        //读取成功后返回的一个参数e，整个的一个进度事件
        console.log(e);
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        $('#img2').get(0).src = e.target.result;
    }
    $("#li_i2").hide();
    $("#li_img2").show();
})
$('#inputfile3').change(function () {
    var file = $('#inputfile3').get(0).files[0];
    //创建用来读取此文件的对象
    var reader = new FileReader();
    //使用该对象读取file文件
    reader.readAsDataURL(file);
    //读取文件成功后执行的方法函数
    reader.onload = function (e) {
        //读取成功后返回的一个参数e，整个的一个进度事件
        console.log(e);
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        $('#img3').get(0).src = e.target.result;
    }
    $("#li_i3").hide();
    $("#li_img3").show();
})

function qd() {
    var problem_class = $("#problem_class").val();
    var message = $("#message").val();
    var file1 = $('#inputfile1').get(0).files[0];
    var file2 = $('#inputfile2').get(0).files[0];
    var file3 = $('#inputfile3').get(0).files[0];

    var formdata = new FormData();
    formdata.append("classid", problem_class);
    formdata.append("message", message);
    formdata.append("files[]", file1);
    formdata.append("files[]", file2);
    formdata.append("files[]", file3);
    formdata.append("orderid", pid);

    $.ajax({
        url: "../usdtfb/FbProblem/FbProbleamInsert",
        method: "POST",
        data: formdata,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.code == 100) {
                w_select();
                tunchu("工单提交成功");
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