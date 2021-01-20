/**
 * 数组
 */
class RArray {
    private datas: number[];
    private size: number;

    public constructor() {
        this.datas = [];
        this.size = 0;
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
        for(let i: number = this.datas.length - 1; i >= index; i--) {
            this.datas[i+1] = this.datas[i];
        }
        this.datas[index] = data;
        this.size ++;
    }

    /**
     * 删除
     * @param index 
     */
    public delete(index: number): number {
        if (index < 0 || index > this.size) {
            throw new Error('params error');
        }
        let data = this.datas[index];
        for (let i: number = index + 1; i < this.datas.length; i++) {
            this.datas[i - 1] = this.datas[i];
        }
        this.size --;
        return data;
    }

    public toString() {
        let str: string = '';
        let tag: string = '';

        for (let i: number = 0; i < this.size; i++) {
            tag = (i == this.size - 1) ? '' : ' | ';
            str += this.datas[i] + tag;
        }
        return str;
    }
}

export default RArray;