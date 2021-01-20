
import RArray from './struct/RArray';
import RLinkedList from './struct/RLinkedList';

class Main {
    constructor() {

    }

    public static test() {
        console.log('start....')
        var linkedList: RLinkedList = new RLinkedList();
        linkedList.insert(3, 0);
        linkedList.insert(5, 1);
        linkedList.insert(8, 2);

        console.log(linkedList.toString());

        linkedList.insert(100, 2);
        console.log(linkedList.toString());

        linkedList.insert(200, 3);
        console.log(linkedList.toString());

        linkedList.remove(0);
        console.log(linkedList.toString());
        // linkedList.insert(201, 3);
        // console.log(linkedList.toString());
    }
}

Main.test();


