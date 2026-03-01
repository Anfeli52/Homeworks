import Node from "./Node";

class LinkedList{
    head: Node | null;

    constructor(){
        this.head = null;
    }

    add(value: any): void{
        const student = new Node(value);
        if(!this.head){
            this.head = student;
        } else {
            let current = this.head;
            while (current.next){
                current = current.next;
            }
            current.next = student;
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