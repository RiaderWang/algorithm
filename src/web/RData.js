/**基础数据类型 */
const base = function() {
    let bool0 = '1' == 1; // string转换成number，再比较
    let bool1 = '1' === 1; // 值和类型都必须相等
    console.log(bool0, bool1);

    let bool2 = false == 0; // boolean转换成number，再比较
    let bool3 = false === 0; // 值和类型都必须相等
    console.log(bool2, bool3);

    let a = 100;
    let b = '1';
    
    let add = a + b; // number和string相加时，会将number转换成string，最后连接成一个string
    let sub = a - b; // number和string相减时，会将string转换成number，最后得到一个number
    console.log(add, sub, typeof(add), typeof(sub));
}

/**对象转化 */
const objectConvert = function() {
    let obj = {
        toString: function() {
            return '100'
        },
        valueOf: function() {
            return 10
        },
    }

    console.log(obj + 1);
    console.log(obj + '1');
    console.log(obj + 'ss');
}

module.exports = {
    base,
    objectConvert
}