/**基础数据类型 */
const base = function() {
    //js的7种基本类型
    let primitiveTypes = ['string','number','null','undefined','boolean','symbol', 'bigint'];

    let bool0 = '1' == 1; // string转换成number，再比较
    let bool1 = '1' === 1; // 值和类型都必须相等
    console.log(bool0, bool1);

    let bool2 = false == 0; // boolean转换成number，再比较
    let bool3 = false === 0; // 值和类型都必须相等
    console.log(bool2, bool3);

    let a = 100;
    let b = '2';
    
    let add = a + b; // number和string相加时，会将number转换成string，最后连接成一个string
    let sub = a - b; // number和string相减时，会将string转换成number，最后得到一个number
    let mul = a * b; // number和string相乘时，会将string转换成number，最后得到一个number
    let div = a / b; // number和string相除时，会将string转换成number，最后得到一个number
    console.log(add, sub, mul, div, typeof(add), typeof(sub), typeof(mul), typeof(div));


    console.log(!!null)

    let num = +'10'; //10，将字符串转换成数值型，
    let num2 = -'10'; //-10，将字符串转换成数值型
    console.log(num, typeof(num));
    console.log(num2, typeof(num2));
}

/**基本类型的隐式转换 */
const baseConversion = function() {
    //对象和布尔值进行比较时，对象先转换为字符串，然后再转换为数字，布尔值直接转换为数字
    console.log([] == false);
    //结果是true，[]转换为字符串'',然后再转换为数字0，false转换为数字0

    //对象和字符串进行比较时，对象转换为字符串，然后两者进行比较
    console.log([1,2,3] == '1,2,3');
    //结果是true [1,2,3] 转化为 '1,2,3'

    //对象和字符串进行比较时，对象转换为字符串，然后两者进行比较
    console.log([1] == 1);
    //结果为true，[1]转换为'1'再转换为1

    console.log(undefined == null) //true undefined和null 比较返回true，二者和其他值比较返回false
    console.log(Number(null)) //0

    // 注意
    console.log({a: 1}.toString()) //{}的对象转换成string 时 是 '[object Object]'
    console.log({} == 0) //false，{}的对象转换成string 时是'[object Object]'，而'[object Object]'转换成数值时，是NaN
    console.log(NaN == NaN) //false
    console.log({a: 1} == {a: 1}) //false

    //{}转换为字符串是'[object Object]'
    //'[object Object]'转换为数值时 NaN
    //null 和undefined 是相等的
    //要比较相等性之前，不能将null 和 undefined 转换成其他任何值
    //如果有一个操作数是NaN，则相等操作符返回 false ，而不相等操作符返回 true。重要提示：即使两个操作数都是NaN，相等操作符也返回 false了；因为按照规则， NaN 不等于 NaN
    //如果两个操作数都是对象，则比较它们是不是同一个对象，如果两个操作数都指向同一个对象，则相等操作符返回 true；否则， 返回false
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
    
    let a7 = new Map(); // 一般用户存储key-value
    a7.a = 2;
    
    let a8 = new Set(); // 一般用于存储key
    a8.a = 3;
    
    console.log(typeof(a5), typeof(a6), typeof(a7), typeof(a8));
    console.log(a5 instanceof Array, a6 instanceof Object, a7 instanceof Map, a8 instanceof Set);

    let arr = [1, 2, 3, 4, 5];
    let mapData = arr.map((item) => { // 返回一个新的数组
        return item * 2;
    })
    console.log('map：', mapData);
}

const memoryDemo = function() {
    function test(aa, bb) {
        aa.item = 'changed';
        bb = {item: 'changed'};
    }
    let aa = {item: 'unchange'};
    let bb = {item: 'unchange'};

    test(aa, bb);
    console.log(aa);
    console.log(bb);
}

// call应用
const callDemo = function() {
    let phper = {
        name: 'php',
        getWorld: function() {
            return `${this.name} is the best language in the world`;
        }
    }

    let language = {
        name: 'javascript'
    }

    console.log(phper.getWorld.call(language));
    console.log(phper.getWorld.apply(language));
    console.log(phper.getWorld.bind(language)());

    let argsfun = {
        func: function(...args) {
            console.log(args);
        }
    }

    let obj = {
        name: 'php'
    }

    argsfun.func.call(obj, '1','2','3');
    argsfun.func.apply(obj, ['1','2','3']);
    argsfun.func.bind(obj)('1','2','3');
}

// call 实现
const callComply = function() {
    Function.prototype._call = function() {
        ctx = arguments[0] || window;
        ctx._fn = this;

        let _args = [];
        for (let i = 1; i < arguments.length; i++) {
            _args.push(arguments[i]);
        }

        let val = ctx._fn(..._args);
        delete ctx._fn;
        return val
    }

    Function.prototype._apply = function() {
        ctx = arguments[0] || window;
        ctx._fn_ = this;
        let _args = [];
        if (arguments[1]) {
            _args = arguments[1];
        }

        let val = ctx._fn_(_args);
        delete ctx._fn_;
        return val;
    }

    Function.prototype._bind = function() {
        ctx = arguments[0] || window;
        ctx._fn = this;

        let _args = [];
        for (let i = 1; i < arguments.length; i++) {
            _args.push(arguments[i]);
        }

        let result = function() {
            console.log(ctx);
            return ctx[_fn](..._args);
        };
        delete ctx._fn;
        return result;
    }

    let obj = {
        name: 'js'
    }
    function func() {
        console.log(this.name);
        console.log(arguments);
    }
    func._call(obj, 1, 2, 3);

    func._apply(obj, [1,2,3]);

    func._bind(obj,1,2,3)();
}

module.exports = {
    base,
    baseConversion,
    objectConvert,
    typeDemo,
    memoryDemo,
    callDemo,
    callComply,
}