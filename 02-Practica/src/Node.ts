class Node {

    value: any;
    next: Node | null = null;
    prev: Node | null = null;

    constructor(value: any){
        this.value = value;
        this.next = null;
        this.prev = null;
    }

}

export default Node;