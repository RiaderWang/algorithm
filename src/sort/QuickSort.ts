/**
 * 快速排序
 */
class QuickSort {
    public constructor() {

    }

    private sort(data: Array<number>, startIndex: number, endIndex: number) {
        if (data.length <= 0) {
            throw new Error('data is empty!');
        }
        if (startIndex >= endIndex) {
            return;
        }
        let pivot: number = this.finePivot(data, startIndex, endIndex);
        this.sort(data, startIndex, pivot);
        this.sort(data, pivot+1, endIndex);
    }

    /**
     * 找到基准下标
     * @param data 
     * @param start 
     * @param end 
     */
    private finePivot(data: Array<number>, start: number, end: number): number {
        let left: number = start;
        let right: number = end;
        let pivotNum: number = data[start];
        let temp: number;

        while(left < right) {
            while(left < right && pivotNum <= data[right]) { // 从右向左，找到比pivot小的，则停止
                right --;
            }
            while(left < right && pivotNum >= data[left]) { // 从左向右，找到比pivot大的，则停止
                left ++;
            }
            
            // 交换两个下标的值
            if (left < right) {
                temp = data[left];
                data[left] = data[right];
                data[right] = temp;
            }
        }
     
        data[start] = data[left];
        data[left] = pivotNum;
        
        return left;
    }

    /**
     * 测试用例
     */
    public static test() {
        let qs: QuickSort = new QuickSort();
        let data: Array<number> = [2,6,8,9,3,5,4,0,1,7,7,8,9,10,16,35,68,1,23,0,65,87,45,23];
        qs.sort(data, 0, data.length - 1);
        console.log(data);
    }
}

export default QuickSort;