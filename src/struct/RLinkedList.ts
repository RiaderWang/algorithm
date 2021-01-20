/**
 * 单链表
 */
class RLinkedList {
    private head: Node = null;
    private tail: Node = null;
    private size: number = 0;

    public constructor() {
        
    }

    /**
     * 插入
     * @param data 
     * @param index 
     */
    public insert(data: number, index: number): void {
        if (index < 0 || index > this.size) {
            throw new Error('params error');
        }

        let insertNode: Node = new Node(data);

        if (this.size == 0 || this.head == null) { // 空
            this.head = this.tail = insertNode;
        } else if (index == 0) { // 头
            insertNode.next = this.head;
            this.head = insertNode;
        } else if (index == this.size) { // 尾
            this.tail.next = insertNode;
            this.tail = insertNode;
        } else { // 中间
            let prevNode = this.get(index - 1);
            insertNode.next = prevNode.next;
            prevNode.next = insertNode;
        }

        this.size ++;
    }

    /**
     * 删除
     * @param index 
     */
    public remove(index: number) {
        if (index < 0 || index >= this.size) {
            throw new Error('params error');
        }
        if (this.head == null) {
            throw new Error('head is null')
        }
        if (index == 0) { // 头
            this.head = this.head.next;
        } else if (index == this.size - 1) { // 尾
            let prevNode: Node = this.get(index - 1);
            prevNode.next = null;
            this.tail = prevNode;
        } else { // 中间
            let currNode = this.get(index);
            let prevNode = this.get(index - 1);

            prevNode.next = currNode.next;
        }
        this.size --;
    }

    /**
     * 获取
     * @param index 
     */
    public get(index: number): Node {
        if (index < 0 || index >= this.size) {
            throw new Error('params error');
        }
        if (this.head == null) {
            throw new Error('head is error');
        }
        let temp: Node = this.head;
        for (let i = 0; i < index; i++) {
            temp = temp.next;
        }
        return temp;
    }

    public toString() {
        let str: string = '';
        let temp = this.head;
        while(temp != null) {
            str += temp.data + ' | ';
            temp = temp.next;
        }
        return str;
    }
}

/**
 * 节点
 */
class Node {
    private _data: number;
    private _next: Node = null;

    constructor(data: number) {
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

export default RLinkedList;