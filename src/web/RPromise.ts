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
        
        
        this.runPromiseRace();
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
}

export default RPRomise;