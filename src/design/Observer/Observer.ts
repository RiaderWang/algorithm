// 观察者
class Observer {
    constructor() {

    }

    public findSubject(status: string) {
        console.log('观察到的：' + status);
    }
}

export default Observer;