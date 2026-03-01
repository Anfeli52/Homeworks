import type Estudiante from "./Estudiante";

class Node {
    value: Estudiante;
    next: Node | null = null;

    constructor(value: Estudiante){
        this.value = value;
        this.next = null;
    }
}

export default Node;