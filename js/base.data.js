/*
 * select2 AJAX加载基础数据 文件引入要放到select2后面 页面自定义的前面
 */

function BaseData(divElem, url, text, req) {
    if (!divElem || !url) {
        throw new Error('绑定元素或URL为空');
    }
    
    this._divElem = divElem;
    this._url = url;
    this._text = text || '请选择';
    this._req = req || {};
}
  
BaseData.prototype = {
    select2: function(setFun) {
        var _obj = this;
        var url = 'http://api.banksteel.com/erp/manage/base_data/select/' + this._url;
        $(this._divElem).select2({
            placeholder: this._text,
            width: '100%',
            minimumInputLength: 1,
            maximumInputLength: 100,
            ajax: {
                url: url,
                type: 'post',
                quietMillis: 500,
                data: function(term) {
                    if (!_obj._req) {
                        _obj._req = {};
                    }
                    _obj._req.param = term;
                    return _obj._req;
                },
                results: function(data) {
                    return {results: data};
                },
                cache: true
            },
            initSelection: function(divElement, callback) {
               var val = $(divElement).val();
               if (val) {
                    $.ajax({
                        url: url + '/init/' + val,
                        type: 'post',
                        success: function(data) {
                          if (data) {
                             callback(data);
                             setFun($(_obj._divElem).select().val());
                          }
                        }
                    });
                }
            }
        }).change(function() {
              setFun($(this).val());
        });
        return this;
    },
    init: function(val) {
        if (val && val != 'pfx_') {
            $(this._divElem).select2('val', val);
        }
        return this;
    }
};


/*
宏文件添加元素
#macro(select2Ajax $_obj $_id $_defId $_value)
    #if(!$_id)
        #set($_id = $_defId)
    #end
    <div id="div_$_obj" class="ajax-select2"></div>
    <input type="hidden" class="h-$_obj s2-hid" id="$_id" name="$_id" value="$!_value" />
#end
#macro(ajaxWarehouse $value $id)
    #select2Ajax("warehouse", $id, "warehouseId", $value)
#end
#macro(ajaxSupplier $value $id)
    #select2Ajax("supplier", $id, "supplierId", $value)
#end
#macro(ajaxSupplierMember $value $id)
    #select2Ajax("supplier_member", $id, "memberId", $value)
#end
#macro(ajaxFactory $value $id)
    #select2Ajax("factory", $id, "factoryId", $value)
#end
#macro(ajaxEmployee $value $id)
    #select2Ajax("employee", $id, "employeeId", $value)
#end
#macro(ajaxDepart $value $id)
    #select2Ajax("depart", $id, "departCode", $value)
#end
#macro(ajaxArea $value $id)
    #select2Ajax("area", $id, "areaCode", $value)
#end
#macro(ajaxMember $value $id)
    #select2Ajax("member", $id, "memberId", $value)
#end
#macro(ajaxBreed $value $hid $hcode)
    #if(!$hid)
        #set($hid = "breedId")
    #end
    #if(!$hcode)
        #set($hcode = "breedCode")
    #end
    <div id="div_breed" class="ajax-select2"></div>
    <input type="hidden" class="h-breedId s2-hid" id="$hid" name="$hid" value="" />
    <input type="hidden" class="h-breedCode s2-hid" id="$hcode" name="$hcode" value="" />
    <input type="hidden" class="h-breed s2-hid" value="$!value" />
#end
     
重置查询条件需要的JS代码

form.find('.x-select2, .ajax-select2, select[multiple="multiple"]').each(function() {
    $(this).val('').select2('val', '');
});
form.find('.s2-hid').each(function() {
    $(this).val('');
});
*/
  
/*
 * 基础数据使用工具 和上面的宏定义配合使用
 * 调用方式 baseDataUtils.ajaxSupplier().ajaxBreedCode();
 */
