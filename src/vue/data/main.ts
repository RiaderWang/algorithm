class Main {
    constructor() {

    }

    public defineProperty() {
        let obj: any = {
            car: 'bmw',
            price: 2000
        };
        obj.price = 3000;

        Object.defineProperty(obj, 'price', {
            enumerable: true,
            configurable: true,
            get() {
                console.log('price 被读取了');
            },
            set(newval) {
                console.log('price被设置成：', newval);
                console.log(obj);
            }
        })

        console.log(obj.price);
        obj.price = 5000;
    }

    public static init() {
        console.log('111111111')
        new Main().defineProperty();
    }
}

export default Main;