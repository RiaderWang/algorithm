
import RArray from './struct/RArray';
import RLinkedList from './struct/RLinkedList';
import RQueue from './struct/RQueue';
import RStack from './struct/RStack';

class Main {
    constructor() {

    }

    public static test() {
        let stack: RStack = new RStack();
        stack.push(5);
        stack.push(7);
        stack.push(5);
        stack.push(1);
        stack.push(1);
        stack.push(9);

        console.log(stack.toString());

        console.log(stack.pop());
        console.log(stack.toString());

        console.log(stack.pop());
        console.log(stack.toString());

        console.log(stack.pop());
        console.log(stack.toString());

        console.log(stack.pop());
        console.log(stack.toString());
    }
}

Main.test();


