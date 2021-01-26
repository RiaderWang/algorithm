/**
 * 优先队列
 */
class PriorityQueue {
    private data: Array<number> = [];
    private size: number = 0;

    public constructor() {

    }

    /**
     * 入队
     * @param data 
     */
    public enqueue(num: number) {
        this.size ++;
        this.data[this.size - 1] = num;
        this.upAdjust(this.data); // 上浮
    }

    /**
     * 出队
     */
    public dequeue(): number {
        if (this.size <= 0) {
            throw new Error('queue is empty!');
        }
        let temp: number = this.data[0]; // 堆头的数据

        let last: number = this.data.splice(this.data.length - 1, 1)[0]; // 取出数组最后一个元素
        this.data[0] = last; //放入到数组开头

        this.downAdjust(this.data, 0, this.data.length); //下沉
        this.size --;
        return temp;
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
}

export default PriorityQueue;