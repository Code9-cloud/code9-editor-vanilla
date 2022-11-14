export default class Queue<T> {
    queue = [];
    offset = 0;
    constructor(){}

    getLength() {
        return (this.queue.length - this.offset)
    }

    push(itm:T){
        this.queue.push(itm);
    }

    isEmpty() : boolean {
        return (this.queue.length === 0);
    }

    peek() : T {
        return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
    }

    pop() : T {
        if (!this.queue.length) return undefined
        let itm = this.queue[this.offset];
        if (++this.offset * 2 >= this.queue.length) {
            this.queue = this.queue.slice(this.offset)
            this.offset = 0;
        }
        return itm;
    }

}