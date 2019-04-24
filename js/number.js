/*
 * js数值处理工具
 */

var numUtils = {

    defLevel: 100000,  // 默认换算阶10万

    /*
     * 金额 四舍五入保留两位小数
     *
     * @param num 数值
     */
    money: function(num) {
        return this.rounding(num, 2);
    },

    /*
     * 金额四舍五入保留两位小数后乘以10万
     *
     * @param num 数值
     */
    longMoney: function(num) {
        return parseInt(this.multiply(this.money(num), this.defLevel));
    },

    /*
     * 金额除以10万 保留两位小数
     *
     * @param num 数值
     */
    floatMoney: function(num) {
        return this.money(this.divide(num, this.defLevel));
    },

    /*
     * 重量 舍去多余小数位保留四位小数
     *
     * @param num 数值
     */
    weight: function(num) {
        return this.format(num, 4);
    },

    /*
     * 重量 舍去多余小数位保留四位小数后乘以10万
     *
     * @param num 数值
     */
    longWeight: function(num) {
        return parseInt(this.multiply(this.weight(num), this.defLevel));
    },

    /*
     * 重量除以10W 保留四位小数
     *
     * @param num 数值
     */
    floatWeight: function(num) {
        return this.weight(this.divide(num, this.defLevel));
    },

    /*
     * 单价*重量 四舍五入保留两位小数
     *
     * @param weight 重量
     * @param price 单价
     */
    amount: function(weight, price) {
        return this.money(this.multiply(this.weight(weight), this.money(price)));
    },

    /*
     * 四舍五入
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    rounding: function (num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        var level = Math.pow(10, scale);

        return (Math.round(num * level) / level).toFixed(scale);
    },

    /*
     * 除以10万后四舍五入
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    roundingLong: function (num, scale) {
        return this.rounding(this.divide(num, this.defLevel), scale);
    },

    /*
     * 直接舍去多余小数位
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    format: function(num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        var regex = new RegExp('([0-9]+\.[0-9]{' + scale + '})[0-9]*', 'g');

        return (+(num + '').replace(regex, '$1')).toFixed(scale);
    },

    /*
     * 除以10万后直接舍去多余小数位
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    formatLong: function (num, scale) {
        return this.format(this.divide(num, this.defLevel), scale);
    },
    
    /*
     * 乘法
     *
     * @param num1 被乘数
     * @param num2 乘数
     */
    multiply: function(num1, num2) {
        num1 = $.trim(num1);
        num2 = $.trim(num2);

        var len1 = num1.indexOf('.') > 0 ? num1.split('.')[1].length : 0;
        var len2 = num2.indexOf('.') > 0 ? num2.split('.')[1].length : 0;

        num1 = new Number(num1.replace('.', ''));
        num2 = new Number(num2.replace('.', ''));

        return (num1 * num2) / Math.pow(10, len1 + len2);
    },

    /*
     * 除法
     *
     * @param divide 被除数
     * @param divisor 除数
     */
    divide: function(divide, divisor) {
        divide = $.trim(divide);
        divisor = $.trim(divisor);

        var len1 = divide.indexOf('.') > 0 ? divide.split('.')[1].length : 0;
        var len2 = divisor.indexOf('.') > 0 ? divisor.split('.')[1].length : 0;

        var num1 = new Number(divide.replace('.', ''));
        var num2 = new Number(divisor.replace('.', ''));

        return (num1 / num2) * Math.pow(10, len2 - len1);
    },

    /*
     * 除以10万后千分符格式化
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    longToThousandth: function(num, scale) {
        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        num = (2 == scale) ? this.floatMoney(num) : this.formatLong(num, scale);

        return this.toThousandth(num, scale);
    },

    /*
     * 千分符格式化数值
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    toThousandth: function(num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        num = (2 == scale) ? this.money(num) : this.format(num, scale);
        var array = num.split('.');
        var integer = array[0];
        var decimal = array[1];
        integer = (integer || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

        return integer + '.' + decimal;
    },

    /*
     * 把千分符字符串解析成数值
     *
     * @param num 字符串数值
     */
    parse: function(num) {
        return $.trim(num).split(',').join('');
    }

};
