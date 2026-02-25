import Node from "./Node"

class LinkedList {
    head: Node | null;

    constructor() {
        this.head = null;
    }

    add(value: any): void{
        const node = new Node (value);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }

    print() {
        let current = this.head;
        let result = "";
        while(current){
            result+= current.value + " -> ";
            current = current.next;
        }

        console.log(result + "null");
    }

}

export default LinkedList;