/*
 * 	公共方法
 */

/*
 * 页面提醒异常消息的方法
 */
function alertErrorMsg(msg) {
    Notify(msg, 'top-right', '60000', 'danger', 'fa-bolt', true);
}

function alertSuccessMsg(msg) {
    Notify(msg, 'top-right', '60000', 'success', 'fa-check', true);
}

function alertWarnMsg(msg) {
    $('#warn_modal').modal('show').find('.msg').text(msg);
}

function alertDangerMsg(msg) {
    $('#danger_modal').modal('show').find('.msg').text(msg);
}

function goPage() {
    var key = 'p_x';
    var page = $('.pagination .go-page');

    if (page && page.val()) {
        window.location.href = page.attr('href').replace('p_x', page.val());
    }
}

function selectAll(all, sub) {
    all = all || 'chkAll';
    sub = sub || 'chk-sub';

    $('#' + all).click(function() {
        var chk = $(this).prop('checked');
        $('.' + sub).each(function() {
            $(this).prop('checked', chk);
        });
    });

    $('.' + sub).click(function() {
        if ($(this).prop('checked')) {
            $('#' + all).prop('checked', $('.' + sub).length == $('.' + sub + ':checked').length);
        } else {
            $('#' + all).prop('checked', false);
        }
    });
}

/**
 * @param obj 隐式参数 占位
 */
var expend = function (obj, sub) {
    sub = sub || '#tr_sub_';

    var id = $(this).attr('id');
    var icon = $(this).find('i:first');
    if (icon.hasClass('fa-plus-square')) {
        icon.removeClass('fa-plus-square').addClass('fa-minus-square');
    } else {
        icon.removeClass('fa-minus-square').addClass('fa-plus-square');
    }

    $(sub + id).toggle('fast');
}


function _init(dataLink, pageHeader) {
    if (dataLink) {
        var li = $('#sidebar li[data-link="' + dataLink + '"]');

        if (li) {
            if (!pageHeader) {
                pageHeader = $.trim(li.find('span').html());
            }
        }
    }

    if (pageHeader) {
        var array = pageHeader.split('~');

        if (array.length > 1) {
            pageHeader = array[0];
            
            if (!_is_mobile) {
                pageHeader = pageHeader + ' <i class="fa fa-hand-o-right"></i> <small>' + array[1] + '</small>';
            }
        }

        $('.header-title h1[data-rel="' + dataLink + '"]').html(pageHeader);
        document.title = array[0] + '_钢银管理系统';
    }
}

function _init_select2() {
    $('.x-select2').select2({
        allowClear: true,
        placeholder: '--请选择--',
        matcher: function(term, text) { // term:输入的搜索key，text:option中的text
            return $.trim(text).toUpperCase().indexOf($.trim(term).toUpperCase()) != -1;
        }
    });
}

function _load_set() {
    $('.date-picker').datepicker({
        format: 'yyyy-mm-dd'
    }).on('changeDate', function() {
        $(this).datepicker('hide');
    }).prop('readonly', 'readonly');
    
    $('.date-range').daterangepicker({
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
        //singleDatePicker: true,
        showDropdowns : true
    }).prop('readonly', 'readonly');

    $('.time-range-input').on('click', '.time-cancel', function() {
		$(this).siblings('input').val('');
	});
    
    $(':input, span').each(function() {
        if (typeof($(this).attr('readonly')) != 'undefined') {
            $(this).attr('style', $(this).attr('style') + ' ;background: #EEEEEE;');
        }
    }); 
    
    $('.reset').click(_reset_search);

    _ie9_ta();
}

/*
 * 解决ie9下textarea字数限制的问题
 */
var _ie9_ta = function () {
    if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
        $('textarea').keyup(function() {
            var maxLength = $(this).attr('maxLength');
            $(this).val($(this).val().substring(0, maxLength));
        });
    }
};

var _is_mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());

/**
 * 兼容
 */
function isMobile() {
    return _is_mobile;
}

var _reset_search = function() {
    var form = $(this).parents('form:first');
    if (form) {
        form.find('.input-reset').each(function() {
            if ('checkbox' == $(this).prop('type')) {
                $(this).prop('checked', false);
            } else {
                $(this).val('');
            }
        });
        form.find('select').each(function() {
            $(this).prop('selectedIndex', 0);
        });
        form.find('.x-select2, .ajax-select2, select[multiple="multiple"]').each(function() {
            $(this).val('').select2('val', '');
        });
        form.find('.s2-hid').each(function() {
            $(this).val('');
        });
    }
};


