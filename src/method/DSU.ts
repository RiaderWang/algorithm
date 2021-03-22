/**
 * 并查集算法（Disjoint Set Union）
 * 类似于帮派合并
 * 帮派a和帮派b合并，即帮派a的帮主听命于帮派b的帮主，链接：https://blog.csdn.net/bjweimengshu/article/details/108332389
 */
export default class DSU {
    private len: number;
    private data: Array<number> = [];

    constructor(len: number) {
        this.len = len;
        let i: number = 0;
        for (i = 0; i < len; i++) {
            this.data[i] = i;
        }
    }

    /**
     * 查找
     * @param id 
     */
    public query(id: number): number {
        if (this.data[id] == id) {
            return id;
        } else {
            return this.query(this.data[id]);
        }
    }

    /**
     * 合并
     * @param a 
     * @param b 
     */
    public merge(a: number, b: number) {
        this.data[this.query(a)] = this.query(b);
    }

    /**
     * 是否是同一集合
     * @param a 
     * @param b 
     */
    public contain(a: number, b: number): boolean {
        return this.query(a) == this.query(b);
    }

    public getData(): Array<number> {
        return this.data;
    }


    public static test() {
        const arr = [
            ['a','b','c'],
            ['a','d'],
            ['d','e'],
            ['f','g'],
            ['h','g'],
            ['i'],
        ]

        /*
            ['a','b','c'], --------- 0,1,2
            ['a','d'],     --------- 0,3
            ['d','e'],     --------- 3,4
            ['f','g'],     --------- 5,6
            ['h','g'],     --------- 7,6
            ['i'],         --------- 8

            要求输出 
            [
                ['a','b','c','d','e'],
                ['f','g','h'],
                ['i']
            ]
         */
        let dsu: DSU = new DSU(9);
        dsu.merge(1,0);
        dsu.merge(2,1);

        dsu.merge(3,2);
        dsu.merge(4,3);
        dsu.merge(6,5);
        dsu.merge(7,6);
        
        console.log(dsu.getData());

        let data: Array<number> = dsu.getData();
        let obj: any = {};
        let i: number = 0;
        let keyName: string = 'key0'
        obj[keyName] = [];

        for (i = 0; i < data.length; i++) {
            keyName = 'key' + data[i];
            if (obj.hasOwnProperty(keyName)) {
                obj[keyName].push(i)
            } else {
                obj[keyName] = [];
                obj[keyName].push(i)
            }
        }

        let res: Array<Array<any>> = [];
        let value: Array<number> = [];
        for(var key in obj) {
            value = obj[key];
            let charData: Array<string> = [];
            value.forEach(item => {
                charData.push(String.fromCharCode(97 + item));
            });
            res.push(charData);
        }
        console.log(res);
    }
}