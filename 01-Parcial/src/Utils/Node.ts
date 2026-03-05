class Node {
    
    value: any;
    next: Node | null;
    prev: Node | null;

    constructor(value: any){
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}

export default Node;