function loadProperties() {
    $.i18n.properties({
        name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
        path: 'js/i18n/',   //注意这里路径是你属性文件的所在文件夹
        mode: 'map',
        language: "en",     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
        callback: function () {
            console.info($("[data-locale]"));
            $("[data-locale]").each(function () {
                $(this).html($.i18n.prop($(this).data("locale")));

            });
        }
    });
}

function loadProperties_trade() {
    $.i18n.properties({
        name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
        path: '../js/i18n/',   //注意这里路径是你属性文件的所在文件夹
        mode: 'map',
        language: "en",     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
        callback: function () {
            console.info($("[data-locale]"));
            $("[data-locale]").each(function () {
                $(this).html($.i18n.prop($(this).data("locale")));

            });
        }
    });
}
