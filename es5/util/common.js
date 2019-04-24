/**
 * @author LiJingTang
 */

/**
 * 计算阶乘
 */
function factorial(n) {
  var product = 1;
  
  while (n > 1) {
    product *= n;
    n--;
  }
  
  return product;
}

function factorial2(n) {
  var i, product = 1;
  
  for (i = 2; i <= n; i++) {
    product *= i;
  }
  
  return product;
}


/**
 * 比较两个数组的值是否相等
 */
function array_equals(a, b) {
  if (a.length != b.length) {
    return false;
  }
  
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * 数组去重
 */
function array_deduplication(array) {
	var obj = new Object();
	for (var i = 0; i < array.length; i++) {
		obj[array[i]] = 0;
	}
	
	return obj_get_enumAttribute(obj);
}


/**
 * 返回包含对象所有可枚举属性的数组
 */
function obj_get_enumAttribute(obj) {
	var array = new Array(), i = 0;
	for (array[i++] in obj);
	return array;
}





