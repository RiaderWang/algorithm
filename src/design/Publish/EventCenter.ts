/**
 * 事件调度中心
 */
class EventCenter {
    // 数据结构，散列表，以事件名为key, [function，thisObj]为value
    private eventMap: any;

    constructor() {
        this.eventMap = {};
    }

    public on(type: any, func: Function, thisObj: any) {
        let eventFuncs = this.eventMap[type];
        if (eventFuncs) {
            let index = this.getEventInx(type, func, thisObj);
            if (index == -1) { // 该事件不存在
                this.eventMap[type].push([func, thisObj]);
            }
        } else { //map中没有事件
            this.eventMap[type] = [];
            this.eventMap[type].push([func, thisObj]);
        }
    }

    public emit(type: any, data: any): boolean {
        let eventFuncs = this.eventMap[type];
        if (eventFuncs == null) {
            return;
        }
        for (let i: number = 0; i < eventFuncs.length; i++) {
            eventFuncs[i][0].call(eventFuncs[i][1], data);
        }
        return true;
    }

    public has(type: any): boolean {
        if (this.eventMap[type] && this.eventMap[type].length > 0) {
            return true;
        }
        return false;
    }

    public remove(type: any, func: Function, thisObj: any) {
        if (this.eventMap[type]) {
            let index = this.getEventInx(type, func, thisObj);
            if (index != -1) {
                this.eventMap[type].splice(index, 1);
            }
        }
    }

    private getEventInx(type: any, func: Function, thisObj: any): number {
        let index: number = -1;
        for (let i in this.eventMap[type]) {
            if (this.eventMap[type][i][0] == func && this.eventMap[type][i][1] == thisObj) {
                index = +i;
                break;
            }
        }
        return index;
    }
}

export default EventCenter;