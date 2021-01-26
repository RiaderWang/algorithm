/**
 * 二叉查找树
 */
import RQueue from './RQueue';
import RStack from './RStack';

class RBinaryTree {
    private root: TreeNode = null;

    public constructor() {

    }

    /**
     * 添加数据
     * @param data 
     */
    public add(data: number) {
        let insertNode: TreeNode = new TreeNode(data);
        
        if (this.root == null) { //空
            this.root = insertNode;
        } else {
            let currentNode: TreeNode = this.root; // 当前节点
            let parentNode: TreeNode = null; // 保存的父节点

            while(currentNode != null) {
                parentNode = currentNode;

                if (data < currentNode.data) { // 小于当前节点的值，放入左子树中
                    currentNode = currentNode.leftChild;
                } else { // 大于等于当前节点的值，放入右子树中
                    currentNode = currentNode.rightChild;
                }
            }

            if (data < parentNode.data) {
                parentNode.leftChild = insertNode;
            } else {
                parentNode.rightChild = insertNode;
            }
        }
    }

    public out() {
        if (this.root == null) {
            throw new Error('tree is empty');
        }
        this.pastOrderTraveral(this.root);
    }

    /**
     * 前序遍历（根，左，右）
     * @param node 
     */
    private prevOrderTraveral(node: TreeNode) {
        if (node == null) {
            return;
        }
        console.log(node.data);
        this.prevOrderTraveral(node.leftChild);
        this.prevOrderTraveral(node.rightChild);
    }

    /**
     * 中序遍历（左，根，右）
     * @param node 
     */
    private inOrderTraveral(node: TreeNode) {
        if (node == null) {
            return;
        }
        this.inOrderTraveral(node.leftChild);
        console.log(node.data);
        this.inOrderTraveral(node.rightChild);
    }

    /**
     * 后序遍历（左，右，根）
     * @param node 
     */
    private pastOrderTraveral(node: TreeNode) {
        if (node == null) {
            return;
        }
        this.pastOrderTraveral(node.leftChild);
        this.pastOrderTraveral(node.rightChild);
        console.log(node.data);
    }


    
    /**************************************************非递归方式实现遍历，深度优先（前，中，后），广度优先（层级遍历）********************************************************/

    /**
     * 层序遍历
     */
    private levelOrderTraveral() {
        let queue: Queue = new Queue();
        let node: Q_TreeNode = null;
        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            node = queue.dequeue();
            console.log(node.nodeData.data);

            if (node.nodeData.leftChild) {
                queue.enqueue(node.nodeData.leftChild);
            }
            if (node.nodeData.rightChild) {
                queue.enqueue(node.nodeData.rightChild);
            }
        }
    }

    private prevOrderTraveralWithStack() {
        let stack: Stack = new Stack();

        let node: TreeNode = this.root;

        while(node != null || !stack.isEmpty()) {
            
            while(node != null) {
                console.log(node.data);
                stack.push(new Q_TreeNode(node));
                node = node.leftChild;
            }

            if (!stack.isEmpty()) {
                node = stack.pop().nodeData;
                node = node.rightChild;
            }
        }
    }

    private inOrderTraveralWithStack() {
        let stack: Stack = new Stack();
        let node: TreeNode = this.root;

        while(node != null || !stack.isEmpty()) {
            
            while(node != null) {
                stack.push(new Q_TreeNode(node));
                node = node.leftChild;
            }

            if (!stack.isEmpty()) {
                node = stack.pop().nodeData;
                console.log(node.data);
                node = node.rightChild;
            }
        }
    }

    /**
     * 非递归实现后序遍历 思路
     * 两个栈，一个栈存储遍历输入，一个栈存储输出
     */
    private pastOrderTraveralWitchStack() {
        let stack: Stack = new Stack();
        let outStack : Stack = new Stack();
        let node: TreeNode = this.root;

        while(node != null || !stack.isEmpty()) {
            if(node != null) {
                stack.push(new Q_TreeNode(node));
                outStack.push(new Q_TreeNode(node));

                node = node.rightChild;
            } else {
                node = stack.pop().nodeData;
                node = node.leftChild;
            }
        }

        while(!outStack.isEmpty()) {
            console.log(outStack.pop().nodeData.data);
        }
    }

    /**
     * 测试用例
     *     4
     *   2   5
     *  1 3   6
     */
    public static test() {
        let tree: RBinaryTree = new RBinaryTree();
        tree.add(4);
        tree.add(2);
        tree.add(3);
        tree.add(1);
        tree.add(5);
        tree.add(6);

        tree.pastOrderTraveralWitchStack();
    }
}

class Stack {
    private head: Q_TreeNode = null;
    private size: number = 0;
    
    public constructor() {
        
    }

    /**
     * 入栈
     * @param node 
     */
    public push(node: Q_TreeNode) {
        let temp = this.head;
        this.head = node;
        this.head.next = temp;
        this.size ++;
    }

    /**
     * 出栈
     */
    public pop() {
        if (this.size <= 0) {
            throw new Error('stack is empty!');
        }
        let temp = this.head;
        this.head = this.head.next;
        this.size --;
        return temp;
    }

    public isEmpty() {
        return this.size == 0 ? true : false;
    }
}

class Queue {
    private head: Q_TreeNode = null;
    private tail: Q_TreeNode = null;
    private size: number = 0;

    public constructor() {

    }

    /**
     * 入队
     */
    public enqueue(node: TreeNode) {
        let q_TreeNode: Q_TreeNode = new  Q_TreeNode(node);
        if (this.size == 0) { // 空
            this.head = this.tail = q_TreeNode;
        } else { 
            this.tail.next = q_TreeNode;
            this.tail = q_TreeNode;
        }
        this.size ++;
    }

    /**
     * 出队
     */
    public dequeue(): Q_TreeNode {
        if (this.size <= 0) {
            throw new Error('queue is empty!')
        }
        let temp: Q_TreeNode = this.head;
        this.head = this.head.next;
        this.size --;
        return temp;
    }

    public isEmpty() {
        return this.size == 0 ? true : false;
    }
}

class Q_TreeNode {
    private _nodeData: TreeNode = null;
    private _next: Q_TreeNode = null;

    public constructor(nodeData: TreeNode) {
        this._nodeData = nodeData;
    }

    public get nodeData(): TreeNode {
        return this._nodeData;
    }

    public set next(next: Q_TreeNode) {
        this._next = next;
    }

    public get next(): Q_TreeNode {
        return this._next;
    }
 }

class TreeNode {
    private _data: number;
    private _leftChild: TreeNode = null;
    private _rightChild: TreeNode = null;

    public constructor(data: number) {
        this._data = data;
    }

    public get data(): number {
        return this._data;
    }

    public set leftChild(child: TreeNode) {
        this._leftChild = child;
    }

    public get leftChild(): TreeNode {
        return this._leftChild
    }

    public set rightChild(child: TreeNode) {
        this._rightChild = child;
    }

    public get rightChild(): TreeNode {
        return this._rightChild;
    }
}

export default RBinaryTree;