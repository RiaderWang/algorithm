import EventCenter from './EventCenter';

class Entry {
    constructor() {

    }

    public deal() {
        let center: EventCenter = new EventCenter();

        center.on('test1', this.ontest1, this);

        center.on('test2', this.ontest2, this);

        center.emit('test1', 'test1 data');
        center.emit('test2', 'test2 data');
        
        center.remove('test1', this.ontest1, this);
        
        setTimeout(() => {
            center.emit('test1', 'test1 data');
            center.emit('test2', 'test2 data');
        }, 2000);
    }

    private ontest1(data: any) {
        console.log('监听test1', data);
    }

    private ontest2(data: any) {
        console.log('监听test2', data);
    }

    public static init() {
        new Entry().deal();
    }
}

export default Entry;