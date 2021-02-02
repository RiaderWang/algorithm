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
    // 普通的对象，Symbol.toPrimitive会转换成number，即优先调用valueOf方法

    // let obj = {};
    // obj.toString = () => {return '100'};
    // obj.valueOf = () => {return 1};
    let obj = {
        toString: function() {
            return '100'
        },
        valueOf: function() {
            return 10
        },
    }

    console.log(obj + 1);
    console.log(obj - '1');
    console.log(obj + 'ss');

    console.log('-----------------');
    // 复杂的对象，Symbol.toPrimitive会转换成string，即优先调用toString方法
    let obj2 = new Date();
    obj2.toString = function() {
        return '100';
    }
    obj2.valueOf = function() {
        return 10;
    }
    console.log(obj2 + 1); // 调用toString();
    console.log(obj2 + 'ss'); // 调用toString();
    console.log(obj2 - 1); // 减号调用的是valueof();
    console.log(obj2 > 10) // 比较调用的是valueof();

    console.log('-----------------');

    let a = {};
    console.log(a + 1); //没有valueOf，调用toString();
    console.log({} + 1);
    console.log(a - 1);
    console.log([1,2] + 1);

    console.log('-----------------');

    let b = {
        value: 0,
        valueOf: function() {
            this.value ++;
            return this.value;
        }
    };
    console.log(b == 1 && b == 2)
}

const typeDemo = function() {
    let a0 = 1;
    let a1 = false;
    let a2 = 'ss';
    let a3 = undefined;
    let a4 = null;
    console.log(typeof(a0), typeof(a1), typeof(a2), typeof(a3), typeof(a4));

    let a5 = [1, 2, 3];
    let a6 = {};
    a6.a = 1;
    
    let a7 = new Map();
    a7.a = 2;
    
    let a8 = new Set();
    a8.a = 3;
    
    console.log(typeof(a5), typeof(a6), typeof(a7), typeof(a8));
    console.log(a5 instanceof Array, a6 instanceof Object, a7 instanceof Map, a8 instanceof Set);
}

module.exports = {
    base,
    objectConvert,
    typeDemo
}