/**
 * 堆排序
 */
class HeapSort {
    public constructor() {

    }

    /**
     * 下沉操作
     * @param data 
     * @param index 
     * @param len 
     */
    private downAdjust(data: Array<number>, index: number, len: number) {
        let parentIndex: number = index;
        let childIndex: number = 2 * index + 1;
        let temp: number = data[parentIndex];

        while(childIndex < len) {
            if (childIndex + 1 < len && data[childIndex + 1] > data[childIndex]) {
                childIndex++;
            }
            if (temp > data[childIndex]) {
                break;
            }
            data[parentIndex] = data[childIndex];
            parentIndex = childIndex;
            childIndex = parentIndex * 2 + 1;
        }

        data[parentIndex] = temp;
    }

    /**
     * 构建堆
     * @param data 
     */
    private buildHeap(data: Array<number>) {
        let len = data.length;
        let startIndex: number = parseInt((len - 2) / 2 + '');
        for(let i = startIndex; i >= 0; i--) { //处理所有的非叶子节点
            this.downAdjust(data, i, len);
        }
    }

    /**
     * 堆排序
     * @param data 
     */
    private heapSort(data: Array<number>) {
        this.buildHeap(data); // 构建最大堆
        console.log(data);

        let len = data.length;
        let temp: number;
        for (let i = len - 1; i > 0; i--) { // 让堆顶的元素和最后一个元素做交换，然后做下沉操作
            temp = data[i];
            data[i] = data[0];
            data[0] = temp;
            this.downAdjust(data, 0, i);
        }
    }

    public static test() {
        let heap: HeapSort = new HeapSort();
        let data: Array<number> = [2,6,4,9,8,7,0,5,1,3,3,5,1,2,15];

        heap.heapSort(data); // 构建最大堆
        console.log(data);
    }
}

export default HeapSort;