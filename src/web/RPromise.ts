class RPRomise {
    public constructor() {

    }

    public async init() {
        // 要使用Promise需要将tsconfig中的target改成es2015，es5不支持Promise

        // this.runAsync1().then((data) => {
        //     console.log(data);
        //     return this.runAsync2();
        // }).then((data) => {
        //     console.log(data);
        //     return this.runAsync3();
        // }).then((data) => {
        //     console.log(data);
        // })

        
        // this.runCatch().then((data)=>{
        //     console.log('resolve', data);
        // }).catch((data) => {
        //     console.log('catch', data);
        // })
        
        
        // this.runPromiseAll();
        // this.runPromiseRace();

        // this.myPromise();

        this.asyncAwait();
    }

    /***********************************链式异步调用**********************************/
    private runAsync1() {
        return new Promise((resolve, rejected) => {
            setTimeout(()=>{
                console.log('异步执行1')
                resolve('异步回调1')
            }, 1000)
        })
    }

    private runAsync2() {
        return new Promise((resolve, rejected) => {
            setTimeout(()=>{
                console.log('异步执行2')
                resolve('异步回调2')
            }, 2000)
        })
    }

    private runAsync3() {
        return new Promise((resolve, rejected) => {
            setTimeout(()=>{
                console.log('异步执行3')
                resolve('异步回调3')
            }, 5000)
        })
    }

    /**********************监听promise里的catch*********************/
    private runCatch() {
        return new Promise((resolve, rejected) => {
            let aa: any = null;
            console.log(aa.b);
            console.log('catch in Promise...');
            resolve('catch...');
        })
    }

    /**********************执行promise里的all*********************/
    private runPromiseAll() {
        let p = Promise.all([this.runAsync1(), this.runAsync2(), this.runAsync3()]);
        p.then((data) => {
            console.log(data)
        })
    }

    /**********************执行promise里的race*********************/
    private runPromiseRace() {
        let p = Promise.race([this.runAsync1(), this.runAsync2(), this.runAsync3()]);
        p.then((data) => {
            console.log(data);
        })
    }

    public static test() {
        let p: RPRomise = new RPRomise();
        p.init();
    }

    /**********************自定义promise*********************/
    private myPromise() {
        let p: MyPromise = new MyPromise((resolve: Function, rejected: Function) => {
            setTimeout(() => {
                resolve(100);
            }, 1000);
        });
        p.then((res: any) => {
            return new MyPromise((resolve: any, rejected: any) => {
                console.log('ggggg', res);
                setTimeout(() => {
                    resolve(2 * res);
                }, 5000);
            })
        }, (err: any) => {
            console.log(err)
        }).then((res: any) => {
            console.log('sss', res)
        }, (err: any) => {})


        let p1: MyPromise = new MyPromise((resolve: Function, rejected: Function) => {
            setTimeout(() => {
                resolve('11111');
            }, 1000);
        })
        let p2: MyPromise = new MyPromise((resolve: Function, rejected: Function) => {
            setTimeout(() => {
                resolve('22222');
            }, 2000);
        })
        let p3: MyPromise = new MyPromise((resolve: Function, rejected: Function) => {
            setTimeout(() => {
                resolve('33333');
            }, 3000);
        })

        MyPromise.all([p1, p2, p3]).then((data: any) => {
            console.log('all result：', data);
        })

        MyPromise.race([p1, p2, p3]).then((data: any) => {
            console.log('race result：', data);
        })
    }

    /**************************async await原理****************************/
    private asyncAwait() {
        
        function fetchData(params: any) {
            return new Promise((resolve, rejected) => {
                setTimeout(() => {
                    resolve(2);
                }, 2000);
            })
        }

        async function getData(params: any) {
            console.log('start');
            let a = await fetchData(params);
            console.log(a);
            console.log('end');
            return 'getData end';
        }

        // getData('s').then((res) => {console.log(res)});

        function *gen(params: any) {
            console.log('start');
            let a = yield 1;
            console.log(a);
            let b = yield fetchData(params);
            console.log(b);
            let c = yield 3;
            console.log(c);
            console.log('end');
            return 'getData end';
        }

        let g = gen(1);
        g.next();
        console.log(JSON.stringify(g.next()));
        g.next();
        g.next();
        g.next();
        g.next();
    }
}


class MyPromise {
    private executor: Function;
    private status: string = 'PENDING'; // 三种状态 PENGDING，FULLFILLED, REJECTED
    private value: any; // 成功的值
    private reason: any; // 失败的值

    private onFullFilledCallback: Array<Function> = []; // 成功的回调列表
    private onRejectedCallBack: Array<Function> = []; // 失败的回调列表

    public constructor(executor: Function) {
        if (executor == null) {
            throw new Error('executor is null!');
        }
        let resolve = (value: any) => {
            if (this.status == 'PENDING') {
                this.status = 'FULLFILLED';
                this.value = value;

                this.onFullFilledCallback.forEach(fn => {
                    fn && fn();
                })
            }
        }

        let rejected = (reason: any) => {
            if (this.status == 'PENDING') {
                this.status = 'REJECTED';
                this.reason = reason;

                this.onRejectedCallBack.forEach(fn => {
                    fn && fn();
                })
            }
        }
        try {
            executor(resolve, rejected);
        } catch (err) {
            rejected(err);
        }
    }

