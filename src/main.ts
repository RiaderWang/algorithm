
import RArray from './struct/RArray';
import RLinkedList from './struct/RLinkedList';
import RQueue from './struct/RQueue';
import RStack from './struct/RStack';
import RBinaryTree from './struct/RBinaryTree';
import RHeap from './struct/RHeap'; 
import PriorityQueue from './struct/PriorityQueue';

class Main {
    constructor() {

    }

    public static test() {
        let datas: Array<number> = [2,10,5,7,9,8,3,6,1,12,15,48,68,32,38,24];
        let queue: PriorityQueue = new PriorityQueue();

        for (let i: number = 0; i < datas.length; i++) {
            queue.enqueue(datas[i]);
        }

        for(let i: number = 0 ; i < datas.length; i++) {
            console.log(queue.dequeue());
        }
    }
}

Main.test();


