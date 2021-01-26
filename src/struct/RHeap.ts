/**
 * 最小堆（基于数组）
 * 任何父节点的值都小于左右孩子节点的值
 * leftChild = 2 * parent + 1;
 * rightChild = 2 * parent + 2;
 */
class RHeap {
    public constructor() {

    }

    /**
     * 上浮
     * @param data 
     */
    private upAdjust(data: Array<number>) {
        if (data.length <= 1) {
            return;
        }

        let childIndex: number = data.length - 1; //子下标
        let parentIndex: number = parseInt(((childIndex - 1) / 2) + ''); //父下标

        let temp = data[childIndex];
        while(childIndex > 0 && temp < data[parentIndex]) {
            data[childIndex] = data[parentIndex];
            childIndex = parentIndex;
            parentIndex = parseInt(((childIndex - 1) / 2) + '');
        }
        data[childIndex] = temp;
        return data;
    }

    /**
     * 下沉
     * @param data 
     */
    private downAdjust(data: Array<number>, parentIndex: number, len: number) {
        let temp: number = data[parentIndex];
        let childIndex: number = 2 * parentIndex + 1;

        while(childIndex < len) {
            if (childIndex + 1 < len && data[childIndex + 1] < data[childIndex]) { // 右孩子的值小于左孩子的值
                childIndex = childIndex + 1;
            }
            if (temp <= data[childIndex]) { // 父节点都小于左右孩子的值，跳出
                break;
            }
            data[parentIndex] = data[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * parentIndex + 1;
        }

        data[parentIndex] = temp;
    }

    /**
     * 构建堆
     * @param data 
     */
    public buildHeap(data: Array<number>): Array<number> {
        let sindex = parseInt((data.length - 2) / 2 + ''); //计算出非椰子节点
        for (let i = sindex; i >= 0; i--) {
            this.downAdjust(data, i, data.length);
        }
        return data;
    }


    public test() {
        let data: Array<number> = [2,10,5,7,9,8,3,6,1];
        console.log(this.buildHeap(data));
    }
}

export default RHeap;