    /** 第一层 解决了异步问题，但无法解决链式调用*/
    // public then(onFullFilled: Function = null, onRejected: Function = null) {
    //     if (this.status == 'FULLFILLED') {
    //         onFullFilled(this.value);
    //     }
    //     if (this.status == 'REJECTED') {
    //         onRejected(this.reason);
    //     }
    //     if (this.status == 'PENDING') { // 处理异步的情况
    //         this.onFullFilledCallback.push(() => {
    //             onFullFilled(this.value)
    //         });
    //         this.onRejectedCallBack.push(() => {
    //             onRejected(this.reason)
    //         });
    //     }
    // }

    /** 第二层 解决了链式调用，并处理了return 一个值的情况*/
    // public then(onFullFilled: Function = null, onRejected: Function = null) {
    //     let p = new MyPromise((resolve: Function, rejected: Function) => {
    //         let x;
    //         // console.log(this); // 指向外层的那个对象
    //         if (this.status == 'FULLFILLED') {
    //             x = onFullFilled(this.value); // 获取到return 后的值
    //             resolve(x);
    //         }
    //         if (this.status == 'REJECTED') {
    //             x = onFullFilled(this.reason);
    //             rejected(x);
    //         }
    //         if (this.status == 'PENDING') {
    //             this.onFullFilledCallback.push(() => {
    //                 x = onFullFilled(this.value);
    //                 resolve(x);
    //             })
    //             this.onRejectedCallBack.push(() => {
    //                 x = onRejected(this.reason);
    //                 rejected(x);
    //             })
    //         }
    //     })

    //     return p;
    // }

    /** 第三层 加上处理return promise的情况 */
    public then(onFullFilled: Function = null, onRejected: Function = null) {
        let promise2 = new MyPromise((resolve: Function, rejected: Function) => {
            let x;
            // console.log(this); // 指向外层的那个对象
            if (this.status == 'FULLFILLED') {
                setTimeout(() => { //同步取不到，转异步实现
                    try {
                        x = onFullFilled(this.value); // 获取到return 后的值
                        this.resolvePromise(promise2, x, resolve, rejected);
                    } catch (err) {
                        rejected(err);
                    }
                }, 0);
            }
            if (this.status == 'REJECTED') {
                setTimeout(() => {
                    try {
                        x = onFullFilled(this.reason);
                        this.resolvePromise(promise2, x, resolve, rejected);
                    } catch (err) {
                        rejected(err);
                    }
                }, 0);
            }
            if (this.status == 'PENDING') {
                this.onFullFilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            x = onFullFilled(this.value); // 获取到return 后的值
                            this.resolvePromise(promise2, x, resolve, rejected);
                        } catch (err) {
                            rejected(err);
                        }
                    }, 0);
                })
                this.onRejectedCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            x = onFullFilled(this.reason);
                            this.resolvePromise(promise2, x, resolve, rejected);
                        } catch (err) {
                            rejected(err);
                        }
                    }, 0);
                })
            }
        })

        return promise2;
    }

    /**
     * promise处理
     * @param promise 
     * @param x 
     * @param resolve 
     * @param rejected 
     */
    private resolvePromise(promise: MyPromise, x: any, resolve: Function, rejected: Function) {
        if (promise === x) {
            return rejected(new Error('promise isequal x'));
        }
        if (typeof x === 'object' && x != null) { // 如果是对象
            try {
                let then = x.then; // 取出promise的 then方法
                if (typeof then === 'function') {
                    // 用then.call()为了避免再使用一次x.then报错
                    then.call(x, (y: any) => {
                        console.log('y', y)
                        resolve(y)// 采用promise的成功结果，并且向下传递
                    }, (r: any) => {
                        rejected(r)// 采用promise的失败结果，并且向下传递
                    })
                } else {
                    resolve(x);
                }
            } catch (err) {
                rejected(err);
            }
        } else { // 值
            resolve(x);
        }
    }

    /**
     * all 方法实现
     * @param lists 
     */
    public static all(lists: Array<any>) {
        return new MyPromise((resolve: Function, rejected: Function) => {
            let resArr: Array<any> = [];
            let index: number = 0;
            
            function processData(i: number, data: any) {
                resArr[i] = data;
                index ++;
                if (index == lists.length) {
                    resolve(resArr);
                }
            }

            for(let i: number = 0; i < lists.length; i++) {
                if (this.isPromise(lists[i])) {
                    lists[i].then((data: any) => {
                        processData(i, data);
                    }, (err: any) => {
                        rejected(err) // 有一个失败终止promise
                    });
                } else {
                    processData(i, lists[i]);
                }
            }
        })
    }

    public static isPromise(value: any): boolean {
        if ((typeof value === 'object' && value != null) || typeof value === 'function') {
            if (typeof value.then === 'function') {
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * race 实现
     * @param lists 
     */
    public static race(lists: Array<any>) {
        return new MyPromise((resolve: Function, rejected: Function) => {
            for (let i: number = 0; i < lists.length; i++) {
                if (this.isPromise(lists[i])) {
                    lists[i].then((data: any) => {
                        resolve(data); // 哪个先完成就返回哪一个的结果
                        return;
                    }, (err: any) => {
                        rejected(err);
                        return;
                    })
                } else {
                    resolve(lists[i]);
                }
            }
        })
    }

    // 静态resolve方法
    public static resolve(value: any) {
        // 如果是一个promise对象就直接将这个对象返回
        if (this.isPromise(value)) {
            return value
        } else {
            // 如果是一个普通值就将这个值包装成一个promise对象之后返回
            return new MyPromise((resolve: Function, rejected: Function) => {
                resolve(value)
            })
        }
    }
}

export default RPRomise;