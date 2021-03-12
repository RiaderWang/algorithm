// 主体
import Observer from './Observer';

class Subject {
    private observers: Array<Observer> = [];
    private status: string;

    constructor() {
        this.status = 'happy';
    }

    public addObserver(o: Observer) {
        this.observers.push(o);
    }

    public updateStatus(status: string) {
        this.status = status;
        this.observers.forEach((observer) => {
            observer.findSubject(status);
        })
    }
}

export default Subject;