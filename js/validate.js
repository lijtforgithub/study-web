/**
 * 表单验证
 */
var validate = function(event) {
    if ($(this).hasClass('ignore')) {
        $(this).css('border', '').removeClass('error');

        return;
    }

    var val = $.trim($(this).val());

    var isNull = val == null || val == '';
    var isNotNull = !isNull;
    var isNumber = !isNaN(val);
    var isPercent = isNumber && val >= 0 && val <= 100; // 百分比
    var isInteger = validateUtils.testInt(val);
    var isMoney = validateUtils.testInt(val) || validateUtils.testMoney(val);
    var isWeight = validateUtils.testInt(val) || validateUtils.testWeight(val);
    var isMillion = validateUtils.testInt(val) || validateUtils.testMillion(val);
    var isPhone = validateUtils.testInt(val) || validateUtils.testPhone(val);

    var flag = true;

    // 数字验证，可为空
    if ($(this).hasClass('number')) {
        flag = isNull || isNumber;
    } else if ($(this).hasClass('int')) {
        flag = isNull || isInteger;
    } else if ($(this).hasClass('v_money')) {
        flag = isNull || isMoney;
    } else if ($(this).hasClass('v_weight')) {
        flag = isNull || isWeight;
    } else if ($(this).hasClass('v_million')) {
        flag = isNull || isMillion;
    } else if ($(this).hasClass('percent')) {
        flag = isNull || isPercent;
    } else if ($(this).hasClass('phone')) {
        flag = isNull || isPhone;
    } else { // 文本
        flag = true;
    }

    // 不为空验证
    if ($(this).hasClass('notnull')) {
        flag = isNotNull;

        if (flag) {
            if ($(this).hasClass('number')) {
                flag = isNumber && val > 0;
            } else if ($(this).hasClass('int')) {
                flag = isInteger && val > 0;
            } else if ($(this).hasClass('v_money')) {
                flag = isMoney && val > 0;
            } else if ($(this).hasClass('v_weight')) {
                flag = isWeight && val > 0;
            } else if ($(this).hasClass('v_million')) {
                flag = isMillion && val > 0;
            } else if ($(this).hasClass('percent')) {
                flag = isPercent && val > 0;
            } else if ($(this).hasClass('phone')) {
                flag = isPhone;
            }
        }
    }

    if (flag) {
        $(this).css('border', '').removeClass('error');
    } else {
        $(this).css('border', '1px solid red').addClass('error');
    }
};

$('.check').blur(validate);


function checkReturn() {
    return validateForm();
}

// 提交验证
function validateForm(parent) {
    parent = parent || '';
    $(parent + ' .check').each(validate);

    var checks = $(parent + ' .check.error');

    if (checks.length > 0) {
        checks[0].focus();
        $('html, body').animate({scrollTop: $(checks[0]).offset().top - 200}, 1000);

        return false;
    }

    return true;
}

/*
 * 提交表单：检验select2 配和 validateUtils.checkSelect2()使用
 */
function validateSelect2() {
    var v_flag = '.select2-validate';
    var num = 0;

    $(v_flag).each(function() {
        var id = $(this).attr('id');
        $('#s2id_' + id).css('border', '1px solid red');
        num++;
    });

    return 0 == num;
}

/*
 * 提交表单：检验单选按钮 配合默认 '#radio_' + name 的div使用
 *
 * @param name 单选按钮name属性值
 */
function validateRadio(name) {
    if (!name) {
        throw new Error('name为空');
    }

    var val = $('input[name="' + name + '"]:checked').val();

    if (val) {
        $('#radio_' + name).css('border', '');
        return true;
    } else {
        $('#radio_' + name).css('border', '1px solid red');
        return false;
    }
}

function validateFile(selector) {
    selector = selector || '#file_path';
    var elem = $(selector);
    var val = elem.val();

    if (val) {
        elem.parent().css('cssText', '').removeClass('error');
        return true;
    } else {
        elem.parent().css('cssText', 'background-color:red!important').addClass('error');
        return false;
    }
}


var validateUtils = {
    reg_int: /^\d$|^[1-9]\d{1,15}$/, // 非负整数
    reg_money: /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/,  // 金额
    reg_weight: /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/, // 重量
    reg_mill_money: /^0\.\d{1,6}$|^[1-9]\d{0,15}\.\d{1,6}$/, // 万元
    reg_mobile: /^1\d{10}$/, // 手机
    reg_phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/, // 固定电话

    testInt: function(val) {
        return this.reg_int.test(val);
    },
    testMoney: function(val) {
        return this.reg_int.test(val) || this.reg_money.test(val);
    },
    testWeight: function(val) {
        return this.reg_int.test(val) || this.reg_weight.test(val);
    },
    testMillion: function(val) {
        return this.reg_int.test(val) || this.reg_mill_money.test(val);
    },
    testPhone: function(val) {
        return this.reg_mobile.test(val) || this.reg_phone.test(val);
    },

    /*
     * 页面初始化的时候加载要验证的select2
     *
     * @param selector 选择器 默认'.x-select2'
     */
    checkSelect2: function (selector) {
        var v_flag = 'select2-validate';
        selector = selector || '.x-select2';

        $(selector).each(function() {
            if ($(this).hasClass('select2-offscreen')) {
                var val = $(this).val();
                if (!val) {
                    $(this).addClass(v_flag);
                }

                $(this).change(function() {
                    var val = $(this).val();
                    var id = $(this).attr('id');
        
                    if (val) {
                        $(this).removeClass(v_flag);
                        $('#s2id_' + id).css('border', '').removeClass(v_flag);
                    } else {
                        $(this).addClass(v_flag);
                        $('#s2id_' + id).css('border', '1px solid red');
                    }
                });
            }
        });
    }
    
};

