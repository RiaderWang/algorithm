
import RArray from './struct/RArray';
import RLinkedList from './struct/RLinkedList';
import RQueue from './struct/RQueue';

class Main {
    constructor() {

    }

    public static test() {
        let queue: RQueue = new RQueue();
        queue.enqueue(5);
        queue.enqueue(7);
        queue.enqueue(5);
        queue.enqueue(9);
        queue.enqueue(1);
        queue.enqueue(1);

        console.log(queue.toString());

        console.log(queue.dequeue());
        console.log(queue.toString());

        console.log(queue.dequeue());
        console.log(queue.toString());

        console.log(queue.dequeue());
        console.log(queue.toString());
    }
}

Main.test();


