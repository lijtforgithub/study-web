/*
 *  公共AJAX方法
 */
var ajax = function(param, callFun) {
    var ajaxParam = {
        type: param.type,
        url: param.url,
        cache: false,
        data: param.data,
        success: function(redata) {
           callFun(redata);
        }
    };
    
    if (param.dataType != '') {
        ajaxParam.dataType = param.dataType;
    }
    if (param.contentType != '') {
        ajaxParam.contentType = param.contentType;
    }

    $.ajax(ajaxParam);
};

var ajaxGet = function(param, callFun) {
    param.type = 'GET';
    ajax(param, callFun);
};

var ajaxPost = function(param, callFun) {
    param.type = 'POST';
    ajax(param, callFun);
};

var ajaxJson = function(param, callFun) {
    param.type = 'POST';
    param.contentType = 'application/json';
    
    ajax(param, callFun);
};