var baseDataUtils = {
    /*
     * @param divElem div元素
     * @param hElem 隐藏的input元素
     * @param paramObj 参数对象：可支持 {
     *                      type 供应商类型 多个,间隔
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxSupplier: function (paramObj, divElem, hElem) {
        divElem = divElem || '#div_supplier';
        hElem = hElem || '.h-supplier';

        new BaseData(divElem, 'supplier', '请选择供应商', paramObj)
            .select2(function(id) {
                $(hElem).val(id);
            }).init($(hElem).val());

        return this;
    },

    /*
     * @param divElem div元素
     * @param hElem 隐藏的input元素
     * @param paramObj 参数对象：可支持 {
     *                      type 供应商类型 多个,间隔
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxSupplierMember: function (paramObj, divElem, hElem) {
        divElem = divElem || '#div_supplier_member';
        hElem = hElem || '.h-supplier_member';

        new BaseData(divElem, 'supplier_member', '请选择供应商', paramObj)
            .select2(function(id) {
                $(hElem).val(id);
            }).init($(hElem).val());

        return this;
    },

    /*
     * 仓库
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                     isSign 是否签约
     *                     isCloud 是否是云仓
     *                     cityCode 城市编码
     *                 }
     */
    ajaxWarehouse: function (paramObj, divElem) {
        divElem = divElem || '#div_warehouse';

        new BaseData(divElem, 'warehouse', '请选择仓库', paramObj)
            .select2(function(id) {
                $('.h-warehouse').val(id);
            }).init($('.h-warehouse').val());

        return this;
    },

    /*
     * 钢厂
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxFactory: function (paramObj, divElem) {
        divElem = divElem || '#div_factory';

        new BaseData(divElem, 'factory', '请选择钢厂', paramObj)
            .select2(function(id) {
                $('.h-factory').val(id);
            }).init($('.h-factory').val());

        return this;
    },

    /*
     * 品种-ID 默认三级品种
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      level 品种级别 [1-大类, 2-二级品种, 3-三级品种]
     *                      breedCode 品种编号不为空的话只查询该品种下的数据
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxBreedId: function (paramObj, divElem) {
        divElem = divElem || '#div_breed';
        paramObj = paramObj || {level: 3};

        new BaseData(divElem, 'breed', '请选择品种', paramObj)
            .select2(function(id) {
                if (id) {
                    var array = id.split('-');
                    $('.h-breedId').val(array[0]);
                    $('.h-breedCode').val(array[1]);
                } else {
                    $('.h-breedId').val('');
                    $('.h-breedCode').val('');
                }
            }).init($('.h-breed').val());

        return this;
    },

    /*
     * 品种-CODE 默认三级品种
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      level 品种级别 [1-大类, 2-二级品种, 3-三级品种]
     *                      breedCode 品种编号不为空的话只查询该品种下的数据
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxBreedCode: function (paramObj, divElem) {
        divElem = divElem || '#div_breed';
        paramObj = paramObj || {level: 3};

        new BaseData(divElem, 'breed', '请选择品种', paramObj)
            .select2(function(id) {
                if (id) {
                    var array = id.split('-');
                    $('.h-breedId').val(array[0]);
                    $('.h-breedCode').val(array[1]);
                } else {
                    $('.h-breedId').val('');
                    $('.h-breedCode').val('');
                }
            }).init('pfx_' + $('.h-breed').val());

        return this;
    },

    /*
     * 会员 默认：包含禁用
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxMember: function (paramObj, divElem) {
        divElem = divElem || '#div_member';

        new BaseData(divElem, 'member', '请选择会员', paramObj)
            .select2(function(id) {
                $('.h-member').val(id);
            }).init($('.h-member').val());

        return this;
    },

    /*
     * 员工
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      departCode 部门编号默认钢银
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxEmployee: function (paramObj, divElem) {
        divElem = divElem || '#div_employee';

        new BaseData(divElem, 'employee','请选择管理员', paramObj)
            .select2(function(id) {
                $('.h-employee').val(id);
            }).init($('.h-employee').val());

        return this;
    },

    /*
     * 部门
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      parentCode 父部门编号
     *                      level 部门级别 一级部门编码为4位
     *                      disabled 是否包含禁用 [true/null-包含禁用，false-不包含禁用]
     *                 }
     */
    ajaxDepart: function (paramObj, divElem) {
        divElem = divElem || '#div_depart';

        new BaseData(divElem, 'depart','请选择部门', paramObj)
            .select2(function(id) {
                $('.h-depart').val(id);
            }).init($('.h-depart').val());

        return this;
    },

    /*
     * 区域
     *
     * @param divElem div元素
     * @param paramObj 参数对象：可支持 {
     *                      level 级别 [1-国家, 2-省, 3-市, 4-区/县, 5-镇/街道]
     *                      code 编号不为空的话只查询该编号下的数据
     *                 }
     */
    ajaxArea: function (paramObj, divElem) {
        divElem = divElem || '#div_area';

        new BaseData(divElem, 'area', '请选择地区', paramObj)
            .select2(function(id) {
                $('.h-area').val(id);
            }).init($('.h-area').val());

        return this;
    },

    /*
     * 需要做表单验证时候调用用来标记 配合提交表单的验证方法使用
     *
     * @param selector 选择范围
     */
    check: function (selector) {
        var v_flag = 'select2-validate';
        selector = selector || '.ajax-select2';

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

        return this;
    }

};

