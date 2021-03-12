import Observer from './Observer';
import Subject from './Subject';

class Entry {
    constructor() {

    }

    public deal() {
        let subject: Subject = new Subject();

        let o1: Observer = new Observer();
        let o2: Observer = new Observer();
        let o3: Observer = new Observer();

        subject.addObserver(o1);
        subject.addObserver(o2);
        subject.addObserver(o3);

        subject.updateStatus('angry');
    }

    public static init() {
        new Entry().deal();
    }
}

export default Entry;