/**
 * 二叉查找树
 */
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
        this.inOrderTraveral(this.root);
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

    /**
     * 测试用例
     */
    public static test() {
        let tree: RBinaryTree = new RBinaryTree();
        tree.add(4);
        tree.add(2);
        tree.add(3);
        tree.add(1);
        tree.add(5);
        tree.add(6);

        tree.out();
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