/**
 * 栈
 */
class RStack {
    private head: Node = null;
    private size: number = 0;

    public constructor() {

    }

    /**
     * 入栈
     * @param data 
     */
    public push(data: number) {
        let insertNode: Node = new Node(data);
        if (this.size == 0) { //空
            this.head = insertNode;
        } else {
            insertNode.prev = this.head;
            this.head.next = insertNode;
            this.head = insertNode;
        }

        this.size ++;
    }

    /**
     * 出栈
     */
    public pop(): number {
        if (this.size == 0) {
            throw new Error('stack is empty！');
        }
        let _data = this.head.data;
        this.head = this.head.prev;
        this.size --;
        return _data;
    }

    public toString(): string {
        let temp: Node = this.head;
        let str = '';
        while(temp != null) {
            str += temp.data + ' | ';
            temp = temp.prev;
        }
        return str.split('').reverse().join('');
    }
}

class Node {
    private _data: number;
    private _next: Node = null;
    private _prev: Node = null;

    public constructor(data: number) {
        this._data = data;
    }

    public get data(): number {
        return this._data;
    }

    public set next(next: Node) {
        this._next = next;
    }

    public get next(): Node {
        return this._next;
    }

    public set prev(prev: Node) {
        this._prev = prev;
    }

    public get prev(): Node {
        return this._prev;
    }
}

export default RStack;