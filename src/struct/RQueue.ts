class RQueue {
    //队头
    private head: Node = null;
    //队尾
    private tail: Node = null;
    private size: number = 0;

    public constructor() {

    }

    /**
     * 入队
     * @param data 
     */
    public enqueue(data: number) {
        let insertNode: Node = new Node(data);

        if (this.size == 0) { //队列为空
            this.head = this.tail = insertNode;
        } else {
            this.tail.next = insertNode;
            this.tail = insertNode;
        }

        this.size ++;
    }

    /**
     * 出队
     */
    public dequeue(): number {
        if (this.size == 0) {
            throw new Error('size is empty!');
        }
        let _data = this.head.data;
        this.head = this.head.next;
        this.size --;

        return _data;
    }

    public toString(): string {
        let temp = this.head;
        let str = '';
        while(temp) {
            str += temp.data + ' | ';
            temp = temp.next;
        }
        return str;
    }
}

class Node {
    private _data: number;
    private _next: Node = null;

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
}

export default RQueue;